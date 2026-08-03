<script setup lang="ts">
import type { Media } from '~/types/types';



const props = defineProps({
    moment: Object as () => Media,
});
</script>

<template>
        <div class="singleMoment" :style="`background-image:url(${props.moment?.path})`"></div>
</template>


<style scoped lang='scss'>

.singleMoment{
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    // border-radius: 1rem;
    // margin-bottom: 1rem;

}
</style>