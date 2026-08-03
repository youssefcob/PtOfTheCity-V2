import type { Clinic, Schedule, Service } from "~/types/types";
import validation from '~/mixins/Validation';


const form = reactive({
    service_id: null as string | null,
    clinic_id: null as number | null,
    date: null as string | null,
    time: null as string | null,
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    phone: '',
    email: '',
    returning: false,
    date_of_accident: '',
    case_number: '',
    lawyer_name: '',
    lawyer_phone_number: '',
    payment: 'Insurance',
    insurance: '',
    memberId: '',
    pain: '',
})

function assignFormValues(target: any, source: any, keys: string[]) {
    keys.forEach(key => {
        if (key in source && source[key] !== undefined) {
            target[key] = source[key];
        }
    });
}

const stepsObject = {
    form,
    step: (num: number) => {
        const stepsMap: Record<number, any> = {
            1: stepsObject.firstStep,
            2: stepsObject.secondStep,
            3: stepsObject.thirdStep,
            4: stepsObject.fourthStep
        };
        return stepsMap[num] || null;
    },
    firstStep: {
        valid: false,
        content: reactive({
            form: {
                service_id: null as string | null,
                clinic_id: null as number | null,
            },
            selectedService: null as Service | null,
            selectedClinic: ref(null as Clinic | null),
        }),
        push: function (content: any) {
            // this.content.form = content.form;
            this.content.selectedClinic = content.selectedClinic;
            this.content.selectedService = content.selectedService;

            const keys = ['service_id', 'clinic_id'];

            assignFormValues(this.content.form, content.form, keys);
            assignFormValues(form, content.form, keys);

            this.validate();

        },
        isValid: function (){
            return this.valid;
        },
        validate: function () {
            const serviceInClinic = this.content.selectedService?.clinics.find((c) => this.content.selectedClinic && this.content.selectedClinic.id === c.id);
            this.valid = !!(form.service_id && form.clinic_id && serviceInClinic);

        }
    },
    secondStep: {
        valid: false,
        content: reactive({
            form: {
                date: null as string | null,
                time: null as string | null,
            },
            schedule: null as Schedule | null,
            Availablehours: [] as string[],
        }),
        setAvailableHours: function (hours: string[]) {
            this.content.Availablehours = hours;
            // console.log(hours);
        },
        push: function (content: any) {

            const keys = ['date', 'time'];

            assignFormValues(this.content.form, content, keys);
            assignFormValues(form, content, keys);


            this.validate();



        },
        isValid: function (){
            return this.valid;
        },
        validate: function () {
            this.valid = !!(this.content.form.date && this.content.form.time);

        }
    },
    thirdStep: {
        valid: false,
        content: reactive({
            form: {
                firstName: '',
                lastName: '',
                dob: '',
                gender: '',
                phone: '',
                email: '',
                returning: false,
            },
        }),
        push: function (content: any) {
            const keys = ['firstName', 'lastName', 'dob', 'gender', 'phone', 'email', 'returning'];

            assignFormValues(this.content.form, content, keys);
            assignFormValues(form, content, keys);


            this.validate();


        },
        isValid: function () {
            return this.valid;
        },
        validate: function () {
            const { firstName, lastName, dob, gender, phone, email } = this.content.form;
            let allFilled = !!(firstName && lastName && dob && gender && phone && email);
            let emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            this.valid = allFilled && emailIsValid;
        }
    },
    fourthStep: {
        valid: false,
        content: reactive({
            form: {
                date_of_accident: '',
                case_number: '',
                lawyer_name: '',
                lawyer_phone_number: '',
                payment: 'Insurance',
                insurance: '',
                memberId: '',
                pain: '',
            }
        }),
        push: function (content: any) {
            const keys = [
                'date_of_accident',
                'case_number',
                'lawyer_name',
                'lawyer_phone_number',
                'payment',
                'insurance',
                'memberId',
                'pain'
            ];

            assignFormValues(this.content.form, content, keys);
            assignFormValues(form, content, keys);

            this.validate()


        },
        isValid: function () {
            this.validate()
            return this.valid;
        },
        validate: function () {
            let cvgForm = this.content.form;
            if (cvgForm.payment === 'Insurance' && form.returning === false) {
                this.valid = !!(cvgForm.insurance && cvgForm.memberId);
            } else if (cvgForm.payment === 'Self pay') {
                this.valid = true
            } else if (cvgForm.payment === 'Workers compensation') {
                this.valid = !!(cvgForm.date_of_accident && cvgForm.case_number
                    && cvgForm.lawyer_name && cvgForm.lawyer_phone_number)
            } else {
                this.valid = true
            }
        }
    }
}


export default stepsObject;