<script setup lang="ts">
import type { Service } from '~/types/types';
import EditableText from '~/components/Admin/EditableText.vue';
import EditableImage from '~/components/Admin/EditableImage.vue';
import { FEATURES } from '~/config/features';
import { useInjectedPageContent } from '~/composables/usePageContent';

const homepageData = inject('homepageData') as Ref<{
    services: Service[]
}>;

const pending = inject('homepagePending');
const error = inject('homepageError');

const { contentMap, page, isContentEditor } = useInjectedPageContent();
const { saveText } = useContentApi();
const { editModeEnabled } = useEditorState();

const canManageServices = computed(() => isContentEditor.value && editModeEnabled.value && FEATURES.serviceOrdering);

// Admin-set hide/placement/order for each service, persisted through the same
// generic page-content key/value store EditableText/EditableImage already
// use (service.{id}.{field}) rather than a dedicated backend endpoint.
// Layered in a local ref on top of contentMap so button clicks re-sort
// instantly instead of waiting on a refetch.
type ServiceMetaField = 'hidden' | 'placement' | 'order';
const localOverrides = ref<Record<string, string>>({});

const metaKey = (id: string, field: ServiceMetaField) => `service.${id}.${field}`;

const getMeta = (id: string, field: ServiceMetaField): string | undefined => {
    const key = metaKey(id, field);
    return localOverrides.value[key] ?? contentMap.value[key]?.value;
};

const setMeta = async (id: string, field: ServiceMetaField, value: string) => {
    const key = metaKey(id, field);
    const previous = localOverrides.value[key];
    localOverrides.value = { ...localOverrides.value, [key]: value };
    try {
        await saveText(key, page, value);
    } catch (err) {
        console.error('Failed to save service setting', key, err);
        localOverrides.value = { ...localOverrides.value, [key]: previous ?? contentMap.value[key]?.value ?? '' };
    }
};

const isHidden = (service: Service) => getMeta(service.id, 'hidden') === 'true';

const allServices = computed(() => (homepageData.value?.services || []).filter(service =>
    service.title?.toLowerCase() !== 'initial check-up'
));

const hiddenServices = computed(() => allServices.value.filter(isHidden));
const visibleServices = computed(() => allServices.value.filter(s => !isHidden(s)));

// Falls back to each service's position in visibleServices (its arrival
// order from the API) until an admin explicitly reorders it. The featured
// card used to be auto-picked from this list (pediatric if present, else the
// last one) - now it's fully admin-authored via home.services.featured.*
// content keys, independent of any real Service, so every service is fair
// game for the grid/chips.
const resolveOrder = (service: Service) => {
    const raw = getMeta(service.id, 'order');
    if (raw !== undefined && raw !== '' && Number.isFinite(Number(raw))) return Number(raw);
    return visibleServices.value.findIndex(s => s.slug === service.slug);
};

// A single order sequence shared by both the grid and "more services" chips,
// so swapping two services' order values reorders them within whichever
// bucket they land in without disturbing anyone else's position.
const orderedRemaining = computed(() =>
    [...visibleServices.value].sort((a, b) => resolveOrder(a) - resolveOrder(b))
);

const MAX_GRID_SERVICES = 6;

const gridServices = computed(() => {
    const result: Service[] = [];
    for (const service of orderedRemaining.value) {
        const placement = getMeta(service.id, 'placement');
        if (placement === 'chip') continue;
        if (placement === 'grid' || result.length < MAX_GRID_SERVICES) result.push(service);
    }
    return result;
});

const chipServices = computed(() => {
    const gridSlugs = new Set(gridServices.value.map(s => s.slug));
    return orderedRemaining.value.filter(s => !gridSlugs.has(s.slug));
});

const moveService = (bucket: Service[], service: Service, direction: -1 | 1) => {
    const idx = bucket.findIndex(s => s.slug === service.slug);
    const swapIdx = idx + direction;
    if (idx === -1 || swapIdx < 0 || swapIdx >= bucket.length) return;
    const other = bucket[swapIdx];
    const serviceOrder = resolveOrder(service);
    const otherOrder = resolveOrder(other);
    setMeta(service.id, 'order', String(otherOrder));
    setMeta(other.id, 'order', String(serviceOrder));
};

