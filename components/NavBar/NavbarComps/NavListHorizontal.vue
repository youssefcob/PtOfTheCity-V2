<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import type { Clinic, HttpClinics, NavServiceItem } from '~/types/types';
import { bodyParts, bodyPartPath } from '~/mixins/Conditions';

const props = defineProps({
    navOnLanding: {
        type: Boolean,
        required: true
    },
    serviceItems: {
        type: Array as () => NavServiceItem[],
        default: () => []
    },
    clinics: {
        type: Object as () => HttpClinics
    }
});

const createSlug = (text: string|any) => {
    return text.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
}


const clinicsData = computed(() => props.clinics);
const clinicsLocations = computed(() =>
    clinicsData.value ? Object.keys(clinicsData.value) : []
);

const BOROUGH_ORDER = ['Manhattan', 'Brooklyn', 'The Bronx', 'Queens'];

const rearrangedClinicsNames = computed(() => {
    if (!clinicsLocations.value || !Array.isArray(clinicsLocations.value)) {
        return [];
    }
    return [...clinicsLocations.value].sort((a, b) => {
        const ai = BOROUGH_ORDER.indexOf(a);
        const bi = BOROUGH_ORDER.indexOf(b);
        if (ai === -1 && bi === -1) return 0;
        if (ai === -1) return 1;
        if (bi === -1) return -1;
        return ai - bi;
    });
});

const toItems = (items: NavServiceItem[]) =>
    items.map(s => ({ id: s.id, title: s.title, to: servicePath(s) }));

const serviceGroups = computed(() => [
    { label: 'Programs', items: toItems(props.serviceItems.filter(s => s.type === 'program')) },
    { label: 'Services', items: toItems(props.serviceItems.filter(s => s.type === 'service')) },
    { label: 'Conditions', items: bodyParts.map(p => ({ id: p.label, title: p.label, to: bodyPartPath(p) })) },
].filter(group => group.items.length > 0));

type DropdownKey = 'clinics' | 'services' | 'about' | 'patientInfo' | 'providers';

const aboutLinks = [
    { label: 'Who We Are', to: '/who-we-are' },
    { label: 'Partnerships', to: '/partnerships' },
    { label: 'Contact Us', to: '/contact-us' },
    { label: 'Blog', to: '/articles' },
];

const patientInfoLinks = [
    { label: 'New Patients', to: '/new-patients-guide' },
    { label: 'Existing Patients', to: '/existing-patients-guide' },
    { label: 'FAQs', to: '/FAQs' },
];

const providersLinks = [
    { label: 'Careers', to: '/careers' },
    { label: 'Referring Physicians', to: '/physicians-referral' },
];

// Dropdown states
const dropdownOpen = reactive<Record<DropdownKey, boolean>>({
    clinics: false,
    services: false,
    about: false,
    patientInfo: false,
    providers: false,
});
const dropdownStyle = reactive<Record<DropdownKey, Record<string, string>>>({
    clinics: {},
    services: {},
    about: {},
    patientInfo: {},
    providers: {},
});

const closeTimeouts: Partial<Record<DropdownKey, number>> = {};

// Dropdown position + control functions
function openDropdown(type: DropdownKey, event: MouseEvent) {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    dropdownOpen[type] = true;
    dropdownStyle[type] = {
        position: 'fixed',
        top: `${rect.bottom}px`,
        left: `${rect.left - 50}px`,
        zIndex: '9999'
    };
}

function closeDropdown(type: DropdownKey) {
    closeTimeouts[type] = window.setTimeout(() => {
        dropdownOpen[type] = false;
    }, 100);
}

function cancelClose(type: DropdownKey) {
    const timeout = closeTimeouts[type];
    if (timeout) {
        clearTimeout(timeout);
        closeTimeouts[type] = undefined;
    }
}

</script>

