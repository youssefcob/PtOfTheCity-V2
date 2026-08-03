<script setup lang="ts">
// import { useRouter } from 'vue-router';
import type { Staff } from '~/types/types';

const props = defineProps({
    staffMember: {
        type: Object as () => Staff
    }
});

// const router = useRouter()

// const reRoute = () => {
//     router.push({ name: 'staff', params: { id: props.staffMember?.id } });
// }

</script>

<template>
    <NuxtLink class="staffMember" :to="`/staff/${props.staffMember?.full_name}`">
        <div class="image" :style="{ backgroundImage: `url(${useImg(props.staffMember?.image)})` }">
            <div class="staffMemberDescription">
                <h3>{{ $props.staffMember?.title }} {{ props.staffMember?.first_name }} {{ props.staffMember?.last_name
                    }}</h3>
                <div class="desc">
                    <h3>{{ props.staffMember?.occupation }}</h3>
                </div>
            </div>
        </div>

        <h4 class="responsive-name">{{ $props.staffMember?.title }} {{ props.staffMember?.first_name }} {{
            props.staffMember?.last_name }}</h4>
    </NuxtLink>
</template>

<style scoped lang="scss">
.staffMember {
    cursor: pointer;
    flex: 0 0 calc(33% - 0.33rem);
    scroll-snap-align: start;
    overflow: hidden;

    .responsive-name {
        display: none;

        @media screen and (max-width:500px) {
            display: block;
            text-align: center;
            margin-top: 1rem;
            font-family: $montserrat;
            font-weight: 400;
            font-size: 1.5rem;
        }
    }

    .image {
        height: 100%;
        background-position: center;
        background-size: 100%;
        background-repeat: no-repeat;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        transition: all 0.5s ease-in-out;

        @media screen and (max-width:500px) {
            height: 82%;
        }
    }

    &:hover {
        .staffMemberDescription .desc {
            height: auto;
            max-height: 10rem;
            transition: all 0.8s ease-in-out;
        }

        .image {
            transition: all 0.5s ease-in-out;
            background-size:120%;
        }
    }

    .staffMemberDescription {
        padding: 5%;
        text-align: center;
        @include backDrop;

        @media screen and (max-width:500px) {
            display: none;
        }

        p,
        h3 {
            color: white;
        }

        .desc {
            max-height: 0;
            overflow: hidden;
            transition: all 0.8s ease-in-out;
        }
    }
}
</style> 