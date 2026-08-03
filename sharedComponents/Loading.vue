<script setup lang="ts">
import Spinner from './Spinner.vue';


</script>
<template>
    <div  class="loading">
          <Spinner />
      </div>
</template>
<style scoped lang="scss">

.loading{
    height:100vh;
    width:100vw;
    right:0;
    top:0;
    z-index: 12;
    background-color: rgba(44, 50, 51,0.9);
    position: fixed;
}
</style>