<template>
    <ul role="menubar" aria-label="Main navigation menu">

        <!-- Service & Programs Dropdown -->
        <li class="dropdown" role="none">
            <NuxtLink class="list-item dropbtn" to="/#Services" role="menuitem" aria-haspopup="true"
                :aria-expanded="dropdownOpen.services" aria-label="Service & Programs - view all therapy services"
                @mouseenter="(e: any) => openDropdown('services', e)" @mouseleave="() => closeDropdown('services')">
                {{ $translate('serviceAndPrograms') }}
                <svg class="chevron" width="10" height="6" viewBox="0 0 10 6" fill="none">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </NuxtLink>
        </li>

        <teleport to="body">
            <div v-if="dropdownOpen.services && serviceGroups.length > 0" class="dropdown-content clinics"
                :style="dropdownStyle.services" role="menu" aria-label="Programs and services"
                @mouseenter="() => cancelClose('services')" @mouseleave="() => closeDropdown('services')">
                <div class="clinics-body">
                    <div class="borough-col" :class="{ wide: group.label === 'Conditions' }"
                        v-for="group in serviceGroups" :key="group.label">
                        <strong class="borough-heading" role="presentation">{{ group.label }}</strong>
                        <div class="borough-items">
                            <NuxtLink class="dropdown-item" v-for="item in group.items" :key="item.id"
                                :to="item.to" role="menuitem">
                                {{ item.title }}
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </teleport>

        <!-- Clinics Dropdown -->
        <li class="dropdown" role="none">
            <NuxtLink class="list-item dropbtn" to="/clinics/all" role="menuitem" aria-haspopup="true"
                :aria-expanded="dropdownOpen.clinics" aria-label="Clinics - view all locations"
                @mouseenter="(e: any) => openDropdown('clinics', e)" @mouseleave="() => closeDropdown('clinics')">
                {{ $translate('clinics') }}
                <svg class="chevron" width="10" height="6" viewBox="0 0 10 6" fill="none">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </NuxtLink>
        </li>

        <!-- Clinics Dropdown Content -->

        <teleport to="body">
            <div v-if="dropdownOpen.clinics && clinicsLocations.length > 0" class="dropdown-content clinics"
                :style="dropdownStyle.clinics" role="menu"
                aria-label="Clinic locations" @mouseenter="() => cancelClose('clinics')"
                @mouseleave="() => closeDropdown('clinics')"

                >

                <div class="clinics-body">
                    <div class="borough-col" v-for="(location, index) in rearrangedClinicsNames" :key="index">
                        <strong class="borough-heading" role="presentation">{{ location }}</strong>
                        <NuxtLink v-if="clinicsData" class="dropdown-item"
                            v-for="c in clinicsData[location as keyof typeof clinicsData]" :key="(c as Clinic).id"
                            :to="`/clinic/${createSlug((c))}`" role="menuitem">
                            {{ c }}
                        </NuxtLink>
                    </div>
                </div>
                <div class="clinics-footer">
                    Can't find a location near you?
                    <NuxtLink class="dropdown-item" to="/clinics/all" role="menuitem">
                        View all clinics on map >
                    </NuxtLink>
                </div>
            </div>
        </teleport>

        <!-- About Dropdown -->
        <li class="dropdown" role="none">
            <NuxtLink class="list-item dropbtn" to="/about" role="menuitem" aria-haspopup="true"
                :aria-expanded="dropdownOpen.about" aria-label="About - learn more about us"
                @mouseenter="(e: any) => openDropdown('about', e)" @mouseleave="() => closeDropdown('about')">
                {{ $translate('about') }}
                <svg class="chevron" width="10" height="6" viewBox="0 0 10 6" fill="none">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </NuxtLink>
        </li>

        <teleport to="body">
            <div v-if="dropdownOpen.about" class="dropdown-content" :style="dropdownStyle.about" role="menu"
                aria-label="About PT of the City"
                @mouseenter="() => cancelClose('about')" @mouseleave="() => closeDropdown('about')">
                <NuxtLink class="dropdown-item" v-for="link in aboutLinks" :key="link.label"
                    :to="link.to" role="menuitem">
                    {{ link.label }}
                </NuxtLink>
            </div>
        </teleport>

        <!-- Patient Info Dropdown -->
        <li class="dropdown" role="none">
            <NuxtLink class="list-item dropbtn" to="/new-patients-guide" role="menuitem" aria-haspopup="true"
                :aria-expanded="dropdownOpen.patientInfo" aria-label="Patient Info - new patients, existing patients, FAQs"
                @mouseenter="(e: any) => openDropdown('patientInfo', e)" @mouseleave="() => closeDropdown('patientInfo')">
                {{ $translate('patientInfo') }}
                <svg class="chevron" width="10" height="6" viewBox="0 0 10 6" fill="none">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </NuxtLink>
        </li>

        <teleport to="body">
            <div v-if="dropdownOpen.patientInfo" class="dropdown-content" :style="dropdownStyle.patientInfo" role="menu"
                aria-label="Patient information"
                @mouseenter="() => cancelClose('patientInfo')" @mouseleave="() => closeDropdown('patientInfo')">
                <NuxtLink class="dropdown-item" v-for="link in patientInfoLinks" :key="link.label"
                    :to="link.to" role="menuitem">
                    {{ link.label }}
                </NuxtLink>
            </div>
        </teleport>

        <!-- Providers Dropdown -->
        <li class="dropdown" role="none">
            <NuxtLink class="list-item dropbtn" to="/physicians-referral" role="menuitem" aria-haspopup="true"
                :aria-expanded="dropdownOpen.providers" aria-label="Providers - careers, referring physicians"
                @mouseenter="(e: any) => openDropdown('providers', e)" @mouseleave="() => closeDropdown('providers')">
                {{ $translate('providers') }}
                <svg class="chevron" width="10" height="6" viewBox="0 0 10 6" fill="none">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </NuxtLink>
        </li>

        <teleport to="body">
            <div v-if="dropdownOpen.providers" class="dropdown-content" :style="dropdownStyle.providers" role="menu"
                aria-label="Providers"
                @mouseenter="() => cancelClose('providers')" @mouseleave="() => closeDropdown('providers')">
                <NuxtLink class="dropdown-item" v-for="link in providersLinks" :key="link.label"
                    :to="link.to" role="menuitem">
                    {{ link.label }}
                </NuxtLink>
            </div>
        </teleport>

        <!-- Insurance -->
        <li role="none">
            <NuxtLink class="list-item" active-class="navbar-link" to="/insurances" role="menuitem"
                aria-label="View accepted insurance plans">
                {{ $translate('insurance') }}
            </NuxtLink>
        </li>

    </ul>
