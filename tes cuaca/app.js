document.addEventListener('DOMContentLoaded', (event) => {
    const apiKey = '5fc4c92390f97c794fc8fc8b7c7f1880';  // Ganti dengan API key Anda
    const city = 'Surabaya';

    function updateDateTime() {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        const formattedDate = now.toLocaleDateString('id-ID', options);
        const dateTimeContainer = document.getElementById('datetime');
        dateTimeContainer.innerHTML = `<p>${formattedDate}</p>`;
    }

    async function fetchWeather() {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=id`);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const data = await response.json();
            displayWeather(data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            const weatherContainer = document.getElementById('weather');
            weatherContainer.innerHTML = `<p>Gagal mengambil data cuaca. Silakan coba lagi nanti.</p>`;
        }
    }

    function displayWeather(data) {
        const weatherContainer = document.getElementById('weather');
        weatherContainer.innerHTML = `
            <h2>${data.name}</h2>
            <p>Suhu: ${data.main.temp} °C</p>
            <p>Cuaca: ${data.weather[0].description}</p>
            <p>Kelembaban: ${data.main.humidity}%</p>
            <p>Kecepatan Angin: ${data.wind.speed} m/s</p>
        `;
    }

    // Update date and time every second
    setInterval(updateDateTime, 1000);
    // Fetch weather data
    fetchWeather();
    // Display initial date and time
    updateDateTime();
});
