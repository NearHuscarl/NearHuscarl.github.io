(function(){

   let coords = {
      lat: 0.0,
      lon: 0.0
   },
      date = new Date(),
      tempUnit = "C",
      windUnit = "kph",
      debug = {
         lat: 0.0,
         lon: 0.0,
         address: ["N/A","N/A","N/A","N/A","N/A","N/A"],
         weather: {
            id: 0,
            main: "N/A",
            desc: "N/A",
            temp: 0,
            pressure: 0,
            humidity: 0,
            wind: {
               speed: 0.0,
               deg: 0
            },
            clouds: 0
         }
      },
      localLocationInfo = {},
      localWeatherInfo = {};

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

   function initWeatherHTML(json)
   {
      let id         = json.weather[0].id,
         description = json.weather[0].description,
         temp        = Math.round(json.main.temp),
         wind        = parseFloat((json.wind.speed * 3600 / 1000).toFixed(1)), // convert from m/s to k/h
         degree      = json.wind.deg, 
         cloud       = json.clouds.all,
         pressure    = json.main.pressure,
         humidity    = json.main.humidity;

      let bgColor = getBackgroundColor(id),
         thermoIcon = getThermoIcon(temp, tempUnit),
         attr = " style='width: 20; text-align:center' ",
         windIcon = getWindScaleIcon(wind, windUnit),
         cloudIcon =    "<i" + attr + "class='wi wi-sunrise'></i>",
         pressureIcon = "<i" + attr + "class='wi wi-barometer'></i>",
         humidityIcon = "<i" + attr + "class='wi wi-humidity'></i>";

      windIcon = windIcon.slice(0, 2) + attr + windIcon.slice(2); // add attribute to wind icon

      initBackgroundColor(bgColor);
      $(".weather__desc").html(description);
      $(".weather__tempStat").html(temp + "&deg;" + tempUnit);
      $(".weather__tempIcon").html(thermoIcon);
      $(".weather__icon").html(getWeatherIcon(id, wind, windUnit));
      $(".weather__wind").html(windIcon + " Wind: " + wind + " " + windUnit + ", " + getWindDir(degree));
      $(".weather__cloud").html(cloudIcon + " Clouds: " + cloud + "%");
      $(".weather__pressure").html(pressureIcon + " Pressure: " + pressure + " hpa");
      $(".weather__humidity").html(humidityIcon + " Humidity: " + humidity + "%");
   }

   function initCityHTML(json)
   {
      let cityIndex = 4,
         districtIndex = 3,
         fallback = 0;

      // not every country has this administrative level (5) -> if so long_name will return a number
      if(Number.isInteger(parseInt(json.results[0].address_components[5].long_name))) {
         fallback++; // same as above case, also applied with all below cases
         if(Number.isInteger(parseInt(json.results[0].address_components[4].long_name))) {
            fallback++;
            if(Number.isInteger(parseInt(json.results[0].address_components[3].long_name))) {
               fallback++;
               if(Number.isInteger(parseInt(json.results[0].address_components[2].long_name))) {
                  fallback++;
                  if(Number.isInteger(parseInt(json.results[0].address_components[1].long_name))) {
                     fallback++;
                  }
               }
            }
         }
      } 
      cityIndex-= fallback;
      districtIndex-= fallback;

      let district = json.results[0].address_components[districtIndex].long_name,
         city      = json.results[0].address_components[cityIndex].long_name;

      $(".weather__city").html(city + " - " + district);
   }

   function initCountryHTML(json)
   {
      let countryIndex = 5,
         cityIndex = 4,
         fallback = 0;

      // not every country has this administrative level (5) -> if so long_name will return a number
      if(Number.isInteger(parseInt(json.results[0].address_components[5].long_name))) {
         fallback++; // same as above case, also applied with all below cases
         if(Number.isInteger(parseInt(json.results[0].address_components[4].long_name))) {
            fallback++;
            if(Number.isInteger(parseInt(json.results[0].address_components[3].long_name))) {
               fallback++;
               if(Number.isInteger(parseInt(json.results[0].address_components[2].long_name))) {
                  fallback++;
                  if(Number.isInteger(parseInt(json.results[0].address_components[1].long_name))) {
                     fallback++;
                  }
               }
            }
         }
      }
      countryIndex-= fallback;
      cityIndex-= fallback;

      let city   = json.results[0].address_components[cityIndex].long_name,
         country = json.results[0].address_components[countryIndex].long_name;

      $(".weather__city").html(city + " - " + country);
   }

   function initDebugHTML(geocodeJson, weatherJson)
   {
      console.log(geocodeJson);
      console.log(weatherJson);

      debug.address[0] = geocodeJson.results[0].address_components[0].long_name;
      debug.address[1] = geocodeJson.results[0].address_components[1].long_name;
      debug.address[2] = geocodeJson.results[0].address_components[2].long_name;
      debug.address[3] = geocodeJson.results[0].address_components[3].long_name;
      debug.address[4] = geocodeJson.results[0].address_components[4].long_name;
      debug.address[5] = geocodeJson.results[0].address_components[5].long_name;
      debug.lon = geocodeJson.results[0].geometry.location.lng;
      debug.lat = geocodeJson.results[0].geometry.location.lat;

      debug.weather.id          = weatherJson.weather[0].id;
      debug.weather.main        = weatherJson.weather[0].main;
      debug.weather.desc        = weatherJson.weather[0].description;
      debug.weather.temp        = Math.round(weatherJson.main.temp);
      debug.weather.pressure    = weatherJson.main.pressure;
      debug.weather.humidity    = weatherJson.main.humidity;
      debug.weather.wind.speed  = parseFloat((weatherJson.wind.speed * 3600 / 1000).toFixed(1)); // convert from m/s to k/h
      debug.weather.wind.deg    = weatherJson.wind.deg;
      debug.weather.clouds      = weatherJson.clouds.all;

      var sp = "&nbsp;&nbsp;";

      $(".footer__bugTooltip").html(
         "---Debug Info---<br>" +
         "latitude:  " + debug.lat + "<br>" +
         "longitude: " + debug.lon + "<br>" +
         "address_0: " + debug.address[0] + "<br>" +
         "address_1: " + debug.address[1] + "<br>" +
         "address_2: " + debug.address[2] + "<br>" +
         "address_3: " + debug.address[3] + "<br>" +
         "address_4: " + debug.address[4] + "<br>" +
         "address_5: " + debug.address[5] + "<br>" +
         "weather: <br>" +
         sp + "id: " + debug.weather.id + "<br>" +
         sp + "main: " + debug.weather.main + "<br>" +
         sp + "desc: " + debug.weather.desc + "<br>" +
         sp + "temp: " + debug.weather.temp + "<br>" +
         sp + "pressure: " + debug.weather.pressure + "<br>" +
         sp + "humidity: " + debug.weather.humidity + "<br>" +
         sp + "wind: <br>" +
         sp + sp + "speed: " + debug.weather.wind.speed + "<br>" +
         sp + sp + "deg: " + debug.weather.wind.deg + "<br>" +
         sp + "clouds: " + debug.weather.clouds + "<br>"
      );
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
         return "<i class='wi wi-wind towards-0-deg'></i> North";
      }
      else if(11 <= deg && deg < 34) {
         return "<i class='wi wi-wind towards-23-deg'></i> North-northeast";
      }
      else if(34 <= deg && deg < 56) {
         return "<i class='wi wi-wind towards-45-deg'></i> Northeast";
      }
      else if(56 <= deg && deg < 79) {
         return "<i class='wi wi-wind towards-68-deg'></i> East-Northeast";
      }
      else if(79 <= deg && deg < 101) {
         return "<i class='wi wi-wind towards-90-deg'></i> East";
      }
      else if(101 <= deg && deg < 124) {
         return "<i class='wi wi-wind towards-113-deg'></i> East-southeast";
      }
      else if(124 <= deg && deg < 146) {
         return "<i class='wi wi-wind towards-135-deg'></i> Southeast";
      }
      else if(146 <= deg && deg < 169) {
         return "<i class='wi wi-wind towards-158-deg'></i> South-southeast";
      }
      else if(169 <= deg && deg < 191) {
         return "<i class='wi wi-wind towards-180-deg'></i> South";
      }
      else if(191 <= deg && deg < 214) {
         return "<i class='wi wi-wind towards-203-deg'></i> South-southwest";
      }
      else if(214 <= deg && deg < 236) {
         return "<i class='wi wi-wind towards-225-deg'></i> Southwest";
      }
      else if(236 <= deg && deg < 259) {
         return "<i class='wi wi-wind towards-248-deg'></i> West-southwest";
      }
      else if(259 <= deg && deg < 281) {
         return "<i class='wi wi-wind towards-270-deg'></i> West";
      }
      else if(281 <= deg && deg < 304) {
         return "<i class='wi wi-wind towards-293-deg'></i> West-northwest";
      }
      else if(304 <= deg && deg < 326) {
         return "<i class='wi wi-wind towards-313-deg'></i> Northwest";
      }
      else if(326 <= deg && deg < 349) {
         return "<i class='wi wi-wind towards-336-deg'></i> North-northwest";
      }
   }

   function getWeatherInfo(geocodeJson, callback, callback2, isLocal)
   {
      coords.lon = geocodeJson.results[0].geometry.location.lng;
      coords.lat = geocodeJson.results[0].geometry.location.lat;

      let weatherApiKey = "&APPID=828ae1247f478a35f20c2a9303c677c2",
         url = "http://api.openweathermap.org/data/2.5/weather?lat=" + coords.lat + "&lon=" + coords.lon + weatherApiKey + "&units=metric";

      $.getJSON(url, function(weatherJson){

         if(isLocal)
         {
            $.extend(localWeatherInfo, weatherJson);
         }

         initDebugHTML(geocodeJson, weatherJson);
         callback(geocodeJson);
         callback2(weatherJson);
      });
   }

   function getLocationInfo(coords, callback, callback2, isLocal)
   {
      let apiKey = "AIzaSyASk8XzwvoBEBwhQU4SfA84ENUoECNWvRE",
         url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + coords.lat + "," + coords.lon + "&key=" + apiKey;

      $.getJSON(url, function(geocodeJson){

         if(isLocal)
         {
            $.extend(localLocationInfo, geocodeJson);
         }

         getWeatherInfo(geocodeJson, callback, callback2, isLocal);
      })
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

      if(date.getHours() === 12) {
         return hour + ":" + minute + " PM";
      }
      else if(date.getHours() > 12) {
         return hour - 12 + ":" + minute + " PM";
      }
      else {
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
      let windIcon = $(".weather__wind").html().match(/^.*?(<\/i>)/)[0],
         windSpeed = parseFloat($(".weather__wind").text().trim().slice(6)),
         windDir = $(".weather__wind").html().match(/,.*$/)[0];

      windUnit = (windUnit === "kph" ? "mph" : "kph");
      windSpeed = convertWindSpeedUnit(windSpeed, windUnit);
      $(".weather__wind").html(windIcon + " Wind: " + windSpeed + " " + windUnit + windDir);
   }

   function onClickRandom()
   {
      let url = "https://raw.githubusercontent.com/NearHuscarl/NearHuscarl.github.io/master/Weather/cityList.json";

      $.getJSON(url, function(cityJson){
         let randNum = Math.floor(Math.random() * (1947 + 1)),
            coords = {
               lat: cityJson[randNum].lat,
               lon: cityJson[randNum].lon
            }

         debug.lon = coords.lon;
         debug.lat = coords.lat;

         getLocationInfo(coords, initCountryHTML, initWeatherHTML, false);
      });
   }

   function onClickLocal()
   {
      initWeatherHTML(localWeatherInfo);
      initCityHTML(localLocationInfo);
      initDebugHTML(localLocationInfo, localWeatherInfo);
   }

   $(document).ready(function(){

      setTime();
      $(".cpr-year").text(new Date().getFullYear());

      if(navigator.geolocation)
      {
         navigator.geolocation.getCurrentPosition(function(position){

            coords.lon = position.coords.longitude;
            coords.lat = position.coords.latitude;

            $("h1").text("Current Weather");

            getLocationInfo(coords, initCityHTML, initWeatherHTML, true);
            setInterval(setTime, 60000); // Update time every 60 seconds

            $(".weather__temp").on("click", onClickTemp);
            $(".weather__wind").on("click", onClickWind);
            $(".footer__randWeather").on("click", onClickRandom);
            $(".footer__localWeather").on("click", onClickLocal);
         });
      }
      else
      {
         $(".test").html("Geolocation is not supported on this browser");
      }

   });

})();
