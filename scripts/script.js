
// Accuweather API key 
const key = '8GW8G6u4fSfg9gAL3gdOnjgJG678wwkv';

// fetch city details from the API including the city key 
const requestCity = async(city) =>{
    // link to fetch the city or location  data 
    const link = 'https://dataservice.accuweather.com/locations/v1/cities/search';
    const request = `?apikey=${key}&q=${city}`
    const info = await fetch(link+request);
    const data = await info.json();
    return data[0];
    
}

const weatherInfo = async(id) =>{
    // link to fetch the curent conditions in that area 
    const link = 'https://dataservice.accuweather.com/currentconditions/v1/'
    const request = `${id}?apikey=${key}`
    const info = await fetch(link+request);
    const data = await info.json();
    
    return data[0];
}



// Declare variables 

const degree = document.querySelector('.centegrate span');
const condition = document.querySelector('.condition');
const date = document.querySelector('.date');
const city = document.querySelector('.city');
const cityInput = document.querySelector('form')


// Capture and store the current weather condition of the city 
let updateWeather = async (city) =>{
    // const location to store the city data 
    const location = await requestCity(city);
    // const weatherDetail store the city's current informationn
    const weatherDetail = await weatherInfo(location.Key);
    return{location,weatherDetail};
}

// event listener for the form field 
cityInput.addEventListener('submit',e =>{
    e.preventDefault();
    const city = cityInput.city.value.trim();
    cityInput.reset();

    updateWeather(city)
        .then(data => updateUI(data))
        .catch(err => {
            console.log('Please enter a valid city name')
            console.log("could not fetch the data",err);
        })
})



const updateUI = (data) =>{
    const cityDetail = data.location;
    const weatherDetail = data.weatherDetail;
    console.log(cityDetail)
    console.log(weatherDetail)
    degree.textContent = weatherDetail.Temperature.Metric.Value;
    condition.textContent = weatherDetail.WeatherText
    
    //convert the timestamp gotten to real time 
    const timestamp = weatherDetail.LocalObservationDateTime;
    const now = new Date(timestamp)
    date.textContent = now.toLocaleDateString()
    city.textContent = cityDetail.EnglishName
    
}



