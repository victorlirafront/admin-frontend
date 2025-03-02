import type { Product } from '@/src/types/tshirt'

export const calculateProductAvailability = (products: Product[]) => {
  return products.map((product) => {
    const totalStock = product.size.reduce((sum, size) => sum + size.stock, 0)
    return { ...product, available: totalStock > 0 }
  })
}