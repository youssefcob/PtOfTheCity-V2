<script setup lang="ts">
const username = ref('');
const password = ref('');
const errorMessage = ref('');
const loading = ref(false);

const { login } = useAdminAuth();

const onSubmit = async () => {
  errorMessage.value = '';
  loading.value = true;
  try {
    await login(username.value, password.value);
    // Full reload so the homepage's page-bootstrap fetch re-runs with the
    // freshly-stored admin token and picks up isContentEditor: true.
    window.location.href = '/';
  } catch (err: any) {
    errorMessage.value = err?.data?.message || err?.message || 'Login failed';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="admin-login">
    <form class="admin-login-card" @submit.prevent="onSubmit">
      <h1>Content Editor Login</h1>
      <label>
        <span>Phone number</span>
        <input v-model="username" type="text" autocomplete="username" required />
      </label>
      <label>
        <span>Password</span>
        <input v-model="password" type="password" autocomplete="current-password" required />
      </label>
      <p v-if="errorMessage" class="admin-login-error">{{ errorMessage }}</p>
      <button type="submit" :disabled="loading">{{ loading ? 'Signing in…' : 'Sign In' }}</button>
    </form>
  </div>
</template>

<style scoped lang="scss">
.admin-login {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  padding: 2rem 1.5rem;
}

.admin-login-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 22rem;
  padding: 2rem;
  border-radius: 0.75rem;
  background: #ffffff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);

  h1 {
    font-size: 1.25rem;
    font-weight: 700;
    color: #142235;
    margin-bottom: 0.5rem;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    font-size: 0.85rem;
    color: #142235;
  }

  input {
    padding: 0.7rem 0.9rem;
    border-radius: 0.5rem;
    border: 1px solid rgba(0, 0, 0, 0.15);
    font-size: 0.95rem;

    &:focus {
      outline: none;
      border-color: #ff9b37;
    }
  }

  button {
    margin-top: 0.5rem;
    padding: 0.85rem;
    border: none;
    border-radius: 80px;
    background-color: #142235;
    color: #ffffff;
    font-weight: 600;
    cursor: pointer;

    &:hover {
      background-color: #0f2b3d;
    }

    &:disabled {
      opacity: 0.6;
      cursor: default;
    }
  }
}

.admin-login-error {
  color: #c0392b;
  font-size: 0.85rem;
}
</style>
