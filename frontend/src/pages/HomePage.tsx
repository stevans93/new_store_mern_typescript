import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { sampleProducts } from '../data'

const HomePage = () => {
  return (
    <Row>
        {sampleProducts.map((product) => (
            <Col key={product.slug} sm={6} md={6} lg={3}>
                <img src={product.image} alt={product.name} className="product-image" />
                <h2>{product.name}</h2>
                <p>${product.price}</p>
            </Col>
        ))}
    </Row>
  )
}

export default HomePage
