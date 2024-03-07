import { ApiError } from './types/ApiError'
import { CartItem } from './types/Cart';
import { Product } from './types/Product';

export const getError = (error: Error | ApiError): string => {
  if ('response' in error && error.response && error.response.data && error.response.data.message) {
    return error.response.data.message;
  } else {
    return error.message;
  }
};

export const convertProductToCartItem = (product: Product): CartItem => {
  const cartItem: CartItem = {
    _id: product._id,
    name: product.name,
    slug: product.slug,
    image: product.image,
    price: product.price,
    countInStock: product.countInStock,
    quantity: 1,
  }
  return cartItem
}