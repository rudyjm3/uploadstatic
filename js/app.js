window.addEventListener('load', ()=> {
  let lon;
  let lat;
  let temperatureDescription = document.querySelector(".temperature-description");
  let temperatureDegree = document.querySelector(".degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let locationCity = document.querySelector(".location-city");
  //let icon = document.querySelector(".icon", .setAttribute("src"));
  let icon = document.querySelector(".icon");

  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
      lon = position.coords.longitude;
      lat = position.coords.latitude;

      //So it can be used on local host development
      //const proxy = "https://cors-anywhere.herokuapp.com/";
      // end proxy.
      //const api = `${proxy}http://api.weatherstack.com/current?access_key=1bbdd0a85ed57242db625073813af078&query=${lat},${lon}`;
      const api = `http://api.weatherstack.com/current?access_key=1bbdd0a85ed57242db625073813af078&query=${lat},${lon}&units=f`;


      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          const { temperature, weather_descriptions, weather_icons } = data.current;
          const { name, region, counrty } = data.location;
          //set dom elements from the api.
          temperatureDescription.textContent = weather_descriptions;
          temperatureDegree.textContent = temperature;
          locationCity.textContent = name;
          locationTimezone.textContent = region;
          icon.textContent = weather_icons;
            // Set icon
            setIcons(weather_icons, document.querySelector(".icon"));
        });
    });
  }
    function setIcons(weather_icons, weather_iconsID) {
      const skycons = new Skycons({color: "white"});
      //const currentIcon = weather_icons.replace(/-/g, "_").toUpperCase();
      const currentIcon = weather_icons;
      skycons.play();
      return skycons.set(weather_icons, Skycons[currentIcon]);
    }
});
