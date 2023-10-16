async function getRandomJoke() {
  return fetchData('https://api.chucknorris.io/jokes/random');
}

async function getCategories() {
  return fetchData('https://api.chucknorris.io/jokes/categories');
}

async function fetchData(url) {
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`Failed to fetch data from ${url}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
      throw error;
    }
}

export { getRandomJoke, getCategories };
