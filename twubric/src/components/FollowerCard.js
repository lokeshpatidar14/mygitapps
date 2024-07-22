import React from 'react';
import { Card, Button } from 'react-bootstrap';

const FollowerCard = ({ follower, onRemove }) => {
  const cardStyle = {
    width: '200px',
    height: '400px',
    marginBottom: '1rem',
    textAlign: 'center'
  };

  return (
    <div className="col-md-4 mb-3 d-flex justify-content-center">
      <Card style={cardStyle}>
        <Card.Img variant="top" src={follower.image} style={{ height: '150px', objectFit: 'cover' }} />
        <Card.Body>
          <Card.Title>{follower.fullname}</Card.Title>
          <Card.Text>
            Username: {follower.username}<br />
            Friends: {follower.twubric.friends}<br />
            Influence: {follower.twubric.influence}<br />
            Chirpiness: {follower.twubric.chirpiness}<br />
            Joined: {new Date(follower.join_date * 1000).toLocaleDateString()}
          </Card.Text>
          <Button variant="danger" onClick={() => onRemove(follower.uid)}>Remove</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default FollowerCard;
