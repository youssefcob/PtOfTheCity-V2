<template>
<div class="f-c" :style="`--text-color: ${props.text || 'white'}; position: ${props.position || 'fixed'}` ">
    <p class="large">Request Received—Thank You!</p>
    <p class="mid">Your health is our priority. We are proud to serve our NY community across all 30+ locations, and we're excited to help you start your healing journey.</p>

    <p class="section-title">What Happens Next?</p>
    <p class="small">A dedicated member of our Patient Care Team will reach out to you very shortly to confirm your appointment details and answer any initial questions you might have. We want to ensure your visit is perfectly tailored to your needs.</p>

    <p class="section-title">Need Immediate Assistance?</p>
    <p class="small">We're here for you. If you have an urgent request or a quick question, please feel free to call us directly at <strong><a href="tel:+17186480888">(718) 648-0888</a></strong>.</p>

    <NuxtLink href="/" class="btn cta">Back to Homepage</NuxtLink>
</div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  text?: string,
  position?: string
}>()
</script>

<style scoped lang="scss">
p{
  color: var(--text-color, white);
  line-height: 120%;;
    text-align: center;

  &.large{
    font-size:5rem;
    font-weight: 600;
  }
  &.mid{
    font-size:2rem;
    font-weight:300;
  }
  &.small{
    font-size:2rem;
    font-weight:200;
  }
  &.v-small{
    font-size:1.5rem;
    font-weight:200;
    strong{
      font-size: 1.5rem;
      font-weight:500;
    }

  }
}
.btn{
  padding:2rem 10rem;
}
.f-c{
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap:2rem;
  position:fixed;
  // background-color: red;
  top:0;
  left:0;
  width:100vw;
  padding:5rem;
  height:100vh;
  // background-color: ;
  transform: translate(0,0);
    @media screen and (max-width: 1100px) {
      
      transform: translate(-0%,0%);



  }
}
</style>