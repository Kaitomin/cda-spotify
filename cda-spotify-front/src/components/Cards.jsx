import React from 'react'
import {Card } from 'react-bootstrap';


class Props{
  title;
  img;
}

const Cards = ({title, img} = Props) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={img }/>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
      </Card.Body>  
    </Card>
  )
}

export default Cards