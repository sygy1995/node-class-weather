const search = document.getElementById('location-input');
const weatherForm = document.getElementById('weather-search');
const message = document.getElementById('message');
weatherForm.addEventListener('submit', (event) => {
    // stop the refresh after clicking
    event.preventDefault();
    
    const location = search.value;
    const url = '/weather?address='+encodeURIComponent(location);
    fetch(url).then((response) => {
        response.json().then((data)=>{
            if (data.error) {
                message.textContent = data.error;
            } else {
                const weather = "Weather at "+data.location+" is "+data.weather+". The temperature is "+data.temperature+" degrees and feels lile "+data.feels_like+" degrees."
                message.textContent = weather;
            }
            
        })
    });
})