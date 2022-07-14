let loc = document.getElementById("location");
let tempicon = document.getElementById("temp-icon");
let tempvalue = document.getElementById("temp-value");
let climate = document.getElementById("climate");
let iconfile;
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

searchButton.addEventListener("click" , (e)=>{
    e.preventDefault();
    getWeather(searchInput.value);
    searchInput.value = "";
});

const getWeather=async(city)=>{
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=79f598df3917a34d07976f3a3fee9882`)
        const weatherData = await response.json();
        console.log(weatherData);
        const{name}=weatherData;
        const{feels_like}=weatherData.main;
        const{id,main}=weatherData.weather[0];
        loc.textContent=name;
        climate.textContent
        tempvalue.textContent=Math.round(feels_like-273);
        if(id < 300 && id > 200){
            tempicon.src = "icons/animated/thunder.svg";
        }
        if(id < 400 && id > 300){
            tempicon.src = "icons/animated/rainy1.svg";
        }
        if(id < 500 && id > 400){
            tempicon.src = "icons/animated/rainy-1.svg";
        }
        if(id < 600 && id > 500){
            tempicon.src = "icons/animated/snowy-1.svg";
        }
        if(id < 700 && id > 600){
            tempicon.src = "icons/animated/cloudy-day-1.svg";
        }  
        if(id == 800){
            tempicon.src = "icons/animated/day.svg";
        }                      
        if(id > 800){
            tempicon.src = "icons/animated/cloudy-day-3.svg";
        }  
    }
catch(error){
    alert("City not found");
}
};


window.addEventListener("load",()=>{
    let lon;
    let lat;
    //const proxy="https://cors-anywhere.herokuapp.com/";
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>
        {
            lon = position.coords.longitude;
            lat = position.coords.latitude;
                const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=79f598df3917a34d07976f3a3fee9882   `
                fetch(api).then((response)=>{
                    return response.json();
                })
                .then(data =>{
                    const{name} = data;
                    const{feels_like='Unknown'} = data.main;
                    const{id,main}=data.weather[0];
                    loc.textContent=name;
                    climate.textContent = main;
                    tempvalue.textContent = Math.round(feels_like-273);

                if(id < 300 && id > 200){
                    tempicon.src = "icons/animated/thunder.svg";
                }
                if(id < 400 && id > 300){
                    tempicon.src = "icons/animated/rainy-1.svg";
                }
                if(id < 500 && id > 400){
                    tempicon.src = "icons/animated/rainy.svg";
                }
                if(id < 600 && id > 500){
                    tempicon.src = "icons/animated/snowy-1.svg";
                }
                if(id < 700 && id > 600){
                    tempicon.src = "icons/animated/cloudy-day-1.svg";
                }  
                if(id == 800){
                    tempicon.src = "icons/animated/day.svg";
                }                      
                if(id > 800){
                    tempicon.src = "icons/animated/cloudy-day-3.svg";
                }         
                    console.log(data);
                })
        })
    }
})
