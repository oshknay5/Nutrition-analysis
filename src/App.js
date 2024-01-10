import { useState, useEffect } from 'react';
import './App.css';
import Nutrition from './Nutrition';
import LoaderPage from './Loader/LoaderPage';
import video from './video.mp4';


function App() {
 
// My code

 const MY_ID ='8e97090c';
 const MY_KEY = 'd292aeab8f478a886b22d01be5f5b54e'

  const [mySearch, setMySearch] = useState ();
  const [wordSubmitted, setWordSubmitted] = useState('');
  const [myNutrition, setMyNutrition] = useState();
  const [stateLoader, setStateLoader] = useState(false);


  const myRecipeSearch = (e) => {
    setMySearch(e.target.value)
   }

useEffect(()=>{
 
  if (wordSubmitted !== '') {
    let ingr = wordSubmitted.split(/[,,;,\n,\r]/);
    getAnalise(ingr);
  }
},[wordSubmitted])


const getAnalise = async(ingr)=>{
     setStateLoader(true)

  const requestOptions = {
    method: 'POST',
    headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json' },
    body: JSON.stringify( {ingr: ingr})
};
  const response = await fetch(`https://api.edamam.com/api/nutrition-details?app_id=${MY_ID}&app_key=${MY_KEY}`, requestOptions);
     
  if(response.ok) {
    setStateLoader(false);
    const data = await response.json();
    setMyNutrition(data);
  } else {
    setStateLoader(false);
    alert('ingredients entered incorrectly');
  }
}


const finalSearch = (e) => {
    e.preventDefault();
    setWordSubmitted(mySearch)
}



  return (
    <div className="App-container">

      {stateLoader && <LoaderPage/>}

    <video autoPlay muted loop>
      <source src={video} type='video/mp4'/>
    </video>

    <h1>Nutrition Analysis</h1>
    <p className='header-par'>Enter an ingredient list list for what you are cooking, like <span className="example">"1 cup rice, 10 oz chickpeas"</span>, etc.Enter each ingredient on a new line.</p>

    <form  className='form' onSubmit={finalSearch}>
        <textarea rows="10" cols="45"  required value={mySearch} onChange={myRecipeSearch}></textarea>
        <input className='form-cta' type="submit" value="Analize"/>
    </form>

    <div className='block-res'>
      <h2 >Nutrition Facts</h2>
      <div>
         {
          myNutrition && <p className='calories'>{myNutrition.calories} kcal</p>
        }
        </div>
        <div>
        {
           myNutrition && Object.values(myNutrition.totalNutrients)
           .map(({ label, quantity, unit }) =>
             <Nutrition
               label={label}
               quantity={quantity}
               unit={unit}
             />
           )
       }
        </div>
      </div>
    </div>
   



  );
}

export default App;
