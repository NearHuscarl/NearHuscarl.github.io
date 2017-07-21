(function(){

   let longitude = 0.0,
      latitude = 0.0,
      date = new Date(),
      tempUnit = "C",
      windUnit = "kph",
      weatherFlag = false,
      locationFlag = false;

   function initBackgroundColor(color)
   {
      let cssValue = "";

      for(let i = 0; i < color.length - 1; i++)
      {
         cssValue += "linear-gradient(to right, " + color[i] + ", " + color[i] + "), ";
      }
      cssValue += "linear-gradient(to right, " + color[color.length-1] + ", " + color[color.length-1] + ")";

      $("body").css("background-image", cssValue);
   }

   function initWeatherHTML(weather)
   {
      let bgColor = getBackgroundColor(weather.id),
         thermoIcon = getThermoIcon(weather.temp, tempUnit),
         attr = " style='width: 20; text-align:center' ",
         windIcon = getWindScaleIcon(weather.wind, windUnit),
         cloudIcon =    "<i" + attr + "class='wi wi-sunrise'></i>",
         pressureIcon = "<i" + attr + "class='wi wi-barometer'></i>",
         humidityIcon = "<i" + attr + "class='wi wi-humidity'></i>";

      windIcon = windIcon.slice(0, 2) + attr + windIcon.slice(2); // add attribute to wind icon

      initBackgroundColor(bgColor);
      $(".weather__desc").html(weather.description);
      $(".weather__tempStat").html(weather.temp + "&deg;" + tempUnit);
      $(".weather__tempIcon").html(thermoIcon);
      $(".weather__icon").html(getWeatherIcon(weather.id, weather.wind, windUnit));
      $(".weather__wind").html(windIcon + " Wind: " + weather.wind + " " + windUnit + getWindDir(weather.degree));
      $(".weather__cloud").html(cloudIcon + " Clouds: " + weather.cloud + "%");
      $(".weather__pressure").html(pressureIcon + " Pressure: " + weather.pressure + " hpa");
      $(".weather__humidity").html(humidityIcon + " Humidity: " + weather.humidity + "%");

      weatherFlag = true;
   }

   function getThermoIcon(temp, tempUnit)
   {
      if(tempUnit === "F") // convert to C if unit is F
      {
         temp = convertTempUnit(temp, "C");
      }

      if(temp <= -15){
         return "<i class='fa fa-thermometer-empty'></i>";
      }
      else if(-15 < temp && temp <= 0) {
         return "<i class='fa fa-thermometer-quarter'></i>";
      }
      else if(0 < temp && temp <= 15) {
         return "<i class='fa fa-thermometer-half'></i>";
      }
      else if(15 < temp && temp <= 30) {
         return "<i class='fa fa-thermometer-three-quarters'></i>";
      }
      else if(30 < temp) {
         return "<i class='fa fa-thermometer-full'></i>";
      }
   }

   function getWeatherIcon(id, windSpeed, windUnit)
   {
      let currentTime = "",
         wind = "",
         windy = "";

      if(date.getHours() >= 18 || date.getHours() <= 5) {
         currentTime = "night";
      }
      else {
         currentTime = "day";
      }

      if(windUnit === "kph") // change to mph if unit is kph
      {
         windSpeed = convertWindSpeedUnit(windSpeed, "mph");
      }
      // https://www.windfinder.com/wind/windspeed.htm
      if(windSpeed >= 25)
      {
         wind = "-wind";
         windy = "-windy";
      }

      // https://openweathermap.org/weather-conditions
      if(200 <= id && id <= 232) {
         return "<i class='wi wi-" + currentTime + "-thunderstorm'></i>";
      }
      else if(300 <= id && id <= 321) {
         return "<i class='wi wi-" + currentTime + "-rain-mix'></i>";
      }
      else if(500 <= id && id <= 504) {
         return "<i class='wi wi-" + currentTime + "-rain" + wind + "'></i>";
      }
      else if(511 <= id && id <= 531) {
         return "<i class='wi wi-" + currentTime + "-showers'></i>";
      }
      else if(600 <= id && id <= 622) {
         return "<i class='wi wi-" + currentTime + "-snow" + wind + "'></i>";
      }
      else if(701 <= id && id <= 781) {
         switch(id)
         {
            case 701:
               return "<i class='wi wi-" + currentTime + "-fog'></i>";
            case 711:
               return "<i class='wi wi-smoke'></i>";
            case 721:
               return "<i class='wi wi-dust'></i>";
            case 731:
               return "<i class='wi wi-tornado'></i>";
            case 741:
               return "<i class='wi wi-" + currentTime + "-fog'></i>";
            case 751:
               return "<i class='wi wi-sandstorm'></i>";
            case 761:
               return "<i class='wi wi-dust'></i>";
            case 762:
               return "<i class='wi wi-volcano'></i>";
            case 771:
               return "<i class='wi wi-strong-wind'></i>";
            case 781:
               return "<i class='wi wi-tornado'></i>";
            default:
               break;
         }
      }
      else if(id === 800)
      {
         if(currentTime === "day") {
            return "<i class='wi wi-day-sunny'></i>";
         }
         else {
            return "<i class='wi wi-night-clear'></i>";
         }
      }
      else if(801 <= id && id <= 804) {
         return "<i class='wi wi-" + currentTime + "-cloudy" + windy + "'></i>";
      }
      else if(900 <= id && id <= 906) {
         switch(id)
         {
            case 900:
               return "<i class='wi wi-tornado'></i>";
            case 901:
               return "<i class='wi wi-hurricane'></i>";
            case 902:
               return "<i class='wi wi-hurricane'></i>";
            case 903:
               return "<i class='wi wi-snowflake-cold'></i>";
            case 904:
               return "<i class='wi wi-hot'></i>";
            case 905:
               return "<i class='wi wi-cloudy-windy'></i>";
            case 906:
               return "<i class='wi wi-" + currentTime + "-hail'></i>";
            default:
               break;
         }
      }
   }

   function getWindScaleIcon(windSpeed, windUnit)
   {
      // https://en.wikipedia.org/wiki/Beaufort_scale

      if(windUnit === "mph") // convert to kph if unit is mph
      {
         windSpeed = convertWindSpeedUnit(windSpeed, "kph");
      }

      if(windSpeed < 1) {
         return "<i class='wi wi-wind-beaufort-0'></i>";
      }
      else if(1 <= windSpeed && windSpeed < 6) {
         return "<i class='wi wi-wind-beaufort-1'></i>";
      }
      else if(6 <= windSpeed && windSpeed < 12) {
         return "<i class='wi wi-wind-beaufort-2'></i>";
      }
      else if(12 <= windSpeed && windSpeed < 20) {
         return "<i class='wi wi-wind-beaufort-3'></i>";
      }
      else if(20 <= windSpeed && windSpeed < 29) {
         return "<i class='wi wi-wind-beaufort-4'></i>";
      }
      else if(29 <= windSpeed && windSpeed < 39) {
         return "<i class='wi wi-wind-beaufort-5'></i>";
      }
      else if(39 <= windSpeed && windSpeed < 50) {
         return "<i class='wi wi-wind-beaufort-6'></i>";
      }
      else if(50 <= windSpeed && windSpeed < 62) {
         return "<i class='wi wi-wind-beaufort-7'></i>";
      }
      else if(62 <= windSpeed && windSpeed < 75) {
         return "<i class='wi wi-wind-beaufort-8'></i>";
      }
      else if(75 <= windSpeed && windSpeed < 89) {
         return "<i class='wi wi-wind-beaufort-9'></i>";
      }
      else if(89 <= windSpeed && windSpeed < 103) {
         return "<i class='wi wi-wind-beaufort-10'></i>";
      }
      else if(103 <= windSpeed && windSpeed < 118) {
         return "<i class='wi wi-wind-beaufort-11'></i>";
      }
      else if(windSpeed >= 118) {
         return "<i class='wi wi-wind-beaufort-12'></i>";
      }
   }

   function getWindDir(deg)
   {
      // http://climate.umn.edu/snow_fence/components/winddirectionanddegreeswithouttable3.htm
      if(deg === undefined) {
         return "";
      }
      if(349 <= deg && deg < 11) {
         return ", <i class='wi wi-wind towards-0-deg'></i> North";
      }
      else if(11 <= deg && deg < 34) {
         return ", <i class='wi wi-wind towards-23-deg'></i> North-northeast";
      }
      else if(34 <= deg && deg < 56) {
         return ", <i class='wi wi-wind towards-45-deg'></i> Northeast";
      }
      else if(56 <= deg && deg < 79) {
         return ", <i class='wi wi-wind towards-68-deg'></i> East-Northeast";
      }
      else if(79 <= deg && deg < 101) {
         return ", <i class='wi wi-wind towards-90-deg'></i> East";
      }
      else if(101 <= deg && deg < 124) {
         return ", <i class='wi wi-wind towards-113-deg'></i> East-southeast";
      }
      else if(124 <= deg && deg < 146) {
         return ", <i class='wi wi-wind towards-135-deg'></i> Southeast";
      }
      else if(146 <= deg && deg < 169) {
         return ", <i class='wi wi-wind towards-158-deg'></i> South-southeast";
      }
      else if(169 <= deg && deg < 191) {
         return ", <i class='wi wi-wind towards-180-deg'></i> South";
      }
      else if(191 <= deg && deg < 214) {
         return ", <i class='wi wi-wind towards-203-deg'></i> South-southwest";
      }
      else if(214 <= deg && deg < 236) {
         return ", <i class='wi wi-wind towards-225-deg'></i> Southwest";
      }
      else if(236 <= deg && deg < 259) {
         return ", <i class='wi wi-wind towards-248-deg'></i> West-southwest";
      }
      else if(259 <= deg && deg < 281) {
         return ", <i class='wi wi-wind towards-270-deg'></i> West";
      }
      else if(281 <= deg && deg < 304) {
         return ", <i class='wi wi-wind towards-293-deg'></i> West-northwest";
      }
      else if(304 <= deg && deg < 326) {
         return ", <i class='wi wi-wind towards-313-deg'></i> Northwest";
      }
      else if(326 <= deg && deg < 349) {
         return ", <i class='wi wi-wind towards-336-deg'></i> North-northwest";
      }
   }

   function getWeather(lon, lat, callback)
   {
      // callback=? to get jsonp instead of json to solve cross domain problem
      // let url = "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + lon + "&callback=?";
      let weatherApiKey = "&APPID=828ae1247f478a35f20c2a9303c677c2",
         url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + weatherApiKey + "&units=metric";

      $.getJSON(url, function(weatherJson){
         let weather = {
            id:          weatherJson.weather[0].id,
            description: weatherJson.weather[0].description,
            temp:        Math.round(weatherJson.main.temp),
            wind:        parseFloat((weatherJson.wind.speed * 3600 / 1000).toFixed(1)), // convert from m/s to k/h
            degree:      weatherJson.wind.deg, 
            cloud:       weatherJson.clouds.all,
            pressure:    weatherJson.main.pressure,
            humidity:    weatherJson.main.humidity
         }

         callback(weather);
         console.log(weatherJson);
      });
   }

   function initCityHTML(nameList)
   {
      $("weather__city").html(nameList.city + " - " + nameList.district);
      cityFlag = true;
   }

   function initCountryHTML(nameList)
   {
      $("weather__city").html(nameList.city + " - " + nameList.country);
   }

   function getLocationInfo(lon, lat, callback)
   {
      let apiKey = "AIzaSyASk8XzwvoBEBwhQU4SfA84ENUoECNWvRE",
         url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lon + "&key=" + apiKey;

      $.getJSON(url, function(geocodeJson){

         let country = 5,
            city = 4,
            district = 3,
            fallback = 0;

         // not every country has this administrative level (5) -> if so long_name will return a number
         if(Number.isInteger(parseInt(geocodeJson.results[0].address_components[5].long_name))) {
            fallback++;
         } // same as above case, also applied with all below cases
         if(Number.isInteger(parseInt(geocodeJson.results[0].address_components[4].long_name))) {
            fallback++;
         }
         if(Number.isInteger(parseInt(geocodeJson.results[0].address_components[3].long_name))) {
            fallback++;
         }
         if(Number.isInteger(parseInt(geocodeJson.results[0].address_components[2].long_name))) {
            fallback++;
         }
         if(Number.isInteger(parseInt(geocodeJson.results[0].address_components[1].long_name))) {
            fallback++;
         }
         country-= fallback;
         city-= fallback;
         district-= fallback;

         let name = {
            district:  geocodeJson.results[0].address_components[3].long_name,
            city:   geocodeJson.results[0].address_components[4].long_name,
            country:   geocodeJson.results[0].address_components[5].long_name
         };

         callback(name);
      })
   }

   function convertWindSpeedUnit(num, unit)
   {
      if(unit === "kph")
      {
         return parseFloat((num * 0.621371).toFixed(1));
      }
      else if(unit === "mph")
      {
         return parseFloat((num * 1.60934).toFixed(1));
      }
   }

   function convertTempUnit(num, unit)
   {
      if(unit === "C")
      {
         return Math.round((num - 32) / 1.8);
      }
      else if(unit === "F")
      {
         return Math.round(num * 1.8 + 32);
      }
   }

   function getBackgroundColor(id)
   {
      if((200 <= id && id <= 232) || id === 901 || id === 902) // storm
      {
         return ["#282828", "#272c2e", "#263034", "#25353a", "#243940", "#233d46", "#23424c"]; // black
      }
      else if(300 <= id && id <= 531) // rain
      {
         return ["#687a8b", "#6e8191", "#758897", "#7c8f9d", "#8396a3", "#8a9da9", "#91a4af"]; // lightgrey
      }
      else if((600 <= id && id <= 622) || id === 903) // snow
      {
         return ["#40e0d0", "#53e3d4", "#66e6d9", "#79e9de", "#8cece2", "#9fefe7", "#b2f2ec"]; // lightcyan
      }
      else if((701 <= id && id <= 781) || id === 900) // atmosphere
      {
         return ["#865356", "#855461", "#84566d", "#835779", "#825984", "#815a90", "#815c9c"]; // brown
      }
      else if(id === 800 || id === 904) // clear
      {
         if(date.getHours() >= 18 || date.getHours() <= 5)
         {
            return ["#601e9e", "#6429ac", "#6835ba", "#6c41c8", "#704cd6", "#7458e4", "#7864f2"]; // purple
         }
         else
         {
            return ["#ff5d39", "#ff692f", "#ff7526", "#ff811c", "#ff8d13", "#ff9909", "#ffa500"]; // orange
         }
      }
      else if(801 <= id && id <= 804) // cloud
      {
         return ["#226982", "#287088", "#2f788e", "#358094", "#3c889a", "#4290a0", "#4998a6"] // darkblue
      }
   }

   function setTime()
   {
      $(".dateTime__date").html(getDay() + " " + date.getDate() + " " + getMonth());
      $(".dateTime__time").html(getTime());
   }

   function getTime()
   {
      date = new Date();

      let hour = date.getHours(),
         minute = ("0" + date.getMinutes()).slice(-2);

      if(date.getHours() === 12)
      {
         return hour + ":" + minute + " PM";
      }
      else if(date.getHours() > 12)
      {
         return hour - 12 + ":" + minute + " PM";
      }
      else
      {
         return hour + ":" + minute + " AM";
      }
   }

   function getDay()
   {
      let day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      return day[date.getDay()];
   }

   function getMonth()
   {
      let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return month[date.getMonth()];
   }

   function animateShow()
   {
      $("h1").css("transform", "rotateX(0deg)");
   }

   function onClickTemp()
   {
      let temp = parseInt($(".weather__tempStat").text()),
         thermoIcon = $(".weather__tempIcon").html();

      tempUnit = (tempUnit === "C" ? "F" : "C");
      temp = convertTempUnit(temp, tempUnit);
      $(".weather__tempStat").html(temp + "&deg;" + tempUnit);
      $(".weather__tempIcon").html(thermoIcon);
   }

   function onClickWind()
   {
      let windIcon = $(".weatherInfo__wind").html().match(/^.*?(<\/i>)/)[0],
         windSpeed = parseFloat($(".weatherInfo__wind").text().trim().slice(6)),
         windDir = $(".weatherInfo__wind").html().match(/,.*$/)[0];

      windUnit = (windUnit === "kph" ? "mph" : "kph");
      windSpeed = convertWindSpeedUnit(windSpeed, windUnit);
      $("weatherInfo__wind").html(windIcon + " Wind: " + windSpeed + " " + windUnit + windDir);
   }

   function onClickRandom()
   {
      let url = "https://raw.githubusercontent.com/NearHuscarl/NearHuscarl.github.io/master/Weather/cityList.json";

      $.getJSON(url, function(cityJson){
         let randNum = Math.floor(Math.random() * (1947 + 1)),
            latitude = cityJson[randNum].lat,
            longitude = cityJson[randNum].lon;

         getWeather(longitude, latitude, initWeatherHTML);
         getLocationInfo(longitude, latitude, initCountryHTML);
      });
   }

   $(document).ready(function(){

      setTime();

      if(navigator.geolocation)
      {
         navigator.geolocation.getCurrentPosition(function(position){

            longitude = position.coords.longitude;
            latitude = position.coords.latitude;

            $("h1").text("Current Weather");

            getWeather(longitude, latitude, initWeatherHTML);
            getLocationInfo(longitude, latitude, initCityHTML);
            setInterval(setTime, 60000); // Update time every 60 seconds

            $(".weather__temp").on("click", onClickTemp);
            $(".weatherInfo__wind").on("click", onClickWind);
            $(".debug").on("click", onClickRandom);

            if(weatherFlag === true && cityFlag === true)
            {
               // Statements
            }

         });
      }
      else
      {
         $(".test").html("Geolocation is not supported on this browser");
      }

   });

})();
