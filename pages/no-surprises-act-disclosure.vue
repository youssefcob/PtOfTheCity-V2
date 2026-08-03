<template>
  <div class="no-surprises-page">
    <div class="container">
      <section class="section">
        <h1>Your Rights and Protections Against Surprise Medical Bills</h1>
        
        <p>When you get emergency care or get treated by an out-of-network provider at an in-network hospital or ambulatory surgical center, you are protected from surprise billing or balance billing.</p>
        
        <p><strong>What is "balance billing" (sometimes called "surprise billing")?</strong> When you see a doctor or other health care provider, you may owe certain out-of-pocket costs, such as a copayment, coinsurance, and/or a deductible. You may have other costs or have to pay the entire bill if you see a provider or visit a health care facility that isn't in your health plan's network.</p>
        
        <p>"Out-of-network" describes providers and facilities that haven't signed a contract with your health plan. Out-of-network providers may be permitted to bill you for the difference between what your plan agreed to pay and the full amount charged for a service. This is called "balance billing."</p>
        
        <p>"Surprise billing" is an unexpected balance bill. This can happen when you can't control who is involved in your care—like when you have an emergency or when you schedule a visit at an in-network facility but are unexpectedly treated by an out-of-network provider.</p>
        
        <h2>You are protected from balance billing for:</h2>
        <ul>
          <li><strong>Emergency services:</strong> If you have an emergency medical condition and get emergency services from an out-of-network provider or facility, the most the provider or facility may bill you is your plan's in-network cost-sharing amount.</li>
          <li><strong>Certain services at an in-network hospital or ambulatory surgical center:</strong> When you get services from an in-network hospital or ambulatory surgical center, certain providers there may be out-of-network. In these cases, the most those providers may bill you is your plan's in-network cost-sharing amount.</li>
        </ul>
        
        <p>If you believe you've been wrongly billed, you may contact the Employee Benefits Security Administration at 1-866-444-3272 or visit <a href="https://www.cms.gov/nosurprises" target="_blank">www.cms.gov/nosurprises</a> for more information.</p>
      </section>

      <section class="section">
        <h1>Right to Receive a Good Faith Estimate of Expected Charges</h1>
        
        <p>Under the law, health care providers need to give patients who don't have insurance or who are not using insurance an estimate of the bill for medical items and services.</p>
        
        <ul>
          <li>You have the right to receive a Good Faith Estimate for the total expected cost of any non-emergency items or services. This includes related costs like medical tests, prescription drugs, equipment, and hospital fees.</li>
          <li>Make sure your health care provider gives you a Good Faith Estimate in writing at least 1 business day before your medical service or item. You can also ask your health care provider, and any other provider you choose, for a Good Faith Estimate before you schedule an item or service.</li>
          <li>If you receive a bill that is at least $400 more than your Good Faith Estimate, you can dispute the bill.</li>
          <li>Make sure to save a copy or picture of your Good Faith Estimate.</li>
        </ul>
        
        <p>For questions or more information about your right to a Good Faith Estimate, visit <a href="https://www.cms.gov/nosurprises" target="_blank">www.cms.gov/nosurprises</a> or call 1-800-985-3059.</p>
      </section>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  title: 'No Surprises Act & Good Faith Estimate'
})
</script>

<style lang="scss" scoped>
.no-surprises-page {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f9f9f9;
  min-height: 100vh;
  padding-top:8rem;

  .container {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .section {
    background: white;
    padding: 30px;
    margin-bottom: 30px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    h1 {
      font-size: 1.8rem;
      margin-bottom: 20px;
      color: #2c3e50;
      border-bottom: 3px solid #3498db;
      padding-bottom: 10px;
    }

    h2 {
      font-size: 1.4rem;
      margin-bottom: 15px;
      color: #2c3e50;
    }

    p {
      margin-bottom: 15px;
    }

    ul {
      margin: 15px 0 15px 20px;

      li {
        margin-bottom: 12px;
      }
    }

    a {
      color: #3498db;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    strong {
      color: #2c3e50;
    }
  }

  @media (max-width: 768px) {
    padding: 15px 0;

    .container {
      padding: 0 15px;
    }

    .section {
      padding: 20px;

      h1 {
        font-size: 1.5rem;
      }

      h2 {
        font-size: 1.2rem;
      }
    }
  }
}
</style>