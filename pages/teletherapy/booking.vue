<script setup lang="ts">
const { apiFetch } = useApi();
const toast = useToast();

const today = new Date().toISOString().split("T")[0];
const maxDateOfBirth = new Date(
  new Date().getFullYear() - 5,
  new Date().getMonth(),
  new Date().getDate(),
)
  .toISOString()
  .split("T")[0];

const form = reactive({
  service: "",
  patientType: "",
  state: "New York",
  zipCode: "",
  address: "",
  preferredDate: "",
  timeSlot: "",
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  legalGender: "",
  phoneNumber: "",
  email: "",
  paymentMethod: "",
  insuranceProvider: "",
  memberId: "",
  insuranceCard: null as File | null,
  smsConsent: false,
});

const isSubmitting = ref(false);

const services = [
  
  "Orthopedic Rehabilitation",
  "Sports Rehabilitation",
  "Stroke & Neurological Rehabilitation",
  "Pelvic Floor Rehabilitation",
  "Vestibular Rehabilitation",
  "Hand Therapy",
  
  "GAIT Training",
  
  "Functional Capacity Evaluation",
  "Occupational Therapy",
];

const states = ["New York"];
const genders = ["Male", "Female", "Prefer not to say"];
const paymentMethods = ["Insurance", "Self-Pay"];


const insuranceProviders = [
    "1199",
    "Aetna",
    "Affinity by Molina healthcare",
    "Amida care",
    "Anthem BCBS",
    "ArchCare",
    "BCBS healthplus (AmeriGroup)",
    "Bluecorss Blue shield (BCBS)",
    "Centerlight",
    "Centers Plan for Healthy Living",
    "Centivo",
    "Christian Brothers",
    "Cigna",
    "Elderplan",
    "Emblem GHI",
    "Emblemhealth",
    "Fidelis Care",
    "Fidelis Care",
    "Hamaspik Choice",
    "HealthFirst",
    "Humana",
    "Magnacare",
    "Medicaid",
    "Medicare",
    "Medrisk",
    "Metroplus",
    "Molina healthcare",
    "OneCall",
    "optum",
    "oscar",
    "Partnerhealthplans",
    "Riverspring (Elderserve)",
    "SENIOR WHOLE HEALTH",
    "StreamLine",
    "Tricare",
    "UMR",
    "United healthcare All plans",
    "United healthcare Oxford",
    "VA Community Care Network",
    "Village Care Max",
    "VNS Choice",
    "Wellcare",
];
const timeSlots = [
  "9:00 AM - 9:30 AM",
  "9:30 AM - 10:00 AM",
  "10:00 AM - 10:30 AM",
  "10:30 AM - 11:00 AM",
  "11:00 AM - 11:30 AM",
  "11:30 AM - 12:00 PM",
  "12:00 PM - 12:30 PM",
  "12:30 PM - 1:00 PM",
  "1:00 PM - 1:30 PM",
  "1:30 PM - 2:00 PM",
  "2:00 PM - 2:30 PM",
  "2:30 PM - 3:00 PM",
  "3:00 PM - 3:30 PM",
  "3:30 PM - 4:00 PM",
  "4:00 PM - 4:30 PM",
  "4:30 PM - 5:00 PM",
];

const handleInsuranceCardUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  form.insuranceCard = target.files?.[0] || null;
};

const getReadableErrorMessage = (error: any) => {
  
  
  if (error?.data?.message) {
    return error.data.message;
  }
  if (error?.status === 500) {
    return "something went wrong pls try again later";
  }
  
  if (typeof error?.message === "string") {
    const parts = error.message.split(": ");
    return parts[parts.length - 1] || error.message;
  }

  return "Failed to submit booking request.";
};

const formatDateOfBirthForApi = (value: string) => {
  if (!value) return "";

  const [year, month, day] = value.split("-");
  if (!year || !month || !day) return value;

  return `${month}/${day}/${year}`;
};

