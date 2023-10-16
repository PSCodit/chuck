import React, { useState, useEffect } from "react";
import { getCategories, getJokeByCategory } from "../../services/ChuckNorrisJoke";

function JokeCategory() {
  const [categories, setCategories] = useState([]);
  const [jokes, setJokes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const isInputValid = searchText.length >= 3 && searchText.length <= 120;
  const hasSearchResults = jokes.length > 0;

  useEffect(() => {
    fetchChuckCategories();
  }, []);

  async function fetchChuckCategories() {
    await getCategories()
      .then((categories) => setCategories(categories))
      .catch((error) =>
        console.error("Error fetching Chuck Norris categories:", error)
      )
    }

  const handleSearch = async (event) => {
    event.preventDefault();
    setIsTouched(true);

    if (isInputValid) {
      setIsLoading(true);

      await getJokeByCategory(searchText)
        .then((jokes) => {
            setJokes(jokes.result)
            setIsLoading(false)
        })
        .catch((error) =>
         console.error(`Error searching for Chuck Norris joke: ${searchText}`, error)
        )
    } else {
      setJokes([]);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h4>Chuck Norris jokes by categories</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSearch}>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                list="categoriesList"
                placeholder="Enter a category or search term"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onBlur={() => setIsTouched(true)}
              />
              <datalist id="categoriesList">
                {categories.map((category) => (
                  <option key={category} value={category} />
                ))}
              </datalist>
              <div className="input-group-append">
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={!isInputValid}
                >
                  Search
                </button>
              </div>
            </div>
          </form>
          {(!isInputValid && !isLoading && isTouched) && (
            <p className="text-danger">
              Must be between 3 and 120 characters
            </p>
          )}
          {hasSearchResults && !isLoading && (
            <div className="mt-3">
              <h5>
                Chuck Norris Jokes for {searchText}:
              </h5>
              <ul className="list-group">
                {jokes.map((joke) => (
                  <li key={joke.id} className="list-group-item">
                    {joke.value}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {!hasSearchResults && isTouched && !isLoading && (
            <p>No jokes found for '{searchText}'</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default JokeCategory;
