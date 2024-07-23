import React from 'react';
import { FollowersProvider } from './store/FollowersContext';
import FollowerList from './components/FollowerList';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <FollowersProvider>
      <div className="container">
        <h1 className="my-4">Twitter Followers</h1>
        <FollowerList />
      </div>
    </FollowersProvider>
  );
};

export default App;