const enforceNumericZipCode = (event: Event) => {
  const target = event.target as HTMLInputElement;
  form.zipCode = target.value.replace(/\D/g, "");
};

const enforcePhoneNumberInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  let digits = target.value.replace(/\D/g, "");

  if (digits.length > 11) {
    digits = digits.slice(0, 11);
  }

  if (digits.length === 11 && digits.startsWith("1")) {
    digits = digits.slice(1);
  }

  if (digits.length <= 3) {
    form.phoneNumber = digits;
    return;
  }

  if (digits.length <= 6) {
    form.phoneNumber = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return;
  }

  form.phoneNumber = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
};

const validateForm = () => {
  const errors: string[] = [];
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneDigits = form.phoneNumber.replace(/\D/g, "");
  const allowedImageTypes = ["image/jpeg", "image/png"];

  if (!form.service) errors.push("Please select a service");
  if (!form.patientType) errors.push("Please select if this is your first time with us");
  if (!form.state) errors.push("State of residence is required");
  if (!form.preferredDate) errors.push("Preferred date is required");
  if (!form.timeSlot) errors.push("Available time slot is required");
  if (!form.firstName) errors.push("First name is required");
  if (!form.lastName) errors.push("Last name is required");
  if (!form.dateOfBirth) errors.push("Date of birth is required");
  if (!form.legalGender) errors.push("Legal gender is required");
  if (!form.phoneNumber) errors.push("Phone number is required");
  if (!form.email) errors.push("Email address is required");
  if (!form.paymentMethod) errors.push("Please select how you would like to cover your visit");

  if (form.zipCode && !/^\d+$/.test(form.zipCode)) {
    errors.push("Zip code must contain numbers only");
  }

  if (form.preferredDate && form.preferredDate < today) {
    errors.push("Preferred date cannot be in the past");
  }

  if (form.dateOfBirth && form.dateOfBirth > maxDateOfBirth) {
    errors.push("Date of birth must be at least 5 years before today");
  }

  if (form.email && !emailPattern.test(form.email)) {
    errors.push("Please enter a valid email address");
  }

  if (
    form.phoneNumber &&
    !(phoneDigits.length === 10 || (phoneDigits.length === 11 && phoneDigits.startsWith("1")))
  ) {
    errors.push("Please enter a valid phone number");
  }

  if (form.paymentMethod === "Insurance") {
    if (!form.insuranceProvider) errors.push("Insurance provider name is required");
    if (!form.memberId) errors.push("Member ID / Policy Number is required");
    if (!form.insuranceCard) errors.push("Insurance card is required");
    if (form.insuranceCard && !allowedImageTypes.includes(form.insuranceCard.type)) {
      errors.push("Insurance card must be a JPG or PNG image");
    }
    if (form.insuranceCard && form.insuranceCard.size > 2 * 1024 * 1024) {
      errors.push("Insurance card must be smaller than 2MB");
    }
  }

  if (errors.length) {
    toast.error({ message: [...new Set(errors)][0] });
    return false;
  }

  return true;
};

