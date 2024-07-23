import React, { createContext, useState, useEffect } from "react";

const FollowersContext = createContext();

const FollowersProvider = ({ children }) => {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await fetch(
          "https://gist.githubusercontent.com/pandemonia/21703a6a303e0487a73b2610c8db41ab/raw/82e3ef99cde5b6e313922a5ccce7f38e17f790ac/twubric.json"
        );
        const data = await response.json();
        setFollowers(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchFollowers();
  }, []);

  return (
    <FollowersContext.Provider
      value={{ followers, setFollowers, loading, error }}>
      {children}
    </FollowersContext.Provider>
  );
};

export { FollowersContext, FollowersProvider };
