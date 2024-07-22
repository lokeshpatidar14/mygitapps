import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

const SortButtons = ({ handleSort }) => {
  return (
    <ButtonGroup className="mb-3">
      <Button onClick={() => handleSort('total')}>Twubric Score</Button>
      <Button onClick={() => handleSort('friends')}>Friends</Button>
      <Button onClick={() => handleSort('influence')}>Influence</Button>
      <Button onClick={() => handleSort('chirpiness')}>Chirpiness</Button>
    </ButtonGroup>
  );
};

export default SortButtons;
