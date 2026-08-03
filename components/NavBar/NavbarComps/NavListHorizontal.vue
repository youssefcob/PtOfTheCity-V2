<script setup lang="ts">
import { computed, ref } from 'vue';
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

// Dropdown states
const clinicsDropdownOpen = ref(false);
const servicesDropdownOpen = ref(false);
const clinicsDropdownStyle = ref({ top: '0px', left: '0px' });
const servicesDropdownStyle = ref({ top: '0px', left: '0px' });

let clinicsCloseTimeout: number | null = null;
let servicesCloseTimeout: number | null = null;

// Dropdown position + control functions
function openDropdown(type: 'clinics' | 'services', event: MouseEvent) {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const style = {
        position: 'fixed',
        top: `${rect.bottom}px`,
        left: `${rect.left - 50}px`,
        zIndex: '9999'
    };

    if (type === 'clinics') {
        clinicsDropdownOpen.value = true;
        clinicsDropdownStyle.value = style;
    } else {
        servicesDropdownOpen.value = true;
        servicesDropdownStyle.value = style;
    }
}

function closeDropdown(type: 'clinics' | 'services') {
    const timeout = window.setTimeout(() => {
        if (type === 'clinics') clinicsDropdownOpen.value = false;
        else servicesDropdownOpen.value = false;
    }, 100);

    if (type === 'clinics') clinicsCloseTimeout = timeout;
    else servicesCloseTimeout = timeout;
}

function cancelClose(type: 'clinics' | 'services') {
    if (type === 'clinics' && clinicsCloseTimeout) {
        clearTimeout(clinicsCloseTimeout);
        clinicsCloseTimeout = null;
    }
    if (type === 'services' && servicesCloseTimeout) {
        clearTimeout(servicesCloseTimeout);
        servicesCloseTimeout = null;
    }
}

</script>

<template>
    <ul :class="`${props.navOnLanding ? 'main' : 'secondary'}`" role="menubar" aria-label="Main navigation menu">

        <!-- Clinics Dropdown -->
        <li class="dropdown" role="none">
            <NuxtLink class="list-item dropbtn" to="/clinics/all" role="menuitem" aria-haspopup="true"
                :aria-expanded="clinicsDropdownOpen" aria-label="Clinics - view all locations"
                @mouseenter="(e: any) => openDropdown('clinics', e)" @mouseleave="() => closeDropdown('clinics')">
                {{ $translate('Clinics') }}
            </NuxtLink>
        </li>

        <!-- Clinics Dropdown Content -->

        <teleport to="body">
            <div v-if="clinicsDropdownOpen && clinicsLocations.length > 0" class="dropdown-content clinics"
                :style="clinicsDropdownStyle" role="menu"
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

        <!-- Services Dropdown -->
        <li class="dropdown" role="none">
            <NuxtLink class="list-item dropbtn" to="/#Services" role="menuitem" aria-haspopup="true"
                :aria-expanded="servicesDropdownOpen" aria-label="Services - view all therapy services"
                @mouseenter="(e: any) => openDropdown('services', e)" @mouseleave="() => closeDropdown('services')">
                {{ $translate('services') }}
            </NuxtLink>
        </li>


        <!-- Services Dropdown Content -->
        <teleport to="body">
            <div v-if="servicesDropdownOpen" class="dropdown-content" :style="servicesDropdownStyle" role="menu"
                :class="props.navOnLanding ? 'main' : 'secondary'" aria-label="Available services"
                @mouseenter="() => cancelClose('services')" @mouseleave="() => closeDropdown('services')">
                <NuxtLink class="dropdown-item" v-for="(service, index) in services" :key="index"
                    :to="`/service/${createSlug(service)}`" role="menuitem">
                    {{ service }}
                </NuxtLink>
            </div>
        </teleport>

        <li role="none">
            <NuxtLink class="list-item" active-class="navbar-link" to="/insurances" role="menuitem"
                aria-label="View accepted insurance plans">
                Insurance choices
            </NuxtLink>
        </li>

        <li role="none">
            <NuxtLink class="list-item" active-class="navbar-link" to="/blogs" role="menuitem"
                aria-label="Read our blog posts">
                Blog
            </NuxtLink>
        </li>
        <li role="none">
            <NuxtLink class="list-item" active-class="navbar-link" to="/#Careers" role="menuitem"
                aria-label="View job opportunities">
                {{ $translate('careers') }}
            </NuxtLink>
        </li>
        <li role="none">
            <NuxtLink class="list-item" active-class="navbar-link" to="/#TrustedBy" role="menuitem"
                aria-label="See our partners and endorsements">
                {{ $translate('trustedBy') }}
            </NuxtLink>
        </li>
        <!-- <li role="none">
            <NuxtLink class="list-item" active-class="navbar-link" to="/#FAQs" role="menuitem"
                aria-label="Frequently asked questions">
                {{ $translate('faqs') }}
            </NuxtLink>
        </li> -->
        <li role="none">
            <NuxtLink class="list-item" active-class="navbar-link" to="/teletherapy" role="menuitem"
                aria-label="Frequently asked questions">
                Teletherapy
            </NuxtLink>
        </li>

    </ul>
