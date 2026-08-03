<!-- drop down input field -->

<script setup lang="ts">

import { ref, watch, onMounted, onUnmounted, type Ref } from 'vue';

const props = defineProps({
    required: Boolean,
    list: Array as () => string[],
    placeHolder: String,
    watch: Boolean,
    disabled: Boolean,
    error: Boolean,
    default: String,
    background: String,
    NoLabel: Boolean,
    cta: Boolean
});
let filteredList = ref(props.list);

let inputField = ref(null);
const dropdownRef: Ref<HTMLElement | null> = ref(null);
const input: Ref<string> = ref('');
const show: Ref<boolean> = ref(false);

const clear = () => {
    input.value = '';
    asterisk.value?.classList.remove('active');

    emit(`update:modelValue`, input.value);
    emit(`input`, input.value);
}

const defaultValue = (value: string) => {
    input.value = value;
    if (input.value.length > 0) {
        asterisk.value?.classList.add('active');
    } else {
        asterisk.value?.classList.remove('active');
    }
    emit(`update:modelValue`, input.value);
    emit(`input`, input.value);
}

const showDropDown = () => {
    filteredList.value = props.list;
    show.value = true;
}

const hideDropDown = () => {
    setTimeout(() => {
        show.value = false;
    }, 200);
}


const emit = defineEmits([`input`, 'update:modelValue']);

const changeInput = (insurance: string) => {
    input.value = insurance;
    emit(`update:modelValue`, input.value);
    emit(`input`, input.value);
    if (input.value.length > 0) {
        asterisk.value?.classList.add('active');
    }
    show.value = false;

}

const asterisk: Ref<HTMLElement | null> = ref(null);

const filterList = () => {
    if (input.value.length > 0) {
        asterisk.value?.classList.add('active');
    } else {
        asterisk.value?.classList.remove('active');
    }
    if (props.list) {
        filteredList.value = props.list.filter(listItem => listItem.toLowerCase().startsWith(input.value.toLowerCase()));
    }

    emit(`input`, input.value);


}


let handleClickOutside: (e: Event) => void;

onMounted(() => {
    handleClickOutside = (e: Event) => {
        if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
            show.value = false;
        }
    };
    document.addEventListener('click', handleClickOutside);

    if (props.default) {
        input.value = props.default;
    }


});
onMounted(() => {

    if (input.value.length > 0) {
        asterisk.value?.classList.add('active');
    } else {
        asterisk.value?.classList.remove('active');
    }
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});

defineExpose({
    clear,
    defaultValue
});


</script>

<template>

    <div ref="dropdownRef" class="drpdown-btn" @click="showDropDown">

        <div class="required">
            <input :id="props.placeHolder" :dir="$dir()" :disabled="props.disabled" ref="inputField"
                :class="`input-field ${cta?'ctac':''}`" @input="filterList()" @focus="showDropDown"
                v-model="input"
                :style="`width:100%;$;${($props.error) ? 'border-color:red' : ''};${background ? `background-color:${background}` : 'white'}`"
                type="text">


            <label :for="props.placeHolder" ref="asterisk" :class="`asterisk ${$dir()} ${NoLabel ? 'invis' : ''}`">{{
                $props.placeHolder }}<span v-if="props.required" style="color:red">&nbsp;*</span></label>
            <label :class="`arrowdown ${$dir()}`" ref="arrowdown">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 7" fill="none">
                    <path d="M1 1L6 6L11 1" stroke="black" stroke-width="0.5" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </label>



        </div>
        <div class="dropdown-container" v-if="show && filteredList?.length && !$props.disabled">
            <div class="dropdown-list">
                <div class="dropdown-item " :dir="$dir()" v-for="insurance in filteredList" :key="insurance"
                    @mousedown="changeInput(insurance)">{{ insurance }}</div>

            </div>
        </div>

    </div>
</template>

<style scoped lang="scss">
.drpdown-btn {
    >.required {
        >.input-field {
            transition: all 0.3s ease-in-out;
            height: 5rem;

            @media screen and (max-width: 800px) {
                height: 6rem;
                padding: 18px;
            }

            &[disabled] {
                background-color: $grey;
                opacity: 0.3;
                cursor: not-allowed;


            }
            &.ctac {
                border: 1px solid $cta;
            }

        }
    }

    position: relative;

    @media screen and (min-width: 500px) {
        .dropdown-container {
            position: absolute;
            // top: calc(100%);
            border-radius: 1.125rem;
            border: 1px solid $blue;
            width: 100%;
            background-color: $white;
            z-index: 1000;
            @include flex();
            justify-content: flex-start;
            align-items: flex-start;
            max-height: 17.5rem;
            overflow-y: scroll;

            &::-webkit-scrollbar {
                width: 10px;
                background-color: white;
                // border-radius:rem;
            }

            /* Track */
            &::-webkit-scrollbar-track {
                border-radius: 1.125rem;
            }

            /* Handle */
            &::-webkit-scrollbar-thumb {
                background: $navy;
                border-radius: 1.125rem;
            }


            .dropdown-list {
                width: 98%;

                .dropdown-item {
                    cursor: pointer;
                    padding: 1rem 1rem;
                    border-radius: 1.25rem;
                    border: none;

                    &:hover {
                        background-color: lighten($blue, 30%);
                        // color: $white;
                    }

                }
            }
        }
    }

    @media screen and (max-width: 500px) {
        .dropdown-container {
            // position: absolute;
            border-radius: 1.125rem;
            border: 1px solid $blue;
            width: 100%;
            height: fit-content;
            max-height: 150px;
            overflow-y: scroll;
            background-color: $white;
            z-index: 1000;
            @include flex();
            justify-content: flex-start;
            align-items: flex-start;


            .dropdown-list {
                height: 95%;
                width: 98%;




                .dropdown-item {
                    padding: 10px;
                    font-family: $montserrat;
                    font-size: 13px;
                    margin-left: 6px;

                    &:hover {
                        background-color: $blue;
                    }

                }
            }
        }

    }


}

.required {
    position: relative;

    .arrowdown,
    .asterisk {
        position: absolute;
        display: flex;


    }


    .asterisk {
        left: 1.25rem;
        top: 35%;
        color: rgba(0, 0, 0, 0.793);
        font-family: $montserrat;
        font-size: 1.3rem;
        pointer-events: none;
        transition: all 0.3s ease-in-out;

        span {
            position: absolute;
            top: -40%;
            right: -1rem;
        }


        &.active {
            top: -1.5rem;
            left: .7rem;
            // background-color: white;
            transition: all 0.3s ease-in-out;
            font-size: 0.9rem;

            &.invis {
                display: none;
            }
        }

        @media screen and (max-width: 800px) {
            left: 18px;
        }

        @media screen and (max-width: 800px) {
            font-size: 13px;
        }
    }

    .arrowdown {
        right: 3%;
        top: 34%;

        &.rtl {
            left: 3%;
        }
    }
}
</style>