const moveToBucket = (service: Service, bucket: 'grid' | 'chip') => setMeta(service.id, 'placement', bucket);
const hideService = (service: Service) => setMeta(service.id, 'hidden', 'true');
const unhideService = (service: Service) => setMeta(service.id, 'hidden', 'false');

const cardIcons = [
    '/images/home/icon-badge-1.svg',
    '/images/home/icon-badge-2.svg',
    '/images/home/icon-badge-3.svg',
    '/images/home/icon-badge-4.svg',
    '/images/home/icon-badge-5.svg',
    '/images/home/icon-clipboard.svg',
];

const cardAccentColors = [
    '#255bf0',
    '#cb38e8',
    '#7f26ec',
    '#912ec3',
    '#2b7ad4',
    '#0E899A',
];
</script>

<template>
    <div class="specialty-programs">
        <div class="intro">
            <EditableText tag="p" class="overline" content-key="home.services.overline" default="Specialty Programs" />
            <EditableText tag="h2" class="heading" content-key="home.services.heading"
                default="Advanced Care for Complex Conditions" />
            <EditableText tag="p" class="body" content-key="home.services.body"
                default="Our specialty programs bring together advanced clinical expertise and individualized care pathways for patients who need more than standard physical therapy." />
        </div>

        <div v-if="pending" class="services-loading">
            <div class="loading-text">Loading services...</div>
        </div>

        <div v-else-if="error" class="services-error">
            <div class="error-text">Failed to load services</div>
        </div>

        <template v-else>
            <div class="programs-layout">
                <div class="cards-grid">
                    <NuxtLink
                        v-for="(service, index) in gridServices"
                        :key="service.slug"
                        :to="`/service/${service.slug}`"
                        class="program-card"
                    >
                        <div class="program-card-body">
                            <img class="program-icon" :src="cardIcons[index % cardIcons.length]" alt="" aria-hidden="true" />
                            <div class="program-copy">
                                <EditableText tag="p" class="program-title" :content-key="`service.${service.id}.title`"
                                    :default="service.title" />
                                <EditableText tag="p" class="program-description"
                                    :content-key="`service.${service.id}.description`" :default="service.list?.[0]" />
                            </div>
                        </div>
                        <div class="accent-strip" :style="{ backgroundColor: cardAccentColors[index % cardAccentColors.length] }"></div>

                        <div v-if="canManageServices" class="admin-controls" @click.stop.prevent>
                            <button type="button" class="admin-btn" :disabled="index === 0"
                                @click="moveService(gridServices, service, -1)" aria-label="Move up">↑</button>
                            <button type="button" class="admin-btn" :disabled="index === gridServices.length - 1"
                                @click="moveService(gridServices, service, 1)" aria-label="Move down">↓</button>
                            <button type="button" class="admin-btn admin-btn--wide"
                                @click="moveToBucket(service, 'chip')">Move to More Services</button>
                            <button type="button" class="admin-btn admin-btn--danger"
                                @click="hideService(service)">Hide</button>
                        </div>
                    </NuxtLink>
                </div>

                <div class="featured-card">
                    <div class="featured-image-area">
                        <EditableImage content-key="home.services.featured.image"
                            :default-src="useImg('whoWeArePage', 700)" default-alt="Featured program" />
                        <EditableText tag="span" class="featured-badge" content-key="home.services.featured.badge"
                            default="Featured Program" />
                    </div>
                    <div class="featured-copy">
                        <EditableText tag="p" class="featured-title" content-key="home.services.featured.title"
                            default="Pediatric Physical Therapy" />
                        <EditableText tag="p" class="featured-description" content-key="home.services.featured.description"
                            default="Pediatric PTs: Boost kids' movement and daily function." />
                    </div>
                    <!-- Defaults to a link tag so the whole button is clickable out of
                         the box - an admin sets its destination via the same Tag/Link
                         toolbar every other text field already exposes. -->
                    <EditableText tag="a" class="featured-cta" content-key="home.services.featured.cta_label"
                        default="Explore Our Programs" />
                </div>
            </div>

            <div v-if="chipServices.length" class="more-services">
                <EditableText tag="h3" class="more-services-title" content-key="home.services.more_heading"
                    default="More Services Provided" />
                <div class="chip-row">
                    <NuxtLink v-for="(service, index) in chipServices" :key="service.slug" :to="`/service/${service.slug}`" class="chip">
                        <EditableText tag="span" :content-key="`service.${service.id}.title`" :default="service.title" />

                        <div v-if="canManageServices" class="admin-controls admin-controls--chip" @click.stop.prevent>
                            <button type="button" class="admin-btn" :disabled="index === 0"
                                @click="moveService(chipServices, service, -1)" aria-label="Move up">↑</button>
                            <button type="button" class="admin-btn" :disabled="index === chipServices.length - 1"
                                @click="moveService(chipServices, service, 1)" aria-label="Move down">↓</button>
                            <button type="button" class="admin-btn admin-btn--wide"
                                @click="moveToBucket(service, 'grid')">Move to Grid</button>
                            <button type="button" class="admin-btn admin-btn--danger"
                                @click="hideService(service)">Hide</button>
                        </div>
                    </NuxtLink>
                </div>
            </div>

            <div v-if="canManageServices && hiddenServices.length" class="hidden-services-panel">
                <p class="hidden-services-title">Hidden Services</p>
                <div class="hidden-services-list">
                    <div v-for="service in hiddenServices" :key="service.slug" class="hidden-service-row">
                        <span>{{ service.title }}</span>
                        <button type="button" class="admin-btn" @click="unhideService(service)">Unhide</button>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<style scoped lang="scss">
