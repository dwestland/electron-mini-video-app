// const WEATHER_WIDGET_URL = `https://www.siliconbeachcoding.com/api/weather-widget/90245`
const WEATHER_WIDGET_URL = `https://www.siliconbeachcoding.com/api/weather-widget/90291`

const convertTime = (unixTime, timeZone) => {
  unixTime += timeZone
  let newTime = new Date(unixTime * 1000).toISOString().slice(0, 16).replace('T', ' ')
  return newTime
}

const convertTemp = (temp) => {
  // Kelvin to Fahrenheit
  let newTemp = Math.round(temp * 9/5 - 459.67)
  return newTemp
}

const getWeather = async() => {
  console.time('Received Weather Data')
	const response = await fetch(WEATHER_WIDGET_URL)
   .catch((error)=>console.log('Fetch Error: ', error))
	const data = await response.json()
	return data
}

const result = getWeather();

result.then((data) => {
  let weatherIcon = data.weather[0].icon
  let weatherWidget = `
    <div class="weather-widget-container">
    <div class="weather-widget-title">${data.name} Weather</div>
    <div class="weather-widget-icon">
      <img src="weather-icons/${weatherIcon}.svg" alt="${data.weather[0].main}">
    </div>
    <div class="weather-widget-temperature">${convertTemp(data.main.temp)}&deg;F</div>
    <div class="weather-widget-condition">${data.weather[0].main}</div>
    <div class="weather-widget-updated">Updated: ${convertTime(data.dt, data.timezone)}</div>
    </div>
  `
  document.getElementById("weather").innerHTML = weatherWidget
  console.timeEnd('Received Weather Data')
})
