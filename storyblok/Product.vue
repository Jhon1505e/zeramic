<template>
  <div v-editable="blok" class="bg-gray-200">
    <div class="w-full rounded-lg bg-red-900">
      <div class="w-full bg-PRP">
        <div v-editable="blok">
          <div class="w-2/3 pl-8 pt-8 mx-auto">
            <NuxtLink to="/productos" class="text-white font-semibold text-xl flex gap-2">
              <IconsArrow class="w-2" /> Volver a Productos
            </NuxtLink>
          </div>

          <StoryblokComponent v-for="blok in blok.Body" :key="blok._uid" :blok="blok" />
          <div class="w-2/3 pb-10 pl-8 mx-auto">
            <button @click="addToShop" class="text-white border border-white font-thin px-6 py-2 text-xl rounded-md">
              {{ isInCart ? "En el carrito" : "Añadir a la compra" }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="relative">
      <div class="w-full max-w-4xl text-center mx-auto pb-20 px-10 pt-8 md:pt-16">
        <NuxtImg v-if="Imagen?.filename" class="w-full max-w-7xl mx-auto rounded-lg mt-10 bg-gray-300 aspect-video z-10"
          :src="Imagen?.filename" alt="" />
        <NuxtImg v-else class="w-full bg-gray-300 z-10" src="/img/logo_zeramic.webp" alt="" />
        <p class="px-4 pt-20 font-light mt-2 text-gray-500 text-xl md:text-2xl">
          {{ Descripcion }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const { slug } = useRoute().params;
const props = defineProps({ blok: Object, uuid: String });
const { Imagen, Descripcion, Precio, Nombre } = toRefs(props.blok);

const { cart, addProduct } = useShopping();

const isInCart = computed(() => cart.value.has(props.uuid));

function addToShop() {
  console.log("addToShop", slug.join("/"));
  const product = {
    uuid: props.uuid,
    producto: Nombre.value,
    valor: Precio.value,
    cantidad: 1,
    imagen: Imagen.value.filename,
    slug: "/" + slug.join("/"),
  };
  addProduct(product);
}
</script>
