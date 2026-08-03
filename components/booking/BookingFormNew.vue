<script setup lang="ts">
import { nextTick, onMounted, reactive, ref, type Ref } from "vue";
import Calender from "~/sharedComponents/Calender.vue";
import DropDownInputField from "~/sharedComponents/DropDownInputField.vue";
import InputField from "~/sharedComponents/InputField.vue";
import RadioInputField from "~/sharedComponents/RadioInputField.vue";
import validation from "~/mixins/Validation";
import type { Clinic, Insurance, Schedule, Service } from "~/types/types";
import Loading from "~/sharedComponents/Loading.vue";
import moment from "moment-timezone";
import Modal from "~/sharedComponents/modal.vue";
import { useRoute } from "nuxt/app";
import Http from "~/mixins/Http";
import { useRecaptcha } from "~/composables/useRecaptcha";
import DropDownResponsive from "~/sharedComponents/DropDownResponsive.vue";
import SubmissionConfirmed from "~/components/booking/steps/stepSix/SubmissionConfirmed.vue";
import Clinics from "~/components/Home/Clinics/Clinics.vue";
import DropDownResponsiveClinics from "~/sharedComponents/DropDownResponsiveClinics.vue";
import ClinicsDropdown from "~/sharedComponents/ClinicsDropdown.vue";
import bookingSeo from "~/assets/seoMetaTags/booking";


const props = defineProps<{
  clinic?: string;
  service?: string;
  NoParagraph?: boolean;
}>();
// Get route parameters
const route = useRoute();
const clinicName = route.query.clinic as string || props.clinic;
const serviceName = route.query.service as string || props.service;
const isLoading: Ref<boolean> = ref(false);


const toast = useToast();

const form = reactive({
  location: "",
  firstName: "",
  lastName: "",
  returning: "",
  dob: "",
  gender: "",
  phone: "",
  email: "",
  payment: "Insurance",
  insurance: "",
  memberId: "",
  service: "",
  pain: "",
  date: "",
  time: "",
  date_of_accident: "",
  case_number: "",
  lawyer_name: "",
  lawyer_phone_number: "",
  preferred_time: "",
  marketing_consent: false,
});

const submitted = ref(false);

// watch(form, () => {
//   console.log(form);
//   //  let clinic_id = () => {
//   //   let clinic = servicesData.value.find((s) => s.title == form.service)?.clinics.find((location) => location.name === form.location);
//   //   console.log(clinic);
//   //   if (!clinic) return;
//   //   return clinic.id;
//   // }
//   // console.log(clinic_id());
//   // console.log(Httplocations);
// })
let Httplocations: {
  name: string;
  id: number;
  schedule: Schedule;
  services: Service[];
}[] = [];
const location = ref("");
let cords = ref({
  lat: 0,
  long: 0,
});

const locationComp: Ref<InstanceType<typeof ClinicsDropdown> | null> =
  ref(null);
const serviceComp: Ref<InstanceType<typeof DropDownInputField> | null> =
  ref(null);

type BookingData = {
  services: Service[];
  insurances: Insurance[];
};
const { data, pending, error } = await useFetch<BookingData>(
  `${useUrl()}/web/booking`,
);

const servicesData = computed(() => data.value?.services || []);
const insurancesData = computed(() => data.value?.insurances || []);

const servicesList = computed(() => {
  return data.value?.services.map((service) => service.title) || [];
  // formValidation.service.rules[1] = { dropdown: s };
});

const insurancesList = computed(() => {
  return insurancesData.value.map((insurance) => insurance.title) || [];
  // formValidation.insurance.rules[1] = { dropdown: insurancesList.value };
});

const locations = computed(() => {
  const l =
    servicesData.value.find((s) => s.title == form.service)?.clinics || [];
  console.log(l);

  return l;
});
const locationsTitles = computed(() => {
  return locations.value?.map((l) => l.name) || [];
});

const schedule = computed(() => {
  return locations.value?.find((l) => l.name == form.location)?.schedule;
});

const clearClinic = () => {
  if (!locationsTitles.value.includes(form.location))
    locationComp.value?.clear();
};

