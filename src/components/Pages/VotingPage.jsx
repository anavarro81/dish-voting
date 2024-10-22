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

  

  const [dishes, setDishes] = useState([])

  // const dishes = [
  //   {
  //     photo: dish1,
  //     name: 'Plato de los Momitos',
  //     authors: 'Los Momitos'
      
  //   },
  //   {
  //     photo: dish2,
  //     name: 'Plato de Marina',
  //     authors: 'Marina'
      
  //   },
  //   {
  //     photo: dish3,
  //     name: 'Plato de Alba',
  //     authors: 'Alba'      
  //   },
  //   {
  //     photo: dish4,
  //     name: 'Plato de Carlos',
  //     authors: 'Carlos'
      
  //   }
  // ]

  useEffect(() => {
  
    axios.get('http://localhost:5000/dishes/dishes')
    .then(response => {
      console.log(response.data.data)
      setDishes(response.data.data)
    })
    .catch(error => {
      console.log(error)
    })

  }, [])
  

  const options = [

    {
      value: '1',
      label: (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FaStar style={{ marginRight: '8px' }} className='text-yellow-500'/>
        </div>
       
      ),
      
      
    },
    {
      value: '2',
      label: (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FaStar style={{ marginRight: '8px' }} className='text-yellow-500'/>
          <FaStar style={{ marginRight: '8px' }} className='text-yellow-500'/>
        </div>
      ),
      
    },
    {
      value: '3',
      label: (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FaStar style={{ marginRight: '8px' }} className='text-yellow-500'/>
          <FaStar style={{ marginRight: '8px' }} className='text-yellow-500'/>
          <FaStar style={{ marginRight: '8px' }} className='text-yellow-500'/>
        </div>
      ),
    },
    {
      value: '4',
      label: (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FaStar style={{ marginRight: '8px' }} className='text-yellow-500'/>
          <FaStar style={{ marginRight: '8px' }} className='text-yellow-500'/>
          <FaStar style={{ marginRight: '8px' }} className='text-yellow-500'/>
          <FaStar style={{ marginRight: '8px' }} className='text-yellow-500'/>
        </div>
      ),
    },
  ];

  const [currentOptions, setcurrentOptions] = useState([])

  const votaciones = []
  

  const handleVote = (selectedOption, actionMeta) => {

    // Validar que no se repita la votación. 
    const { name } = actionMeta;
    const foundtVoting = votaciones.find(vote => vote.name === name)
    
    if (foundtVoting) {
      foundtVoting.votes = selectedOption.value
    } else {
      votaciones.push({ name: name, votes: selectedOption.value })
    }
    
    
  };

  const handleVoting = (e) => {
    e.preventDefault()

    if (votaciones.length != dishes.length-1) {
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

  useEffect(() => {
    setcurrentOptions(options)
  }, [])
  

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
                placeholder="Vota"                
                name={dish.name}
                options={currentOptions} 
                onChange={handleVote}
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