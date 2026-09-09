<script setup lang="ts">
import { nextTick, onMounted, reactive, ref, type Ref } from "vue";
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
import DateField from "~/sharedComponents/DateField.vue";
import bookingSeo from "~/assets/seoMetaTags/booking";
import EditableText from "~/components/Admin/EditableText.vue";
import EditableImage from "~/components/Admin/EditableImage.vue";


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
  heardAboutUs: "",
  marketing_consent: false,
});

const heardAboutUsOptions = [
  "Google Search",
  "Social Media",
  "Friend or Family Referral",
  "Doctor Referral",
  "Insurance Provider",
  "Advertisement",
  "Other",
];

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

// The Appointment Date calendar disables days the clinic is closed on -
// form.location only holds the clinic's name (ClinicsDropdown emits that as
// its v-model), so look the full Clinic object back up for its schedule.
const selectedClinic = computed(() =>
  locations.value.find((c) => c.name === form.location) || null
);

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
    rules: ["required", "date:future"],
    message: {
      required: "Appointment date is required",
      date: "Appointment date must be a valid, upcoming date",
    },
  },
  preferred_time: {
    rules: ["required"],
    message: {
      required: "Preferred time is required",
    },
  },
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
    heard_about_us: form.heardAboutUs,
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
        <div class="form-header">
          <EditableText tag="h1" class="heading" content-key="booking.heading" default="Let's get you an appointment" />
          <!-- <EditableText tag="p" class="tagline" content-key="booking.tagline"
            default="Proudly serving the NY community. We accept all major insurance plans to get you back on your feet faster." />
        -->
          </div>

        <div class="form-layout">
          <div class="form-main">
            <div class="field coverage">
              <RadioInputField pill @change="assignReturning($event)" style="width: 100%"
                title="Have you visited us before?"
                :options="[{ label: 'Yes, Existing Patient', value: 'Yes' }, { label: 'No, New Patient', value: 'No' }]"
                :checked="'No'" id="returning" :error="formErrors.returning" />
            </div>

            <div>
              <DropDownResponsive cta id="service" ref="serviceComp" :list="servicesList" label="Service"
                placeHolder="Select a service" v-model="form.service" @input="clearClinic()" required
                :error="formErrors.service" />
              <div class="ps">What do you need?</div>
            </div>
            <div>
              <ClinicsDropdown ref="locationComp" :list="locations" label="Clinic Location"
                placeHolder="Select nearest clinic" :required="true"
                @update:modelValue="(val) => (form.location = val)" />
              <div class="ps">
                Make sure to allow location access, Clinics are listed in order
                of proximity.
              </div>
            </div>

            <div>
              <div class="split name">
                <InputField cta required class="field" label="First Name" placeHolder="e.g. Jane" id="firstName"
                  @input="form.firstName = $event" :error="formErrors.firstName" lettersOnly />
                <InputField cta required class="field" label="Last Name" placeHolder="e.g. Doe" id="lastName"
                  @input="form.lastName = $event" :error="formErrors.lastName" lettersOnly />
              </div>
              <div class="ps">Your legal name as shown in the photo ID</div>
            </div>
            <div class="split">
              <div class="field">
                <InputField cta label="Date of Birth" placeHolder="MM-DD-YYYY" mask="##-##-####" id="dob" required
                  @input="form.dob = $event" :error="formErrors.dob" date minYear="-100" maxYear="+10" />
              </div>
              <div class="field">
                <DropDownResponsive cta :list="['Male', 'Female', 'Other', 'Prefer not to say']" required id="gender"
                  label="Gender" placeHolder="Select gender" @input="form.gender = $event" :error="formErrors.gender" />
              </div>
            </div>
            <div class="split reverse">
              <div class="field">
                <InputField cta label="Phone Number" placeHolder="(555) 000-0000" mask="(###) ###-####" id="phone"
                  required @input="form.phone = $event" :error="formErrors.phone" />
              </div>
              <div class="field">
                <InputField cta label="Email Address" placeHolder="jane.doe@example.com" id="email" required
                  @input="form.email = $event" :error="formErrors.email" />
              </div>
            </div>

            <div class="split">
              <div class="field">
                <DateField label="Appointment Date" placeHolder="Select a date" required
                  @input="form.date = $event" :error="formErrors.date" :schedule="selectedClinic?.schedule"
                  :holidays="selectedClinic?.holidays" />
              </div>
              <div class="field">
                <DropDownResponsive cta @input="form.preferred_time = $event" id="preferred_time" :list="[
                  'Anytime',
                  'Morning (7:00 AM – 12:00 PM)',
                  'Afternoon (12:00 PM – 4:00 PM)',
                  'Evening (4:00 PM – 7:00 PM)',
                ]" label="Appointment Time" placeHolder="Select preferred time" required
                  :error="formErrors.preferred_time" />
              </div>
            </div>

            <div class="field coverage">
              <RadioInputField pill @change="assignPayment($event)" style="width: 100%" title="Coverage"
                :options="['Insurance', 'Self Pay', 'Workers Compensation']" :checked="'Insurance'" id="payment"
                :error="formErrors.payment" />
            </div>
            <DropDownResponsive cta v-if="
              !(
                form.returning == 'Yes' ||
                form.payment == 'Workers Compensation'
              )
            " id="insurance" :list="insurancesList" label="Insurance Provider" placeHolder="Select your insurance"
              @input="form.insurance = $event" :disabled="isSelfPay()" :error="formErrors.insurance" />
            <InputField cta v-if="
              !(
                form.returning == 'Yes' ||
                form.payment == 'Workers Compensation'
              )
            " @input="form.memberId = $event" label="Member ID" placeHolder="e.g. A1B2C3D4" id="MemberId"
              :disabled="isSelfPay()" :error="formErrors.memberId" />

            <!-- WorkersCompensation -->
            <div class="split">
              <div class="field">
                <InputField cta v-if="form.payment === 'Workers Compensation'" @input="form.date_of_accident = $event"
                  label="Date of Accident" placeHolder="MM-DD-YYYY" mask="##-##-####" id="date_of_accident"
                  :error="formErrors.date_of_accident" date required min-year="-50" max-year="+0" />
              </div>
              <div class="field">
                <InputField cta v-if="form.payment === 'Workers Compensation'" @input="form.case_number = $event"
                  label="Case Number" placeHolder="e.g. WC-123456" id="case_number" :error="formErrors.case_number"
                  required />
              </div>
            </div>
            <div class="split">
              <div class="field">
                <InputField cta v-if="form.payment === 'Workers Compensation'" @input="form.lawyer_name = $event"
                  label="Lawyer Name" placeHolder="e.g. Jane Smith" id="lawyer_name" :error="formErrors.lawyer_name"
                  letterOnly required />
              </div>
              <div class="field">
                <InputField cta v-if="form.payment === 'Workers Compensation'"
                  @input="form.lawyer_phone_number = $event" label="Lawyer Phone Number"
                  placeHolder="(555) 000-0000" id="lawyer_phone_number" :error="formErrors.lawyer_phone_number"
                  mask="(###) ###-####" required />
              </div>
            </div>

            <InputField cta @input="form.pain = $event" height="9.75rem" label="Briefly describe your symptoms"
              placeHolder="Type your symptoms here..." id="pain" :error="formErrors.pain" />

            <DropDownResponsive cta @input="form.heardAboutUs = $event" id="heardAboutUs"
              :list="heardAboutUsOptions" label="How did you hear about PTOC" placeHolder="Select option" />

            <div class="form-footer">
              <div class="consent-checkbox">
                <!-- EditableText can't render as a <label> itself, so the checkbox and
                     text are nested inside a plain <label> instead - clicking the text
                     still toggles the checkbox via normal implicit label association. -->
                <label class="consent-label">
                  <input type="checkbox" id="marketing_consent" v-model="form.marketing_consent" />
                  <EditableText tag="p" content-key="booking.consent_text"
                    default="I agree to receive appointment reminders, health tips, and clinic news via email and SMS and I'm at least 18 years old. Your info is 100% secure—we never share your data. You can cancel anytime by replying STOP or clicking unsubscribe. Msg & data rates may apply." />
                </label>
              </div>
              <button type="button" :disabled="isLoading" @click="submit()" class="btn cta responsive submit-cta">
                <span v-if="isLoading">Submitting...</span>
                <EditableText v-else tag="span" content-key="booking.submit_label" class="submit-label" default="Submit appointment" />
              </button>
              <div class="phone-number">
              <EditableText tag='p' content-key="booking.phone_note" class="phone-note" default="We're here to help! If you'd prefer to book over the phone, just
                give us a call at:" />
                
                <EditableText tag="a" content-key="booking.phone_number" class="phone-note" href="tel:+17186480888" default=" (718) 648-0888"/>
                </div>
            </div>
          </div>

          <aside class="form-aside">
            <EditableImage class="aside-photo" content-key="booking.aside.image"
              default-src="/images/booking/booking-form-photo.png"
              default-alt="Patient balancing on a Bosu ball during physical therapy" />
            <!-- Desktop: plain eyebrow + links, matching the desktop Figma frame -->
            <div class="aside-contact">
              <EditableText tag="p" class="aside-eyebrow" content-key="booking.aside.eyebrow"
                default="Having issues? Contact us on" />
              <EditableText tag="a" content-key="booking.aside.phone" class="aside-line" href="tel:+17186480888" default="(718) 648-0888" />
              <EditableText tag="a" content-key="booking.aside.email" class="aside-line" href="mailto:info@ptofthecity.com" default="info@ptofthecity.com" />
            </div>

            <!-- Mobile: icon + label/value card, matching the mobile Figma
                 frame's "Get in Touch" block. Phone/email are plain hardcoded
                 links rather than EditableText - EditableText has no way to
                 set a default href, so click-to-call/email would break until
                 an admin manually configured one. -->
            <div class="aside-contact-mobile">
              <div class="contact-header">
                <EditableText tag="p" class="overline" content-key="booking.aside.overline_mobile" default="Get in Touch" />
                <EditableText tag="p" class="heading" content-key="booking.aside.heading_mobile" default="Having Issues?" />
              </div>
              <div class="contact-card">
                <a class="contact-row" href="tel:+17186480888">
                  <span class="icon"><img src="/images/booking/icons/phone.svg" alt="" aria-hidden="true" /></span>
                  <span class="text">
                    <span class="label">Call Support</span>
                    <span class="value">(718) 648-0888</span>
                  </span>
                </a>
                <a class="contact-row" href="mailto:info@ptofthecity.com">
                  <span class="icon"><img src="/images/booking/icons/mail.svg" alt="" aria-hidden="true" /></span>
                  <span class="text">
                    <span class="label">Email Support</span>
                    <span class="value">info@ptofthecity.com</span>
                  </span>
                </a>
              </div>
            </div>
          </aside>
        </div>

        <div class="paragraph" v-if="!NoParagraph">
          <EditableText tag="h3" class="smallHeader" content-key="booking.paragraph.heading"
            default="Top-Rated NYC Physical Therapy & Rehabilitation Experts" />
          <EditableText tag="p" content-key="booking.paragraph.body"
            default="As one of the highest-ranking physical therapy clinics in NYC, PT of the City is committed to proudly serving the NY community with world-class care. With 30+ convenient clinics spanning across Brooklyn, Manhattan, The Bronx, and Queens, expert recovery is always just around the corner. Our clinical team specializes in treating the most common conditions New Yorkers face, including back pain, neck stiffness, shoulder injuries, knee pain, and sciatica, as well as providing specialized post-operative rehabilitation. We understand that navigating healthcare in the city should be stress-free, which is why we accept all major insurance plans and offer a streamlined booking process to fit your busy schedule. Whether you are a professional athlete or a daily commuter, our mission is to provide personalized manual therapy and injury prevention to every neighborhood we call home. Experience why we are a leader in New York physical therapy—book your evaluation at any of our NYC locations today." />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
