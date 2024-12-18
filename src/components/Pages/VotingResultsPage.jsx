import React, {useEffect, useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import {fristPrice,  secondPrice,   thirdPrice } from '../../assets/images/images'
import axiosInstance from '../../../config/axiosConfig';
import { FaArrowLeft } from 'react-icons/fa';

const VotingResultsPage = () => {
    
  const navigate = useNavigate();

  const location = useLocation();
    
  const [votaciones, setVotaciones] = useState([])

  const [dishes, setDishes] = useState([])


  const prices = [fristPrice, secondPrice, thirdPrice]

  const getVotes = async () => {
    // return await axios.get('http://localhost:5000/vote/count-votes');
       return await axiosInstance.get('/vote/count-votes');
  };

  const getDishes = async () => {
    // return await axios.get('http://localhost:5000/dishes/dishes');
       return await axiosInstance.get('/dishes/dishes');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const votesResponse = await getVotes();
        const dishesResponse = await getDishes();

        const votes = votesResponse.data.votesResult;
        const dishes = dishesResponse.data;

        
        

        const votaciones = votes.map((vote, index) => {
          
          
          
          return {

            photo: dishes.find(dish => String(dish._id) === String(vote.dish_id)).photo,
            chef: dishes.find(dish => String(dish._id) === String(vote.dish_id)).chef,
            name: dishes.find(dish => String(dish._id) === String(vote.dish_id)).name,
            rating: vote.rating
          }
        })

        
        setVotaciones(votaciones);  

      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  // Al pulsar atras, se manda a la página principal
  const handleBackButton = () => {
    navigate('/')
  }
    

  return (
    <div className='container mx-auto p-4'>
   
        <div className='flex items-center justify-center mb-4'> 
          <button onClick={handleBackButton} className='mr-4 flex items-center'>        
            <FaArrowLeft size={25} />
          </button>
          <h2 className='text-2xl font-bold text-center flex-1 '>Resultados de la Votación</h2>
      </div>

      
      
    <div className="overflow-x-auto">
    
      <table className="w-full border-collapse  border-gray-300">

        <thead>
          <tr className='bg-gray-100'>
            <th> Posicion </th>
            <th> Plato </th>
            <th> Puntos </th>
          </tr>
        </thead>
        <tbody>
          {votaciones.map((dish, index, array) => {
            return (
              <tr key={index} className='border border-gray-300'>
                <td className='p-4 border border-gray-300 '> 
                  {prices[index] ? <img src={prices[index]} className="h-12 mr-2" alt="foto del plato" /> : <span className='text-2xl'> {index + 1} </span>}
                </td>
                
                <td className='p-4 border-gray-300 flex items-center' >
                  <img src={dish.photo} className="h-16 mr-2" alt="foto del plato" />
                  <div className='flex flex-col'> 
                  <span> {dish.name} </span>     
                  <span className='text-gray-500'> {dish.chef} </span>          
                  </div>
                </td>

                <td className='p-4 border-gray-300'> 
                  <span className='text-2xl '> {dish.rating} </span>
                </td>
              </tr>            
)
          })

          }
        </tbody>

      </table>

    </div>
    
    </div>
  )
}

export default VotingResultsPage

