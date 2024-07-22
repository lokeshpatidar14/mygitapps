import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import FollowerList from './components/FollowerList';
import DateFilter from './components/DateFilter';
import SortButtons from './components/SortButtons';

const App = () => {
  const [followers, setFollowers] = useState([]);
  const [filteredFollowers, setFilteredFollowers] = useState([]);
  const [sortCriteria, setSortCriteria] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [dateRange, setDateRange] = useState({ from: null, to: null });

  useEffect(() => {
    fetch('/twubric.json')
      .then(response => response.json())
      .then(data => setFollowers(data));
  }, []);

  useEffect(() => {
    filterAndSortFollowers();
  }, [followers, sortCriteria, sortOrder, dateRange]);

  const filterAndSortFollowers = () => {
    let updatedFollowers = [...followers];

    // Filter by date
    if (dateRange.from && dateRange.to) {
      updatedFollowers = updatedFollowers.filter(follower => {
        const joinDate = new Date(follower.join_date * 1000);
        return joinDate >= dateRange.from && joinDate <= dateRange.to;
      });
    }

    // Sort by criteria
    if (sortCriteria) {
      updatedFollowers.sort((a, b) => {
        const aValue = a.twubric[sortCriteria];
        const bValue = b.twubric[sortCriteria];

        if (sortOrder === 'asc') {
          return aValue - bValue;
        } else {
          return bValue - aValue;
        }
      });
    }

    setFilteredFollowers(updatedFollowers);
  };

  const handleRemoveFollower = (uid) => {
    setFollowers(followers.filter(follower => follower.uid !== uid));
  };

  const handleSort = (criteria) => {
    if (sortCriteria === criteria) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortCriteria(criteria);
      setSortOrder('asc');
    }
  };

  return (
    <div className="container">
      <h1>Twubric</h1>
      <DateFilter setDateRange={setDateRange} />
      <SortButtons handleSort={handleSort} />
      <FollowerList followers={filteredFollowers} onRemove={handleRemoveFollower} />
    </div>
  );
};

export default App;
