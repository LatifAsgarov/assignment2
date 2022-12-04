const inputChoiceElement = document.getElementById("input-choices")
const cityNameInput = document.getElementById("city-name")
const latitudeInput = document.getElementById("latitude")
const longitudeInput = document.getElementById("longitude")
const SenderButton = document.getElementById("sender")
const temperatureTextElement = document.getElementById('temperature-text')
const CityText = document.getElementById("cityTextElement")
const CountryName = document.getElementById("countryName")
const detailedInformation = document.getElementById("detailedInfo")
const Weathercondition = document.getElementById("weatherCondition")
const time = document.getElementById("time")
const detInfo = document.getElementById("Detailed-Info")
const maxTemprature = document.getElementById("maxTemp")
const minTemprature = document.getElementById("minTemp")
const humidity = document.getElementById("hum")
const pressure = document.getElementById("press")
const Wspeed = document.getElementById("speed")
const Wdeg = document.getElementById("degree")

let geolocationLatitude
let geolocationLongtitude
let button

const getLocation = () => {
  if (navigator.geolocation) {
    SenderButton.disabled = true
    SenderButton.innerText = "Loading..."
    navigator.geolocation.getCurrentPosition((p) => {
      geolocationLatitude = p.coords.latitude;
      geolocationLongtitude = p.coords.longitude
      SenderButton.disabled = false
      SenderButton.innerText = "Send data"
    });
  }
}

const inputChoiceHandler = (e) => {
  cityNameInput.style.display = "none"
  latitudeInput.style.display = "none"
  longitudeInput.style.display = "none"
  if (e.target.value == "city") {
    cityNameInput.style.display = "inline-block"
  } else if (e.target.value == "latLong") {
    latitudeInput.style.display = "inline-block"
    longitudeInput.style.display = "inline-block"
  } else if (e.target.value == "geolocation") {
    getLocation()
  }
}

const getCountryFullName = async (countrycode) => {
  const response = await axios.get(`https://restcountries.com/v3.1/alpha/${countrycode}`)
  return response.data[0].name.common;
}

const getTime = (seconds) => {
  var date = new Date(0);
  date.setSeconds(seconds);
  var timeString = date.toISOString().substring(0, 19);
  return timeString.split("T")[0] + " " + timeString.split("T")[1]
}

const degToCompass = (Wdeg) => {
  var val = Math.floor((Wdeg / 22.5) + 0.5);
  var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  return arr[(val % 16)];
}

const setInformation = async (response) => {
  temperatureTextElement.innerText = response.data.main.temp
  detailedInformation.innerText = response.data.main.feels_like
  maxTemprature.innerText = response.data.main.temp_max
  minTemprature.innerText = response.data.main.temp_min
  humidity.innerText = response.data.main.humidity
  pressure.innerText = response.data.main.pressure
  Wspeed.innerText = response.data.wind.speed
  Wdeg.innerText = await degToCompass(response.data.wind.deg)
  CityText.innerText = response.data.name
  Weathercondition.innerText = response.data.weather[0].main
  detInfo.innerText = response.data.weather[0].description
  time.innerText = getTime(response.data.dt);
  CountryName.innerText = await getCountryFullName(response.data.sys.country)
}

const getWeatherInfo = async () => {
  if (inputChoiceElement.value == "city") {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityNameInput.value}&appid=f4d5930c35c97f6f23efa6ca85368169`)
    setInformation(response)
    console.log(response);
  } else if (inputChoiceElement.value == "latLong") {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitudeInput.value}&lon=${longitudeInput.value}&appid=f4d5930c35c97f6f23efa6ca85368169&units=metric`)
    setInformation(response)
  } else if (inputChoiceElement.value == "geolocation") {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${geolocationLatitude}&lon=${geolocationLongtitude}&appid=f4d5930c35c97f6f23efa6ca85368169&units=metric`)
    setInformation(response)
  }
}

SenderButton.addEventListener("click", getWeatherInfo)
inputChoiceElement.addEventListener("change", inputChoiceHandler)
