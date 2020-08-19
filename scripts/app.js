const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img')

const updateUi = (data) => {

    // const cityDets = data.cityDets
    // const weather = data.weather;

    // destructure properties
    const{cityDets, weather} =data;

    // update details template

    details.innerHTML = `
            <h5 class="my-3">${cityDets.EnglishName}</h5>
            <div class="my-3">${weather.WeatherText}</div>
            <div class="display-4 my-4">
              <span>${weather.Temperature.Metric.Value}</span>
              <span>&deg;C</span>
            </div>
    `;

    //update the night and day svg & icon class
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`
    icon.setAttribute('src',iconSrc);

    // const result= condition ? 'value1':'value2';

    let timeSrc = weather.IsDayTime?'img/day.svg':'img/night.svg';
    
    time.setAttribute('src', timeSrc);

    // remove the d-none class if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
};

const updateCity = async (city) => {

    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return {cityDets,weather}; // object shorthand notation

};

cityForm.addEventListener('submit',event=>{
    // prevent defaul action
    event.preventDefault();
    // get city value 
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update the ui with the new city

    updateCity(city)
    .then(data => updateUi(data))
    .catch(err => console.log(err));
});