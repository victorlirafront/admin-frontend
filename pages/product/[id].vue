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
  <div v-if="product">
    <h1>{{ product.name }}</h1>
    <img :src="product.image" alt="Product Image" />
    <p>Preço: R$ {{ product.price.toFixed(2) }}</p>
  </div>
  <div v-else>
    <p>Produto não encontrado.</p>
  </div>
</template>
