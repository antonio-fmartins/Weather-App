//variables
var hour = document.querySelector('.hour')
var minute = document.querySelector('.minute')
var dayname = document.querySelector('.dayname')
var day = ["Sunday,","Monday,","Tuesday,","Wednesday,","Thursday,","Friday,","Saturday,"]
var month= document.querySelector('.month')
var months = ['January','February','March','April','May','June','July','August','September','October','November','December']
var nday= document.querySelector('.nday')
var year= document.querySelector('.year')
var data = new Date()
var apikey = "80abda605526f239890885c33aa2a841"
var inputcity = document.querySelector('.search')
var btnsearch = document.querySelector('.btnsearch')
var namecity = document.querySelector('.location')
var namecountry = document.querySelector('.country')
var section = document.querySelector('.section')
var imgweather = document.querySelector('.icon-description img')
var txtdescription = document.querySelector('.description')
var tempnow = document.querySelector('.degreenow')
var tempmax = document.querySelector('.tempmax')
var tempmin = document.querySelector('.tempmin')
var valuehumidity = document.querySelector('.nhumidity')
var valuepressure = document.querySelector('.npressure')
var valuewind = document.querySelector('.nwind')
/*----------------------------------------*/
hour.innerHTML = ('0' + data.getHours()).slice(-2)
minute.innerHTML = ('0' + data.getMinutes()).slice(-2)
dayname.innerHTML = day[data.getDay()]
month.innerHTML = months[data.getMonth()]
nday.innerHTML = (data.getDate() + ",")
year.innerHTML = data.getFullYear()

//events
btnsearch.addEventListener('click', searchcity)

//functions

  //background:linear-gradient(rgb(0,0,0,0.7),rgb(0,0,0,0.6), rgb(255,255,255,0.1)),
  

function searchcity(e){
  e.preventDefault()

  var city = inputcity.value 
  getapi(city)
  inputcity.value = ""
  inputcity.focus()

}

var getapi = async(city)=>{

  await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`)
  .then((response)=>{
    return response.json()
  })
  .then((data)=>{
    console.log(data)
    const {temp,temp_max,temp_min,humidity,pressure} = data.main
    const {description,id} = data.weather[0]
    namecity.innerHTML = data.name
    namecountry.setAttribute('src', `https://flagcdn.com/256x192/${data.sys.country.toLowerCase()}.png`)
    document.body.style.backgroundImage = "url('https://source.unsplash.com/1200x900/?" + data.name +"')"
    txtdescription.innerHTML = description
    tempnow.innerHTML = Math.floor(temp)
    tempmax.innerHTML = Math.floor(temp_max)
    tempmin.innerHTML = Math.floor(temp_min)
    valuehumidity.innerHTML = humidity
    valuepressure.innerHTML = pressure
    valuewind.innerHTML = Math.floor(data.wind.speed)

    if(id == 800){
      imgweather.src = "icons/clear.svg"
    }else if( id >=801 && id <= 804){
      imgweather.src = "icons/cloudy.svg"
    }else if( id >=200 && id <= 232){
      imgweather.src = "icons/Thunderstorm.svg"
    }else if( id >=300 && id <= 321){
      imgweather.src = "icons/Rain.svg"
    }else if( id >=500 && id <= 504){
      imgweather.src = "icons/Rain-day.svg"
    }else if( id == 511){
      imgweather.src = "icons/Frezze.svg"
    }else if( id >=520 && id <= 531){
      imgweather.src = "icons/Rain-night.svg"
    }else if( id >=600 && id <= 622){
      imgweather.src = "icons/Frezze.svg"
    }else if( id >=700 && id <= 781){
      imgweather.src = "icons/Fog.svg"
  }

  section.classList.toggle('hide')
  namecountry.classList.toggle('hide')
})


}


