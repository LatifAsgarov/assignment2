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

const setInformation = async (response) => {
  temperatureTextElement.innerText = response.data.main.temp
  CityText.innerText = response.data.name
  detailedInformation.innerText = response.data.main.feels_like
  // Weathercondition.innerText = response.weather.description
  time.innerText = getTime(response.data.dt);
  CountryName.innerText = await getCountryFullName(response.data.sys.country)
}

const getWeatherInfo = async () => {
  if (inputChoiceElement.value == "city") {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityNameInput.value}&appid=f4d5930c35c97f6f23efa6ca85368169`)
    setInformation(response)
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
