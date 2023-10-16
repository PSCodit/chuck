import React, { useState, useEffect } from 'react';
import { getRandomJoke } from '../../services/ChuckNorrisJoke';

function JokeDisplay() {
  const [joke, setJoke] = useState('');
  const [count, setCount] = useState(-1)

  async function getNewJoke() {
    try {
      const jokeData = await getRandomJoke();
      setJoke(jokeData.value);
      setCount(count + 1);
    } catch (error) {
      console.error('Error fetching Chuck Norris joke:', error);
    }
  }

  useEffect(() => {
    getNewJoke();
  }, []);

  return (
    <div>
      <p>{joke}</p>
      <p>Aantal opgehaalde moppen: {count}</p>
      <button onClick={getNewJoke}>Nieuwe mop ophalen</button>
    </div>
  );
}

export default JokeDisplay;