// const updateService = (e: string) => {
//   form.service = e;
//   locationComp.value?.clear();

//   if (servicesData.value) {
//     let c = servicesData.value.find((service) => service.title === e)?.clinics;
//     if (c) {
//       locations.value = c.map((clinic) => clinic.name);
//       formValidation.location.rules[1] = { dropdown: locations.value };
//     }
//   }
// }

const getLocationAndServiceFromProp = async () => {
  if (serviceName) {
    form.service = serviceName;
    serviceComp.value?.defaultValue(serviceName);
  } else {
    form.service = "Initial Check-up";
    serviceComp.value?.defaultValue("Initial Check-up");
  }

  if (clinicName) {
    await nextTick();
    const clinic = locations.value.find(
      (c) => c.name.toLowerCase() === clinicName.toLowerCase(),
    );
    if (clinic) locationComp.value?.defaultValue(String(clinic.id));
  }
};
onMounted(() => getLocationAndServiceFromProp());

let Availablehours: Ref<string[]> = ref([]);

const formValidation = computed(() => ({
  location: {
    rules: ["required", { dropdown: locationsTitles.value }],
    message: {
      required: "Please select a location",
      dropdown: "Please select a valid location",
    },
  },
  returning: {
    rules: [],
    message: {
      required: "Please select if you are a returning patient",
    },
  },
  firstName: {
    rules: ["required", "letters:only"],
    message: {
      required: "First Name Is Required",
      letters: "Name Cannot Contain Numbers Or Special Characters",
    },
  },
  lastName: {
    rules: ["required", "letters:only"],
    message: {
      required: "Last Name Is Required",
      letters: "Name Cannot Contain Numbers Or Special Characters",
    },
  },
  dob: {
    rules: ["required", "date:past", "min:10"],
    message: {
      required: "Date Of Birth Is Required",
      date: "Date Of Birth Must be Valid And In The Past",
      min: "Date Of Birth Must Be In The Format MM-DD-YYYY",
    },
  },
  service: {
    rules: ["required", { dropdown: servicesList.value }],
    message: {
      required: "Please select a service",
      dropdown: "Please select a valid service",
    },
  },
  gender: {
    rules: [
      "required",
      { dropdown: ["Male", "Female", "Other", "Prefer not to say"] },
    ],
  },
  phone: {
    rules: ["required", "min:14"],
  },
  email: {
    rules: ["required", "email"],
  },
  payment: {
    rules: [
      "required",
      { dropdown: ["Insurance", "Self Pay", "Workers Compensation"] },
    ],
  },
  insurance: {
    rules: [
      "required:if:payment==Insurance&returning==No",
      { dropdown: insurancesList.value },
    ],
  },
  memberId: {
    rules: ["required:if:payment==Insurance&returning==No"],
  },
  pain: {},
  date: {
    // rules: ['required'],
  },
  preferred_time: {
    rules: ["required"],
    message: {
      required: "Preferred time is required",
    },
  },
  // time: {
  //   rules: [ { dropdown: Availablehours.value }],
  // },
  date_of_accident: {
    rules: ["required:if:payment==Workers Compensation"],
    message: {
      required: "Date of accident is required",
    },
  },
  case_number: {
    rules: ["required:if:payment==Workers Compensation"],
    message: {
      required: "Case number is required",
    },
  },
  lawyer_name: {
    rules: ["required:if:payment==Workers Compensation"],
    message: {
      required: "Lawyer name is required",
    },
  },
  lawyer_phone_number: {
    rules: ["required:if:payment==Workers Compensation"],
    message: {
      required: "Lawyer phone number is required",
    },
  },
}));

const formErrors = reactive({
  location: false,
  firstName: false,
  lastName: false,
  dob: false,
  gender: false,
  phone: false,
  service: false,
  email: false,
  payment: false,
  insurance: false,
  memberId: false,
  pain: false,
  date: false,
  time: false,
  returning: false,
  date_of_accident: false,
  case_number: false,
  lawyer_name: false,
  lawyer_phone_number: false,
  preferred_time: false,
});

