const key = "8GW8G6u4fSfg9gAL3gdOnjgJG678wwkv"
// Using Accuweather API for this project
// Free Acccuweather allows just one app and 50 requests per day

// Request the city input from the API
const requestCity = async (location) => {
    // link to fetch city data
    const link = 'https://dataservice.accuweather.com/locations/v1/cities/search';
    // send a request using the api key and the city name 
    const request = `?apikey=${key}&q=${location}`
    // fetch the  data through the link 
    const result = await fetch(link + request);
    const output = await result.json()
    // return an object carrying properties for the city
    return output[0]
}
// Request the current weather condition of that location using the city Key 
const weather = async (id) => {
    // link to fetch the city current weather condition using the city key and app's api
    const link = `https://dataservice.accuweather.com/currentconditions/v1/{locationKey}`
    const request = `${id}?apikey=${key}` 
    const result = await fetch(link + request);
    const output = await result.json()
    return output[0]
}


// Target the form and assigned the element to the variable cityInput
const cityInput = document.querySelector('form')

// A function to request foe the city data and weather info 
let updateCity = async (location) => {
    // run the requestCity function 
    const cityName = await requestCity(location);
    // run the weather function to get the weather information using the city unique key 
    const weatherInfo = await weather(cityName.Key);
    console.log(cityName);
    console.log(weatherInfo)
    return { cityName, weatherInfo };
}

// A funtion to watch the form for any input 
cityInput.addEventListener('submit', e => {
    e.preventDefault();
// Assign the value of the user input as a constant variable 
    const city = cityInput.location.value;
    // reset to clear the user inout after getting the value 
    cityInput.reset();

    // A function to get the user input and update the DOM with the data gotten from the api
    updateCity(city)
        .then(data => dataUpdate(data))
        // .catch(err => {
           
        //     console.log("could not fetch the data")
        // })
})

const temperature = document.querySelector(".temperature")
const condition = document.querySelector(".condition")
const icon = document.querySelector(".icon img")
const currentTime = document.querySelector(".time")
const currentDate = document.querySelector(".date")
const currentCity = document.querySelector(".city")


const dataUpdate = (data) =>{
    // wDetail.classList.remove('d-none')
    // cityTime.classList.remove('d-none')

    const cityInfo = data.cityName;
    const weatherInfo = data.weatherInfo;
    console.log(cityInfo)
    console.log(weatherInfo)
    temperature.textContent = weatherInfo.Temperature.Metric.Value;
    condition.textContent = weatherInfo.WeatherText
    // const weatherIconNumber = weatherInfo.WeatherIcon
    // icon.setAttribute('src',`icons/${weatherIconNumber}.svg`)
    
    //from weather condition we will get timestamp 
    //So we have to convert it into real time
    const timestamp = weatherDetail.LocalObservationDateTime;
    const now = new Date(timestamp)
    currentTime.textContent = now.toLocaleDateString()
    currentCity.textContent = cityInfo.EnglishName
//     if(weatherDetail.IsDayTime){
//         curMeridiem.textContent = "Day";
//     }else{
//         curMeridiem.textContent = 'Night';
//     }
}
