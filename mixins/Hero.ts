import { reactive, ref, type Ref } from "vue";
import type { Campaign } from "~/types/types";

let campaign: Ref<Campaign[]> = ref([]);

const getCampaigns = async () => {
    try {
        let data = await useApi().get<Campaign[]>('content/campaign');
        campaign.value = data;
        // console.log(campaign.value);
        return data;
    } catch (error) {
        console.error('Failed to fetch campaigns:', error);
        return [];
    }
}

export { campaign, getCampaigns };