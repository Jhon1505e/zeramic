<template>
  <div>
    <h1>Wompi</h1>
    <hr />
    <h2>Paso 1</h2>
    <p>Obtener Token</p>
    <div class="w-full flex">
      <pre class="w-full text-xs">{{ result1 }}</pre>
      <div class="w-full"><button @click="getStepOne">GetToken</button></div>
    </div>
    <hr />
    <h2>Paso 2</h2>
    <p>Ingresar datos</p>
    <div class="flex">
      <div class="w-full">
        <input
          type="text"
          v-model.number="payload.amount_in_cents"
          placeholder="Amount"
        />
        <input
          type="text"
          v-model="payload.reference"
          placeholder="Reference"
        />
        <pre class="w-full text-xs">{{ payload }}</pre>
        <button @click="getStepTwo">CreateTransaction</button>
      </div>
      <div class="w-full">
        <pre class="w-full text-xs">{{ result2 }}</pre>
      </div>
    </div>
    <hr />
    <h2>Paso 3</h2>
    <p>Obtener Link de Pago</p>
    <pre class="w-full text-xs">{{ result3 }}</pre>
    <button @click="getStepThree">GetLink</button>
  </div>
</template>

<script setup lang="ts">
const baseUrl = "https://sandbox.wompi.co/v1/";
const publicKey = "pub_test_DMVR3QF8b0wKGNOCFjrqoPqHgevA3Oj7";
const privateKey = "prv_test_S0q1mJqhJg6vC9CwNsO7swobRLkDzXwn";
const integritySecret = "test_integrity_2z06cRz4idHJplnOr33XXY3qRIubkoH1";

const result1 = ref();
const result2 = ref();
const result3 = ref();

const payload = ref({
  currency: "COP",
  signature: "",
  reference: "ABC1235",
  amount_in_cents: 200000,
  customer_email: "1XgZS@example.com",
  acceptance_token: "",
  payment_method: {
    type: "BANCOLOMBIA_TRANSFER",
    user_type: "PERSON",
    payment_description: "Pago a Tienda Wompi",
    sandbox_status: "APPROVED",
  },
});

async function getStepOne() {
  try {
    const response: any = await $fetch(`${baseUrl}merchants/${publicKey}`);
    result1.value = response.data.presigned_acceptance;
  } catch (error) {  
    console.log('response',error);
    result1.value = error;
  }
}

async function getStepTwo() {
  payload.value.acceptance_token = result1.value?.acceptance_token;
  //payload.value.signature = 
  const concatenatedText = payload.value.reference + payload.value.amount_in_cents + payload.value.currency + integritySecret;
  const encondedText = new TextEncoder().encode(concatenatedText);
  const hashBuffer = await crypto.subtle.digest('SHA-256', encondedText);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  payload.value.signature = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  const response: any = await $fetch(`${baseUrl}transactions/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${privateKey}`,
    },
    body: payload.value,
  });
  result2.value = response.data || response.error;
}

async function getStepThree() {
  const { data, error } = await useFetch(`${baseUrl}transactions/`, {
    headers: {
      Authorization: `Bearer ${privateKey}`,
    },
    params: {
      reference: payload.value.reference,
    },
  });
  result3.value = data.value || error.value;
}
</script>
