// import Http from "@/mixins/Http";
import { reactive, ref, type Ref } from "vue";
import type { Clinic, HttpClinics } from "~/types/types";
import { useApi } from "~/composables/useApi";

let clinicPositions: Ref<Clinic[]> = ref([]);
let clinics: HttpClinics = reactive({});
let clinicNames: Ref<string[]> = ref([]);

const getClinics = async () => {
    try {
        let data = await useApi().get<HttpClinics>('clinic/groupByLocation');
        clinics = data;
        clinicNames.value = Object.keys(clinics);
        
        deconstructClinics();
        
        return {
            clinics: data,
            clinicNames: Object.keys(data),
            clinicPositions: clinicPositions.value
        };
    } catch (error) {
        console.error('Failed to fetch clinics:', error);
        return {
            clinics: {},
            clinicNames: [],
            clinicPositions: []
        };
    }
}

const deconstructClinics = () => {
    let temp: Clinic[] = [];
    clinicNames.value.forEach((name) => {
        clinics[name].forEach((clinic) => {
            temp.push(clinic);
        })
    })
    let positions = temp.map((clinic) => {
        return {
            position: {
                lat: Number(clinic.lat),
                lng: Number(clinic.long)
            },
            name: clinic.name,
            address: clinic.street_address,
        }
    })
    // console.log(temp)
    clinicPositions.value = temp;
    
}

let clinic: Ref<Clinic | null> = ref(null);

export { clinics, clinicNames,clinicPositions ,getClinics, deconstructClinics};

// export { staffMembers };