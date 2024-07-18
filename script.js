const apiKey = 'E8If794rtQHUy2SqCBIer5H9cmIObHpKJIQMyd1W';

async function fetchISSPosition() {
  try {
    const response = await fetch(`https://api.nasa.gov/planetary/earth/assets?lon=86.9250&lat=27.9881&date=2022-09-01&&dim=0.1&api_key=${apiKey}`);
    const data = await response.json();

    const position = `Latitude: ${data.latitude}, Longitude: ${data.longitude}`;
    document.getElementById('iss-position').textContent = position;
  } catch (error) {
    console.error('Error fetching ISS position:', error);
  }
}

async function fetchNextPass(lat, lon) {
  try {
    const response = await fetch(`https://api.nasa.gov/planetary/earth/assets?lon=${lon}&lat=${lat}&dim=0.1&api_key=${apiKey}`);
    const data = await response.json();

    const nextPass = new Date(data.response[0].risetime * 1000).toLocaleString();
    document.getElementById('iss-info').textContent = `Next pass: ${nextPass}`;
  } catch (error) {
    console.error('Error fetching ISS pass:', error);
  }
}


fetchISSPosition();
navigator.geolocation.getCurrentPosition((position) => {
  fetchNextPass(position.coords.latitude, position.coords.longitude);
});
