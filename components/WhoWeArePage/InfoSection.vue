<script setup lang="ts">
import { ref, computed } from 'vue';
import ValuesGrid from '~/components/WhoWeArePage/ValuesGrid.vue';
import { getContent } from '@/mixins/Content';

const content = ref({
    clinics: 25,
    successful_cases: 6660,
    employees: 68,
    our_story:'Our story of success started with Dr. Mahmoud`s simple dream of being the best physical therapy clinic in town. It grew over the years into a dream that came true with the establishment of the PT of the city in 2020. We reached 30+ locations in a few years, all over New York, with the dedication of our partners and team and the trust of our patients. And to more success, we go.',
    our_technique:'We offer you a treatment plan specialized for each case to achieve the most effective results. You will be given detailed information about the nature of the case and injury, the treatment plan, tools, and devices you will use, as well as the expected outcome from the treatment. Our main concern is your comfort and wellness. You will be treated with the most recent evidence guidelines and the most advanced tools, techniques, and devices that will help you reach the treatment goal in the most convenient way and in the shortest duration of time.',
    vision: 'Our vision is to be the best physical therapy clinic in the world, providing the best services and the most effective treatment plans to our patients. We aim to reach the highest level of patient satisfaction and to be the first choice for patients in need of physical therapy services. We are committed to providing the best care and the most advanced treatment plans to our patients, and to be the best place for our employees to work and grow.',
    mission:'Our mission is to provide the best physical therapy services to our patients, to help them recover from their injuries and to improve their quality of life. We are committed to providing the most effective treatment plans and the most advanced tools and techniques to our patients, to help them reach their treatment goals in the most convenient way and in the shortest duration of time. We are dedicated to providing the best care and the most advanced treatment plans to our patients, and to be the best place for our employees to work and grow.'
});

// Pre-fetch content data during SSR
const { data: contentData, pending, error } = await useAsyncData('whoWeAreInfo', async () => {
    try {
        const result = await getContent("Who We Are");
        if (typeof result === 'object' && !Array.isArray(result)) {
            return result;
        }
        return content.value; // fallback to default content
    } catch (error) {
        console.error('Failed to fetch Who We Are content:', error);
        return content.value; // fallback to default content
    }
});

// Use the fetched data or fallback to default content
const finalContent = computed(() => contentData.value || content.value);

const formatText = (text: string | undefined): string => {
    if (!text) return '';
    return text.replace(/\n/g, '<br>');
}

// Remove onMounted and getWhoWeAre call since we want server-side rendering
// The content will be fetched during SSR instead
</script>

<template>
    <div class="whoWeAre-wrapper">
        <div class="first-wrapper">
            <h1 class="sectionHeader">Who we are</h1>
            <div class="info">
                <div class="">
                    <h3 class="header-t">Our story</h3>
                    <div class="infowrapper">
                        <ClientOnly>
                            <p class="text-s" v-html="formatText(finalContent.our_story)">
                            </p>
                        </ClientOnly>
                    </div>
                </div>
                <div>
                    <h3 class="header-t">Our Technique</h3>
                    <div class="infowrapper">
                        <p class="text-s">
                            {{finalContent.our_technique}}
                        </p>
                    </div>
                </div>
                <h3 class="header-t">Vision</h3>
            </div>
        </div>
        <div class="image-values-wrapper">
            <div class="values-info-wrapper">
                <div class="second-wrapper">
                    <div class="infowrapper">
                        <p class="text-s">
                            {{finalContent.vision}}
                        </p>
                    </div>
                    <div>
                        <h3 class="header-t">Mission</h3>
                        <div class="infowrapper">
                            <p class="text-s">
                                {{finalContent.mission}}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="values-wrapper">
                    <h3 class="header-t">Values</h3>
                    <ValuesGrid />
                </div>
            </div>
            <div class="image-wrapper" :style="{ backgroundImage: `url(/images/whoWeArePage.jpg)` }">
                <NuxtLink to="/booking" class="btn btnfont">Book Now</NuxtLink>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.whoWeAre-wrapper {
    width: 100%;

    .header-t {
        margin-bottom: 1.25rem;
    }

    .first-wrapper {
        @include pagePadding;
    }

    .second-wrapper {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .info,
    .values-info-wrapper {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .infowrapper {
        background-color: $white;
        padding: 2.25rem;
        border-radius: $border-radius;
    }

    .image-values-wrapper {
        display: flex;
        gap: 3rem;
        width: 100%;
        @include pagePadding;

        @media screen and (max-width: (500px)) {
            padding: 0;

            .second-wrapper {
                @include pagePadding;
            }
        }

        .values-info-wrapper {
            width: 100%;
        }

        .values-wrapper {
            width: 100%;

            .header-t {
                @media screen and (max-width: 500px) {
                    margin-left: $resMargin;
                }
            }
        }

        .image-wrapper {
            width: 60%;
            @include image;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            flex-direction: column;

            >.btn {
                margin-bottom: 20%;
                width: 70%;
            }

            @media screen and (max-width: 770px) {
                display: none;
            }
        }
    }
}
</style> 