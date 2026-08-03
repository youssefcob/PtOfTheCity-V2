import { ref, readonly, type Ref } from 'vue';

// reCAPTCHA state
const isLoaded = ref(false);
const isExecuting = ref(false);
const error = ref<string | null>(null);

export const useRecaptcha = () => {
  // Get the site key from runtime config
  const config = useRuntimeConfig();
  const SITE_KEY = config.public.recaptchaSiteKey;

  // Load reCAPTCHA script
  const loadRecaptcha = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (isLoaded.value) {
        resolve();
        return;
      }

      if (typeof window === 'undefined') {
        reject(new Error('reCAPTCHA can only be loaded on client-side'));
        return;
      }

      if (!SITE_KEY) {
        console.error('reCAPTCHA site key not configured. Please set RECAPTCHA_SITE_KEY in your .env file');
        reject(new Error('reCAPTCHA site key not configured'));
        return;
      }

      // Check if script is already loaded
      if (window.grecaptcha) {
        isLoaded.value = true;
        resolve();
        return;
      }

      // Create script element
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
      script.async = true;
      script.defer = true;

      script.onload = () => {
        // console.log('reCAPTCHA script loaded successfully');
        isLoaded.value = true;
        resolve();
      };

      script.onerror = () => {
        const errorMsg = 'Failed to load reCAPTCHA script';
        console.error(errorMsg);
        error.value = errorMsg;
        reject(new Error(errorMsg));
      };

      document.head.appendChild(script);
    });
  };

  // Execute reCAPTCHA and return token
  const executeRecaptcha = async (action: string = 'submit'): Promise<string | null> => {
    try {
      isExecuting.value = true;
      error.value = null;

      // console.log('Executing reCAPTCHA with action:', action);

      if (!SITE_KEY) {
        console.error('reCAPTCHA site key not configured. Please set RECAPTCHA_SITE_KEY in your .env file');
        throw new Error('reCAPTCHA site key not configured');
      }

      // Load reCAPTCHA if not already loaded
      await loadRecaptcha();

      if (!window.grecaptcha) {
        console.error('reCAPTCHA not available after loading');
        throw new Error('reCAPTCHA not available');
      }

      // console.log('Executing reCAPTCHA...');
      // Execute reCAPTCHA and return the token
      const token = await window.grecaptcha.execute(SITE_KEY, { action });
      
      if (!token) {
        console.error('Failed to get reCAPTCHA token');
        throw new Error('Failed to get reCAPTCHA token');
      }

      // console.log('reCAPTCHA token generated successfully');
      return token;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'reCAPTCHA execution failed';
      console.error('reCAPTCHA error:', err);
      error.value = errorMsg;
      return null;
    } finally {
      isExecuting.value = false;
    }
  };

  return {
    isLoaded: readonly(isLoaded),
    isExecuting: readonly(isExecuting),
    error: readonly(error),
    loadRecaptcha,
    executeRecaptcha
  };
};

// Add global types for reCAPTCHA
declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
      render: (container: string | HTMLElement, options: any) => number;
    };
  }
} 