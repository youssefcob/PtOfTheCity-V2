<template>
  <Modal ref="changeNameModal">
    <profile-edit-name/>
  </Modal>
  <Modal ref="changeEmailModal">
    <profile-edit-email/>
  </Modal>
  <Modal ref="changePasswordModal">
    <profile-edit-password/>
  </Modal>
  <div class="profile-container">
    <div class="header">
      <button class="btn cta"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="23" viewBox="0 0 12 23"
          fill="none">
          <path d="M10.3333 0.75L0.749919 11.375L10.3333 22" stroke="#103535" stroke-width="1.5" stroke-linecap="round"
            stroke-linejoin="round" />
        </svg></button>
      <h1>Profile Information</h1>
    </div>
    <div class="user-info">
      <div class="card" >
        <span class="label">name</span>
        <p class="value">{{ user?.first_name }} {{ user?.last_name }}</p>

      </div>
      <div class="card" @click="changeEmailModal?.openModal()">
        <span class="label">email</span>
        <p class="value">{{ user?.email }}</p>

      </div>
      <div class="card" @click="changePasswordModal?.openModal()">
        <span class="label">password</span>
        <p class="value">************</p>

      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import Modal from '~/sharedComponents/modal.vue';

let user = useAuth().user;

const changeNameModal = ref<InstanceType<typeof Modal> | null>(null);
const changeEmailModal = ref<InstanceType<typeof Modal> | null>(null);
const changePasswordModal = ref<InstanceType<typeof Modal> | null>(null);

</script>

<style scoped lang="scss">
.profile-container {
  width: 70%;

  @media screen and (max-width: 600px) {
    width: 90%;
  }

  .header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;

    h1 {
      color: white;
      font-size: 3rem;
      font-weight: 400;
    }

    .btn {
      width: 4rem;
      height: 4rem;
      aspect-ratio: 1/1;
    }
  }

  .user-info {
    display: flex;
    flex-direction: column;

    .card {
      background-color: white;
      padding: 1rem;
      border-radius: 8px;
      margin-top: 1rem;
      cursor: pointer;
      &:hover {
        background-color: #f0f0f0;
      }

      .label {
        font-size: 0.75rem;
        color: $black;
      }

      .value {
        font-size: 1.5rem;
        font-weight: 700;
        color: $black;
      }
    }
  }
}
</style>