$gap: 2rem;
.submit-label{
  color:$white;
  font-weight:600;
}
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
  padding-top: calc($navbarHeight) !important;

  @media screen and (max-width: 870px) {
    padding-top: calc($navbarHeight - 7vh) !important;
    
  }

  .form-header {
    // max-width: 50rem;
    margin-bottom: 2rem;

    .heading {
      @include type-h2;
      color: $primary-600;
      text-transform: uppercase;
      margin: 0 0 0.75rem;
    }

    .tagline {
      @include type-body;
      color: $primary-700;
      margin: 0;
    }
  }

  .form-layout {
    display: flex;
    align-items: flex-start;
    gap: 4rem;
    margin-top: 1rem;

    @media screen and (max-width: 870px) {
      // Figma's mobile frame runs the whole form first, then the "Having
      // Issues" contact card last - column-reverse had it backwards (aside,
      // with its now-hidden photo, rendering before the form).
      flex-direction: column;
      gap: 2rem;
    }
  }

  .form-main {
    flex: 1;
    min-width: 0;
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

    :deep(.input-field),
    :deep(.booking-input-field) {
      border: 1px solid rgba(3, 41, 46, 0.2);
      border-radius: 0;
      font-family: $font-poppins;
      font-size: 1.15rem;
      color: $primary-700;
      background-color: $white;

      &.ctac {
        border: 1px solid rgba(3, 41, 46, 0.2);
      }

      @media screen and (max-width: 800px) {
        border: 1.5px solid rgba(3, 41, 46, 0.13);
        border-radius: 0;
      }
    }
  }

  .form-aside {
    width: 24rem;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    position: sticky;
    top: calc($navbarHeight + 2rem);

    @media screen and (max-width: 870px) {
      width: 100%;
      position: static;
    }

    .aside-photo {
      width: 100%;
      height: auto;
      border-radius: 1rem;
      background-color: $surface-teal-pale;
      display: block;

      // Figma's mobile frame drops the photo entirely - only the "Having
      // Issues" contact card carries over to mobile.
      @media screen and (max-width: 870px) {
        display: none;
      }
    }

    .aside-contact {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      .aside-eyebrow {
        @include type-overline;
        color: $primary-700;
        margin: 0;
      }

      .aside-line {
        @include type-body;
        color: $primary-700;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }

      @media screen and (max-width: 870px) {
        display: none;
      }
    }

    .aside-contact-mobile {
      display: none;

      @media screen and (max-width: 870px) {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .contact-header {
        display: flex;
        flex-direction: column;
        gap: 0.375rem;
        text-transform: uppercase;

        .overline {
          @include type-overline;
          color: $primary-700;
          margin: 0;
        }

        .heading {
          @include type-large;
          color: $primary-700;
          margin: 0;
        }
      }

      .contact-card {
        display: flex;
        flex-direction: column;
        gap: 0.875rem;
        padding: 1rem;
        border: 1px solid rgba(3, 41, 46, 0.13);
        border-radius: 1rem;
        background-color: $white;
      }

      .contact-row {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        text-decoration: none;

        .icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.25rem;
          height: 2.25rem;
          flex-shrink: 0;

          img {
            width: 1.125rem;
            height: 1.125rem;
          }
        }

        .text {
          display: flex;
          flex-direction: column;
        }

        .label {
          @include type-body;
          color: $primary-700;
        }

        .value {
          @include type-button;
          color: $primary-700;
        }
      }
    }
  }
}


.form-footer {
  width: 100%;
  // max-width: 50rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1rem;

  .submit-cta {
    background-color: $primary-400;
    color: $white;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: darken($primary-400, 8%);
    }

    &:disabled {
      opacity: 0.6;
      cursor: progress;
    }

    @media screen and (max-width: 800px) {
      padding: 2.5rem 0rem;
      font-size: 1.5rem;
    }
  }

  .consent-checkbox {
    .consent-label {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      cursor: pointer;
    }

    input[type="checkbox"] {
      appearance: none;
      width: 1.4rem;
      height: 1.4rem;
      min-width: 1.4rem;
      margin-top: 0.2rem;
      border-radius: 50%;
      border: 1px solid $primary-600;
      box-shadow: 0px 0px 6.7px 0px rgba(44, 50, 51, 0.5) inset;
      cursor: pointer;

      &:checked {
        background-color: $primary-base;
      }
    }

    :deep(p) {
      @include type-body;
      color: $primary-700;
      margin: 0;
    }
  }

  .phone-note {
    @include type-caption;
    color: $primary-700;

    a {
      color: $primary-400;
      font-weight: 600;
    }
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
  padding-bottom:5rem;
}

.phone-number{
  display:flex;
  flex-wrap: wrap;
  
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
