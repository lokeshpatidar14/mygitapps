import React from 'react';
import { Button, Card } from 'react-bootstrap';


const MyCard = () => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body style={{color :"yellow"}}>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          This is a card component from React Bootstrap.
        </Card.Text>
        <Button variant="danger">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
};

export default MyCard;
