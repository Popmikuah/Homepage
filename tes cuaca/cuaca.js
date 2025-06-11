document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '5fc4c92390f97c794fc8fc8b7c7f1880';
    const city = 'Surabaya';

    function updateDateTime() {
        const now = new Date();

        const tanggalOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const jamOptions = { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Jakarta' };

        const formattedDate = now.toLocaleDateString('id-ID', tanggalOptions);
        const formattedTime = now.toLocaleTimeString('id-ID', jamOptions);

        const dateTimeContainer = document.getElementById('datetime');
        dateTimeContainer.innerHTML = `
          <p>${formattedDate}</p>
          <p>${formattedTime} WIB</p>
        `;
    }

    async function fetchWeather() {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=id`);
            if (!response.ok) throw new Error('Gagal ambil data cuaca.');
            const data = await response.json();
            displayWeather(data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            document.getElementById('weather').innerHTML = `<p>Cuaca tidak tersedia.</p>`;
        }
    }

    function displayWeather(data) {
        const weatherContainer = document.getElementById('weather');
        weatherContainer.innerHTML = `
            <h6 class="mb-1">${data.name}</h6>
            <p>${data.main.temp}°C - ${data.weather[0].description}</p>
        `;
    }

    updateDateTime();
    setInterval(updateDateTime, 60000);
    fetchWeather();
});