const validate = () => {
  let v = new validation(formValidation.value, form);
  v.validate();
  let errors = v.errors;
  if (errors.length) {
    let errorsArr = Object.values(errors[0]);
    let keys = v.keys;

    errorsArr.forEach((error) => {
      toast.error({ title: "Error!", message: error });
    });

    keys.forEach((key) => {
      setTimeout(() => {
        formErrors[key as keyof typeof formErrors] = false;
      }, 500);
      formErrors[key as keyof typeof formErrors] = true;
    });
  }

  return v.isValid;
};

const successModal: Ref<InstanceType<typeof Modal> | null> = ref(null);

const confirmSuccess = () => {
  successModal.value?.openModal();

  setTimeout(() => {
    successModal.value?.closeModal();
    navigateTo("/");
  }, 3000);
};

const submit = async () => {
  // console.log(modifyForm());
  // return;
  let isValid = validate();
  if (isValid) {
    let moddedForm = modifyForm();

    // Use the new reCAPTCHA service
    // const { executeRecaptcha, error: recaptchaError } = useRecaptcha();
    // let recaptchaToken = await executeRecaptcha('reservation');

    // if (recaptchaToken) {
    //   Object.assign(moddedForm, {
    //     recaptcha: recaptchaToken
    //   });
    //   // console.log('reCAPTCHA token added to form');
    // } else {
    //   // console.warn('reCAPTCHA failed:', recaptchaError.value);
    //   // You can choose to continue without reCAPTCHA or show a warning
    //   // For now, we'll show a warning but continue with submission
    //   toast.warning({ title: 'Warning!', message: 'reCAPTCHA verification failed, but continuing with form submission...' })

    // }

    try {
      isLoading.value = true;
      // let response = await Http.post('reservation', moddedForm);

      const data = await $fetch(`${useUrl()}/reservation`, {
        method: "POST",
        body: moddedForm,
      });
      // console.log(data)
      toast.success({
        title: "Success!",
        message: "Form Submitted Successfully, We will contact you",
      });
      isLoading.value = false;
      if ((window as any).gtag) {
        ;(window as any).gtag('event', 'conversion', {
          send_to: 'AW-10835639583/EZi1CPuQna8cEJ_66q4o',
          value: 1.0,
          currency: 'USD',
        })
      }
      navigateTo('/success/booking');
    } catch (e: any) {
      console.error("Full error object:", e);
      console.error("Error data:", e.data);
      console.error("Error status:", e.status);
      console.error("Error message:", e.message);
      toast.error({ title: "Error!", message: "Something went wrong." });
      isLoading.value = false;
    }

    // isLoading.value = false;
  }
};

const modifyForm = () => {
  let moddedform = {};
  let clinic_id = () => {
    let clinic = servicesData.value
      .find((s) => s.title == form.service)
      ?.clinics.find((location) => location.name === form.location);
    console.log(clinic);
    if (!clinic) return;
    return clinic.id;
  };
  let formPayment = () => {
    switch (form.payment) {
      case "Insurance":
        return "insurance";
      case "Self Pay":
        return "self_pay";
      case "Workers Compensation":
        return "workers_compensation";
      default:
        return "self_pay";
    }
  };

  let serviceId = () => {
    if (servicesData.value) {
      let service = servicesData.value.find(
        (service) => service.title === form.service,
      );
      if (!service) return;
      return service.id;
    }
  };

  const preferred_time_map: Record<string, string> = {
    "Morning (7:00 AM – 12:00 PM)": "morning",
    "Afternoon (12:00 PM – 4:00 PM)": "afternoon",
    "Evening (4:00 PM – 7:00 PM)": "evening",
    Anytime: "anytime",
  };

  let date_in_unix = convertTotimeStamp(form.date, form.time || "00:00");
  Object.assign(moddedform, {
    clinic_id: clinic_id(),
    first_name: form.firstName,
    last_name: form.lastName,
    dob: form.dob,
    gender: form.gender,
    phone: form.phone.replace(/\D/g, ""),
    email: form.email,
    payment: formPayment(),
    service_id: serviceId(),
    date: date_in_unix,
    pain: form.pain,
    returning: form.returning === "Yes",
    preferred_time: preferred_time_map[form.preferred_time],
    marketing_consent: form.marketing_consent,
  });

  if (form.payment === "Insurance") {
    Object.assign(moddedform, {
      insurance_company: form.insurance,
      member_id: form.memberId,
    });
  }

  if (form.payment === "Workers Compensation") {
    Object.assign(moddedform, {
      date_of_accident: form.date_of_accident,
      case_number: form.case_number,
      lawyer_name: form.lawyer_name,
      lawyer_phone_number: form.lawyer_phone_number,
    });
  }
  // console.log(moddedform);
  return moddedform;
};

