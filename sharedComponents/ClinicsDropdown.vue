<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, type Ref } from 'vue';
import DropDownModal from '~/sharedComponents/DropDownModal.vue';
import type { Clinic } from '~/types/types';

const props = defineProps<{
    list?: Clinic[];
    placeHolder?: string;
    required?: boolean;
    disabled?: boolean;
    disabledText?: string;
    error?: boolean;
    default?: string;
    background?: string;
    NoLabel?: boolean;
    label?: string;
}>();

defineOptions({ inheritAttrs: false });

const emit = defineEmits(['update:modelValue', 'input']);
const toast = useToast();

const selected = ref<Clinic | null>(null);
const isMobile = ref(false);
const show = ref(false);
const dropdownRef: Ref<HTMLElement | null> = ref(null);
const asterisk: Ref<HTMLElement | null> = ref(null);
const modal = ref<InstanceType<typeof DropDownModal> | null>(null);

const checkMobile = () => {
    isMobile.value = window.innerWidth <= 500;
};

const groupedClinics = computed(() => {
    if (!props.list) return {};
    return props.list.reduce((groups, clinic) => {
        const city = clinic.city || 'Other';
        if (!groups[city]) groups[city] = [];
        groups[city].push(clinic);
        return groups;
    }, {} as Record<string, Clinic[]>);
});

const displayValue = computed(() =>
    selected.value ? `${selected.value.city} Clinics: ${selected.value.name}` : ''
);

const update = (clinic: Clinic) => {
    selected.value = clinic;
    emit('update:modelValue', clinic.name);
    emit('input', clinic.id);
    show.value = false;
    modal.value?.closeModal();
    asterisk.value?.classList.add('active');
};

const clear = () => {
    selected.value = null;
    asterisk.value?.classList.remove('active');
    emit('update:modelValue', '');
    emit('input', '');
};

const defaultValue = (value: string) => {
    const clinic = props.list?.find(c => String(c.id) === String(value));
    if (clinic) {
        selected.value = clinic;
        asterisk.value?.classList.add('active');
        emit('update:modelValue', clinic.id);
        emit('input', clinic.id);
    }
};

const showDropDown = () => {
    if (props.disabled) {
        if (props.disabledText) toast.error({ message: props.disabledText });
        return;
    }
    show.value = true;
};

const openModal = () => {
    if (props.disabled) {
        if (props.disabledText) toast.error({ message: props.disabledText });
        return;
    }
    modal.value?.openModal();
};

let handleClickOutside: (e: Event) => void;

onMounted(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile);

    handleClickOutside = (e: Event) => {
        if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
            show.value = false;
        }
    };
    document.addEventListener('click', handleClickOutside);

    if (props.default) defaultValue(props.default);

    if (displayValue.value) {
        asterisk.value?.classList.add('active');
    }
});

onUnmounted(() => {
    window.removeEventListener('resize', checkMobile);
    document.removeEventListener('click', handleClickOutside);
});

defineExpose({ clear, defaultValue });
</script>

<template>
    <!-- ── MOBILE ── -->
    <template v-if="isMobile">
        <DropDownModal ref="modal">
            <div class="dropdown-wrapper">
                <template v-for="(clinics, city) in groupedClinics" :key="city">
                    <div class="city-header">{{ city }}</div>
                    <div
                        class="element"
                        v-for="clinic in clinics"
                        :key="clinic.id"
                        :class="{ active: selected?.id === clinic.id }"
                        @click="update(clinic)"
                    >
                        <p class="element-p">{{ clinic.name }}</p>
                    </div>
                </template>
            </div>
        </DropDownModal>

        <div class="field-wrap">
            <label v-if="label" class="field-label">
                {{ label }}<span v-if="props.required" class="field-label-required">&nbsp;*</span>
            </label>
            <div v-bind="$attrs" :class="`booking-input-field ${label ? 'has-static-label' : ''} ${props.disabled ? 'disabled' : ''}`" @click="openModal">
                <span>{{ displayValue || placeHolder || 'Select' }}</span>
                <span v-if="props.required && !selected && !label" class="required-asterisk">*</span>
                <span class="arrow-down">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 7" fill="none">
                        <path d="M1 1L6 6L11 1" stroke="black" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </span>
            </div>
        </div>
    </template>

    <!-- ── DESKTOP ── -->
    <template v-else>
        <div class="field-wrap">
            <label v-if="label" class="field-label">
                {{ label }}<span v-if="props.required" class="field-label-required">&nbsp;*</span>
            </label>
            <div ref="dropdownRef" class="drpdown-btn" v-bind="$attrs" @click="showDropDown">
                <div class="required">
                    <input
                        readonly
                        :value="displayValue"
                        :disabled="props.disabled"
                        :class="`input-field ${label ? 'has-static-label' : ''}`"
                        :placeholder="label ? placeHolder : undefined"
                        :style="`width:100%;${props.error ? 'border-color:red' : ''};${props.background ? `background-color:${props.background}` : 'white'}`"
                        type="text"
                    />
                    <label v-if="!label" ref="asterisk" :class="`asterisk ${props.NoLabel ? 'invis' : ''}`">
                        {{ props.placeHolder }}<span v-if="props.required" style="color:red">&nbsp;*</span>
                    </label>
                    <label :class="`arrowdown ${label ? 'static-label' : ''}`">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 7" fill="none">
                            <path d="M1 1L6 6L11 1" stroke="black" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </label>
                </div>

                <div class="dropdown-container" v-if="show && !props.disabled">
                    <div class="dropdown-list">
                        <template v-for="(clinics, city) in groupedClinics" :key="city">
                            <div class="city-header-desktop">{{ city }}</div>
                            <div
                                class="dropdown-item"
                                v-for="clinic in clinics"
                                :key="clinic.id"
                                :class="{ active: selected?.id === clinic.id }"
                                @mousedown.prevent="update(clinic)"
                            >
                                {{ clinic.name }}
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </template>
</template>

