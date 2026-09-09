<script setup lang="ts">
import EditableText from '~/components/Admin/EditableText.vue';

const promises = [
  { key: 'plain_language', default: "We'll explain your benefits in plain language." },
  { key: 'billing_questions', default: "We'll answer your billing questions." },
  { key: 'submit_claims', default: "We'll submit claims directly to your insurance provider." },
  { key: 'financial_responsibility', default: "We'll help you understand your financial responsibility before treatment begins." },
];

const specs = [
  { key: 'plan', value: 'PPO', label: 'Insurance Plan' },
  { key: 'deductible', value: '$250 Annual', label: 'Deductible' },
  { key: 'verification', value: 'Insurance Verification', label: "We'll verify your benefits and confirm your coverage before your appointment." },
  { key: 'copay', value: '$25 Per Visit', label: 'Copay' },
  { key: 'coinsurance', value: '20%', label: 'Coinsurance' },
  { key: 'visit_limit', value: '60 Visits Per Year', label: 'Visit Limit' },
  { key: 'out_of_pocket', value: '$3,000 Annual', label: 'Out-of-Pocket Maximum' },
];
</script>

<template>
  <div class="coverage">
    <div class="coverage-main">
      <div class="coverage-header">
        <EditableText tag="span" class="eyebrow" content-key="insurances.coverage.eyebrow"
          default="We Accept Most Major Insurance Plans" />
        <EditableText tag="h2" class="title" content-key="insurances.coverage.title"
          default="Coverage You Can Count On." />
        <EditableText tag="p" class="description" content-key="insurances.coverage.description"
          default="If your insurance requires a referral, we'll help make the process as easy as possible—from contacting your physician to scheduling your first appointment." />
      </div>

      <div class="promise">
        <EditableText tag="p" class="promise-title" content-key="insurances.coverage.promise_title"
          default="Our Promise" />
        <ul class="promise-list">
          <li v-for="item in promises" :key="item.key">
            <EditableText tag="span" :content-key="`insurances.coverage.promise_${item.key}`" :default="item.default" />
          </li>
        </ul>
      </div>
    </div>

    <div class="specs">
      <div class="spec" v-for="spec in specs" :key="spec.key">
        <EditableText tag="p" class="spec-value" :content-key="`insurances.coverage.spec_${spec.key}_value`"
          :default="spec.value" />
        <EditableText tag="p" class="spec-label" :content-key="`insurances.coverage.spec_${spec.key}_label`"
          :default="spec.label" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.coverage {
  @include pagePadding();
  padding-top: 5rem;
  padding-bottom: 5rem;
  display: flex;
  gap: 2.5rem;
  background-color: $white;

  @media screen and (max-width: 1100px) {
    flex-direction: column;
  }
}

.coverage-main {
  width: 65%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  border-left: 1px solid $primary-base;
  padding: 1rem 1.5rem;

  @media screen and (max-width: 1100px) {
    width: 100%;
  }
}

.coverage-header {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .eyebrow {
    @include type-overline;
    color: $primary-700;
  }

  .title {
    @include type-h2;
    color: $primary-600;
    margin: 0;
  }

  .description {
    @include type-body;
    color: $primary-700;
    margin: 0;
  }
}

.promise {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .promise-title {
    @include type-large;
    color: $primary-600;
    text-transform: uppercase;
    margin: 0;
  }

  .promise-list {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
    margin: 0;
    padding-left: 1.5rem;

    li {
      @include type-body;
      color: $primary-700;
      list-style: disc;
    }
  }
}

.specs {
  width: 35%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media screen and (max-width: 1100px) {
    width: 100%;
  }

  @media screen and (max-width: 700px) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .spec {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    border-left: 1px solid $primary-base;
    padding: 1rem 1.5rem;

    .spec-value {
      @include type-large;
      color: $primary-600;
      text-transform: uppercase;
      margin: 0;
    }

    .spec-label {
      @include type-body;
      color: $primary-700;
      margin: 0;
    }
  }
}
</style>
