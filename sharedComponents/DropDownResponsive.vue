<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import DropDownModal from '~/sharedComponents/DropDownModal.vue';
import DropDownInputField from '~/sharedComponents/DropDownInputField.vue';

const props = defineProps<{
    list?: string[];
    placeHolder?: string;
    required?: boolean;
    disabled?: boolean;
    disabledText?: string;
    error?: boolean;
    default?: string;
    background?: string;
    NoLabel?: boolean;
    class?: string;
    cta?: boolean;
    label?: string;
}>();

defineOptions({
    inheritAttrs: false
});


const emit = defineEmits(['update:modelValue', 'input']);
const toast = useToast();

const selected = ref<string | null>(null);
const isMobile = ref(false);
const desktopDropdown = ref<InstanceType<typeof DropDownInputField> | null>(null);
const modal = ref<InstanceType<typeof DropDownModal> | null>(null);

const checkMobile = () => {
    isMobile.value = window.innerWidth <= 500;
};

const update = (value: string) => {
    selected.value = value;
    emit('update:modelValue', value);
    emit('input', value);
    modal.value?.closeModal();
};

const clear = () => {
    selected.value = null;
    desktopDropdown.value?.clear();
    emit('update:modelValue', '');
    emit('input', '');
};

const defaultValue = (value: string) => {
    selected.value = value;
    desktopDropdown.value?.defaultValue(value);
    emit('update:modelValue', value);
    emit('input', value);
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
                <div class="element" v-for="(item, index) in list" :key="index" :class="{ active: selected === item }"
                    @click="update(item)">
                    <p class="element-p">{{ item }}</p>
                </div>
            </div>
        </DropDownModal>

        <div class="field-wrap">
            <label v-if="label" class="field-label">
                {{ label }}<span v-if="props.required" class="field-label-required">&nbsp;*</span>
            </label>
            <div v-bind="$attrs" :class="`booking-input-field ${cta?'ctac':''} ${label ? 'has-static-label' : ''} ${props.disabled ? 'disabled' : ''}`" @click="openModal">
                <span>{{ selected || placeHolder || 'Select' }}</span>
                <span v-if="props.required && !selected && !label" class="required-asterisk">*</span>
                <span class="arrow-down">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 7" fill="none">
                        <path d="M1 1L6 6L11 1" stroke="black" stroke-width="0.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </span>
            </div>
        </div>
    </template>

    <!-- Desktop -->
    <template v-else>
        <DropDownInputField v-bind="$attrs" ref="desktopDropdown" :list="list" :placeHolder="placeHolder"
            :required="required" :disabled="disabled" :error="error" :default="default" :background="background"
            :NoLabel="NoLabel" :cta="cta" :label="label" @update:modelValue="update" @input="$emit('input', $event)" />
    </template>
</template>
<style scoped lang='scss'>
.field-wrap {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
}

.booking-input-field {
    position: relative;
    display: flex;
    align-items: center;
    &.disabled {
        opacity: 0.3;
        cursor:not-allowed;
    }
     &.ctac {
            border: 1px solid $cta;
        }

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

        &.rtl {
            left: 3%;
            right: unset;
        }
    }
}
</style>