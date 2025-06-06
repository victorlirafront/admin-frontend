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
      </div>
      <div class="product-box-info">
        <h1>{{ product.name }}</h1>
        <p>Preço: R$ {{ product.price.toFixed(2) }}</p>
        <p>Cor: Preto</p>
        <div class="color-wrapper">
          <div class="color black"></div>
          <div class="color brown"></div>
          <div class="color pink"></div>
        </div>

        <div class="sizes-wrapper">
          <div class="size selected">P</div>
          <div class="size">P</div>
          <div class="size">M</div>
          <div class="size">G</div>
        </div>

        <div class="quantity">
          <button class="quantity-btn decrease">-</button>
          <div class="quantity-item">1</div>
          <button class="quantity-btn increase">+</button>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
@use './product.scss' as *;
</style>
