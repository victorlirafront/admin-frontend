import { defineStore } from 'pinia'
import products from '../data/mock_products.json'
import type { Product } from '@/src/types/tshirt'
import { calculateProductAvailability } from '@/src/utils/products'
import Toastify from 'toastify-js'

export const useCartStore = defineStore('cart', {
  state: () => {
    return {
      cartItems: [],
      products,
      quantity: 1,
    }
  },
  actions: {
    initializeCart() {
      if (process.client) {
        const storedCartItems = localStorage.getItem('cartItems')
        if (storedCartItems) {
          this.cartItems = JSON.parse(storedCartItems)
        }
      }
    },
    showToast(message: string, backgroundColor: string): void {
      Toastify({
        text: message,
        duration: 3000,
        gravity: 'top',
        position: 'center',
        style: {
          fontSize: '14px',
          background: backgroundColor,
          color: '#fff',
          fontWeight: 'bold',
          marginTop: '100px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
          borderRadius: '4px'
        },
      }).showToast()
    },

    addToCart(productId: number) {
      const product = this.products.find((item) => item.id === productId)

      if (!product) return

      const productsWithAvailability = calculateProductAvailability([product])

      if (!productsWithAvailability.find(product => product.id === productId)?.available) {
        this.showToast('O produto não está disponível', '#ff6060')
        return;
      }

      if (this.cartItems.find((item) => item.id === productId)) {
        this.showToast('O produto já existe no carrinho', '#ff6060')
        return
      }

      if (product) {
        const existingProduct = this.cartItems.find((item) => item.id === product.id)
        if (existingProduct) {
          existingProduct.quantity++
        } else {
          this.cartItems.push({ ...product, quantity: 1 })
        }
        this.saveToLocalStorage()
        this.showToast('Produto adicionado ao carrinho', '#2ac64e')
      } else {
        this.showToast('Produto não encontrado', '#ff6060')
      }
    },

    removeFromCart(productId: number) {
      this.quantity--
      const productIndex = this.cartItems.findIndex((item) => item.id === productId)
      if (productIndex !== -1) {
        const item = this.cartItems[productIndex]
        if (item.quantity > 1) {
          item.quantity--
        } else {
          this.cartItems.splice(productIndex, 1)
        }
        this.saveToLocalStorage()
        console.log('Produto removido do carrinho...')
      }
    },

    getTotal() {
      return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    },

    saveToLocalStorage() {
      if (process.client) {
        localStorage.setItem('cartItems', JSON.stringify(this.cartItems))
      }
    },
  },
})