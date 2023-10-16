async function getRandomJoke() {
  return fetchData("https://api.chucknorris.io/jokes/random");
}

async function getCategories() {
  return fetchData("https://api.chucknorris.io/jokes/categories");
}

async function getJokeByCategory(category) {
  return fetchData(`https://api.chucknorris.io/jokes/search?query=${category}`);
}

async function fetchData(url) {
  const response = await fetch(url)
    .then((response) => {
      return !response.ok ? new Error(`Failed to fetch data from ${url}`) : response
    })
    .catch((error) => new Error(`Failed to fetch data from ${url}, unknown error: ${error}`))

  const data = await response.json();
  return data
}

export { getRandomJoke, getCategories, getJokeByCategory };
