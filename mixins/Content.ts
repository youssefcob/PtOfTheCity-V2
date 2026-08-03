import { reactive } from "vue";
import type { Content } from "~/types/types";


let content:Content[] = reactive([]);

export const getContent = async (title:string) => {
    if(content.length > 0) {
        const foundItem = content.find((item: Content) => item.title === title);
        return foundItem?.body || [];
    }
    
    try {
        let data = await useApi().get<Content[]>('content');
        if (!data || !Array.isArray(data)) {
            console.warn('Content data is not an array:', data);
            return [];
        }
        
        content = data;
        // console.log(content);
        
        const foundItem = data.find((item: Content) => item.title === title);
        return foundItem?.body || [];
    } catch (error) {
        console.error('Failed to fetch content:', error);
        return [];
    }
}