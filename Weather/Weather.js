var weatherApp = (function(){

      date = new Date(),
      tempUnit = "C",
      windUnit = "kph",
      bgColorState = false,
      isFrontWeather = true,
      isFrontLocation = true,
      debug = {
         lat: 0.0,
         lon: 0.0,
         offset: 0,
         address: ["N/A","N/A","N/A","N/A","N/A","N/A","N/A","N/A"],
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
      localWeatherInfo = {},
      currentDate = {}, // current date display in html
      localDate = {}; // current date at your location

   function initWeatherHTML(json)
   {
      let id         = json.weather[0].id,
         description = json.weather[0].description,
         temp        = ("0" + Math.round(json.main.temp)).slice(-2), // add a zero before if has only 1 digit
         wind        = parseFloat((json.wind.speed * 3600 / 1000).toFixed(1)), // convert from m/s to k/h
         degree      = json.wind.deg,
         cloud       = json.clouds.all,
         pressure    = json.main.pressure,
         humidity    = json.main.humidity;

      let thermoIcon = getThermoIcon(temp, tempUnit),
         attr = " style='width: 20; text-align:center' ",
         windIcon = getWindScaleIcon(wind, windUnit),
         windDir = getWindDir(degree),
         cloudIcon =    "<i" + attr + "class='wi wi-sunrise'></i>",
         pressureIcon = "<i" + attr + "class='wi wi-barometer'></i>",
         humidityIcon = "<i" + attr + "class='wi wi-humidity'></i>";

      windIcon = windIcon.slice(0, 2) + attr + windIcon.slice(2); // add attribute to wind icon

      let side = "";
      if(isFrontWeather) {
         // fix windDir style backface-visibility:hidden not working in chrome
         $(".front [class*='towards']").css("opacity", 0);
         $(".back [class*='towards']").css("opacity", 1);

         side = ".back";
         isFrontWeather = false;
      }
      else {
         $(".front [class*='towards']").css("opacity", 1);
         $(".back [class*='towards']").css("opacity", 0);

         side = ".front";
         isFrontWeather = true;
      }

      $(side + " .weather__icon").html(getWeatherIcon(id, wind, windUnit));
      $(side + " .weather__tempStat").html(temp + "&deg;" + tempUnit);
      $(side + " .weather__tempIcon").html(thermoIcon);
      $(side + " .weather__wind").html(windIcon + " Wind: " + wind + " " + windUnit + windDir);
      $(side + " .weather__cloud").html(cloudIcon + " Clouds: " + cloud + "%");
      $(side + " .weather__pressure").html(pressureIcon + " Pressure: " + pressure + " hpa");
      $(side + " .weather__humidity").html(humidityIcon + " Humidity: " + humidity + "%");
      $(side + " .weather__desc").html(description);

      // --ANIMATE--
      // a workaround to style :after element since there is no :after selector
      fadeIn(".shadow--full:after");

      setTimeout(function(){
         $("._card__icon, ._card__stat, ._card__miscInfo, ._card__dateTime").flip("toggle");
         animateBackgroundColor(id, cloud, temp);
      }, 0.3);

   }

   function getNameList(geoJson)
   {
      // not every country has this administrative level (5 or 6..) -> if so long_name will return a number
      let numOfAddressComp = geoJson.results[0].address_components.length,
         countryIndex      = numOfAddressComp - 1,
         provinceIndex     = numOfAddressComp - 2,
         cityIndex         = numOfAddressComp - 3,
         fallback          = 0;

      for(let i = numOfAddressComp-1; i >= 1; i--)
      {
         if((geoJson.results[0].address_components[i].long_name).search(/\d/) !== -1) {
            fallback++;
         }
         else {
            break;
         }
      }
      countryIndex  -= fallback;
      provinceIndex -= fallback;
      cityIndex     -= fallback;

      return {
         city:     geoJson.results[0].address_components[cityIndex].long_name,
         province: geoJson.results[0].address_components[provinceIndex].long_name,
         country:  geoJson.results[0].address_components[countryIndex].long_name
      };
   }

   function initCityHTML(geoJson)
   {
      let location = getNameList(geoJson),
         offset    = geoJson.timezoneOffset,
         localDate = getDateFromOffset(offset);

      initDateHTML(localDate);

      if(isFrontLocation) {
         $(".back .weather__location").html(location.city + " - " + location.province);
         isFrontLocation = false;
      }
      else {
         $(".front .weather__location").html(location.city + " - " + location.province);
         isFrontLocation = true;
      }
   }

   function initCountryHTML(geoJson)
   {
      let location = getNameList(geoJson),
         offset    = geoJson.timezoneOffset,
         localDate = getDateFromOffset(offset);

      initDateHTML(localDate);

      if(isFrontLocation) {
         $(".back .weather__location").html(location.province + " - " + location.country);
         isFrontLocation = false;
      }
      else {
         $(".front .weather__location").html(location.province + " - " + location.country);
         isFrontLocation = true;
      }
   }

   function getSpace(numOfSpace)
   {
      let spaceStr = "";

      for(let i = 0; i < numOfSpace; i++) {
         spaceStr += "&nbsp;";
      }
      return spaceStr;
   }

   function initDebugHTML(geocodeJson, weatherJson)
   {
      console.log(geocodeJson);
      console.log(weatherJson);

      for(let i = 0; i < 8; i++) {
         debug.address[i] = "N/A";
      }

      let numOfAddressComp = geocodeJson.results[0].address_components.length;

      for(let i = 0; i < numOfAddressComp; i++) {
         debug.address[i] = geocodeJson.results[0].address_components[i].long_name;
      }

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
      debug.weather.clouds      = weatherJson.clouds.all,
      debug.offset = geocodeJson.timezoneOffset / 3600;

      var sp = getSpace(2),
         indentTitle = getSpace(20);

      $(".footer__bugTooltip").html(
         indentTitle + "---Debug Info---<br>" +
         "latitude:  " + debug.lat + "<br>" +
         "longitude: " + debug.lon + "<br>" +
         "offset: " + debug.offset + "<br>" +
         "address_0: " + debug.address[0] + "<br>" +
         "address_1: " + debug.address[1] + "<br>" +
         "address_2: " + debug.address[2] + "<br>" +
         "address_3: " + debug.address[3] + "<br>" +
         "address_4: " + debug.address[4] + "<br>" +
         "address_5: " + debug.address[5] + "<br>" +
         "address_6: " + debug.address[6] + "<br>" +
         "address_7: " + debug.address[7] + "<br>" +
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
      let hour = currentDate.getHours(),
         wind = "",
         windy = "";

      if(hour >= 18 || hour <= 5) {
         currentTime = "night-alt";
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
         switch(id)
         {
            // thunderstorm
            case 210:
            case 211:
            case 212:
               return "<i class='wi wi-" + currentTime + "-lightning'></i>";
            // thunderstorm + light rain
            case 200:
               return "<i class='wi wi-" + currentTime + "-storm-showers'></i>";
            // thunderstorm + rain - storm with drizzle
            case 201:
            case 230:
            case 231:
            case 232:
               return "<i class='wi wi-" + currentTime + "-sleet-storm'></i>";
            // thunderstorm + heavy rain
            case 202:
               return "<i class='wi wi-" + currentTime + "-thunderstorm'></i>";
            // ragged thunderstorm
            case 221:
               return "<i class='wi wi-lightning'></i>";
         }
      }
      else if(300 <= id && id <= 321) {
         switch(id)
         {
            // drizzle
            case 300:
            case 301:
            case 310:
            case 311:
            case 313:
            case 321:
               return "<i class='wi wi-" + currentTime + "-sprinkle'></i>";
            // heavy drizzle
            case 302:
            case 312:
            case 314:
               return "<i class='wi wi-" + currentTime + "-rain-mix'></i>";
         }
      }
      else if(500 <= id && id <= 531) {
         switch(id)
         {
            // light rain - shower
            case 500:
            case 520:
            case 521:
            case 522:
            case 531:
               return "<i class='wi wi-" + currentTime + "-showers'></i>";
            // moderate rain
            case 501:
               return "<i class='wi wi-" + currentTime + "-rain-mix'></i>";
            // heavy rain
            case 502:
            case 503:
               return "<i class='wi wi-" + currentTime + "-rain'></i>";
            // extreme rain
            case 504:
               return "<i class='wi wi-" + currentTime + "-rain-wind'></i>";
            case 511:
            // freezing rain
               return "<i class='wi wi-" + currentTime + "-hail'></i>";
         }
      }
      else if(600 <= id && id <= 622) {
         switch(id)
         {
            // snow
            case 600:
            case 601:
            case 602:
               return "<i class='wi wi-" + currentTime + "-snow" + wind + "'></i>";
            // sleet
            case 611:
            case 612:
               return "<i class='wi wi-" + currentTime + "-hail'></i>";
            // snow + rain
            case 615:
            case 616:
            case 620:
            case 621:
            case 622:
               return "<i class='wi wi-" + currentTime + "-sleet'></i>";
         }
      }
      else if(701 <= id && id <= 781) {
         switch(id)
         {
            // mist - fog
            case 701:
            case 741:
               return "<i class='wi wi-" + currentTime + "-fog'></i>";
            case 711:
               return "<i class='wi wi-smoke'></i>";
            // sand, dust whirl - tornado
            case 731:
            case 781:
               return "<i class='wi wi-tornado'></i>";
            case 751:
               return "<i class='wi wi-sandstorm'></i>";
            case 721:
            case 761:
               return "<i class='wi wi-dust'></i>";
            case 762:
               return "<i class='wi wi-volcano'></i>";
            case 771:
               return "<i class='wi wi-strong-wind'></i>";
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
      else if(801 <= id && id <= 803) {
         return "<i class='wi wi-" + currentTime + "-cloudy" + windy + "'></i>";
      }
      else if(id === 804) {
         return "<i class='wi wi-cloudy" + windy + "'></i>";
      }
      else if(900 <= id && id <= 906) {
         switch(id)
         {
            case 900:
               return "<i class='wi wi-tornado'></i>";
            case 901:
            case 902:
               return "<i class='wi wi-hurricane'></i>";
            case 903:
               return "<i class='wi wi-snowflake-cold'></i>";
            case 904:
               return "<i class='wi wi-hot'></i>";
            case 905:
               return "<i class='wi wi-windy'></i>";
            case 906:
               return "<i class='wi wi-" + currentTime + "-hail'></i>";
            default:
               break;
         }
      }
      else if(951 <= id && id <= 962) {
         switch(id)
         {
            case 951:
            case 952:
            case 953:
            case 954:
            case 955:
               return "<i class='wi wi-windy'></i>";
            case 956:
            case 957:
            case 958:
               return "<i class='wi wi-strong-wind'></i>";
            case 959:
            case 960:
            case 961:
            case 962:
               return "<i class='wi wi-hurricane'></i>";
         }
      }
      else {
         alert("Weather condition not in any cases");
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
      if(349 <= deg || deg < 11) {
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

   function getWeatherInfo(geocodeJson, initLocation, initWeather, isLocal)
   {
      let weatherApiKey = "&APPID=828ae1247f478a35f20c2a9303c677c2",
         coords = {
            lon: geocodeJson.results[0].geometry.location.lng,
            lat: geocodeJson.results[0].geometry.location.lat
         }, // https://crossorigin.me/
         url = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?lat=" + coords.lat + "&lon=" + coords.lon + weatherApiKey + "&units=metric";

      $.getJSON(url, function(weatherJson){

         if(isLocal) {
            $.extend(localWeatherInfo, weatherJson);
         }

         initDebugHTML(geocodeJson, weatherJson);
         initLocation(geocodeJson);
         initWeather(weatherJson);
      })
         .always(function() {
            $(".loader-wrapper").css({"z-index": -3});
         })
         .fail(function(){
            alert("Unable to get data, try again");
         });
   }

   function getTimezoneInfo(geocodeJson, initLocation, initWeather, isLocal)
   {
      let coords = {
         lon: geocodeJson.results[0].geometry.location.lng,
         lat: geocodeJson.results[0].geometry.location.lat
      };

      let apiKey = "AIzaSyAbviveMIP8emBiLlQ4aFLQEanKkkF9cI0",
         timestamp = Date.now() / 1000,
         url = "https://maps.googleapis.com/maps/api/timezone/json?location=" + coords.lat + "," + coords.lon + "&timestamp=" + timestamp + "&key=" + apiKey;

      $.getJSON(url, function(timezoneJson) {

         geocodeJson.timezoneOffset = timezoneJson.rawOffset;
         currentDate = getDateFromOffset(geocodeJson.timezoneOffset);

         if(isLocal) {
            localDate = currentDate;
            $.extend(localLocationInfo, geocodeJson);
         }
         getWeatherInfo(geocodeJson, initLocation, initWeather, isLocal);

      })
         .fail(function(){
            $(".loader-wrapper").css("z-index") === -3;
            alert("Unable to get data, try again");
         });
   }

   function getLocationInfo(coords, initLocation, initWeather, isLocal)
   {
      $(".loader-wrapper").css({"z-index": 1});

      let apiKey = "AIzaSyASk8XzwvoBEBwhQU4SfA84ENUoECNWvRE",
         url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + coords.lat + "," + coords.lon + "&key=" + apiKey;

      $.getJSON(url, function(geocodeJson){
         getTimezoneInfo(geocodeJson, initLocation, initWeather, isLocal);
      })
         .fail(function(){
            $(".loader-wrapper").css("z-index") === -3;
            alert("Unable to get data, try again");
         });
   }

   function getBackgroundColor(id, cloud, temp)
   {
      let hour = currentDate.getHours();

      if((200 <= id && id <= 232) || id === 901 || id === 902) // storm
      {
         return ["#282828", "#272c2e", "#263034", "#25353a", "#243940", "#233d46", "#23424c"]; // black
      }
      else if(300 <= id && id <= 531 || id === 906) // rain
      {
         switch(id)
         {
            // light rain
            case 300:
            case 310:
            case 500:
            case 520:
               return ["#687a8b", "#6e8191", "#758897", "#7c8f9d", "#8396a3", "#8a9da9", "#91a4af"]; // lightgrey
            // rain
            case 301:
            case 311:
            case 313:
            case 321:
            case 501:
            case 511:
            case 521:
            case 531:
            case 906:
               return ["#485c6e", "#4e6477", "#546c81", "#5b758b", "#617d94", "#67859e", "#6e8ea8"];
            // heavy rain
            case 302:
            case 312:
            case 314:
            case 502:
            case 503:
            case 504:
            case 522:
               return ["#283e51", "#2d475e", "#33516b", "#395b79", "#3f6586", "#456f93", "#4b79a1"];
            default:
               break;
         }
      }
      else if((600 <= id && id <= 622) || id === 903) // snow
      {
         return ["#9bc2cf", "#a5c5ca", "#b0c8c6", "#bbcbc1", "#c5cebd", "#d0d1b8", "#dbd4b4"]; // lightblue -> white
      }
      else if((701 <= id && id <= 781) || id === 900 || id === 905) // atmosphere
      {
         switch(id)
         {
            case 701:
            case 741:
            case 771:
            case 905:
               return ["#44ad9f", "#51b2a3", "#5eb8a8", "#6bbead", "#78c4b1", "#85cab6", "#93d0bb"];
            default:
               // dust - smoke
               return ["#865356", "#855461", "#84566d", "#835779", "#825984", "#815a90", "#815c9c"]; // brown
         }
      }
      else if(id === 800 || id === 903 || id === 904) // clear
      {
         if(hour >= 18 || hour <= 5) {
            if(temp > 20) {
               return ["#601e9e", "#6429ac", "#6835ba", "#6c41c8", "#704cd6", "#7458e4", "#7864f2"]; // purple
            }
            else if(temp > 10) {
               return ["#53346d", "#47406f", "#3b4d71", "#2f5a74", "#236776", "#177478", "#0c817b"];
            }
            return ["#422957", "#413e61", "#41536b", "#406976", "#407e80", "#3f938a", "#3fa995"];
         }
         else {
            if(temp > 30 || id === 904) {
               return ["#ff5d39", "#ff692f", "#ff7526", "#ff811c", "#ff8d13", "#ff9909", "#ffa500"]; // orange
            }
            else if(temp > 15) {
               return ["#ffcc33", "#eec734", "#dec336", "#cebf38", "#bdbb39", "#adb73b", "#9db33d"];
            }
            return ["#40e0d0", "#53e3d4", "#66e6d9", "#79e9de", "#8cece2", "#9fefe7", "#b2f2ec"];
         }
      }
      else if(801 <= id && id <= 804) // cloud
      {
         // https://www.weather.gov/media/pah/ServiceGuide/A-forecast.pdf
         if(hour >= 18 || hour <= 5) {
            if(cloud >= 88) {
               return ["#29323c", "#2e2d47", "#342952", "#3a255d", "#402068", "#461c73", "#4c187e"];
            }
            else if(cloud > 50) {
               return ["#000073", "#0e0477", "#1c097c", "#2b0d80", "#391285", "#471689", "#561b8e"];
            }
            else {
               return ["#601e9e", "#6429ac", "#6835ba", "#6c41c8", "#704cd6", "#7458e4", "#7864f2"]; // purple
            }
         }
         else {
            if(cloud >= 88) { // overcast
               return ["#487a6e", "#4f8272", "#568b77", "#5e947c", "#659d80", "#6ca685", "#74af8a"];
            }
            else if(cloud > 50) { // cloudy
               return ["#35709b", "#3b799d", "#4183a0", "#478da3", "#4d96a5", "#53a0a8", "#5aaaab"];
            }
            else { // clear - mostly sunny
               return ["#2f80ed", "#358ced", "#3c99ee", "#42a6ef", "#49b2f0", "#4fbff1", "#56ccf2"];
            }
         }
      }
   }

   function animateBackgroundColor(weatherId, cloudCoverage, temp)
   {
      let colorArr = getBackgroundColor(weatherId, cloudCoverage, temp),
         cssValue = "";

      for(let i = 0; i < colorArr.length-1; i++) {
         cssValue+= "linear-gradient(to right, " + colorArr[i] + ", " + colorArr[i] + "), ";
      }
      cssValue+= "linear-gradient(to right, " + colorArr[colorArr.length-1] + ", " + colorArr[colorArr.length-1] + ")";

      // bgColorState == true  -> show background--two
      // bgColorState == false -> show background--one
      if(bgColorState) {

         $(".background--two").css({
            "opacity": 1,
            "background-image": cssValue
         })

         // animate
         $(".background--two").css({"opacity": 1});
         $(".background--one").animate({"opacity": 0}, function(){

            $(".background--one").css({"z-index": -2});
            $(".background--two").css({"z-index": -1});
            bgColorState = false;
         });
      }
      else {

         $(".background--one").css({
            "opacity": 1,
            "background-image": cssValue
         });

         // animate
         $(".background--two").animate({"opacity": 0}, function(){
            $(".background--one").css({"z-index": -1});
            $(".background--two").css({"z-index": -2});
            bgColorState = true;
         });
      }
   }

   function fadeOut(selector)
   {
      $(".style__temp").remove();
      $("<style class='style__temp'>" + selector + " { opacity: 0; visibility: hidden; } </style> ").appendTo("body");
   }

   function fadeIn(selector)
   {
      $(".style__temp").remove();
      $("<style class='style__temp'>" + selector + " { opacity: 0.1; visibility: visible; } </style> ").appendTo("body");
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
         return ("0" + Math.round((num - 32) / 1.8)).slice(-2);
      }
      else if(unit === "F")
      {
         return ("0" + Math.round(num * 1.8 + 32)).slice(-2);
      }
   }

   function initDateHTML(date)
   {
      if(isFrontWeather) {
         var side = ".back";
      }
      else {
         var side = ".front";
      }
      $(side + " .dateTime__date").html(getDay(date) + " " + date.getDate() + " " + getMonth(date));
      $(side + " .dateTime__time").html(convertToPeriod(date));
   }

   function getUTCDate(date)
   {
      return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),  date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
   }

   function getDateFromOffset(timezoneOffset)
   {
      let dateNow = new Date(),
         hourOffset = timezoneOffset / 3600,
         localDate = getUTCDate(dateNow);

      localDate.setHours(localDate.getHours() + hourOffset);
      return localDate;
   }

   function convertToPeriod(date)
   {
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

   function getDay(date)
   {
      let day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      return day[date.getDay()];
   }

   function getMonth(date)
   {
      let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return month[date.getMonth()];
   }

   function onClickTemp()
   {
      if(isFrontWeather) {
         var side = ".front";
      }
      else {
         var side = ".back";
      }

      let temp = parseInt($(side + " .weather__tempStat").text()),
         thermoIcon = $(side + " .weather__tempIcon").html();

      tempUnit = (tempUnit === "C" ? "F" : "C");
      temp = convertTempUnit(temp, tempUnit);
      $(side + " .weather__tempStat").html(temp + "&deg;" + tempUnit);
      $(side + " .weather__tempIcon").html(thermoIcon);
   }

   function onClickWind()
   {
      if(isFrontWeather) {
         var side = ".front";
      }
      else {
         var side = ".back";
      }

      let windIcon = $(side + " .weather__wind").html().trim().match(/^.*?(<\/i>)/)[0],
         windSpeed = parseFloat($(side + " .weather__wind").text().trim().slice(6)),
         windDir = "";

      // see if there is wind direction info
      try {
         windDir = $(side + " .weather__wind").html().match(/,.*$/)[0];
      }
      catch(e) {
         windDir = "";
      }
      finally {
         windUnit = (windUnit === "kph" ? "mph" : "kph");
         windSpeed = convertWindSpeedUnit(windSpeed, windUnit);
         $(side + " .weather__wind").html(windIcon + " Wind: " + windSpeed + " " + windUnit + windDir);
      }
   }

   function onClickRandom()
   {
      $(".loader-wrapper").css({"z-index": 1});

      let url = "https://raw.githubusercontent.com/NearHuscarl/NearHuscarl.github.io/master/Weather/city-list.min.json";

      $.getJSON(url, function(cityJson){
         let randNum = Math.floor(Math.random() * (7404 + 1)),
            coords = {
               lat: cityJson[randNum].lat,
               lon: cityJson[randNum].lon
            };

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

   function onClickDebug()
   {
      copyToClipboard("copy-target", function(){

         $(".footer__copyTooltip").css({"visibility": "visible", "opacity": 0.9});

         setTimeout(function(){
            $(".footer__copyTooltip").css({"visibility": "hidden", "opacity": 0});
         }, 2000);

      });
   }

   function copyToClipboard(elementId, success, error)
   {
      // copy works on selectable element, in this case textarea element 
      // (or using input element with attr value)
      let targetElement = document.createElement("textarea"),
         copyContent = document.getElementById(elementId).innerHTML;

      copyContent = copyContent.replace(/\<br\>/gi, "\r\n");
      copyContent = copyContent.replace(/(&npsp;)/gi, " ");

      targetElement.innerHTML = copyContent;
      document.body.appendChild(targetElement);
      targetElement.select();

      try {
         document.execCommand("copy")
         if(typeof success === "function") {
            success();
         }
      } 
      catch(e) {
         console.log(e);
         if(typeof error === "function") {
            error();
         }
      }
      finally {
         document.body.removeChild(targetElement);
      }
   }

   $(document).ready(function(){

      $(".cpr-year").text(new Date().getFullYear());

      // reset display in css which was display:none to hide the back while loading
      // comment to see what I mean
      $(".back").css("display", "inline-block");

      $("._card").flip({
         trigger: "manual",
         speed: 400,
         autoSize: false
      });

      $("._card__dateTime").flip({axis: "x"});
      $("._card__icon").flip({reverse: true});
      $("._card__stat").flip({});
      $("._card__miscInfo").flip({axis: "x", reverse: true});

      // set action after flip
      $("._card__icon").on("flip:done", function(){

         let flipInfoDate = $("._card__dateTime").data("flip-model"),
            flipInfoIcon  = $("._card__icon").data("flip-model"),
            flipInfoStat  = $("._card__stat").data("flip-model"),
            flipInfoMisc  = $("._card__miscInfo").data("flip-model");

         // always flip in one direction
         $("._card__dateTime").flip({ reverse: flipInfoDate.setting.reverse === true ? false : true });
         $("._card__icon").flip({ reverse: flipInfoIcon.setting.reverse === true ? false : true });
         $("._card__stat").flip({ reverse: flipInfoStat.setting.reverse === true ? false : true });
         $("._card__miscInfo").flip({ reverse: flipInfoMisc.setting.reverse === true ? false : true });

         // workaround: fade-out animation of shadow since there is not :after alement selector
         fadeOut("._card__dateTime .shadow--full:after");
         fadeOut("._card__icon .shadow--full:after");
         fadeOut("._card__stat .shadow--full:after");
         fadeOut("._card__miscInfo .shadow--full:after");
      });

      if(navigator.geolocation)
      {
         navigator.geolocation.getCurrentPosition(function(position){

            let coords = {};
            coords.lon = position.coords.longitude;
            coords.lat = position.coords.latitude;

            getLocationInfo(coords, initCityHTML, initWeatherHTML, true);
            setInterval(function(){
               initDateHTML(currentDate);
            }, 60000); // Update time every 60 seconds

            $(".footer__randWeather").on("click", onClickRandom);
            $(".footer__localWeather").on("click", onClickLocal);
         });
      }
      else
      {
         alert("Geolocation is not supported on this browser");
      }
      $(".weather__temp").on("click", onClickTemp);
      $(".weather__wind").on("click", onClickWind);
      $(".footer__debug").on("click", onClickDebug);

   });

   return {
      onClickLocal: onClickLocal,
      onClickDebug: onClickDebug,
      onClickWind: onClickWind,
      onClickTemp: onClickTemp,
      onClickRandom: onClickRandom,
      animateBackgroundColor: animateBackgroundColor
   }

})();
