<script setup lang="ts">
import { ref, type Ref } from 'vue';
const targetDivRef: Ref<HTMLElement | null> = ref(null);

const emit = defineEmits(['dropdown']);

const toggleDropDown = () => {
  emit('dropdown');
}
// const handleScrollToTarget = (id: any) => {
//   targetDivRef.value = document.getElementById(id);
//   if (targetDivRef.value) {
//     toggleDropDown();

//     targetDivRef.value.scrollIntoView({ behavior: 'smooth' });

//   } else {
//     console.warn(`Div with ID "${id}" not found.`);
//   }
// };

</script>

<template>
  <div class="dropdown" aria-label="Mobile navigation links">
    <ul role="list">
      <li>
        <NuxtLink class="list-item dropbtn" active-class="navbar-link" @click="toggleDropDown" to="/#Clinics"
          aria-label="View clinic locations">
          {{ $translate('Clinics') }}
        </NuxtLink>
      </li>
      <li>
        <NuxtLink class="list-item dropbtn" active-class="navbar-link" @click="toggleDropDown" to="/#Services"
          aria-label="View available therapy services">
          {{ $translate('services') }}
        </NuxtLink>
      </li>
      <li>
        <NuxtLink class="list-item" active-class="navbar-link" @click="toggleDropDown" to="/#Insurance"
          aria-label="View accepted insurance plans">
          Insurance choices
        </NuxtLink>
      </li>
      <li>
        <NuxtLink class="list-item" active-class="navbar-link" @click="toggleDropDown" to="/#WhoWeAre"
          aria-label="Learn about our team">
          {{ $translate('whoWeAre') }}
        </NuxtLink>
      </li>
      <li>
        <NuxtLink class="list-item" active-class="navbar-link" @click="toggleDropDown" to="/#Blog"
          aria-label="Read our blog posts">
          {{ $translate('blog') }}
        </NuxtLink>
      </li>
      <li>
        <NuxtLink class="list-item" active-class="navbar-link" @click="toggleDropDown" to="/#Careers"
          aria-label="View job opportunities">
          {{ $translate('careers') }}
        </NuxtLink>
      </li>
      <li>
        <NuxtLink class="list-item" active-class="navbar-link" @click="toggleDropDown" to="/#TrustedBy"
          aria-label="See our partners and endorsements">
          {{ $translate('trustedBy') }}
        </NuxtLink>
      </li>
      <li>
        <NuxtLink class="list-item" active-class="navbar-link" @click="toggleDropDown" to="/#FAQs"
          aria-label="Frequently asked questions">
          {{ $translate('faqs') }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
// .dropdown {
//   cursor: pointer;
// }

ul {
  list-style-type: none;

  list-style-position: inside;
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 0;
  margin: 0;
  gap: 2rem;

  li {
    margin-left: 5px;
  }

  a {
    color: $black;
    font-size: 1.7rem;

  }
}
</style>