import React, { useState, useEffect } from 'react';
import { getCategories } from '../../services/ChuckNorrisJoke';

function JokeCategory() {
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    getChuckCategories();
  }, []);

  async function getChuckCategories() {
    try {
      const categoryData = await getCategories();
      setCategories(categoryData);
    } catch (error) {
      console.error('Error fetching Chuck Norris categories:', error);
    }
  }

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h4>Chuck Norris Joke Categories</h4>
        </div>
        <div className="card-body">
          <ul className="list-group">
            {categories.map((category) => (
              <li key={category} className="list-group-item">
                {category}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default JokeCategory;
