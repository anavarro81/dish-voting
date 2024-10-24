import React from 'react'
import { useLocation } from 'react-router-dom';
import {fristPrice,  secondPrice,   thirdPrice } from '../../assets/images/images'


const VotingResultsPage = () => {
    
  const location = useLocation();
    const { votaciones } = location.state || { votaciones: [] };


  const prices = [fristPrice, secondPrice, thirdPrice]

// TODO: Cuando lleguen todos los votos, ordenarlo y mostrarlo.     
// Ordena los platos en funcion del numero de votos
    // votaciones.sort((a, b) => {
    //     if (a.votes > b.votes) {
    //         return -1;
    //     }

    //     if (a.votes < b.votes) {
    //         return 1;
    //     }

    //     return 0;


    // })


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


    

  return (
    <div className='container mx-auto p-4'>
      <h2 className='text-2xl font-bold text-center mb-6 '>Resultados de la Votación</h2>
    
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
                  {/* {index + 1}  */}

                  {prices[index] ? <img src={prices[index]} className="h-10 mr-2" alt="foto del plato" /> : index + 1}
                  {/* <img src={fristPrice} className="h-10 mr-2" alt="foto del plato" /> */}
                </td>
                
                <td className='p-4 border-gray-300 flex items-center'>
                  <img src={dish.photo} className="h-16 mr-2" alt="foto del plato" />
                  {dish.name}                
                </td>

                <td className='p-4 border-gray-300'> 
                  {dish.votes} 
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

{/* <ul>
{votaciones.map((votacion, index) => (
  <li key={index}>
    {votacion.name}: {votacion.votes} estrellas
  </li>
))}
</ul> */}