const convertTotimeStamp = (date: string, time: string) => {
  const [month, day, year] = date.split("-").map((e) => parseInt(e));
  const [hour, minute] = time.split(":").map((e) => parseInt(e));
  const nyDate = moment.tz(
    { year, month, day, hour, minute },
    "America/New_York",
  );
  return nyDate.valueOf();
};

const hoursComp: Ref<InstanceType<typeof DropDownInputField> | null> =
  ref(null);

const updateHours = (date: { start: string; end: string }) => {
  hoursComp.value?.clear();
  const getHours = (time: string) => {
    const [hours, minutes, seconds] = time.split(":");
    return parseInt(hours);
  };
  let hours = [];
  const startHour = getHours(date.start);
  const endHour = getHours(date.end);

  for (let i = startHour; i < endHour; i++) {
    hours.push(`${i}:00`);
    if (i < endHour - 1) {
      hours.push(`${i}:30`);
    }
  }
  Availablehours.value = hours;
  // formValidation.time.rules[1] = { dropdown: Availablehours.value }
};

const updateDate = (date: { day: number; month: number; year: number }) => {
  form.date = `${date.month}-${date.day}-${date.year}`;
};

const assignPayment = (e: string) => {
  form.payment = e;
};

const assignReturning = (e: string) => {
  form.returning = e;
};

const isSelfPay = () => {
  return form.payment !== "Insurance";
};
</script>

