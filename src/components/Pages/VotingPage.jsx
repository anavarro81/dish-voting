import React, {useEffect, useState  } from 'react'
import { FaStar } from 'react-icons/fa';
import Select from 'react-select';

import {useNavigate} from "react-router-dom";
import { useLocation } from 'react-router-dom';

import axios from 'axios';


const VotingPage = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { chef } = location.state || { chef: '' };
  const [options, setOptions] = useState([])

  const [dishes, setDishes] = useState([])

  console.log('location.state = ', location.state);
  
  console.log('chef = ', chef);
  


  useEffect(() => {
  
    axios.get('http://localhost:5000/dishes/dishes')
    .then(response => {
      console.log('>> dishes ', response.data.data)
      
      // Filtrar los platos que no son del chef para que no pueda votar por sus propios platos
      const filteredDishes = response.data.data.filter(dish => dish.chef != chef)
      
      setDishes(filteredDishes)      
      generateOptions(filteredDishes.length)
    })
    .catch(error => {
      console.log(error)
    })

  }, [])

  
  

  const generateOptions = (num) => {    
        
    const options = []    
    for (let i = 0; i < num; i++) {      
      options.push({ value: i+1, label: ( <div className='flex gap-2 items-center justify-center'> {i+1} <FaStar key={i} style={{ marginRight: '8px' }} className='text-yellow-500' /> </div>)  })                  
    }

    setOptions(options)
  }

  const votaciones = []

  const handleVote = (selectedOption, name, inputId ) => {

    // Validar que no se repita la votación. 
    // const { name } = actionMeta;

    // console.log('actionMeta ', actionMeta);
    console.log('inputId ', inputId);
    

    const dish_photo = dishes.find(dish => dish._id === inputId).photo

    console.log('foto = ', dish_photo);

    const foundtVoting = votaciones.find(vote => vote.name === name)

    
    
    
    if (foundtVoting) {
      foundtVoting.votes = selectedOption.value
    } else {
      votaciones.push({ name: name,  photo: dish_photo, votes: selectedOption.value })
    }
    
    
  };

  const handleVoting = (e) => {
    e.preventDefault()

    console.log('votaciones.length = ', votaciones.length);
    console.log('dishes.length = ', dishes.length);
    
    
    if (votaciones.length != dishes.length) {
      alert('Debes votar por todos los platos')
      return
      
    }

    // Validar que no se repita la votación
    let votacionesAux = []

    for (let i = 0; i < votaciones.length; i++) {      
      let repeatedVoting = votacionesAux.find(vote => vote === votaciones[i].votes)       
      // Si se repite la votación
      if (repeatedVoting) {
        alert('No puedes votar dos veces por la misma cantidad de estrellas')
        return
      } else {        
        votacionesAux.push(votaciones[i].votes) 
      }
  }
  navigate(`/voting-results`, { state: { votaciones } })

}



  return (
    <form 
      onSubmit={handleVoting}
    > 
    <div className='container mx-auto mb-6'>
   
      {dishes.map((dish, index) => (
        <div> 
          <div key={index} className='grid grid-cols-3 mt-6 px-3 items-center'>
            <div className='flex items-center justify-center'>
              <img src={dish.photo} alt={dish.name} className='h-24'/>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <h3>{dish.name}</h3>
              <p>{dish.chef}</p>
              
            </div>
            <div className='flex items-center justify-center'>
              <Select 
                inputId={dish._id}                
                name={dish.name}
                options={options} 
                onChange={(selectedOption) => handleVote(selectedOption, dish.name, dish._id)}
                isDisabled={ chef === dish.chef ? true : false } 
                />
            </div>
          </div>
          <div>
            <hr className='my-6 w-1/2 mx-auto border-t-2 border-gray-300'/>
          </div>

        </div>
        
      ))}
      <div className='w-1/2 mx-auto'>
        <button
            type="submit"
            className=" w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none mx-auto"
          >
            Votar
          </button>
      </div>
      
    </div>
    </form>
  )
  
}

export default VotingPage