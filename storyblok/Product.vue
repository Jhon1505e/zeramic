<template>
  <div v-editable="blok" class="bg-gray-200">
    <div class="mx-auto">
      <div class="w-full">
        <NuxtImg
          v-if="Imagen?.filename"
          class="w-full max-w-7xl mx-auto bg-gray-300 rounded-lg aspect-video"
          :src="Imagen?.filename"
          alt=""
        />
        <NuxtImg
          v-else
          class="w-full bg-gray-300"
          src="/img/logo_zeramic.webp"
          alt=""
        />
      </div>
    </div>
    <div class="w-full md:w-2/3 text-center mx-auto pb-20 px-10 pt-8 md:pt-16">
      <p class="p-4 font-light mt-2 text-gray-500 text-xl md:text-2xl">
        {{ Descripcion }}
      </p>

      <button
        @click="addToShop"
        class="text-white bg-PRP font-thin mt-4 px-6 py-2 text-xl md:text-2xl hover:scale-105 duration-100 ease-in rounded-md"
      >
        Añadir al carrito
      </button>
      <div
        v-if="isInCart"
        class="flex justify-center mx-auto w-fit items-center gap-2 p-1"
      >
        <IconsBag
          class="h-11 w-11 p-2 stroke-white bg-PRP mx-auto rounded-full"
        />
        <NuxtLink to="/compras">Ver en el carrito</NuxtLink>
      </div>
    </div>

    <FooterImg class="fill-PRP" />
    <div class="bg-PRP">
      <div v-editable="blok" class="px-10">
        <StoryblokComponent
          v-for="blok in blok.Body"
          :key="blok._uid"
          :blok="blok"
        />
      </div>
      <FooterImg class="fill-slate-900" />
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
  const product = {
    uuid: props.uuid,
    producto: Nombre.value,
    valor: Precio.value,
    cantidad: 1,
    imagen: Imagen.value.filename,
    slug: slug.join("/"),
  };
  addProduct(product);
}
</script>
