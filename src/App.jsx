import countryService from "./CountryApi";
import weatherService from "./WeatherApi";
import { useState, useEffect } from "react";

const CountryName = ({ country }) => {
  return <div style={{ margin: "3px" }}>{country.name.common}</div>;
};

const ShowButton = ({ handleShowCountry, country }) => {
  return (
    <div>
      <button
        onClick={() => {
          handleShowCountry(country);
        }}
      >
        show
      </button>
    </div>
  );
};

const CountriesList = ({ countries, handleShowCountry }) => {
  return countries.map((country) => (
    <div style={{ display: "flex" }} key={country.name.common}>
      <CountryName key={country.name.common} country={country}></CountryName>
      <ShowButton
        key={`${country.name.common}ShowButton`}
        handleShowCountry={handleShowCountry}
        country={country}
      ></ShowButton>
    </div>
  ));
};

const CountryInfo = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital[0]}</div>
      <div>area {country.area}</div>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
      <img src={`${country.flags.png}`}></img>
    </div>
  );
};

const WeatherInfo = (props) => {
  const weatherIconBaseUrl = "https://openweathermap.org/img/wn/";
  if (props.capital !== undefined) {
    console.log("capitalllll", props.capital);
  }
  return (
    <>
      {props.weatherData?.main ? (
        <div>
          <h2>{`Weather in ${props.weatherData.name}`}</h2>
          <div>{`temperature ${props.weatherData.main.temp} Celsius`}</div>
          <img
            src={`${weatherIconBaseUrl}${props.weatherData.weather[0].icon}@2x.png`}
            alt=""
          />
          <div>{`wind ${props.weatherData.wind.speed} m/s`}</div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

const Filter = ({ handleChange }) => {
  return (
    <div>
      <span>Filter</span>
      <input onChange={handleChange} />
    </div>
  );
};

const Countries = ({
  useFiltered,
  countries,
  filteredCountries,
  handleShowCountry,
}) => {
  if (useFiltered) {
    return (
      <>
        {filteredCountries.length > 10 ? (
          <div>Too many matches, specify another filter</div>
        ) : (
          <CountriesList
            countries={filteredCountries}
            handleShowCountry={handleShowCountry}
          ></CountriesList>
        )}
      </>
    );
  }
  return (
    <CountriesList
      countries={countries}
      handleShowCountry={handleShowCountry}
    ></CountriesList>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [useFiltered, setUseFiltered] = useState(false);
  const [capitalWeatherData, setCapitalWeatherData] = useState([]);
  const [capital, setCapital] = useState([]);

  useEffect(() => {
    countryService.getAll().then((countryData) => {
      setCountries(countryData);
      setFilteredCountries(countryData);
    });
  }, []);

  const filterCountries = (filter) => {
    return countries.filter(
      (c) => c.name.common.toLowerCase().indexOf(filter.toLowerCase()) !== -1
    );
  };

  const handleFilterChange = (event) => {
    const updatedFilter = event.target.value;
    updatedFilter === "" ? setUseFiltered(false) : setUseFiltered(true);
    const filteredCountries = filterCountries(updatedFilter);
    setFilteredCountries(filteredCountries);
  };

  useEffect(() => {
    if (capital[0] !== undefined) {
      weatherService
        .getWeatherByCoordinates(capital[0].lat, capital[0].lon)
        .then((r) => setCapitalWeatherData(r));
    }
  }, [capital]);

  useEffect(() => {
    if (filteredCountries.length === 1) {
      const country = filteredCountries[0];
      const stateCode = "";
      weatherService
        .getCityInformation(country.cca2, country.capital[0], stateCode)
        .then((r) => setCapital(r));
    }
  }, [filteredCountries]);

  const handleShowCountry = (c) => {
    setFilteredCountries([c]);
  };

  return (
    <div>
      <Filter handleChange={handleFilterChange}></Filter>
      {filteredCountries.length === 1 ? (
        <div>
          <CountryInfo country={filteredCountries[0]}></CountryInfo>
          <WeatherInfo
            weatherData={capitalWeatherData}
            capital={capital}
          ></WeatherInfo>
        </div>
      ) : (
        <Countries
          useFiltered={useFiltered}
          countries={countries}
          filteredCountries={filteredCountries}
          handleShowCountry={(c) => {
            handleShowCountry(c);
          }}
        ></Countries>
      )}
    </div>
  );
};

export default App;