<style scoped lang="scss">
.field-wrap {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
}

/* ── Mobile trigger ── */
.booking-input-field {
    position: relative;
    display: flex;
    align-items: center;

    &.has-static-label {
        height: 4.375rem;
        padding: 0 1rem;
        border-radius: 0;
        border: 1.5px solid rgba(3, 41, 46, 0.13);
        background: #ffffff;
    }

    .required-asterisk {
        color: red;
        margin-left: 4px;
        font-size: 1.2rem;
        align-self: flex-start;
        margin-top: 2px;
    }

    .arrow-down {
        position: absolute;
        right: 3%;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
    }
}

/* ── Mobile modal list ── */
.city-header {
    padding: 8px 12px 4px;
    font-weight: 700;
    font-size: 3rem;
    text-transform: uppercase;
    color: $cta;
    pointer-events: none;
    cursor: default;
    
}

.element {
    padding-left: 20px;
    cursor: pointer;

    &.active .element-p {
        color: $blue;
        font-weight: 600;
    }
}

/* ── Desktop (mirrors DropDownInputField exactly) ── */
.drpdown-btn {
    position: relative;

    >.required {
        >.input-field {
            transition: all 0.3s ease-in-out;
            height: 5rem;
            cursor: pointer;

            @media screen and (max-width: 800px) {
                height: 6rem;
                padding: 18px;
            }

            &[disabled] {
                background-color: $grey;
                opacity: 0.3;
                cursor: not-allowed;
            }

            &.has-static-label {
                height: 4.5rem;
                padding: 0 1.25rem;

                &::placeholder {
                    color: rgba(3, 41, 46, 0.45);
                }

                @media screen and (max-width: 800px) {
                    height: 4.375rem;
                    padding: 0 1rem;
                }
            }
        }
    }

    @media screen and (min-width: 500px) {
        .dropdown-container {
            position: absolute;
            border-radius: 1.125rem;
            border: 1px solid $blue;
            width: 100%;
            background-color: $white;
            z-index: 10;
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            max-height: 20.5rem;
            overflow-y: scroll;

            &::-webkit-scrollbar { width: 10px; background-color: white; }
            &::-webkit-scrollbar-track { border-radius: 1.125rem; }
            &::-webkit-scrollbar-thumb { background: $navy; border-radius: 1.125rem; }

            .dropdown-list {
                width: 98%;

                .city-header-desktop {
                    padding: 8px 1rem 4px;
                    font-weight: 700;
                    font-size: 1.2rem;
                    text-transform: uppercase;
                    color: $cta;
                    pointer-events: none;
                    cursor: default;
                }

                .dropdown-item {
                    cursor: pointer;
                    padding: 1rem 1rem 1rem 1.5rem;
                    border-radius: 1.25rem;

                    &:hover, &.active {
                        background-color: lighten($blue, 30%);
                    }
                }
            }
        }
    }
}

.required {
    position: relative;

    .asterisk {
        position: absolute;
        left: 1.25rem;
        top: 35%;
        color: rgba(0, 0, 0, 0.793);
        font-family: $montserrat;
        font-size: 1.3rem;
        pointer-events: none;
        transition: all 0.3s ease-in-out;
        display: flex;

        span {
            position: absolute;
            top: -40%;
            right: -1rem;
        }

        &.active {
            top: -1.5rem;
            left: .7rem;
            font-size: 0.9rem;

            &.invis { display: none; }
        }

        @media screen and (max-width: 800px) {
            left: 18px;
            font-size: 13px;
        }
    }

    .arrowdown {
        position: absolute;
        display: flex;
        right: 3%;
        top: 34%;

        &.static-label {
            top: 50%;
            right: 1.25rem;
            transform: translateY(-50%);

            @media screen and (max-width: 800px) {
                right: 1rem;
            }
        }
    }
}
</style>