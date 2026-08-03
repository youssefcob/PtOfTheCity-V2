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
        type: Object as () => HttpClinics[]
    }
});

const clinicsData = computed(() => props.clinics);
const clinicsLocations = computed(() =>
    clinicsData.value ? Object.keys(clinicsData.value) : []
);

const rearrangedClinicsNames = computed(() => {
    if (!clinicsLocations.value || !Array.isArray(clinicsLocations.value)) {
        return [];
    }
    return clinicsLocations.value.filter((clinic) => clinic !== 'Brooklyn').concat('Brooklyn');
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
    <ul :class="props.navOnLanding ? 'main' : 'secondary'" role="menubar" aria-label="Main navigation menu">

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
                :class="props.navOnLanding ? 'main' : 'secondary'" :style="clinicsDropdownStyle" role="menu"
                aria-label="Clinic locations" @mouseenter="() => cancelClose('clinics')"
                @mouseleave="() => closeDropdown('clinics')">
                <template class="clinic" v-for="(location, index) in rearrangedClinicsNames" :key="index">
                    <strong role="presentation">{{ location }}</strong>
                    <NuxtLink v-if="clinicsData" class="dropdown-item"
                        v-for="c in clinicsData[location as keyof typeof clinicsData]" :key="(c as Clinic).id"
                        :to="`/clinic/${$createSlug(c)}`" role="menuitem">
                        {{ c }}
                    </NuxtLink>
                </template>
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
            <NuxtLink class="list-item" active-class="navbar-link" to="/#Insurance" role="menuitem"
                aria-label="View accepted insurance plans">
                Insurance choices
            </NuxtLink>
        </li>

        <li role="none">
            <NuxtLink class="list-item" active-class="navbar-link" to="/#Blog" role="menuitem"
                aria-label="Learn about medical conditions we treat">
                {{ $translate('Conditions') }}
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
        <li role="none">
            <NuxtLink class="list-item" active-class="navbar-link" to="/#FAQs" role="menuitem"
                aria-label="Frequently asked questions">
                {{ $translate('faqs') }}
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
        background: rgba(48, 241, 241, 0.10);

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
        width: 40vw;
        height: 58vh;
        flex-wrap: wrap;

        .clinic {
            display: flex;
            flex-direction: column;
        }

        strong {
            font-weight: bold;
        }
    }

    &.main {
        background-color: rgba(16, 53, 53, 0.5);

        .dropdown-item,strong {
            color: white;
        }
   

    }

    &.secondary {
        background-color: rgba(43, 192, 212, 0.3);

        .dropdown-item,strong {
            color: black;
        }
    }

}
</style>