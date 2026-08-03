<script setup lang="ts">
import InputField from '@/sharedComponents/InputField.vue';
import DropDownInputField from '@/sharedComponents/DropDownInputField.vue';
import FileInputField2 from '@/sharedComponents/FileInputField2.vue';
import { onMounted, reactive, ref, watch, type Ref } from 'vue';
import validation from '@/mixins/Validation';
import Http from '@/mixins/Http';
// import { event } from 'vue-gtag'
// import { recaptcha } from '@/components/Recaptcha';
import Loading from '@/sharedComponents/Loading.vue';
import type { Job } from '~/types/types';

// const btnClicked = () => {
//     event('recaptchaClick', {
//         'event_category': 'documentation',
//         'event_label': 'recaptcha button clicked',
//         'value': 1
//     })

// }

const selectCareer = (career: string) => {
    jobRef.value?.defaultValue(career);
}
defineExpose({
    selectCareer
})

const jobRef = ref<InstanceType<typeof DropDownInputField> | null>(null);

const isLoading: Ref<boolean> = ref(false);
const toast = useToast();
const props = defineProps({
    httpJobs: {
        type: Array,
        default: () => ([] as Job[]),
    },
    jobs: {
        type: Array as () => string[],
        default: () => ([]),
    },
})

watch(() => props.jobs, (newJobs) => {
    formValidation.job.rules[1] = { dropdown: props.jobs };

});
const states = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",

]

const form = reactive({
    job: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    resume: null,
    street_address: '',
    city: '',
    state: '',
    zip_code: '',
})

const formValidation = {
    job: {
        rules: ['required', { dropdown: props.jobs as string[] }],
        message: {
            required: 'Please Select A Job',
            dropdown: 'Please Select A Valid Job'
        },
    },
    first_name: {
        rules: ['required', 'letters'],
        message: {
            required: 'First Name Is Required',
            letters: 'First Name Cannot Contain Numbers Or Special Characters'
        }
    },
    last_name: {
        rules: ['required', 'letters'],
        message: {
            required: 'Last Name Is Required',
            letters: 'Last Name Cannot Contain Numbers Or Special Characters'
        }
    },
    email: {
        rules: ['required', 'email'],
        message: {
            required: 'Email Is Required',
            email: 'Please Enter A Valid Email'
        }
    },
    phone: {
        rules: ['required'],
        message: {
            required: 'Phone Number Is Required',
            phone: 'Please Enter A Valid Phone Number'
        }
    },
    resume: {
        rules: ['required', 'file:pdf'],
        message: {
            required: 'Resume Is Required',
            file: 'Resume must be in pdf format'
        }
    },
    street_address: {
        rules: [],

    },
    city: {
        rules: [],

    },
    state: {
        rules: [{ dropdown: states }],
        message: {
            dropdown: 'Please Select A Valid State'
        }
    },
    zip_code: {
        rules: [],
        message: {
        }
    }
}

const formErrors = reactive({
    job: false,
    first_name: false,
    last_name: false,
    email: false,
    phone: false,
    resume: false,
    street_address: false,
    city: false,
    state: false,
    zip_code: false,
})

const validate = () => {
    let v = new validation(formValidation, form)
    v.validate()
    let errors = v.errors;
    if (errors.length) {
        let errorsArr = Object.values(errors[0])
        let keys = v.keys

        errorsArr.forEach((error) => {

            toast.error({ title: 'Error!', message: error })
        })



        keys.forEach((key) => {
            setTimeout(() => {
                formErrors[key as keyof typeof formErrors] = false

            }, 500)
            formErrors[key as keyof typeof formErrors] = true

        })
    }

    return v.isValid;


}

const submit = async () => {
    let isValid = validate();
    // console.log(isValid);
    if (isValid) {
        isLoading.value = true;

        let ModdedForm = modifyForm();
        // let recapatchaToken = await recaptcha('career');
        // if (recapatchaToken) ModdedForm.append('recaptcha', recapatchaToken);
        try {
            let response = await Http.post('/career', ModdedForm);
            // console.log(response);
            isLoading.value = false;

            toast.success({ title: 'Success!', message: 'Form Submitted Successfully' })

        } catch (e) {
            console.error(e);
            isLoading.value = false;

            toast.error({ title: 'Error!', message: (e as string) })


        }
        isLoading.value = false;
    }
}

const modifyForm = () => {
    let formData = new FormData();

    formData.append('job', form.job);
    formData.append('first_name', form.first_name);
    formData.append('last_name', form.last_name);
    formData.append('email', form.email);
    formData.append('phone', form.phone.replace(/\D/g, ''));
    if (form.street_address) formData.append('street_address', form.street_address);
    if (form.city) formData.append('city', form.city);
    if (form.state) formData.append('state', form.state);
    if (form.zip_code) formData.append('zip_code', form.zip_code);
    if (form.resume) {
        let resume = form.resume as FormData;
        for (let [key, value] of resume.entries()) {
            if (value instanceof File) {
                formData.append('resume', value);
                break;
            }
        }
    }

    return formData;

}
</script>
<template>
    <div class="form-wrapper">
        <Loading v-if="isLoading" />
        <div class="ps">Fields marked with an <span style="color:red">*</span> are required</div>

        <div>
            <DropDownInputField ref="jobRef" placeHolder="Job you're applying for" required :list="jobs"
                @input="form.job = $event" id="jobs" />
        </div>
        <div class="name-wrapper">
            <InputField class="field" placeHolder="First Name" @input="form.first_name = $event" required />
            <InputField class="field" placeHolder="Last Name" @input="form.last_name = $event" required />
        </div>
        <InputField placeHolder="Email adress" @input="form.email = $event" required />
        <InputField placeHolder="Phone number" @input="form.phone = $event" mask="(###) ###-####" required />
        <div>
            <FileInputField2 placeHolder="Upload your CV" @input="form.resume = $event" required />
            <div class="ps">Please upload your document in PDF format (`.pdf`).</div>
        </div>
        <InputField placeHolder="Street address" @input="form.street_address = $event" />
        <div class="location-wrapper">
            <InputField class="field" placeHolder="City" @input="form.city = $event" />
            <DropDownInputField class="field" placeHolder="State" @input="form.state = $event" :list="states"
                id="states" />
            <InputField class="field" placeHolder="Zip code" @input="form.zip_code = $event" />
        </div>
        <div class="btn responsive main btnfont" @click="submit()" style="margin-top: 0;">Submit</div>
        <!-- <div class="btn responsive main transparent" style="margin-top: 0;">Back to Homepage</div> -->
    </div>
</template>

<style scoped lang="scss">
// $formGap: 1.25rem;

.form-wrapper {
    width: 60%;

    @media screen and (max-width: 800px) {
        width: 100%;

    }

    display: flex;
    flex-direction: column;
    gap: $formGap;

    .name-wrapper {
        width: 100%;
        display: flex;
        gap: $formGap;

        @media screen and (max-width: 500px) {
            flex-direction: column;


        }

        >.field {
            @media screen and (min-width: 501px) {
                width: 50%;
            }


        }
    }

    .location-wrapper {
        width: 100%;
        display: flex;
        gap: $formGap;

        @media screen and (max-width: 501px) {
            flex-direction: column;
        }

        >.field {
            @media screen and (min-width: 501px) {
                width: 33.33%;
            }
        }
    }



    .btn {
        @media screen and (min-width: 501px) {
            width: 40%;


        }
    }
}
</style>