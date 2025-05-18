<script setup>
import { useRoute } from 'vue-router'
import products from '@/src/data/mock_products.json'

const route = useRoute()

const { data: product } = await useAsyncData('product', async () => {
  const product = products.find((p) => p.id === Number(route.params.id))

  if (!product) {
    console.log('Produto não encontrado para o ID:', route.params.id)
    return null
  }
  return product
})
</script>

<template>
  <main class="main-products">
    <div class="products">
      <div v-if="product" class="product-box-image">
        <img class="product-image" :src="product.image" alt="Product Image" />
        <img class="product-image-sheet" src="https://ik.imagekit.io/Victorliradev/loja-virtual-vue/measures-tshirt_p7PT-1yRV.webp?updatedAt=1742744094164" alt="Product Image" />
      </div>
      <div class="product-box-info">
        <h1>{{ product.name }}</h1>
        <p>Preço: R$ {{ product.price.toFixed(2) }}</p>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
@use './product.scss' as *;
</style>
