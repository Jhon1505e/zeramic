<script setup>
useHead({
    script: [{ src: "https://checkout.wompi.co/widget.js" }],
});
const config = useRuntimeConfig();

const props = defineProps({
    amount: Number,
    customer: Object,
});
const emits = defineEmits(["returnPayment"]);

const checkout = ref();

async function openWidgetCheckout(id) {
    const { nombre, email, documento, tipo_doc, apellido, telefono } =
        props.customer;

    const text = `ZERAMIC${id}${props.amount * 100}COP${config.public.wompiIntegritySecret}`
    const encondedText = new TextEncoder().encode(text);
    const hashBuffer = await crypto.subtle.digest("SHA-256", encondedText);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const integrity = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

    checkout.value = new window.WidgetCheckout({
        currency: "COP",
        amountInCents: props.amount * 100,
        reference: "ZERAMIC" + id,
        publicKey: config.public.wompiPublicKey,
        signature: { integrity },
        redirectUrl: "https://www.zerammic.com/compras",
        customerData: {
            email,
            fullName: `${nombre} ${apellido}`,
            phoneNumber: `${telefono}`,
            phoneNumberPrefix: "+57",
            legalId: `${documento}`,
            legalIdType: tipo_doc,
        },
    });
    checkout.value?.open(returnPayment);
}

function returnPayment(result) {
    emits("returnPayment", result);
}

defineExpose({
    openWidgetCheckout,
});
</script>