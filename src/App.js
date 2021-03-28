import React, { useEffect, useState } from 'react';
import './App.css';
import axios from "axios";
import Select from 'react-select';

export default function App() {
  const [countries, setCountries] = useState();
  const [status, setStatus] = useState();
  const [country, setCountry] = useState("");

  const updateCountry = (event) => {
    setCountry(event.target.value);
  }

  const changeDate = (date) => {
    const fecha = new Date(date);
    return fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds()
  }

  const obtenerDatos = () => {
    const options = {
      method: 'GET',
      url: 'https://covid-193.p.rapidapi.com/history',
      params: {country: country.value, day: '2020-06-02'},
      headers: {
        'x-rapidapi-key': 'b2c0b7acfcmsh342b40c009e7a2cp1eb65cjsnae24824381b8',
        'x-rapidapi-host': 'covid-193.p.rapidapi.com'
      }
    };
    
    axios.request(options).then(function (response) {
      setStatus(response.data.response)
    }).catch(function (error) {
      console.error(error);
    });
  }

  useEffect(() => {
    if (typeof countries === 'undefined') {
      const options = {
        method: 'GET',
        url: 'https://covid-193.p.rapidapi.com/countries',
        headers: {
          'x-rapidapi-key': 'b2c0b7acfcmsh342b40c009e7a2cp1eb65cjsnae24824381b8',
          'x-rapidapi-host': 'covid-193.p.rapidapi.com'
        }
      };
      
      axios.request(options).then(function (response) {
        setCountries(response.data.response.map(count => ({value: count, label: count})))
      }).catch(function (error) {
        console.error(error);
      });
    }
  })
  console.log(country)
  return (
    <div style={{textAlign: 'center', width: '50%', marginLeft: '400px'}}>
      <br/><br/>
      <label className="f6 b db mb2">Jesus Ernesto Zelaya Garcia</label><br/><br/>
      <label>Pais:</label><br/><br/>
      <Select
        value={country}
        onChange={setCountry}
        options={countries}/>
        <br/><br/>
      <a onClick={obtenerDatos} class="f6 link dim ba bw2 ph3 pv2 mb2 dib purple" href="#0">Buscar</a>
      <br></br><br/><br/>
      {status
    ? (<table className="f6 w-100 mw8 center">
      <thead>
      <tr className="striped--moon-gray">
        <th>
          Hora
        </th>
        <th>
          N° Activos
        </th>
        <th>
          N° Criticos
        </th>
        <th>
          N° Nuevos
        </th>
        <th>
          N° Recuperados
        </th>
        <th>
          N° Muertes
        </th>
      </tr>
      </thead>
      <tbody>
      {status.map((data, i) =>
        <tr key={i}>
          <td >
            {changeDate(data.time)}
          </td>
          <td>
            {data.cases.active}
          </td>
          <td>
            {data.cases.critical}
          </td>
          <td>
            {data.cases.new}
          </td>
          <td>
            {data.cases.recovered}
          </td>
          <td>
            {data.deaths.total}
          </td>
        </tr>
      )}
      </tbody>
    </table>)
    : <div>Loading</div>}
    </div>
  )
}