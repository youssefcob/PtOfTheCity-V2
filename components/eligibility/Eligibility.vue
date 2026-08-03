<script setup lang="ts">

import validation from '@/mixins/Validation';
import { onMounted, reactive, ref, type Ref } from "vue";
import Http from "@/mixins/Http";
import InputField from '~/sharedComponents/InputField.vue';
import DropDownInputField from '~/sharedComponents/DropDownInputField.vue';
import FileInputField from '~/sharedComponents/FileInputField.vue';
import Loading from '~/sharedComponents/Loading.vue';
import type { Insurance } from '~/types/types';

const isLoading: Ref<boolean> = ref(false);


// let insurancesArr: Ref<string[]> = ref([]);

// const getInsurances = async () => {
//     setTimeout(async () => {
//         if (!insurancesArr.value.length) {
//             let data = await Http.get('images/insurance');
//             insurancesArr.value = data.map((insurance: any) => insurance.title);
//         }
//         formValidation.insurance.rules[1] = { dropdown: insurancesArr.value };
//     }, 1000)


// }


const homepageData = inject('homepageData') as Ref<{
    insurances: Insurance[]
}>;
const homepagePending = inject('homepagePending');
const homepageError = inject('homepageError');

const insurancesArr = computed(() => homepageData.value?.insurances.map((insurance) => insurance.title) as string[]);
const toast = useToast();
// onMounted(() => {
//     getInsurances();
// })
const form = reactive({
    firstName: '',
    lastName: '',
    dob: '',
    insurance: '',
    gender: '',
    memberId: '',
    phone: '',
    email: '',
    medicareId: '',
    medicaidId: '',
    // insuranceCardFront: null,
    // insuranceCardBack: null,
})


const formValidation = {
    firstName: {
        rules: ['required', 'letters:only'],
        message: {
            required: 'First Name Is Required',
            letters: 'Name Cannot Contain Numbers Or Special Characters'
        }
    },
    lastName: {
        rules: ['required', 'letters:only'],
        message: {
            required: 'Last Name Is Required',
            letters: 'Name Cannot Contain Numbers Or Special Characters'
        }
    },
    dob: {
        rules: ['required', 'date:past', 'min:10'],
        message: {
            required: 'Date Of Birth Is Required',
            date: 'Date Of Birth Must be Valid And In The Past',
            min: 'Date Of Birth Must Be In The Format MM-DD-YYYY'
        }

    },
    insurance: {
        rules: ['required', { dropdown: insurancesArr.value }],
        message: {
            required: 'Insurance Is Required',
        }
    },
    gender: {
        rules: ['required', { dropdown: ['Male', 'Female', 'Other'] }],
        message: {
            required: 'Gender Is Required',
            dropdown: 'Please Pick A Valid Gender'
        }

    },
    memberId: {
        rules: ['required'],
    },
    phone: {
        rules: ['required', 'min:14'],

    },
    email: {
        rules: ['required', 'email'],
    },

    medicareId: {
        rules: [],
    },
    medicaidId: {
        rules: [],
    }
    // ,
    // insuranceCardFront: {
    //     rules: ['file:pdf:png:jpg:jpeg'],
    // },
    // insuranceCardBack: {
    //     rules: ['file:pdf:png:jpg:jpeg'],
    // }



}

const formErrors = reactive({
    firstName: false,
    lastName: false,
    dob: false,
    insurance: false,
    gender: false,
    memberId: false,
    phone: false,
    email: false,
    medicareId: false,
    medicaidId: false,
    insuranceCardFront: false,
    insuranceCardBack: false
});

const validate = () => {
    let v = new validation(formValidation, form)

    v.validate()
    let errors = v.errors;
    if (errors.length) {
        let errorsArr = Object.values(errors[0])
        let keys = v.keys

        errorsArr.forEach((error) => {
            // snackbar.add({
            //     background: '#F58E8E',
            //     text: error,

            // })
            toast.error({ message: error })
        })



        keys.forEach((key) => {
            setTimeout(() => {
                formErrors[key as keyof typeof formErrors] = false

            }, 500)
            formErrors[key as keyof typeof formErrors] = true

        })
    }
    // else {
    //     snackbar.add({
    //         background: '#8EF5E8',
    //         text: 'Form Submitted Successfully',

    //     })

    // }
    return v.isValid;

}
const submit = async () => {
    let isValid = validate();

    if (isValid) {
        isLoading.value = true;
        let ModdedForm = modifyForm();
        // let recapatchaToken = await recaptcha('career');
        // if (recapatchaToken) ModdedForm.append('recaptcha', recapatchaToken);
        try {
            let response = await Http.post('/insurance/create', ModdedForm);
            console.log(response);
            // snackbar.add({
            //     background: '#8EF5E8',
            //     text: 'Form Submitted Successfully',

            // })
            toast.success({ message: 'Form Submitted Successfully' })
            ;(window as any).dataLayer?.push({ event: 'insurance_eligibility_submitted' })
            isLoading.value = false;

        } catch (e) {
            const error = e as { status: number; message: string ; response:{status:number}} ;
            console.log(error);
            // snackbar.add({
            //   background: '#F58E8E',
            //   text: 'Form Submission Failed',
            // })
            if (error.response.status == 413) {
                toast.error({ message: 'File Size Too Large' })
            } else {
                toast.error({ message: error.message || 'Form Submission Failed' })
            }
            isLoading.value = false;
        }


    }
    isLoading.value = false;

}
// "build": "run-p type-check \"build-only {@}\" --",

