export async function fetchApi(url) {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL + url);
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error("Error getting data :", error);
    return null;
  }
}

export async function sendData(url, data, http) {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL + url, {
      method: http,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error('HTTP error', response.status, response.statusText);
    }

    return response;
  } catch (error) {
    console.error("Error sending data :", error);
    return null;
  }
}
