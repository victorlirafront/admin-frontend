<script lang="ts">
import { defineComponent } from 'vue'
import { useCartStore } from '../../stores/cart'
import products from '../../data/mock_products.json'
import { calculateProductAvailability } from '@/src/utils/products'

export default defineComponent({
  name: 'HomeView',
  setup() {
    const cart = useCartStore()
    const { addToCart } = cart
    const productsWithAvailability = calculateProductAvailability(products)

    return {
      productsWithAvailability,
      addToCart,
    }
  },
})
</script>

<template>
  <main class="main">
    <div class="banner-heading">
      <img src="" />
    </div>
    <div class="card-wrapper">
      <div
        v-for="(product, index) in productsWithAvailability"
        :key="index"
        class="card"
        :class="{ available: product.available, unavailable: !product.available }"
      >
        <NuxtLink :to="`/product/${product.id}`">
          <div class="info">
            <div class="header__cart-background">
              <div
              class="header__cart-img"
              :style="{ backgroundImage: `url(${product.image})` }"
              :aria-label="product.name"
              role="img"
            ></div>
            </div>
            <p class="title">{{ product.name }}</p>
            <p class="price">R$ {{ product.price.toFixed(2) }}</p>
          </div>
        </NuxtLink>
        <button class="add-to-cart" @click="addToCart(product.id)" :disabled="!product.available">
          {{ product.available ? 'Adicionar' : 'Indisponível' }}
        </button>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
@use './home.scss' as *;
</style>
