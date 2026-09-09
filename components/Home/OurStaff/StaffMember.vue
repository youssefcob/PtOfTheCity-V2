<script setup lang="ts">
import type { Staff } from '~/types/types';
import EditableImage from '~/components/Admin/EditableImage.vue';

const props = defineProps({
    staffMember: {
        type: Object as () => Staff
    }
});
</script>

<template>
    <NuxtLink class="staffMember" :to="`/staff/${props.staffMember?.slug}`">
        <EditableImage v-if="props.staffMember" class="image" :content-key="`staff.${props.staffMember.id}.image`"
            :default-src="useImg(props.staffMember.image)"
            :default-alt="`${props.staffMember.title} ${props.staffMember.first_name} ${props.staffMember.last_name}`" />
        <p class="name">{{ props.staffMember?.title }} {{ props.staffMember?.first_name }} {{ props.staffMember?.last_name }}</p>
        <p class="occupation">{{ props.staffMember?.occupation }}</p>
    </NuxtLink>
</template>

<style scoped lang="scss">
.staffMember {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex: 0 0 calc(25% - 0.75rem);
    max-width: 25rem;
    scroll-snap-align: start;
    background-color: #ffffff;
    border-radius: 1rem;
    padding: 1rem;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);

    .image {
        aspect-ratio: 9 / 8;

        :deep(img) {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
            display: block;
        }
    }

    .name {
        @include type-button;
        color: $primary-700;
    }

    .occupation {
        @include type-body;
        color: $primary-700;
    }

    // fixed (not content/percentage-driven) width so every card - and its image -
    // is the same size regardless of how long the name/occupation text is
    @media screen and (max-width: 900px) {
        flex: 0 0 30rem;
        // max-width: 9rem;
        // an explicit height here doesn't have a definite ancestor height to
        // resolve the percentage against (neither the Carousel track nor
        // .staffMembers sets one), so it undershoots the actual content
        // height at these larger mobile font sizes and the occupation line
        // spills out past the card's bottom edge. Let the card size to its
        // content instead, same as the desktop variant already does.
        padding: 2rem;
        // text-align: center;
        // gap:.5rem;

        .name {
            font-size: 1.2rem;
        }

        .occupation {
            font-size: 1.3rem;
            color:$primary-400
        }
    }
}
</style>
