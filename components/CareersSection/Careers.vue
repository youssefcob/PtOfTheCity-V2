<script setup lang="ts">
// import { images } from "@/state/Images"
import { computed } from "vue";


// const careerImage = computed(() => {
//     const image = images.value.find(image => image.title === 'career');
//     return image ? image.path : "images/careers.png";
// });

</script>


<template>
    <div class="careers-container">
        <h1 class="sectionHeader">{{$translate('careers')}}</h1>
        <div class="careers-wrapper">
            <div class="careers-background" :style="`background-image: url(${useImg('careers')})`">
                <div class="careers-content">
                    <div class="text">
                        <h2>{{ $translate('join_us') }} <span>{{$translate('now')}}</span></h2>
                        <p>{{$translate('we_are_always_hiring')}}</p>
                    </div>
                    <router-link to="careers" class="btn">{{$translate('apply_now')}}</router-link>
                </div>
            </div>
        </div>
        <router-link to="careers" class="btn mobile responsive main">{{$translate('apply_now')}}</router-link>

    </div>
</template>

<style scoped lang="scss">
.careers-container {

@include pagePadding;

    >.btn.mobile {
        display: none;
        @media screen and (max-width: 500px) {
            display: block;
        }
    }

   

 

    >.careers-wrapper {
        width: 100%;
        height: clamp(22rem, 40vw, 37rem);

        >.careers-background {
            // position: relative;
            width: 100%;
            height: 100%;
            @include image;
            overflow: hidden;
            @include flex(inherit,flex-end);


            >.careers-content {
               @include backDrop;
               @include flexDirection(column,center);
               padding:1.25rem;
               width:clamp(17rem,30%,35rem);
               gap:1.25rem;
               text-align: center;


                >.text {
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    >h2 {
                        color: white;

                        >span {
                            color: $blue
                        }
                    }

                    >p {
                        color: white;
                    }
                }

                >.btn {
                    display: flex;
                    width: 75%;
                    height: 4.0625rem;
                    // padding: 1.25rem 9.375rem;
                    justify-content: center;
                    align-items: center;
                    gap: 0.625rem;
                    flex-shrink: 0;

                    @media screen and (max-width: 500px) {
                        display: none;

                    }

                }


            }
        }

    }
}
</style>