import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  let [city, setCity] = useState('')
  let [wEather, setWeather] = useState()
  let[loadingdata,setLoadingdata]=useState(false)
  let getData = (event) => {
    setLoadingdata(true)
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=a4ce1e6b010005ceaf2356a2435576db&units=metric`)
      .then((res) => res.json())
      .then((finalRes) => {
        if (finalRes.cod == "404") {
          setWeather(undefined)
        }
        else {

          setWeather(finalRes)
        }
        setLoadingdata(false)
      })
   
    event.preventDefault()
    setCity('')
  }

  return (
    <div className='w-[100%] h-[100vh] bg-[#4aacb1]'>
      <div className='max-w-[1320px] mx-auto'>
        <h1 className='text-[40px] font-bold py-[50px] text-white'>Simple Weather app</h1>

        <form onSubmit={getData}>
          <input value={city} onChange={(e) => setCity(e.target.value)} type='text' className='w-[300px] h-[40px] pl-4 ' placeholder='City Name' /><button className='bg-[red]  h-[40px]  ml-[4px]'>Search</button>
        </form>

        <div className='w-[400px] mx-auto bg-white shodow-lg mt-[40px] p-[25px] relative'>
          <img src='https://cdnl.iconscout.com/lottie/premium/thumb/loading-5325468-4450387.gif' width={100} className={`absolute left-[40%] ${loadingdata?'':'hidden'}`} />



          {wEather !== undefined
            ?
            <>
              <h1 className='font-bold text-[30px]'>{wEather.name} <span className='bg-[yellow]'>{wEather.sys.country}</span></h1>
              <h3 className='font-bold text-[20px]'>
                {wEather.main.temp}</h3>
              <img src={`https://openweathermap.org/img/w/${wEather.weather[0].icon}.png`}></img>
              <p>{wEather.weather[0].description}</p>
            </>
            :
            "No Data Found"
          }

        </div>

      </div>
    </div>

  );
}

export default App;
