// Today variables 
let todayName = document.getElementById("today_date_day_name")
let todayNumber = document.getElementById("today_date_day_number")
let todayMonth = document.getElementById("today_date_month")
let todayLocation = document.getElementById("today_location")
let todayTemp = document.getElementById("today_temp")
let todayConditionImg = document.getElementById("today_condition_img")
let todayConditionText = document.getElementById("today_condition_text")
let humidity = document.getElementById("humidity")
let wind = document.getElementById("wind")
let windDirection = document.getElementById("wind_direction")

// next data 
let nextDay = document.getElementsByClassName("next_day_name")
let nextMaxTemp = document.getElementsByClassName("next_max_temp")
let nextMinTemp = document.getElementsByClassName("next_min_temp")
let nextConditionImg = document.getElementsByClassName("next_condition_img")
let nextConditionText = document.getElementsByClassName("next_condition_text")

// search input 
let searchInput = document.getElementById("search")



async function getData(city)
{
  let response= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=e4825c8c06494c6dba5161024232408&q=${city}&days=3`);
  let responseJson= await response.json();
  return responseJson;


}


function displayDataTOday(data){
    let date=new Date();
    let dayNumber=date.getDate();
    let dayname=date.toLocaleDateString("en-us",{weekday:"long"})
    let monthName=date.toLocaleDateString("en-us",{month:"long"})

    todayName.innerHTML=dayname;
    todayNumber.innerHTML=dayNumber;
    todayMonth.innerHTML=monthName;
    todayLocation.innerHTML=data.location.name;
    todayTemp.innerHTML=data.current.temp_c;
    todayConditionImg.setAttribute('src',data.current.condition.icon)
    todayConditionText.innerHTML=data.current.condition.text;
    humidity.innerHTML=data.current.humidity+"%";
    wind.innerHTML=data.current.wind_kph+"Km/h";
    windDirection.innerHTML=data.current.wind_dir;
}

function displayDataOfNextDay(data)
{
 
let forcast=data.forecast.forecastday;
 for(let i=0;i<forcast.length;i++){
    let nextDayDate=new Date(forcast[i+1].date);
    nextDay[i].innerHTML=nextDayDate.toLocaleDateString("en-us",{weekday:"long"});
    nextMaxTemp[i].innerHTML=forcast[i+1].day.maxtemp_c;
    nextConditionText[i].innerHTML=forcast[i+1].day.condition.text;
    nextConditionImg[i].setAttribute('src',forcast[i+1].day.condition.icon)

 }
}

 async function startApp(city='cairo'){
 
   let weatherData=await getData(city);
   if(!weatherData.error)
   {
    displayDataTOday(weatherData)
    displayDataOfNextDay(weatherData)
   }
   
}

searchInput.addEventListener("input",function(){

    startApp(searchInput.value)
})

startApp();