</template>
<style scoped lang="scss">
ul {
    list-style-type: none;
    display: flex;
    gap: clamp(0px, 0.5vw, 1rem);
    align-items: center;
    padding: .5rem 2rem;
    width: 55vw;
    justify-content: space-around;

    border-radius: $border-radius;

    transition: all .5s ease-in-out;

    .dropdown {
        position: relative;
        display: inline-block;

        .dropdown-content {
            display: none;
            position: fixed;
            backdrop-filter: blur(20px);

            grid-template-columns: auto auto auto;
            grid-gap: 0.2rem 0.5rem;
            padding: 1rem;
            border-radius: $border-radius;
            text-align: left;
            left: -4rem;


            .dropdown-item {
                white-space: nowrap;
                cursor: pointer;
                padding: 0.5rem;
                border-radius: $border-radius;

            }

            &.clinics {
                display: none;
                flex-direction: column;
                flex-wrap: wrap;
                width: 40vw;
                height: 58vh;

                .clinic {
                    display: flex;
                    flex-direction: column;
                    flex-wrap: wrap;
                    max-height: fit-content;
                }

                strong {
                    display: block;
                }
            }
        }

        &:hover .dropdown-content {
            display: grid;

            &.clinics {
                display: flex;
            }
        }
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
        padding: 0.7rem 0.4125rem;
        height: 100%;
        position: relative;
        border-radius: 0.5rem;
        font-size: 1.3rem;
        font-weight: 400;
        letter-spacing: 0.01406rem;

    }

    a {
        @extend .nav-font;

    }

    &.main {
        transition: all .5s ease-in-out;
        backdrop-filter: blur(20px);
        background: rgba(46, 229, 193, 0.1);


        li {
            >.list-item {
                color: white;
                font-weight: $cta-font;

                &:hover {
                    background-color: $cta;
                    color: $black;
                }
            }
        }

        .dropdown:hover {
            >.list-item {
                background-color: $cta;
                color: black;
            }
        }




    }

    &.secondary {
        transition: all .5s ease-in-out;
        background-color: rgba(42, 192, 212, 0.20);

        li {
            >.list-item {
                color: $black;
                font-weight: 400;

                &:hover {
                    background-color: $blue;
                }
            }
        }

        .dropdown:hover {
            >.list-item {
                background-color: $blue;
                // color: black;
            }
        }



    }
}

.dropdown-content {
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    padding: 1rem;
    border-radius: $border-radius;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    min-width: 200px;
    transition: all 0.3s ease-in-out;

    .dropdown-item {
        text-decoration: none;
        padding: 0.5rem;
        border-radius: $border-radius;

        &:hover {
            background-color: $cta;
            color: $black;
        }
    }

    &.clinics {
        background: #ffffff;
        border: 1px solid #F3F4F6;
        backdrop-filter: none;
        -webkit-backdrop-filter: none;
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
            // gap: 0 2.5rem;
            // padding: 1.5rem;
        }

        .borough-col {
            // border:1px solid #E5E7EB;
            border-right: 0.8px solid #F3F4F6;
            display: flex;
            flex-direction: column;
            gap: 0.15rem;
            // padding:1rem;
            >.dropdown-item{
                padding: 0.4rem 1.5rem;
            }
        }

        .borough-heading {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding:.5rem 2rem ;
            // padding-bottom: 0.5rem;
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

    &.main {
        background-color: rgba(16, 53, 53, 0.5);

        .dropdown-item,
        strong {
            color: white;
        }

        .dropdown-item:hover {
            color: black;
        }
    }

    &.secondary {
        background-color: rgba(43, 192, 212, 0.3);

        .dropdown-item,
        strong {
            color: black;
        }

        .dropdown-item:hover {
            background-color: $navy;
            color: white;
        }
    }

}
</style>