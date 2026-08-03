<!-- file input field -->
<script setup lang="ts">
import { ref, type Ref} from 'vue';

const props = defineProps({
    placeHolder: String,
    error: Boolean
});
// const makeid = (length:number)=> {
//     let result = '';
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
//     const charactersLength = characters.length;
//     let counter = 0;
//     while (counter < length) {
//       result += characters.charAt(Math.floor(Math.random() * charactersLength));
//       counter += 1;
//     }
//     return result;
// }

// let id = makeid(5);
let id = 1;


const input: Ref<HTMLElement | null> = ref(null);

let fileName = ref(props.placeHolder || '');


const openFileDialog = () => {
    if (input.value) {
        input.value.click();
    }
}
const emit = defineEmits(['input']);
const HandleFileUpload = (e: Event) => {
   const  files = ((e.target as HTMLInputElement).files)
   if (files && files.length > 0) {
        const formData = new FormData();
        let file = files[0].name;
        formData.append('file', files[0]); 
        if (file) {
        fileName.value = file.split('\\').pop() as string;
    }
        emit('input',formData);

    }

}
</script>


<template>
    <input type="file" ref="input" :class="`real-file-input ${id}`" @change="HandleFileUpload">

    <div :class="`file-input ${id} big-screen`" :style="`${($props.error)?'border:1px solid red;':''}` "@click="openFileDialog">
        <div class="file-btn">
            <span>{{$translate('choose_file')}}</span>

        </div>
        <div :class="`file-placeHolder ${$dir()}`"> <label>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="11" viewBox="0 0 16 16" fill="none">
                    <path
                        d="M10.67 7.053L6.68004 11.315C6.34156 11.6932 5.85986 11.9119 5.35236 11.9178C4.84487 11.9237 4.35821 11.7162 4.01104 11.346C3.24412 10.5454 3.257 9.27885 4.04004 8.494L9.39904 2.763C9.99015 2.10491 10.8315 1.72677 11.7161 1.72163C12.6006 1.71649 13.4463 2.08482 14.045 2.736C15.3222 4.14736 15.3131 6.29949 14.024 7.7L8.34204 13.771C7.53339 14.5827 6.42651 15.0261 5.28113 14.9971C4.13575 14.9682 3.05268 14.4695 2.28604 13.618C0.533695 11.6414 0.577053 8.6549 2.38604 6.73L7.75304 1"
                        stroke="#2C3233" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                {{ fileName }}</label></div>
    </div>

    <div :class="`file-input ${id} responsive`" :style="`${($props.error)?'border:1px solid red;':''}`" @click="openFileDialog">
        <div class="file-btn">
            <span> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="11" viewBox="0 0 16 16" fill="none">
                    <path
                        d="M10.67 7.053L6.68004 11.315C6.34156 11.6932 5.85986 11.9119 5.35236 11.9178C4.84487 11.9237 4.35821 11.7162 4.01104 11.346C3.24412 10.5454 3.257 9.27885 4.04004 8.494L9.39904 2.763C9.99015 2.10491 10.8315 1.72677 11.7161 1.72163C12.6006 1.71649 13.4463 2.08482 14.045 2.736C15.3222 4.14736 15.3131 6.29949 14.024 7.7L8.34204 13.771C7.53339 14.5827 6.42651 15.0261 5.28113 14.9971C4.13575 14.9682 3.05268 14.4695 2.28604 13.618C0.533695 11.6414 0.577053 8.6549 2.38604 6.73L7.75304 1"
                        stroke="#2C3233" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg></span>

        </div>
        <!-- <div class="file-placeHolder" :style="`${$dir() === 'ltr'? 'left:1.25rem':'right:1.25rem'};`">  -->
        <div :class="`file-placeHolder ${$dir()}`" > 
            
            <label>

                {{ fileName }}</label></div>
    </div>
</template>
<style scoped lang="scss">
.real-file-input {
    display: none;
}

.file-input {
    &.big-screen {
        @media screen and (max-width: 800px) {
            display: none;
        }
        height: 5rem;

        border: 1px solid $blue;
        border-radius: $border-radius;
        background: $white;
        outline: none;
        display: flex;
        overflow: hidden;
        align-items: center;
        cursor: pointer;



        .file-btn {
            height: 100%;
            width: 30%;
            background-color: $blue;
            display: flex;
            align-items: center;
            justify-content: center;
            
            pointer-events: none;
            text-align: center;
            color:$black;
            border-radius: $border-radius;
            span{
                @extend .btnfont;
                font-weight:500;
            }

        }

        .file-placeHolder {
            font-family: $montserrat;
            // font-size: 1.125rem;
            font-style: normal;
            // font-weight: 400;
            pointer-events: none;
            margin-left:1rem;
            &.rtl{
                margin-left:auto;
                margin-right:1rem;
            }
        }


    }

    &.responsive {
        @media screen and (min-width: 801px) {
            display: none;
        }

        border: 1px solid $blue;
        border-radius: 1.125rem;
        background: $white;
        outline: none;
        display: flex;
        overflow: hidden;
        align-items: center;
        cursor: pointer;
        height:6rem;
        position: relative;

        >.file-btn {
            height: 100%;
            width: 19%;
            background-color: $blue;
            display: flex;
            align-items: center;
            justify-content: center;
            @extend .btnfont;
            pointer-events: none;
            border-radius: 0 1.125rem 1.125rem 0;
        }

        >.file-placeHolder{

            margin-left:10px;
            font-family: $montserrat;
            @extend .text-s;
            pointer-events: none;

            &.rtl{
                margin-right:10px;
                margin-left:auto;
            }
        }
    }


}
</style>