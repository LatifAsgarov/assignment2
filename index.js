const inputChoiceElement = document.getElementById("input-choices")
const cityNameInput = document.getElementById("city-name")
const latitudeInput = document.getElementById("latitude")
const longitudeInput = document.getElementById("longitude")
const SenderButton = document.getElementById("sender")

let geolocationLatitude
let geolocationLongtitude

const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((p)=>{
        geolocationLatitude = p.coords.latitude;
         geolocationLongtitude = p.coords.longitude
      });
    } 
  }

const inputChoiceHandler = (e) => {
    cityNameInput.style.display = "none"
    latitudeInput.style.display = "none"
    longitudeInput.style.display = "none"
    if (e.target.value == "city") {
        cityNameInput.style.display = "inline-block"
    }else if(e.target.value == "latLong"){
        latitudeInput.style.display = "inline-block"
        longitudeInput.style.display = "inline-block"
    }else if(e.target.value == "geolocation"){
        getLocation()
    }
}

const getWeatherInfo = () => { 
   if(inputChoiceElement.value == "city"){
    console.log(cityNameInput.value);
   }else if(inputChoiceElement.value == "latLong"){
    console.log(latitudeInput.value, longitudeInput.value);
   }else if(inputChoiceElement.value == "geolocation"){
    console.log(geolocationLatitude,geolocationLongtitude);
   }

}

SenderButton.addEventListener("click", getWeatherInfo)
inputChoiceElement.addEventListener("change", inputChoiceHandler)
