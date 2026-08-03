<script setup lang="ts">
import { ref, onMounted, computed, } from 'vue';
import type { Ref } from 'vue';

import { type FAQs } from './FAQs';
const accordionItemsContainer = ref<any>(null);
const accordion = ref<any>(null);

const props = defineProps({
    faq: {
        type: Object as () => FAQs
    },
    active: {
        type: Boolean
    }
})

const formatAnswer = (answer: string | undefined): string => {
  if (!answer) return '';

  const sections = answer.split('\n\n');

  return sections.map(section => {
    const lines = section.split('\n').filter(line => line.trim());

    const listIndicators = /^[\s]*[-•*]\s|^\d+[\.\)]\s|^[a-zA-Z][\.\)]\s/;
    const looksLikeList = lines.length > 1 &&
      lines.filter(line => listIndicators.test(line)).length > lines.length * 0.6;

    if (looksLikeList) {
      const listItems = lines.map(line => {
        const cleanLine = line.replace(listIndicators, '');
        return `<li>${cleanLine}</li>`;
      }).join('');
      return `<ul>${listItems}</ul>`;
    } else {
      return `<p>${lines.join(' ')}</p>`;
    }
  }).join('');
};


const expandItems = () => {

    accordionItemsContainer.value.classList.toggle('expand');
    accordion.value.classList.toggle('invert');

}
const isActive = () => {
    return props.active ? 'expand' : '';

}

const isInverted = () => {
    return props.active ? 'invert' : '';
}

</script>


<template>
    <div :class="`accordion ${isInverted()} ${$dir()}`" ref="accordion" @click="expandItems">
        <span>{{ props.faq?.question }}</span>

    </div>
    <div :class="`accordionItemsContainer ${isActive()} ${$dir()}`" ref="accordionItemsContainer">

        <div class="item" v-html="formatAnswer(props.faq?.answer)"></div>

    </div>
</template>

<style scoped lang="scss">
h2 {
    color: $navy;
}

.rtl {
    direction: rtl;
}

.accordion {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 1.88rem;
    height: 6.5rem;
    flex-shrink: 0;
    border-radius: $border-radius;



    @media screen and (max-width: 500px) {
        height: 9rem;
    }

    >span {
        @extend .text;


    }


    @media screen and (max-width: 500px) {
        border-radius: 10px;
    }

    background: $white;
    transition: all .3s ease-in-out;
    box-shadow: 0px 4px 4px 0px rgba(35, 102, 129, 0.30);
    cursor: pointer;
}

// @media screen and (min-width: 500px) {
.accordionItemsContainer {
    display: grid;
    width: 100%;
    max-height: 0;
    overflow: hidden;
    transition: all .3s ease-in-out;


    .item {
        flex-shrink: 0;
        border-radius: 1.125rem;

        padding: 2rem 3rem;
        @extend .text-s;

    }
}



.accordionItemsContainer.expand {
    max-height: 200rem;
    transition: all 0.3s ease-in-out;

    @media screen and (max-width: 500px) {
        padding: 10px 10px;

        >.item {
            display: block;
        }

    }
}

.accordion.invert {
    background-color: $navy;
    transition: all .3s ease-in-out;
    box-shadow: none;

    span {
        color: $white;
        transition: all .3s ease-in-out;

    }
}
</style>