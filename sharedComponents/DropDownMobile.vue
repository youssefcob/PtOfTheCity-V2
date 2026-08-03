<!-- drop down input field for mobile -->
<template>

    <DropDownModal ref="modal">
        <div class="dropdown-wrapper" :class="props.class">
            <div class="element" v-for="(t, index) in list" @click="update(t)" :class="{ active: selected === t }"
                :key="index">
                <p class="element-p">
                    {{ t }}
                </p>

            </div>
        </div>
    </DropDownModal>
    <div :class="` booking-input-field  ${props.disabled && 'disabled'}`" @click="openModal()">
        {{ selected || placeHolder || 'Select a time' }}
    </div>
</template>

<script lang="ts" setup>

import DropDownModal from '~/sharedComponents/DropDownModal.vue';
type styleClass = {
    element_p?: string

}
const toast = useToast();
const props = defineProps<{
    list: string[] | undefined,
    disabled?: boolean,
    disabledText?: string,
    class?: string,
    placeHolder?: string,
    default?: string
}>();
const openModal = () => {
    if (props.disabled) {
        if (props.disabledText) {
            toast.error({ message: props.disabledText });
        }
        return;
    }
    modal.value?.openModal();
    // document.body.style.overflow = 'hidden';
};
const modal = ref<InstanceType<typeof DropDownModal> | null>(null);
const emit = defineEmits(['update:modelValue', 'input']);
const selected = ref<string | null>(null);
function update(t: any) {
    selected.value = t;

    emit('update:modelValue', t);
    emit('input', t);
    modal.value?.closeModal();
}

const defaultValue = (value: string) => {
    update(value)
}

onMounted(() => {
    if (props.default) {
        update(props.default)

    }

})

defineExpose({
    defaultValue
})
</script>

<style lang="scss">
.dropdown-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 70vh;
    overflow-y: scroll;
    width: 90vw;
    max-width: 50rem;
    padding: 2rem;
    border-radius: 1rem;
    backdrop-filter: blur(7px);
    background: rgba(16, 53, 53, 0.50);

    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: #555;
    }


    .element {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        cursor: pointer;
        // background-color: red;
        border-radius: 10px;
        padding: 1rem;

        &.active {
            background-color: $cta;
        }

        &:hover {
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 0.5rem;
        }




        // h3,
        // p {
        //     color: white;
        // }
    }
}

.booking-input-field.disabled {
    background-color: $grey;
    opacity: 0.3;
    cursor: not-allowed;
}
</style>