</template>
<style scoped lang="scss">
ul {
    list-style-type: none;
    display: flex;
    gap: clamp(0px, 1vw, 1.5rem);
    align-items: center;
    padding: 0;

    .dropdown {
        position: relative;
        display: inline-block;
    }

    li {
        margin-left: 0;
        height: 100%;
        text-align: center;
    }

    .list-item {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.35rem;
        padding: 0.6rem 0.4rem;
        height: 100%;
        position: relative;
        border-radius: 0.5rem;
        font-size: 1.2rem;
        font-weight: 500;
        color: #1F2937;
        white-space: nowrap;
        transition: color 0.2s ease-in-out;

        &:hover {
            color: #103535;
        }
    }

    .chevron {
        flex-shrink: 0;
        margin-top: 0.1rem;
    }

    a {
        @extend .nav-font;
    }
}

.dropdown-content {
    background-color: #ffffff;
    border: 1px solid #F3F4F6;
    padding: 0.75rem;
    border-radius: $border-radius;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    min-width: 200px;
    transition: all 0.3s ease-in-out;

    .dropdown-item {
        text-decoration: none;
        padding: 0.5rem;
        border-radius: $border-radius;
        color: #374151;
        font-size: 1rem;

        &:hover {
            background-color: #F3F4F6;
            color: #111827;
        }
    }

    // sectioned variant (clinics, programs & services): same card and items as the
    // plain dropdowns above, split into columns with a gray label on each
    &.clinics {
        width: max-content;

        .clinics-body {
            display: grid;
            grid-auto-flow: column;
            grid-auto-columns: max-content;
        }

        .borough-col {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
            padding: 0 0.75rem;

            & + .borough-col {
                border-left: 1px solid #F3F4F6;
            }
        }

        .borough-items {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
        }

        // conditions are short labels in a long list, so lay them out two-across
        .borough-col.wide .borough-items {
            display: grid;
            grid-template-columns: repeat(2, max-content);
            column-gap: 1.5rem;
            row-gap: 0.25rem;
        }

        .borough-heading {
            padding: 0.5rem;
            color: #6A7282;
            font-size: 0.9rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.04em;
        }

        .clinics-footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            margin-top: 0.5rem;
            padding: 0.75rem 0.5rem 0;
            border-top: 1px solid #F3F4F6;
            font-size: 1rem;
            color: #6A7282;
        }
    }
}
</style>
