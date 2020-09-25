var APIKey = "3562aea0ee193ab4d5e31803854c69bb";
var cityName="Seattle";
  function saveCity() {
      cityName=$('#cityName').val();
      $("#listCityName").append("<li onclick='weatherInfo(this)'>"+cityName+"</li>");
      $('#cityName').val("");
      weatherInfo(cityName);
      fiveDayWeatherInfo(cityName);
  }
    // Created and API Key
 


function weatherInfo(c) {
    cityName=c.innerHTML || c;

    // Here we are building the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
      "q="+cityName+"&appid=" + APIKey;

    // created an AJAX 
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function(response) {

        // Log the queryURL
        console.log(queryURL);

        // Log the resulting object
        console.log(response);
        var lat=response.coord.lat
        var lon = response.coord.lon
       

        // Transfer content to HTML
        $(".city").html("<h1>" + response.name + " Weather Details</h1>");
        $(".wind").text("Wind Speed: " + response.wind.speed);
        $(".humidity").text("Humidity: " + response.main.humidity);
        $(".clouds").text("Description: " + response.weather[0].main);
        $("#cloudyIcon").attr("src",`https://openweathermap.org/img/wn/${response.weather[0].icon}.png`);

        // Convert the temp to fahrenheit
        var tempF = (response.main.temp - 273.15) * 1.80 + 32;

        // add temp content to html
        $(".temp").text("Temperature (K) " + response.main.temp);
        $(".tempF").text("Temperature (F) " + tempF.toFixed(2));

        // Log the data in the console as well
        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
        console.log("Temperature (F): " + tempF);
        UVInfo(lat,lon)
      });
    }

    function fiveDayWeatherInfo(cityName) {
    
        // Here we are building the URL we need to query the database
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?" +"q="+cityName+"&appid=" + APIKey+"&units=imperial";

        // created an AJAX 
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          // We store all of the retrieved data inside of an object called "response"
          .then(function(response) {
    
            // Log the queryURL
            console.log(queryURL);

    
            // Log the resulting object
            console.log(response); 
            var htmlString=""
            for (var i=0; i<response.list.length; i=i+8) {
                htmlString +=`
                <div class="card">
                    <h6>${response.list[i].dt_txt}</h6>
                    <p>Temp: ${response.list[i].main.temp}<p>
                    <p>Wind Speed: ${response.list[i].wind.speed}</p>
                    <p>Humidity: ${response.list[i].main.humidity}</p>
                    <img src="https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}.png"></img>
                </div>
                `
            }
            console.log(htmlString)
            $("#container").append(htmlString)
    
        
          });
        }
        function UVInfo(lat,lon) {
            
            // Here we are building the URL we need to query the database
            var queryURL =   `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${APIKey}`
            // created an AJAX 
            $.ajax({
              url: queryURL,
              method: "GET"
            })
              // We store all of the retrieved data inside of an object called "response"
              .then(function(response) {
        
                // Log the queryURL
                console.log(response);
                $("#UVInfo").append("UVInfo"+response.value)
              })
            }
            
// Need to store this in local storage
            $(".saveBtn").on("click", function () {
                var id = $(this).attr("id")
                var time = id.split("-")[1]
                var i = $("#txt-" + time).val()
                console.log(id, time, "txt-" + time, i)
                localStorage.setItem(time, i)
            })