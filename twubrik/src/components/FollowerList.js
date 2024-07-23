import React, { useContext, useState } from 'react';
import { FollowersContext } from '../store/FollowersContext';
import FollowerCard from './FollowerCard';
import { Button, ButtonGroup, Form, Spinner, Alert } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const FollowerList = () => {
  const { followers, setFollowers, loading, error } = useContext(FollowersContext);
  const [sortBy, setSortBy] = useState('total');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleSort = (criteria) => {
    const sortedFollowers = [...followers].sort((a, b) => {
      if (a.twubric[criteria] < b.twubric[criteria]) return -1;
      if (a.twubric[criteria] > b.twubric[criteria]) return 1;
      return 0;
    });
    setSortBy(criteria);
    setFollowers(sortedFollowers);
  };

  const handleRemove = (uid) => {
    const updatedFollowers = followers.filter(f => f.uid !== uid);
    setFollowers(updatedFollowers);
  };

  const filteredFollowers = followers.filter(f => {
    const joinDate = new Date(f.join_date * 1000);
    return (!startDate || joinDate >= startDate) && (!endDate || joinDate <= endDate);
  });

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error.message}</Alert>;

  return (
    <div>
      <div className="mb-3">
        <ButtonGroup>
          <Button onClick={() => handleSort('total')}>Twubric Score</Button>
          <Button onClick={() => handleSort('friends')}>Friends</Button>
          <Button onClick={() => handleSort('influence')}>Influence</Button>
          <Button onClick={() => handleSort('chirpiness')}>Chirpiness</Button>
        </ButtonGroup>
      </div>
      <div className="mb-3">
        <Form.Group>
          <Form.Label>Joined Twitter between:</Form.Label>
          <div>
            <DatePicker selected={startDate} onChange={date => setStartDate(date)} placeholderText="From date" />
            <DatePicker selected={endDate} onChange={date => setEndDate(date)} placeholderText="To date" />
          </div>
        </Form.Group>
      </div>
      <div className="d-flex flex-wrap">
        {filteredFollowers.map(follower => (
          <FollowerCard key={follower.uid} follower={follower} onRemove={handleRemove} />
        ))}
      </div>
    </div>
  );
};

export default FollowerList;
