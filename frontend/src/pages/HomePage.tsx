import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { sampleProducts } from '../data'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <Row>
        {sampleProducts.map((product) => (
            <Col key={product.slug} sm={6} md={6} lg={3}>
                <Link to={'/product/' + product.slug} className='link-offset-2 link-underline link-underline-opacity-0 link-dark' >
                    <img src={product.image} alt={product.name} className="product-image" />
                    <h2>{product.name}</h2>
                </Link>
                <p>${product.price}</p>
            </Col>
        ))}
    </Row>
  )
}

export default HomePage
