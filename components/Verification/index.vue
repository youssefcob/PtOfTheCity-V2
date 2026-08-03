<template>
  <div class="container">
    <div class="form-wrapper">
      <span class="form-header">
        Verify Your Email
      </span>
      <p class="text">Enter the six digit code you received</p>

      <verification-o-t-p-field v-model="otp" />

      <button 
        class="btn cta submit"
        :disabled="!isOtpComplete || isLoading"
        @click="handleVerify"
      >
        {{ isLoading ? 'Loading...' : 'Confirm' }}
      </button>

      <span 
        class="resend" 
        :class="{ 'active': canResend }"
        @click="handleResend"
      >
        {{ canResend ? 'Resend Code' : `Resend Code ${countdown}s` }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
const isLoading = ref(false);
const countdown = ref(30);
const canResend = ref(false);
let interval: any = null;
const otp = ref('');
const toast = useToast();
const { apiFetch } = useApi();
const { fetchUser } = useAuth();
const router = useRouter();

const isOtpComplete = computed(() => otp.value.length === 6);

watch(otp, (newVal) => {
  console.log('OTP changed:', newVal);
});

// Verify OTP
const handleVerify = async () => {
  if (!isOtpComplete.value || isLoading.value) return;

  isLoading.value = true;
  
  try {
    await apiFetch('/auth/verify-otp', {
      method: 'POST',
      body: { otp: otp.value }
    });

    toast.success({message:'Email verified successfully!'});
    
    // Refresh user data to update verification status
    await fetchUser();
    
    // Redirect to dashboard
    router.push('/dashboard');
  } catch (error: any) {
    console.error('Verification error:', error);
    toast.error(error.data?.message || 'Invalid or expired code');
    otp.value = ''; // Clear the OTP on error
  } finally {
    isLoading.value = false;
  }
};

// Resend OTP
const handleResend = async () => {
  if (!canResend.value) return;


  try {
    startCountdown();

    await apiFetch('/auth/get-verification-otp', {
      method: 'GET'
    });

    toast.success({message:'Verification code sent!'});
  } catch (error: any) {
    console.error('Resend error:', error);
    toast.error(error.data?.message || 'Failed to resend code');
  }
};

const startCountdown = () => {
  canResend.value = false;
  countdown.value = 30;

  interval = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value -= 1;
    } else {
      canResend.value = true;
      if (interval) clearInterval(interval);
    }
  }, 1000);
};

onMounted(() => {
  startCountdown();
});

onUnmounted(() => {
  if (interval) clearInterval(interval);
});
</script>

<style scoped lang="scss">
.container {
  padding: 2rem;
  border-radius: 18px;
  background: rgba(16, 53, 53, 0.50);
  backdrop-filter: blur(20px);
  position: relative;
  // min-height: 70vh;
  /* Make this a container */
  display: flex;
  align-items: center;
  // justify-content: center;
  padding: 16rem ;

  @media screen and (max-width: 600px) {
    padding: 16rem 5rem;

  }

  .form-wrapper {
    width: 100%;
    container-type: inline-size;
    display: flex;
    flex-direction: column;
    position: relative;
    justify-content: center;
    span,p{
      color:white;
      // text-align: center;
    }

    .form-header{
      font-size: 5rem;
      font-weight: 300;
      margin-bottom: 1rem;
    }
    .text{
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }
    button.submit{
      margin-top: 3rem;
      width: 100%;
      height: 5rem;
      font-size: 1.8rem;
      align-self: center;
      max-width:30rem;
    }
    .resend{
      align-self: center;
      margin-top: 2rem;
      font-weight: 600;
      &.active{
        cursor: pointer;
        text-decoration: underline;
      }
    }



  }
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

}
</style>