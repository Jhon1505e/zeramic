<script setup lang="ts">
const { cart } = useShopping();
const props = defineProps<{
  uuid: string;
  content: any;
  slug: string;
}>();
const isInCart = computed(() => cart.value.has(props.uuid));
</script>

<template>
  <article
    class="shadow-lg rounded-lg hover:scale-105 duration-300"
    :key="uuid"
  >
    <NuxtLink :to="`/productos/${slug}`" class="relative">
      <IconsBag
        v-if="isInCart"
        class="h-10 w-10 absolute stroke-PRP p-0.5 bg-white/80 mx-auto rounded-full end-1 top-1"
      />
      <NuxtImg
        v-if="content?.Imagen.filename"
        class="rounded-t-lg w-full h-44 object-cover aspect-video"
        provider="storyblok"
        :src="content.Imagen.filename"
        alt=""
      />

      <NuxtImg
        v-else
        class="bg-gray-300 rounded-lg"
        src="/img/logo_zeramic.webp"
        alt=""
      />
      <div
        class="w-full hover:bg-black/60 absolute bottom-0 text-end h-full duration-300 rounded-lg"
      >
        <div
          class="opacity-0 hover:opacity-100 duration-300 h-full w-full flex justify-center items-center"
        >
          <div>
            <h2 class="text-white font-normal justify-center pr-4 text-lg flex">
              <IconsBag class="w-5 stroke-2" /> : {{ content?.Precio }}
            </h2>
            <hr class="mb-2" />
            <button class="bg-PRP px-4 py-2 rounded-lg text-white">
              Comprar Producto
            </button>
          </div>
        </div>
      </div>

      <!--   <div
        class="flex justify-center items-center text-center bg-white w-full py-3 px-6 rounded-b-lg h-38"
      >
        <div>
          <h2 class="font-extralight text-xl text-gray-800 pt-2">
            {{ content.Nombre }}
          </h2>

          <hr class="my-1" />
          <div class="flex justify-center gap-2 mt-2">
            <div
              :to="`/productos/${slug}`"
              class="flex hover:scale-105 duration-300 p-2 px-4 text-white rounded-lg bg-PRP"
            >
              <IconsBagPlus class="w-5 fill-white" />
            </div>
            <p
              class="text-PRP rounded-lg pt-0.5 px-2 font-normal text-lg border border-PRP"
            >
              ${{ content.Precio }}
            </p>
          </div>
        </div> 
      </div> -->
    </NuxtLink>
    <div class="text-center bg-PRP rounded-b-lg p-1 text-white font-semibold">{{ content?.Nombre }}</div>
  </article>
</template>
