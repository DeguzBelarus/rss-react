export const fetchData = (url: string) => {
  return fetch(url, { method: 'GET' });
};
