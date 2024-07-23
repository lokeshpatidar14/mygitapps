import React from 'react';
import { Card, Button } from 'react-bootstrap';

const FollowerCard = ({ follower, onRemove }) => {
  const { uid, username, image, fullname, twubric, join_date } = follower;
  const joinDate = new Date(join_date * 1000).toLocaleDateString();

  return (
    <Card className="m-2" style={{ width: '18rem' }}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{fullname}</Card.Title>
        <Card.Text>
          <strong>Username:</strong> {username} <br />
          <strong>Twubric Score:</strong> {twubric.total} <br />
          <strong>Friends:</strong> {twubric.friends} <br />
          <strong>Influence:</strong> {twubric.influence} <br />
          <strong>Chirpiness:</strong> {twubric.chirpiness} <br />
          <strong>Joined:</strong> {joinDate}
        </Card.Text>
        <Button variant="danger" onClick={() => onRemove(uid)}>Remove</Button>
      </Card.Body>
    </Card>
  );
};

export default FollowerCard;