<template>
  <div class="booking-container">
    <!-- <div @click="recaptcha('smth')" class="btn responsive">Book Appointment</div> -->
    <Loading v-if="isLoading" />
    <Modal ref="successModal">
      <div class="success">
        <p>We recieved your reservation, check your email for confirmation</p>
        <p>Thank you for trusting Pt Of The City</p>
      </div>
    </Modal>
    <Transition name="fade" mode="out-in">
      <div class="confirmation-container" v-if="submitted">
        <SubmissionConfirmed text="black" position="static" />
      </div>
      <div v-else>
        <h1 class="sectionHeader">Request Your Appointment</h1>
        <h3 class="smallHeader">
          Proudly serving the NY community. We accept all major insurance plans
          to get you back on your feet faster.
        </h3>

        <div class="form-container">
          <div class="left">
            <div>
              <!-- <DropDownInputField id="service" ref="serviceComp" :list="servicesList" placeHolder="Service"
            v-model="form.service" @input="clearClinic()" required :error="formErrors.service" /> -->
              <DropDownResponsive cta id="service" ref="serviceComp" :list="servicesList" placeHolder="Service"
                v-model="form.service" @input="clearClinic()" required :error="formErrors.service" />
              <div class="ps">What do you need?</div>
            </div>
            <div>
              <!-- <DropDownInputField id="location" ref="locationComp" :list="locationsTitles"
            placeHolder="Find Your nearest clinic" v-model="form.location" required :error="formErrors.location" /> -->
              <!-- <DropDownResponsive ctaClinics id="location" ref="locationComp" :list="locations"
                placeHolder="Find Your nearest clinic" v-model="form.location" required :error="formErrors.location" /> -->
              <ClinicsDropdown ref="locationComp" :list="locations" placeHolder="Select Location" :required="true"
                @update:modelValue="(val) => (form.location = val)" />
              <div class="ps">
                Make sure to allow location access, Clinics are listed in order
                of proximity.
              </div>
            </div>

            <div class="field coverage">
              <RadioInputField @change="assignReturning($event)" style="width: 100%" title="Have you visited us before?"
                :options="['Yes', 'No']" id="returning" :error="formErrors.returning" />
            </div>

            <div>
              <div class="split name">
                <InputField cta required class="field" placeHolder="First Name" id="firstName"
                  @input="form.firstName = $event" :error="formErrors.firstName" lettersOnly />
                <InputField cta required class="field" placeHolder="Last Name" id="lastName"
                  @input="form.lastName = $event" :error="formErrors.lastName" lettersOnly />
              </div>
              <div class="ps">Your legal name as shown in the photo ID</div>
            </div>
            <div class="split">
              <div class="field">
                <InputField cta placeHolder="Date of Birth" mask="##-##-####" id="dob" required
                  @input="form.dob = $event" :error="formErrors.dob" date minYear="-100" maxYear="+10" />
                <div class="ps">MM-DD-YYYY</div>
              </div>
              <div class="field">
                <DropDownResponsive cta :list="['Male', 'Female', 'Other', 'Prefer not to say']" required id="gender"
                  placeHolder="Gender" @input="form.gender = $event" :error="formErrors.gender" />
              </div>
            </div>
            <div class="split reverse">
              <div class="field">
                <InputField cta placeHolder="Phone Number" mask="(###) ###-####" id="phone" required
                  @input="form.phone = $event" :error="formErrors.phone" />
              </div>
              <div class="field">
                <InputField cta placeHolder="Email" id="email" required @input="form.email = $event"
                  :error="formErrors.email" />
              </div>
            </div>
            <div class="field coverage">
              <RadioInputField @change="assignPayment($event)" style="width: 100%" title="Coverage"
                :options="['Insurance', 'Self Pay', 'Workers Compensation']" :checked="'Insurance'" id="payment"
                :error="formErrors.payment" />
            </div>
            <DropDownResponsive cta v-if="
              !(
                form.returning == 'Yes' ||
                form.payment == 'Workers Compensation'
              )
            " id="insurance" :list="insurancesList" placeHolder="Your insurance" @input="form.insurance = $event"
              :disabled="isSelfPay()" :error="formErrors.insurance" />
            <InputField cta v-if="
              !(
                form.returning == 'Yes' ||
                form.payment == 'Workers Compensation'
              )
            " @input="form.memberId = $event" placeHolder="Member ID" id="MemberId" :disabled="isSelfPay()"
              :error="formErrors.memberId" />

            <!-- WorkersCompensation -->
            <div class="split">
              <div class="field">
                <InputField cta v-if="form.payment === 'Workers Compensation'" @input="form.date_of_accident = $event"
                  placeHolder="Date of Accident" mask="##-##-####" id="date_of_accident"
                  :error="formErrors.date_of_accident" date required min-year="-50" max-year="+0" />
              </div>
              <div class="field">
                <InputField cta v-if="form.payment === 'Workers Compensation'" @input="form.case_number = $event"
                  placeHolder="Case Number" id="case_number" :error="formErrors.case_number" required />
              </div>
            </div>
            <div class="split">
              <div class="field">
                <InputField cta v-if="form.payment === 'Workers Compensation'" @input="form.lawyer_name = $event"
                  placeHolder="Lawyer Name" id="lawyer_name" :error="formErrors.lawyer_name" letterOnly required />
              </div>
              <div class="field">
                <InputField cta v-if="form.payment === 'Workers Compensation'"
                  @input="form.lawyer_phone_number = $event" placeHolder="Lawyer Phone Number" id="lawyer_phone_number"
                  :error="formErrors.lawyer_phone_number" mask="(###) ###-####" required />
              </div>
            </div>
          </div>
          <div class="right">
            <Calender cta @input="updateDate($event)" @hours="updateHours($event)" :schedule="schedule" />
            <!-- <DropDownResponsive cta ref="hoursComp" @input="form.time = $event" id="time" :list="availableHours"
              placeHolder="When" :error="formErrors.time" /> -->
            <DropDownResponsive cta ref="hoursComp" @input="form.preferred_time = $event" id="preferred_time" :list="[
              'Anytime',

              'Morning (7:00 AM – 12:00 PM)',

              'Afternoon (12:00 PM – 4:00 PM)',

              'Evening (4:00 PM – 7:00 PM)',
            ]" placeHolder="When" :error="formErrors.preferred_time" />

            <InputField cta @input="form.pain = $event" height="15rem"
              placeHolder="Briefly describe your symptoms or concerns." id="pain" :error="formErrors.pain" />
          </div>
        </div>
        <div class="form-footer">
          <div class="consent-checkbox">
            <input type="checkbox" id="marketing_consent" v-model="form.marketing_consent" />
            <label for="marketing_consent">
              I agree to receive appointment reminders, health tips, and clinic
              news via email and SMS and I'm at least 18 years old. Your info is
              100% secure—we never share your data. You can cancel anytime by
              replying STOP or clicking unsubscribe. Msg & data rates may apply.
            </label>
          </div>
          <div @click="submit()" class="btn cta responsive">Submit</div>
          <p class="phone-note">
            We're here to help! If you'd prefer to book over the phone, just
            give us a call at:
            <a href="tel:+17186480888">(718) 648-0888</a>
          </p>
        </div>
        <div class="paragraph" v-if="!NoParagraph">
          <h3 class="smallHeader">
            Top-Rated NYC Physical Therapy & Rehabilitation Experts
          </h3>
          <p>
            As one of the highest-ranking physical therapy clinics in NYC, PT of
            the City is committed to proudly serving the NY community with
            world-class care. With 30+ convenient clinics spanning across
            Brooklyn, Manhattan, The Bronx, and Queens, expert recovery is
            always just around the corner. Our clinical team specializes in
            treating the most common conditions New Yorkers face, including back
            pain, neck stiffness, shoulder injuries, knee pain, and sciatica, as
            well as providing specialized post-operative rehabilitation. We
            understand that navigating healthcare in the city should be
            stress-free, which is why we accept all major insurance plans and
            offer a streamlined booking process to fit your busy schedule.
            Whether you are a professional athlete or a daily commuter, our
            mission is to provide personalized manual therapy and injury
            prevention to every neighborhood we call home. Experience why we are
            a leader in New York physical therapy—book your evaluation at any of
            our NYC locations today.
          </p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
