import { onMounted, onUnmounted, ref } from "vue";

export const useScrollReveal = (threshold = 0.15) => {
  const target = ref<HTMLElement | null>(null);
  const revealed = ref(false);

  onMounted(() => {
    if (!target.value || !("IntersectionObserver" in window)) {
      revealed.value = true;
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          revealed.value = true;
          observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(target.value);
    onUnmounted(() => observer.disconnect());
  });

  return { target, revealed };
};
