import React, { useState, useEffect } from 'react';
import { getRandomJoke } from '../../services/ChuckNorrisJoke';

function JokeDisplay() {
  const [joke, setJoke] = useState('');
  const [count, setCount] = useState(0)

  useEffect(() => {
    getNewJoke().finally(() => setCount(0));
  }, []);
  
  async function getNewJoke() {
    try {
      const jokeData = await getRandomJoke();
      setJoke(jokeData.value);
      setCount(count + 1);
    } catch (error) {
      console.error('Error fetching Chuck Norris joke:', error);
    }
  }

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h4>Chuck Norris Jokes</h4>
        </div>
        <div className="card-body">
          <p className="card-text">{joke}</p>
          <p className="card-text">Aantal opgehaalde moppen: {count}</p>
          <button className="btn btn-primary float-end" onClick={getNewJoke}>
            Nieuwe mop ophalen
          </button>
        </div>
      </div>
    </div>
  );
}

export default JokeDisplay;