$gap: 2rem;

.success {
  background-color: rgba(45, 139, 156, 0.4);
  height: 80vh;
  width: 80vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5rem;
  border: 1px solid white;

  p {
    color: white;
    line-height: 150%;
  }

  :nth-child(1) {
    color: white;
    font-size: 3rem;
    text-align: center;
  }

  :nth-child(2) {
    // color: red;
    font-size: 2rem;
  }
}

.booking-container {
  @include pagePadding;
  padding-top: calc($navbarHeight - 1rem) !important;

  .form-container {
    display: flex;
    gap: 5rem;
    margin-top: 3rem;

    @media screen and (max-width: 870px) {
      flex-direction: column;
      gap: 0;
    }

    .left {
      width: 160%;

      display: flex;
      flex-direction: column;
      gap: $gap;

      .split {
        display: flex;
        gap: $gap;

        .field {
          width: 50%;
        }

        >* {
          flex: 1;
        }

        >.coverage {
          display: flex;
          align-items: center;
        }

        @media screen and (max-width: 800px) {
          flex-direction: column;

          >.field {
            width: 100%;
          }

          &.reverse {
            flex-direction: column-reverse;
          }
        }
      }

      @media screen and (max-width: 870px) {
        width: 100%;
      }
    }

    .right {
      display: flex;
      flex-direction: column;
      gap: $gap;

      .btn {
        margin-top: auto;
        transition: background-color 0.3s ease;

        @media screen and (max-width: 800px) {
          padding: 2.5rem 0rem;
          font-size: 1.5rem;
        }

        &:hover {
          background-color: darken($cta, 10%);
        }
      }
    }
  }
}

.form-footer {
  width: 63vw;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media screen and (max-width: 800px) {
    width: 100%;
  }
}

.smallHeader {
  font-size: 2rem;
}

.paragraph {
  margin-top: 5rem;
  line-height: 150%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.confirmation-container {
  height: 100vh;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
