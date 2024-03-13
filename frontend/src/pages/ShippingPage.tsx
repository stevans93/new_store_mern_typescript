import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Store } from '../Store'
import { Helmet } from 'react-helmet-async'
import CheckOutSteps from '../components/CheckOutSteps'
import { Button, Form } from 'react-bootstrap'
export default function ShippingPage() {
    const navigate = useNavigate()
    const { state, dispatch } = useContext(Store)
    const { userInfo, cart: { shippingAddress } } = state

    useEffect(() => {
        if(!userInfo) {
            navigate('/singin?redirect=/shipping')
        }
    }, [userInfo, navigate])

    const [ fullName, setFullName ] = useState(shippingAddress.fullName || '')
    const [ address, setAddress ] = useState(shippingAddress.address || '')
    const [ city, setCity ] = useState(shippingAddress.city || '')
    const [ postalCode, setPostalCode ] = useState(shippingAddress.postalCode || '')
    const [ country, setCountry ] = useState(shippingAddress.country || '')

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()

        dispatch({
            type: 'SAVE_SHIPPING_ADDRESS',
            payload: {
                fullName,
                address,
                city,
                postalCode,
                country
            },
        })

        localStorage.setItem('shippingAddress', JSON.stringify({
            fullName,
            address,
            city,
            postalCode,
            country
        }))

        navigate('/payment')
    }

    return (
        <div>
            <Helmet>
                <title>Shipping Address</title>
            </Helmet>
            <CheckOutSteps step1 step2></CheckOutSteps>
            <div className='container small-container'>
                <h1 className='my-3'>Shipping Address</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Address</Form.Label>
                        <Form.Control value={address} onChange={(e) => setAddress(e.target.value)} required />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>City</Form.Label>
                        <Form.Control value={city} onChange={(e) => setCity(e.target.value)} required />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Country</Form.Label>
                        <Form.Control value={country} onChange={(e) => setCountry(e.target.value)} required />
                    </Form.Group>

                    <div className='my-3'>
                        <Button variant='primary' type='submit'>Continue</Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}