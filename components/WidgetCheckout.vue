<script setup>
useHead({
    script: [{ src: "https://checkout.wompi.co/widget.js" }],
});

const props = defineProps({
    amount: Number,
    customer: Object,
});
const emits = defineEmits(["returnPayment"]);

const checkout = ref();

function openWidgetCheckout(id) {
    const { nombre, email, documento, tipo_doc, apellido, telefono } =
        props.customer;
    checkout.value = new window.WidgetCheckout({
        currency: "COP",
        amountInCents: props.amount * 100,
        reference: "FRIENDS" + id,
        publicKey: "pub_test_DMVR3QF8b0wKGNOCFjrqoPqHgevA3Oj7",
        redirectUrl: "https://www.zerammic.com/compras",
        // publicKey: "pub_test_nOEHXgqGTbTmYVdnTdKMgWoVYkYDHsH4",
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