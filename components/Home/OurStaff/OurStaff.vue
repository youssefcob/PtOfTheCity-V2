<script setup lang="ts">
import { onMounted, ref } from 'vue';
import StaffMember from '~/components/Home/OurStaff/StaffMember.vue';
import Carousel from '~/sharedComponents/Carousel.vue';
import type { Staff } from '~/types/types';



const homepageData = inject('homepageData') as Ref<{
  staff: Staff[];
} | null>;

const homepagePending = inject('homepagePending');
const homepageError = inject('homepageError');

const staff = computed(()=> homepageData.value?.staff as Staff[]);
</script>

<template>
    <div class="container">
        <div class="sectionHeader-m">
            <h1>{{$translate('meet_our_staff')}}</h1>
            <p>{{$translate('meet_our_staff_phrase')}}</p>
        </div>
        <Carousel class="staffMembers">
                <StaffMember v-for="staffMember in staff" :staffMember="staffMember" />
        </Carousel>
      <!-- <div class="btn-wrapper">
        <div class="btn-transparent main btnfont">Learn More</div>
        </div> -->
    </div>
</template>

<style scoped lang="scss">
.container {
    // @include pagePadding;
    display: flex;
    flex-direction: column;
    >.sectionHeader-m {
        width:100%;
    }

    @media screen and (max-width: 800px) {
        >.title-wrapper {
            >p {
                display: none;
            }
        }
    }

    .title-wrapper {
        @include pagePadding;
    }

    .staffMembers{
        height:30rem;

        @media screen and (max-width:500px) {
            margin-left:$resMargin;
        }
    }

    .btn-wrapper{
        @include pagePadding;
        display: flex;
        justify-content: flex-end;
    }
}
</style> 