const handleSubmit = async () => {
  if (isSubmitting.value) return;

  const isValid = validateForm();
  if (!isValid) return;

  isSubmitting.value = true;

  try {
    const payload = new FormData();

    payload.append("service", form.service);
    payload.append("patientType", form.patientType);
    payload.append("state", form.state);
    payload.append("zipCode", form.zipCode);
    payload.append("address", form.address);
    payload.append("preferredDate", form.preferredDate);
    payload.append("timeSlot", form.timeSlot);
    payload.append("firstName", form.firstName);
    payload.append("lastName", form.lastName);
    payload.append("dateOfBirth", form.dateOfBirth);
    payload.append("legalGender", form.legalGender);
    payload.append("phoneNumber", form.phoneNumber);
    payload.append("email", form.email);
    payload.append("paymentMethod", form.paymentMethod);
    payload.append("smsConsent", form.smsConsent ? "1" : "0");

    if (form.insuranceProvider) {
      payload.append("insuranceProvider", form.insuranceProvider);
    }

    if (form.memberId) {
      payload.append("memberId", form.memberId);
    }

    if (form.insuranceCard) {
      payload.append("insuranceCard", form.insuranceCard);
    }

    await apiFetch("/telehealth/booking", {
      method: "POST",
      body: payload,
    });

    await navigateTo("/telehealth/success");
  } catch (error: any) {
    toast.error({
      message: getReadableErrorMessage(error),
    });
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="telehealth-booking-page">
    <section class="booking-hero">
      <div class="hero-copy">
        <h1>Start Your Recovery At Home Today</h1>
        <p>Major insurance plans accepted.</p>
      </div>
    </section>

    <section class="booking-form-section">
      <form class="booking-form" @submit.prevent="handleSubmit">
        <div class="field full">
          <label for="service-selection">How can we help you today?<span>*</span></label>
          <div class="select-wrap">
            <select id="service-selection" v-model="form.service">
              <option disabled value="">Select a service</option>
              <option v-for="service in services" :key="service" :value="service">
                {{ service }}
              </option>
            </select>
          </div>
        </div>

        <div class="radio-row full">
          <span class="radio-label">Is this your first time with us? <span>*</span></span>
          <label class="radio-option">
            <input
              v-model="form.patientType"
              type="radio"
              value="Yes, I am a new patient"
            />
            <span>Yes, I am a new patient</span>
          </label>
          <label class="radio-option">
            <input
              v-model="form.patientType"
              type="radio"
              value="No, I have visited your clinics before"
            />
            <span>No, I have visited your clinics before</span>
          </label>
        </div>

        <div class="field">
          <label for="state">State of Residence<span>*</span></label>
          <div class="select-wrap">
            <select id="state" v-model="form.state">
              <option v-for="state in states" :key="state" :value="state">
                {{ state }}
              </option>
            </select>
          </div>
        </div>

        <div class="field">
          <label for="zip-code">Zip Code</label>
          <input
            id="zip-code"
            v-model="form.zipCode"
            type="text"
            inputmode="numeric"
            placeholder="Enter Your Zip Code"
            @input="enforceNumericZipCode"
          />
        </div>

        <div class="field full">
          <label for="address">Home Address</label>
          <input
            id="address"
            v-model="form.address"
            type="text"
            placeholder="Enter home address and Apt/Suite number"
          />
        </div>

        <div class="field">
          <label for="preferred-date">Preferred date<span>*</span></label>
          <input
            id="preferred-date"
            v-model="form.preferredDate"
            type="date"
            :min="today"
          />
          <small>Select a day that works best for your virtual visit.</small>
        </div>

        <div class="field">
          <label for="time-slot">Available Time Slots<span>*</span></label>
          <div class="select-wrap">
            <select id="time-slot" v-model="form.timeSlot">
              <option disabled value="">Select a time slot</option>
              <option v-for="slot in timeSlots" :key="slot" :value="slot">
                {{ slot }}
              </option>
            </select>
          </div>
          <small>All times are shown in Eastern Time (ET) - New York.</small>
        </div>

        <div class="field">
          <label for="first-name">First Name <span>*</span></label>
          <input
            id="first-name"
            v-model="form.firstName"
            type="text"
            placeholder="Enter Your First name"
          />
        </div>

        <div class="field">
          <label for="last-name">Last Name <span>*</span></label>
          <input
            id="last-name"
            v-model="form.lastName"
            type="text"
            placeholder="Enter Your Last name"
          />
        </div>

        <div class="field">
          <label for="date-of-birth">Date of Birth<span>*</span></label>
          <input
            id="date-of-birth"
            v-model="form.dateOfBirth"
            type="date"
            :max="maxDateOfBirth"
          />
        </div>

        <div class="field">
          <label for="legal-gender">Legal Gender<span>*</span></label>
          <div class="select-wrap">
            <select id="legal-gender" v-model="form.legalGender">
              <option disabled value="">Select your Gender</option>
              <option v-for="gender in genders" :key="gender" :value="gender">
                {{ gender }}
              </option>
            </select>
          </div>
        </div>

        <div class="field">
          <label for="phone-number">Phone Number<span>*</span></label>
          <input
            id="phone-number"
            v-model="form.phoneNumber"
            type="tel"
            inputmode="tel"
            placeholder="Enter Your Phone Number"
            @input="enforcePhoneNumberInput"
          />
        </div>

        <label class="consent full sms-consent">
          <input v-model="form.smsConsent" type="checkbox" />
          <span>
            I agree to receive SMS reminders and updates regarding my
            appointments. Standard messaging rates may apply.
          </span>
        </label>

        <div class="field full">
          <label for="email-address">Email Address<span>*</span></label>
          <input
            id="email-address"
            v-model="form.email"
            type="email"
            placeholder="Enter Your Email Address"
          />
          <small>
            Your secure Telehealth meeting link (Google Meet/Platform) will be
            sent to this email address. Please ensure it is an address you check
            frequently.
          </small>
        </div>

        <div class="radio-row full payment-row">
          <span class="radio-label">How would you like to cover your visit?<span>*</span></span>
          <label class="radio-option">
            <input v-model="form.paymentMethod" type="radio" value="Insurance" />
            <span>Insurance</span>
          </label>
          <label class="radio-option">
            <input
              v-model="form.paymentMethod"
              type="radio"
              value="Self-Pay"
            />
            <span>Self-Pay (Flat Rate)</span>
          </label>
        </div>

        <template v-if="form.paymentMethod === 'Insurance'">
          <div class="field full">
            <label for="insurance-provider">Insurance Provider Name<span>*</span></label>
            <div class="select-wrap">
              <select id="insurance-provider" v-model="form.insuranceProvider">
                <option disabled value="">Select insurance provider</option>
                <option
                  v-for="provider in insuranceProviders"
                  :key="provider"
                  :value="provider"
                >
                  {{ provider }}
                </option>
              </select>
            </div>
          </div>

          <div class="field">
            <label for="member-id">Member ID / Policy Number<span>*</span></label>
            <input
              id="member-id"
              v-model="form.memberId"
              type="text"
              placeholder="Enter Member ID / Policy Number"
            />
          </div>

          <div class="field">
            <label for="insurance-card">Upload Insurance Card<span>*</span></label>
            <input
              id="insurance-card"
              type="file"
              accept=".jpg,.jpeg,.png,image/jpeg,image/png"
              @change="handleInsuranceCardUpload"
            />
          </div>
        </template>

        <div v-else-if="form.paymentMethod === 'Self-Pay'" class="notice-box full">
          The session fee is $50 for a 30 mintues session or $75 for a 60 mintues
          session. You will receive a secure payment link.
        </div>
        <div class="cta-row full">
          <div class="submit-wrap">
            <button type="submit" class="btn cta submit-btn" :disabled="isSubmitting">
              {{ isSubmitting ? "Submitting..." : "Book Appointment" }}
            </button>
          </div>
          
          <p class="booking-help">
            We're here to help! If you'd prefer to book over the phone, just give
            us a call at: <a href="tel:7186480888">718-648-0888</a>
          </p>
        </div>
      </form>
    </section>
  </div>
</template>

<style scoped lang="scss">
.telehealth-booking-page {
  background: #fff;
  min-height: 100%;
  padding-bottom: 4rem;
}

.booking-hero {
  margin-top: 4rem;
  min-height: 22rem;
  display: flex;
  align-items: center;
  background:
    linear-gradient(90deg, rgba(44, 50, 51, 0.9) 0%, rgba(44, 50, 51, 0.55) 42%, rgba(44, 50, 51, 0.08) 100%),
    url("/images/telehealth/booking-hero.png");
  background-size: cover;
  background-position: center;
}

.hero-copy {
  @include pagePadding;
  width: 100%;

  h1 {
    max-width: 50rem;
    color: #fff;
    font-size: clamp(2.8rem, 4vw, 4.2rem);
    line-height: 1.02;
    margin-bottom: 1.25rem;
  }

  p {
    max-width: 26rem;
    color: #fff;
    font-size: clamp(1.6rem, 2.2vw, 2.5rem);
    line-height: 1.2;
  }
}

.booking-form-section {
  @include pagePadding;
  padding-top: 4.5rem;
}

.booking-form {
  max-width: 51rem;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.25rem 1rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;

  &.full {
    grid-column: 1 / -1;
  }

  label {
    color: #103535;
    font-size: 1.1rem;
    font-weight: 600;

    span {
      color: #f24e4e;
    }
  }

  small {
    color: #103535;
    font-size: 0.95rem;
    line-height: 1.4;
  }
}

.cta-row {
  grid-column: 1 / -1;
  width: 100%;
}

.booking-form input,
.booking-form select,
.booking-form input[type="file"] {
  width: 100%;
  min-height: 3.95rem;
  border-radius: 1rem;
  border: 1.5px solid #38d7bf;
  background: #fff;
  padding: 0 1.05rem;
  font-size: 1rem;
  color: #103535;
  outline: none;
}

.booking-form input::placeholder,
.booking-form select {
  color: #8ca0a2;
}

.booking-form input[type="file"] {
  padding: 0.8rem 1.05rem;
}

.select-wrap {
  position: relative;

  select {
    appearance: none;
    cursor: pointer;
    padding-right: 3rem;
  }

  &::after {
    content: "";
    position: absolute;
    right: 1rem;
    top: 50%;
    width: 0.6rem;
    height: 0.6rem;
    border-right: 1.5px solid #103535;
    border-bottom: 1.5px solid #103535;
    transform: translateY(-65%) rotate(45deg);
    pointer-events: none;
  }
}

.radio-row {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.9rem;
  padding: 0.4rem 0 1.2rem;
}

.radio-label {
  color: #103535;
  font-size: 1.1rem;
  font-weight: 600;

  span {
    color: #f24e4e;
  }
}

.radio-option {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  color: #103535;
  font-size: 1rem;

  input {
    width: 1.35rem;
    min-width: 1.35rem;
    height: 1.35rem;
    min-height: 1.35rem;
    padding: 0;
    accent-color: #38d7bf;
  }
}

.consent {
  grid-column: 1 / -1;
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
  margin-top: 0.8rem;

  input {
    width: 1.35rem;
    min-width: 1.35rem;
    height: 1.35rem;
    min-height: 1.35rem;
    margin-top: 0.12rem;
    accent-color: #38d7bf;
  }

  span {
    color: #103535;
    font-size: 0.98rem;
    line-height: 1.7;
  }
}

.sms-consent {
  margin-top: -0.2rem;
}

.notice-box {
  grid-column: 1 / -1;
  background: #f2fffc;
  border: 1.5px solid #38d7bf;
  border-radius: 1rem;
  padding: 1rem 1.1rem;
  color: #103535;
  font-size: 1rem;
  line-height: 1.6;
}

.submit-wrap {
  display: flex;
  justify-content: stretch;
  margin-top: 1rem;
  width: 100%;
}

.submit-btn {
  width: 100%;
  min-height: 4.9rem;
  border-radius: 1.35rem;
  font-size: 1.3rem;
}

.booking-help {
  color: #103535;
  font-size: 1.1rem;
  line-height: 1.7;
  margin-top: 0.1rem;
  width: 100%;

  a {
    color: #0b998f;
    text-decoration: underline;
    text-underline-offset: 0.15rem;
  }
}

@media screen and (max-width: 800px) {
  .booking-hero {
    min-height: 18rem;
  }

  .hero-copy h1 {
    max-width: 21rem;
  }

  .hero-copy p {
    max-width: 18rem;
    font-size: 1.55rem;
  }

  .booking-form {
    grid-template-columns: 1fr;
  }
}
</style>
