// import Http from "@/mixins/Http";
import { ref, type Ref } from "vue";
import type { Service } from "~/types/types";

let services: Ref<Service[]> = ref([]);
let servicesInitial: Ref<Service[]> = ref([]);

const unshift = (data: Service[]) => {
    if (!data || !Array.isArray(data)) {
        return data;
    }
    
    const initialCheckupIndex = data.findIndex(service => service.title === 'Initial Check-up');
    if (initialCheckupIndex !== -1) {
        const [initialCheckupService] = data.splice(initialCheckupIndex, 1);
        data.unshift(initialCheckupService);
    }
    return data;
}

const getServices = async () => {
    if (services.value.length > 0) return;
    
    try {
        let data = await useApi().get<Service[]>('services');
        
        if (!data || !Array.isArray(data)) {
            console.warn('Services data is not an array:', data);
            return;
        }
        
        servicesInitial.value = unshift(data);
        data = data.filter((service: Service) => service.title !== 'Initial Check-up');
        services.value = data;
    } catch (error) {
        console.error('Failed to fetch services:', error);
    }
}

export { services, getServices, servicesInitial };