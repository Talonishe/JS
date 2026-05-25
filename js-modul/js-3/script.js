function createApiClient(baseUrl) {
  let requestCount = 0;

  return {
    async get(path) {
      requestCount++;

      try {
        const response = await fetch(baseUrl + path);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        return await response.json();
      } catch (error) {
        return { error: 'Запит не вдався' };
      }
    },

    getRequestCount() {
      return requestCount;
    }
  };
}

// Приклад
(async () => {
  const api = createApiClient("https://jsonplaceholder.typicode.com");
  const user = await api.get("/users/1");
  const posts = await api.get("/posts");

  console.log(user);
  console.log(posts);
  console.log(api.getRequestCount()); // 2
})();