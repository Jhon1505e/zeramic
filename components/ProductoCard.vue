<script setup lang="ts">
const { cart, addProduct } = useShopping();

const props = defineProps<{
  uuid: string;
  content: any;
  slug: string;
}>();
const isInCart = computed(() => cart.value.has(props.uuid));
function addToShop() {
  const product = {
    uuid: props.uuid,
    producto: props.content.Nombre,
    valor: props.content.Precio,
    cantidad: 1,
    imagen: props.content.Imagen.filename,
    // slug: slug.join("/"),
  };
  addProduct(product);
}
</script>

<template>
  <article
    class="shadow-lg rounded-t-lg hover:scale-105 duration-300"
    :key="uuid"
  >
  <div class="relative">
      <!-- <pre class="text-xs">{{ content }}</pre> -->
      <IconsBag
        v-if="isInCart"
        class="h-10 w-10 absolute fill-PRP p-0.5 bg-white/80 mx-auto rounded-t-lg end-1 top-1"
      />
      <NuxtImg
        v-if="content?.Imagen2.filename"
        class="rounded-t-lg w-full h-44 object-cover aspect-video"
        provider="storyblok"
        :src="content.Imagen2.filename"
        alt=""
      />

      <NuxtImg
        v-else
        class="bg-gray-300 rounded-lg"
        src="/img/logo_zeramic.webp"
        alt=""
      />
      <div
        class="w-full hover:bg-black/60 absolute bottom-0 text-end h-full duration-300 rounded-t-lg"
      >
        <div
          class="opacity-0 hover:opacity-100 duration-300 h-full w-full flex justify-center items-center"
        >
          <div>
            <h2 class="text-white font-bold justify-center mt-4 flex">
              $ {{ content?.Precio }}
            </h2>
            <hr class="mb-2" />
            <div class="flex gap-2 justify-center">
              <NuxtLink
                class="bg-black/50 p-2 border rounded-lg text-white"
                :to="`/productos/${slug}`"
              >
                <IconsEye class="h-6 w-6 mx-auto rounded-t-lg" />
              </NuxtLink>
              <button @click="addToShop" class="bg-black/50 border p-2 rounded-lg text-white">
                <IconsBag class="h-6 w-6 mx-auto rounded-t-lg" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p
      class="font-thin text-lg text-center bg-PRP rounded-b-lg py-2 text-white"
    >
      {{ content?.Nombre }}
    </p>
  </article>
</template>