.specialty-programs {
    display: flex;
    flex-direction: column;
    gap: 3.5rem;
    width: 100%;
    padding: 3.75rem 7.5rem;
    background-color: $surface-cream;

    @media screen and (max-width: 900px) {
        padding: 2.5rem 1.5rem;
        background-color: $white;
    }
}

.services-loading,
.services-error {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 20rem;

    .loading-text,
    .error-text {
        @include type-body;
        color: $primary-700;
    }
}

.intro {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    max-width: 42rem;
}

.overline {
    @include type-overline;
    color: $primary-700;
}

.heading {
    @include type-h2;
    text-transform: uppercase;
    color: $primary-600;
}

.body {
    @include type-body;
    color: $primary-700;
}

.programs-layout {
    display: flex;
    align-items: stretch;
    gap: 1.5rem;

    @media screen and (max-width: 1100px) {
        flex-direction: column;
    }
}

.cards-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    flex: 1;

    @media screen and (max-width: 900px) {
        grid-template-columns: 1fr;
    }
}

.program-card {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #ffffff;
    border-radius: 0.75rem;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
    overflow: hidden;
    transition: transform 0.2s ease-in-out;
    min-height:10rem;

    &:hover {
        transform: translateY(-2px);
    }

    // mobile: horizontal icon+text row with a colored left border instead of
    // the desktop's icon-on-top card with a bottom accent strip
    @media screen and (max-width: 900px) {
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        background-color: $surface-cream;
        box-shadow: none;
    }
}

.program-card-body {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.5rem 1.5rem 1.25rem;

    @media screen and (max-width: 900px) {
        flex-direction: row;
        align-items: center;
        gap: 0.75rem;
        padding: 1rem 1rem 1rem 1.25rem;
    }
}

.program-icon {
    width: 3rem;
    height: 3rem;

    @media screen and (max-width: 900px) {
        flex-shrink: 0;
    }
}

