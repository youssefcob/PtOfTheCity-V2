import { computed } from "vue";
import { useRoute } from "vue-router";

export const useTopStrap = () => {
  const route = useRoute();

  const topStrapRoutes = ["/", "/booking", "/clinics", "/clinic", "/service"];

  const showTopStrap = computed(() => {
    const path = route.path;

    return topStrapRoutes.some((prefix) => {
      if (prefix === "/") {
        return path === "/";
      }

      return path === prefix || path.startsWith(prefix + "/");
    });
  });

  return { showTopStrap };
};
