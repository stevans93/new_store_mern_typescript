import { Product } from '../types/Product'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'
import { useContext } from 'react'
import { Store } from '../Store'
import { CartItem } from '../types/Cart'
import { convertProductToCartItem } from '../utils'
import { toast } from 'react-toastify'

const ProductItem = ({ product }: { product: Product }) => {
    const { state, dispatch } = useContext(Store)

    const { cart: { cartItems }, } = state

    const addToCartHandler = (item: CartItem) => {
        const existItem = cartItems.find((item) => item._id === product._id)
        const quantity = existItem ? existItem.quantity + 1 : 1

        if(product.countInStock < quantity) {
            toast.warn('Sorry. Product is out of stock!')
            return
        }

        dispatch({
            type: 'CART_ADD_ITEM',
            payload: {  ...item, quantity },
        })
        toast.success('Item added to cart!')
    }

  return (
    <Card>
        <Link to={`/product/${product.slug}`}>
            <img src={product.image} className="card-img-top" alt={product.name} />
        </Link>

        <Card.Body>
            <Link to={`/product/${product.slug}`}>
                <Card.Title>{product.name}</Card.Title>
            </Link>

            <Rating rating={product.rating} numReviews={product.numReviews} />

            <Card.Text>${product.price}</Card.Text>

            {product.countInStock === 0 ? (
                <Button variant='light' disabled>Out Of Stock</Button>
            ) : (
                <Button onClick={() => addToCartHandler(convertProductToCartItem(product))}>Add To Cart</Button>
            )}
        </Card.Body>
    </Card>
  )
}

export default ProductItem
