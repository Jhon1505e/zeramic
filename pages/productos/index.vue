<script setup lang="ts">
    const { products, fetchProducts } = useProducts()

    await fetchProducts()
</script>
<template>
    <div>
        <h1>Productos</h1>
        <hr>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-12">
            <ProductoCard
                v-for="{content, uuid, slug} in products"
                :uuid="uuid"
                :content="content"
                :slug="slug"
            />
        </div>
        <pre class="text-xs">{{ products }}</pre>
    </div>
</template>