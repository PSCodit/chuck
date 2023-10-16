import React, { useState, useEffect } from 'react';
import { getCategories, getJokeByCategory } from '../../services/ChuckNorrisJoke';

function JokeCategory() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [jokes, setJokes] = useState([]);
  
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

  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);
    try {
      const jokeData = await getJokeByCategory(category);
      setJokes(jokeData.result);
    } catch (error) {
      console.error(`Error fetching Chuck Norris joke for category: ${category}`, error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h4>Chuck Norris jokes by categories</h4>
        </div>
        <div className="card-body">
          <ul className="list-group">
            {categories.map((category) => (
              <li
                key={category}
                className={`list-group-item ${category === selectedCategory ? 'active' : ''}`}
                onClick={() => handleCategoryClick(category)}
                style={{ cursor: 'pointer' }}
              >
                {category}
              </li>
            ))}
          </ul>
          {jokes.length > 0 && (
            <div className="mt-3">
              <h5>Chuck Norris Jokes for {selectedCategory}:</h5>
              <ul className="list-group">
                {jokes.map((jokeItem) => (
                  <li key={jokeItem.id} className="list-group-item">
                    {jokeItem.value}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default JokeCategory;
