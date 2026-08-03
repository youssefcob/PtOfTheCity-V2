import { ref } from 'vue';
import { useApi } from '~/composables/useApi';
import type { Staff } from '~/types/types';



export const staff = ref<Staff[]>([]);

export const getStaff = async () => {
    try {
        const api = useHttp();
        const response = await api.get('content/staff');
        staff.value = response as Staff[];
    } catch (error) {
        console.error('Failed to fetch staff:', error);
        staff.value = [];
    }
}; 