const modifyForm = () => {
    let formData = new FormData();
    formData.append('firstName', form.firstName);
    formData.append('lastName', form.lastName);
    formData.append('dob', form.dob);
    formData.append('insurance_provider', form.insurance);
    formData.append('gender', form.gender)
    formData.append('member_id', form.memberId);
    formData.append('phone', form.phone.replace(/\D/g, ''));
    formData.append('email', form.email);
    if (form.medicareId) formData.append('medicare_id', form.medicareId);
    if (form.medicaidId) formData.append('medicaid_id', form.medicaidId);
    // if (form.insuranceCardFront) {
    //     let insuranceCardFront = form.insuranceCardFront as FormData;
    //     for (let [key, value] of insuranceCardFront.entries()) {
    //         if (value instanceof File) {
    //             formData.append('insurance_card_front', value);
    //             break;
    //         }
    //     }
    // };
    // if (form.insuranceCardBack) {
    //     let insuranceCardBack = form.insuranceCardBack as FormData;
    //     for (let [key, value] of insuranceCardBack.entries()) {
    //         if (value instanceof File) {
    //             formData.append('insurance_card_back', value);
    //             break;
    //         }
    //     }
    // };

    return formData;
}

</script>


<template>
    <div class="eligibility-container">
        <Loading v-if="isLoading" />
        <h1 class="sectionHeader">{{ $translate('check_eligibility') }}</h1>

        <div class="form-image-container">
            <!-- <div class="image" >
            </div> -->
            <div class="form-container">
                <div class="form">
                    <span :class="$dir()">
                        {{ $translate('eligibility_check_phrase') }}
                    </span>
                    <div class="input-fields-container">
                        <div class="left">
                            <!-- <div class="split"> -->
                            <InputField class="field" :error="formErrors.firstName" @input="form.firstName = $event"
                                :placeHolder="$translate('first_name')" id="firstName" required lettersOnly />
                            <InputField class="field" :error="formErrors.lastName" @input="form.lastName = $event"
                                :placeHolder="$translate('last_name')" id="lastName" required lettersOnly />
                            <!-- </div> -->
                            <DropDownInputField :error="formErrors.insurance" @input="form.insurance = $event"
                                :list="insurancesArr" id="insurances" :placeHolder="$translate('insurance_provider')"
                                required />
                            <InputField @input="form.memberId = $event" :error="formErrors.memberId"
                                :placeHolder="$translate('member_id')" id="memberId" required />
                            <InputField @input="form.phone = $event" :error="formErrors.phone"
                                :placeHolder="$translate('phone_number')" id="phone" required mask="(###) ###-####" />
                            <InputField @input="form.email = $event" :error="formErrors.email"
                                :placeHolder="$translate('Email')" id="email" required />

                        </div>

                        <div class="right">
                            <div class="split">
                                <InputField @input="form.medicareId = $event" class="field"
                                    :placeHolder="$translate('medicare_id')" />
                                <InputField @input="form.medicaidId = $event" class="field"
                                    :placeHolder="$translate('medicaid_id')" />
                            </div>
                            <InputField :placeHolder="$translate('date_of_birth')" @input="form.dob = $event"
                                :error="formErrors.dob" id="dob" required mask="##-##-####" date />
                            <DropDownInputField
                                :list="[$translate('Male'), $translate('Female'), $translate('Other'), 'Prefer not to say']"
                                @input="form.gender = $event" :error="formErrors.gender" id="gender"
                                :placeHolder="$translate('gender')" required />
                            <!-- <FileInputField :placeHolder="$translate('insurance_card_front')" -->
                                <!-- :error="formErrors.insuranceCardFront" @input="form.insuranceCardFront = $event" /> -->
                            <!-- <FileInputField :placeHolder="$translate('insurance_card_back')" -->
                                <!-- :error="formErrors.insuranceCardBack" @input="form.insuranceCardBack = $event" /> -->
                                 <!--  -->
                            <button @click="submit" class="btn responsive">{{ $translate('submit') }}</button>

                        </div>

                    </div>


                </div>

            </div>


        </div>

    </div>
</template>

<style scoped lang="scss">
.responsive-form-container {
    display: none;
}

// $formGap: 1.7rem;

.eligibility-container {
    margin-top: $section-margin;
    @include pagePadding;

    >.form-image-container {
        // height: 35.4375rem;
        display: flex;
        justify-content: space-between;


        >.image {
            background-image: url('/images/eligibilityFormImage.jpg');
            width: 30%;
            @include image(shadow);

            @media screen and (max-width: 800px) {
                display: none;

            }
        }

        .form-container {

            // width: 60%;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            @media screen and (max-width: 800px) {
                width: 100%;

            }

            .form {
                width: 100%;

                >span {
                    display: block;
                    margin-bottom: $formGap;

                    &.rtl {
                        direction: rtl;
                    }
                }

                ;
            }

            .input-fields-container {
                // flex-shrink: 0;
                display: flex;
                gap: $formGap;

                // width:100%;
                @media screen and (max-width: 426px) {
                    flex-direction: column;

                }

                .left {
                    width: 55%;
                    display: flex;
                    flex-direction: column;
                    gap: $formGap;


                }

                .right {
                    width: 45%;
                    display: flex;
                    flex-direction: column;
                    gap: $formGap;
                }

                .split {
                    display: flex;
                    gap: $formGap;

                    >.field {
                        width: 100%;
                    }
                }

                @media screen and (max-width: 800px) {

                    .left,
                    .right {
                        width: 100%;
                    }

                }
            }
        }

        @media screen and (max-width: 426px) {
            // display: none;

        }
    }




}
</style>