.program-copy {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.program-title {
    @include type-button;
    color: $primary-700;
}

.program-description {
    @include type-caption;
    color: $primary-700;

    @media screen and (max-width: 900px) {
        @include type-body;
        opacity: 0.7;
    }
}

.accent-strip {
    height: 3px;
    width: 100%;

    // becomes the card's left border on mobile instead of a bottom strip
    @media screen and (max-width: 900px) {
        position: absolute;
        inset: 0 auto 0 0;
        width: 4px;
        height: 100%;
    }
}

.featured-card {
    display: flex;
    flex-direction: column;
    width: 30rem;
    height:40rem;
    background-color: $surface-mint;
    overflow: hidden;
    // justify-content: space-between;

    @media screen and (max-width: 1100px) {
        width: 100%;
    }
}

.featured-image-area {
    position: relative;
    height: 16.7rem;

    :deep(img) {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    @media screen and (max-width: 900px) {
        height: 18rem;
    }
}

.featured-badge {
    position: absolute;
    left: 1rem;
    top: 1rem;
    padding: 0.4rem 0.6rem;
    border-radius: 100px;
    background-color: $primary-base;
    @include type-caption;
    color: #ffffff;
}

.featured-copy {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1.25rem 1.25rem 0;
}

.featured-title {
    @include type-button;
    color: $primary-700;
}

.featured-description {
    @include type-body;
    color: #374151;
}

.featured-cta {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin: 1.25rem;
    padding: 1.3rem;
    border-radius: 0.75rem;
    background-color: $primary-base;
    @include type-button;
    color: $primary-700;
    // align-self: flex-end;
    margin-top: auto;
}

.more-services {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.more-services-title {
    @include type-h3;
    text-transform: uppercase;
    color: $primary-600;
}

.chip-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;

    @media screen and (max-width: 900px) {
        // column flex's default align-items: stretch would otherwise force
        // every chip to the row's full width - flex-start lets each one
        // size to its own text + padding instead.
        flex-direction: column;
        align-items: flex-start;
        flex-wrap: nowrap;
    }
}

.chip {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    row-gap: 0.5rem;
    // height: 3.25rem;
    padding: 0.6rem 1rem;
    border: 1.5px solid $primary-400;
    border-radius: 1.2rem;
    background: #ffffff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.06);
    @include type-body;
    color: $primary-700;
    white-space: nowrap;
    transition: background-color 0.2s ease-in-out;

    &:hover {
        background-color: $surface-mint;
    }

    @media screen and (max-width: 900px) {
        // width: 100%;
    }
}

// Admin-only reorder/move/hide controls, gated by canManageServices - not
// part of the public-facing design, so styled plainly to read as tooling
// rather than matching the surrounding card/chip visual language.
.admin-controls {
    display: flex;
    flex-wrap: wrap;
    flex-basis: 100%;
    align-items: center;
    gap: 0.4rem;
    padding: 0.6rem;
    border-top: 1px dashed rgba(255, 155, 55, 0.5);
    background-color: rgba(255, 155, 55, 0.08);
}

.admin-controls--chip {
    flex-basis: 100%;
    justify-content: center;
    border-top: none;
    padding-top: 0;
    background-color: transparent;
}

.admin-btn {
    padding: 0.3rem 0.6rem;
    border: none;
    border-radius: 6px;
    background-color: #142235;
    color: #ffffff;
    font-size: 0.75rem;
    font-weight: 600;
    white-space: nowrap;
    cursor: pointer;
    transition: background-color 0.15s ease-in-out;

    &:hover:not(:disabled) {
        background-color: #ff9b37;
        color: #142235;
    }

    &:disabled {
        opacity: 0.35;
        cursor: not-allowed;
    }
}

.admin-btn--wide {
    padding: 0.3rem 0.75rem;
}

.admin-btn--danger {
    background-color: #b3261e;

    &:hover:not(:disabled) {
        background-color: #8f1d17;
        color: #ffffff;
    }
}

.hidden-services-panel {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 1.25rem;
    border: 1px dashed rgba(255, 155, 55, 0.5);
    border-radius: 0.75rem;
    background-color: rgba(255, 155, 55, 0.08);
}

.hidden-services-title {
    @include type-caption;
    color: $primary-700;
    font-weight: 600;
    text-transform: uppercase;
}

.hidden-services-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.hidden-service-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.5rem 0.75rem;
    border-radius: 0.5rem;
    background-color: #ffffff;
    @include type-body;
    color: $primary-700;
}
</style>
