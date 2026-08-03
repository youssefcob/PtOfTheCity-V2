<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import DropDownModal from '~/sharedComponents/DropDownModal.vue';
import DropDownInputField from '~/sharedComponents/DropDownInputField.vue';
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
    class?: string;
}>();

defineOptions({
    inheritAttrs: false
});

const emit = defineEmits(['update:modelValue', 'input']);
const toast = useToast();

const selected = ref<Clinic | null>(null);
const isMobile = ref(false);
const desktopDropdown = ref<InstanceType<typeof DropDownInputField> | null>(null);
const modal = ref<InstanceType<typeof DropDownModal> | null>(null);

const checkMobile = () => {
    isMobile.value = window.innerWidth <= 500;
};

// Group clinics by city
const groupedClinics = computed(() => {
    if (!props.list) return {};
    return props.list.reduce((groups, clinic) => {
        const city = clinic.city || 'Other';
        if (!groups[city]) groups[city] = [];
        groups[city].push(clinic);
        return groups;
    }, {} as Record<string, Clinic[]>);
});

const update = (clinic: Clinic) => {
    selected.value = clinic;
    emit('update:modelValue', clinic.id);
    emit('input', clinic.id);
    modal.value?.closeModal();
};

const clear = () => {
    selected.value = null;
    desktopDropdown.value?.clear();
    emit('update:modelValue', '');
    emit('input', '');
};

const defaultValue = (value: string) => {
    const clinic = props.list?.find(c => String(c.id) === String(value));
    if (clinic) {
        selected.value = clinic;
        emit('update:modelValue', clinic.id);
        emit('input', clinic.id);
    }
};

const openModal = () => {
    if (props.disabled) {
        if (props.disabledText) toast.error({ message: props.disabledText });
        return;
    }
    modal.value?.openModal();
};

onMounted(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile);
    if (props.default) defaultValue(props.default);
});

onUnmounted(() => {
    window.removeEventListener('resize', checkMobile);
});

defineExpose({ clear, defaultValue });
</script>

<template>
    <!-- Mobile -->
    <template v-if="isMobile">
        <DropDownModal ref="modal">
            <div class="dropdown-wrapper" :class="props.class">
                <template v-for="(clinics, city) in groupedClinics" :key="city">
                    <!-- City Header (not selectable) -->
                    <div class="city-header">
                        <p class="city-name">{{ city }}</p>
                    </div>
                    <!-- Clinics under that city -->
                    <div
                        class="element"
                        v-for="clinic in clinics"
                        :key="clinic.id"
                        :class="{ active: selected?.id === clinic.id }"
                        @click="update(clinic)"
                    >
                        <p class="element-p"> {{ clinic.name }}</p>
                    </div>
                </template>
            </div>
        </DropDownModal>

        <div v-bind="$attrs" :class="`booking-input-field ${props.disabled ? 'disabled' : ''}`" @click="openModal">
            <span>{{ selected ? `${selected.city} Clinics: ${selected.name}` : (placeHolder || 'Select') }}</span>
            <span v-if="props.required && !selected" class="required-asterisk">*</span>
            <span class="arrow-down">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 7" fill="none">
                    <path d="M1 1L6 6L11 1" stroke="black" stroke-width="0.5" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </span>
        </div>
        
    </template>
        <!-- Desktop -->
    <template v-else>
        <!-- <DropDownInputFieldClinics v-bind="$attrs" ref="desktopDropdown" :list="list" :placeHolder="placeHolder"
            :required="required" :disabled="disabled" :error="error" :default="default" :background="background"
            :NoLabel="NoLabel" @update:modelValue="update" @input="$emit('input', $event)" /> -->
    </template>

</template>

<style scoped lang="scss">
.booking-input-field {
    position: relative;
    display: flex;
    align-items: center;

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

        &.rtl {
            left: 3%;
            right: unset;
        }
    }
}

.city-header {
    padding: 8px 12px 4px;
    cursor: default;
    pointer-events: none;

    .city-name {
        font-weight: 900;
        font-size: 2rem;
        // line-height: 1.2;
        letter-spacing: 0.2rem;
        text-transform: uppercase;
        color: $cta;
        margin: 0;
    }
}

.element {
    padding-left: 20px; /* indent under city */
}
</style>