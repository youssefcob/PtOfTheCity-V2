<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
import { getContent } from '@/mixins/Content';
import type { Content } from '~/types/types';

const formatText = (text: string | undefined): string => {
    if (!text) return '';
    return text.replace(/\n/g, '<br>');
}

// Default content values
const defaultContent = {
    clinics: 25,
    successful_cases: 6666,
    employees: 67,
    our_story: 'Our story of success started with Dr. Mahmoud`s simple dream of being the best physical therapy clinic in town. It grew over the years into a dream that came true with the establishment of the PT of the city in 2020. We reached 14 locations in a few years, all over New York, with the dedication of our partners and team and the trust of our patients. And to more success, we go.',
    our_technique: 'We offer you a treatment plan specialized for each case to achieve the most effective results. You will be given detailed information about the nature of the case and injury, the treatment plan, tools, and devices you will use, as well as the expected outcome from the treatment. Our main concern is your comfort and wellness. You will be treated with the most recent evidence guidelines and the most advanced tools, techniques, and devices that will help you reach the treatment goal in the most convenient way and in the shortest duration of time.'
};


const homepageData = inject('homepageData') as Ref<{
    whoWeAre: Content;
} | null>;
const pending = inject('homepagePending') as Ref<boolean>;
const error = inject('homepageError') as Ref<any>;


const contentData = computed(() => homepageData.value?.whoWeAre.body);
const statsCounter = reactive({
    clinics: 0,
    successful_cases: 0,
    employees: 0,
})

const stats = ref<HTMLElement | null>(null);

const startCounting = () => {
    const content = contentData.value || defaultContent;
    // Type guard to ensure content is the expected object type
    if (typeof content === 'string' || Array.isArray(content)) {
        return;
    }

    const count = (target: number, property: string) => {
        let currentCount = 0;
        const increment = target / 70; // Adjust the increment for smoother animation
        const interval = setInterval(() => {
            currentCount += increment;
            if (currentCount >= target) {
                currentCount = target;
                clearInterval(interval);
            }
            statsCounter[property as keyof typeof statsCounter] = Math.ceil(currentCount);
        }, 20);
    }

    count(content.clinics, 'clinics');
    count(content.successful_cases, 'successful_cases');
    count(content.employees, 'employees');
};

onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                startCounting();
                observer.unobserve(entry.target);
            }
        });
    });

    if (stats.value) {
        observer.observe(stats.value);
    }
});

// Computed properties for formatted content
const formattedOurStory = computed(() => {
    const content = contentData.value || defaultContent;
    if (typeof content === 'object' && !Array.isArray(content)) {
        return formatText(content.our_story);
    }
    return formatText(defaultContent.our_story);
});

const formattedOurTechnique = computed(() => {
    const content = contentData.value || defaultContent;
    if (typeof content === 'object' && !Array.isArray(content)) {
        return formatText(content.our_technique);
    }
    return formatText(defaultContent.our_technique);
});
</script>

<template>
    <div class="container">
        <h1 class="sectionHeader">{{ $translate('whoWeAre') }}</h1>

        <!-- Loading state -->
        <div v-if="pending" class="who-we-are-loading">
            <div class="loading-text">Loading content...</div>
        </div>

        <!-- Error state -->
        <div v-else-if="error" class="who-we-are-error">
            <div class="error-text">Failed to load content</div>
        </div>

        <!-- Content -->
        <div v-else-if="contentData" class="whoWeAreContainer">
            <div class="stats" ref="stats">
                <div class="box">
                    <div>
                        <h1>{{ statsCounter.clinics }}</h1>
                    </div>
                    <div>
                        <h2 class="header-q">{{ $translate('clinics') }}</h2>
                    </div>
                </div>
                <div class="box">
                    <div>
                        <h1>{{ statsCounter.successful_cases }}</h1>
                    </div>
                    <div>
                        <h2 class="header-q">{{ $translate('satisfied_patients') }}</h2>
                    </div>
                </div>
                <div class="box">
                    <div>
                        <h1>{{ statsCounter.employees }}</h1>
                    </div>
                    <div>
                        <h2 class="header-q">{{ $translate('employees') }}</h2>
                    </div>
                </div>
            </div>

            <div class="infocontainer">
                <h3 class="header-t">{{ $translate('our_story') }}</h3>
                <div class="wrapper">
                    <div class="info">
                        <div class="infowrapper">
                            <p class="text-s">
                                <ClientOnly>
                                    <span v-html="formattedOurStory"></span>
                                </ClientOnly>
                            </p>
                        </div>
                        <div>
                            <h3 class="header-t">{{ $translate('our_technique') }}</h3>
                            <div class="infowrapper">
                                <p class="text-s">
                                    <ClientOnly>
                                        <span v-html="formattedOurTechnique"></span>
                                    </ClientOnly>
                                </p>
                            </div>
                        </div>
                    </div>
                    <!--
                    <div class="image-wrapper">
                        <NuxtImg format="webp" loading="lazy" :src="useImg('whoWeAreSection')" alt="Who We Are"
                            class="who-we-are-image" />
                    </div>
                -->
                </div>
                <NuxtLink to="/about" class="btn transparent responsive main"
                    aria-label="Learn more about PT of the City" title="About PT of the City">
                    <!-- {{ $translate('learn_more') }} -->
                      More about PT of the City
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.who-we-are-loading,
.who-we-are-error {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;

    .loading-text,
    .error-text {
        font-size: 1.2rem;
        color: $navy;
    }
}

.container {
    @include pagePadding();

    .text-s {}

    .stats {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(calc(33% - 3rem), 1fr));
        gap: 3rem;
        padding-bottom: 3rem;

        .header-q {
            font-weight: bold;
        }

        @media screen and (max-width: 770px) {
            display: flex;
            flex-direction: column;
            gap: 7px
        }

        >.box {
            display: flex;
            height: 13.75rem;
            padding: 2.625rem 3.5625rem;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 1.875rem;
            flex-shrink: 0;
            background-color: $white;
            border-radius: 1.125rem;

            @media screen and (max-width: 770px) {
                display: flex;
                flex-direction: row;
                gap: 20px;
                justify-content: space-between;

                >div {
                    width: 50%;
                    display: flex;

                    &:first-child {
                        justify-content: flex-end;
                    }

                    &:last-child {
                        justify-content: flex-start;
                    }
                }
            }
        }
    }

    .infocontainer {
        display: flex;
        flex-direction: column;
        gap: 3rem;

        .wrapper {
            // display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 3rem;

            @media screen and (max-width: 768px) {
                grid-template-columns: 1fr;
            }

            .info {
                display: flex;
                flex-direction: column;
                gap: 3rem;

                .infowrapper {
                    background-color: $white;
                    padding: 2rem;
                    border-radius: 1.125rem;
                }
            }

            .image-wrapper {
                width: 100%;
                height: 100%;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 1.125rem;
                }
            }
        }
    }
}
</style>