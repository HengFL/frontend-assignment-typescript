import React, { useState, useEffect } from 'react';
import { fetchUsers } from './api/users';
import { GroupedData } from './api/types';
import { transformUsers } from './utils/transformUsers';
import './App.css';

const App: React.FC = () => {

  /* state */
  const [data, setData] = useState<GroupedData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /* useEffect */
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetchUsers();
        const transformedData = transformUsers(response.users);
        setData(transformedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <pre className="bg-dark">{JSON.stringify(data, null, 2)}</pre>;
  
};

export default App;