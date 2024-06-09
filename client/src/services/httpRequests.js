const fetchJSON = async (url, options = {}) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Network response was not ok ${response.statusText}`);
  }
  const text = await response.text();
  return text ? JSON.parse(text) : {}; // Gérer les réponses vides comme delete
};

export default fetchJSON;
