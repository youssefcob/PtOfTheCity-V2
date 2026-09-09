<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import type { Clinic, HttpClinics } from '~/types/types';

const props = defineProps({
    navOnLanding: {
        type: Boolean,
        required: true
    },
    services: {
        type: Object as () => string[]
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
const clinicsCount = computed(() =>
    clinicsData.value ? Object.values(clinicsData.value).reduce((sum, arr) => sum + arr.length, 0) : 0
);

const BOROUGH_ORDER = ['Manhattan', 'Brooklyn', 'The Bronx', 'Queens'];
const BOROUGH_COLORS = ['#1A56A0', '#2E7D32', '#6A1B9A', '#C62828', '#E65100'];

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

type DropdownKey = 'clinics' | 'services' | 'about' | 'patientInfo';

const aboutLinks = [
    { label: 'About Us', to: '/about' },
    { label: 'Careers', to: '/careers' },
    { label: 'Trusted By', to: '/#TrustedBy' },
];

const patientInfoLinks = [
    { label: 'Insurance', to: '/insurances' },
    { label: 'FAQs', to: '/FAQs' },
    { label: 'Teletherapy', to: '/teletherapy' },
    { label: 'Blog', to: '/blogs' },
];

// Dropdown states
const dropdownOpen = reactive<Record<DropdownKey, boolean>>({
    clinics: false,
    services: false,
    about: false,
    patientInfo: false,
});
const dropdownStyle = reactive<Record<DropdownKey, Record<string, string>>>({
    clinics: {},
    services: {},
    about: {},
    patientInfo: {},
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
            <div v-if="dropdownOpen.services" class="dropdown-content" :style="dropdownStyle.services" role="menu"
                aria-label="Available services"
                @mouseenter="() => cancelClose('services')" @mouseleave="() => closeDropdown('services')">
                <NuxtLink class="dropdown-item" v-for="(service, index) in services" :key="index"
                    :to="`/service/${createSlug(service)}`" role="menuitem">
                    {{ service }}
                </NuxtLink>
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

                <div class="clinics-header">
                    <div class="clinics-header__left">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_6084_16577)"><path d="M13.3332 6.66671C13.3332 9.99537 9.6405 13.462 8.4005 14.5327C8.28499 14.6196 8.14437 14.6665 7.99984 14.6665C7.85531 14.6665 7.71469 14.6196 7.59917 14.5327C6.35917 13.462 2.6665 9.99537 2.6665 6.66671C2.6665 5.25222 3.22841 3.89567 4.2286 2.89547C5.2288 1.89528 6.58535 1.33337 7.99984 1.33337C9.41433 1.33337 10.7709 1.89528 11.7711 2.89547C12.7713 3.89567 13.3332 5.25222 13.3332 6.66671Z" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 8.66663C9.10457 8.66663 10 7.7712 10 6.66663C10 5.56206 9.10457 4.66663 8 4.66663C6.89543 4.66663 6 5.56206 6 6.66663C6 7.7712 6.89543 8.66663 8 8.66663Z" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_6084_16577"><rect width="16" height="16" fill="white"/></clipPath></defs></svg>
                        Our Clinic Locations
                    </div>
                    <span class="clinics-header__count">{{ clinicsCount }} locations across NYC</span>
                </div>
                <div class="clinics-body">
                    <div class="borough-col" v-for="(location, index) in rearrangedClinicsNames" :key="index">
                        <div class="borough-heading" :style="{ color: BOROUGH_COLORS[index], borderColor: BOROUGH_COLORS[index] }">
                            <span class="borough-dot" :style="{ background: BOROUGH_COLORS[index] }" />
                            <strong role="presentation">{{ location }}</strong>
                        </div>
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
            <NuxtLink class="list-item dropbtn" to="/insurances" role="menuitem" aria-haspopup="true"
                :aria-expanded="dropdownOpen.patientInfo" aria-label="Patient Info - insurance, FAQs, teletherapy"
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

        <!-- Providers -->
        <li role="none">
            <NuxtLink class="list-item" active-class="navbar-link" to="/#OurStaff" role="menuitem"
                aria-label="Meet our providers">
                {{ $translate('providers') }}
            </NuxtLink>
        </li>

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

    &.clinics {
        border: 1px solid #F3F4F6;
        padding: 0;
        overflow: hidden;
        width: max-content;
        height: auto;

        .clinics-header {
            background: linear-gradient(to right, #00000080, #00000080), linear-gradient(to right, #0284C7, #2EE5C1);
            padding: 1rem 1.5rem;
            color: #fff;
            font-size: 1.3rem;
            font-weight: 600;
            letter-spacing: 0.01em;
            display: flex;
            align-items: center;
            justify-content: space-between;

            &__left {
                display: flex;
                align-items: center;
                gap: 0.6rem;
            }

            &__count {
                font-size: 1.1rem;
                font-weight: 400;
                color: #fff;
                opacity: 0.85;
            }
        }

        .clinics-body {
            display: grid;
            grid-auto-flow: column;
            grid-auto-columns: max-content;
        }

        .borough-col {
            border-right: 0.8px solid #F3F4F6;
            display: flex;
            flex-direction: column;
            gap: 0.15rem;
            >.dropdown-item{
                padding: 0.4rem 1.5rem;
            }
        }

        .borough-heading {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding:.5rem 2rem ;
            border-bottom: 2px solid;
            margin-bottom: 1rem;

            strong {
                font-weight: 700;
                font-size: 1.2rem;
            }
        }

        .borough-dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            flex-shrink: 0;
        }

        .dropdown-item {
            color: #374151;
            font-size: 1.2rem;

            &:hover {
                background-color: #F3F4F6;
                color: #111827;
            }
        }

        .clinics-footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.85rem 1.5rem;
            border-top: 1px solid #F3F4F6;
            background: #F9FAFB;
            font-size: 1.1rem;
            color: #6A7282;

            .dropdown-item {
                color: #155DFC;
                font-size: 1.1rem;
                padding: 0;
                background: none;
                font-weight: 500;

                &:hover {
                    background: none;
                    color: #1245c7;
                    text-decoration: underline;
                }
            }
        }
    }
}
</style>
