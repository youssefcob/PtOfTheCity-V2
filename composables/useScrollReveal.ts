import { onMounted, onUnmounted, ref, type Directive } from "vue";

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

// Entrance animations from the PTOC-2026 Figma prototypes. The keyframes live
// in assets/css/main.scss under [data-reveal="<variant>"]:
// - slide-in: fade in while sliding from the left
// - rise: fade in while moving up into place (headings/body copy)
// - drop: fade in while moving down into place (overlines)
export type RevealVariant = "slide-in" | "rise" | "drop";

const revealObservers = new WeakMap<HTMLElement, IntersectionObserver>();

// v-reveal="'rise'". The data-reveal attribute is also rendered on the server
// so the element starts hidden instead of flashing visible before hydration.
export const vReveal: Directive<HTMLElement, RevealVariant | undefined> = {
  getSSRProps: (binding) => ({ "data-reveal": binding.value || "rise" }),
  mounted(el, binding) {
    el.dataset.reveal = binding.value || "rise";

    if (!("IntersectionObserver" in window)) {
      el.classList.add("is-revealed");
      return;
    }

    // A "slide-in" element starts translated off to the left, and an
    // overflow-hidden ancestor clips it, so it may never intersect enough to
    // reveal. Watch its (untransformed) parent instead and reveal as soon as
    // that is on screen.
    const slides = el.dataset.reveal === "slide-in" && !!el.parentElement;
    const target = slides ? el.parentElement! : el;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          el.classList.add("is-revealed");
          observer.disconnect();
        }
      },
      slides ? { threshold: 0, rootMargin: "0px 0px -10% 0px" } : { threshold: 0.15 },
    );
    observer.observe(target);
    revealObservers.set(el, observer);
  },
  unmounted(el) {
    revealObservers.get(el)?.disconnect();
    revealObservers.delete(el);
  },
};
