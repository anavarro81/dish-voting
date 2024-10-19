import React from 'react'
import { useLocation } from 'react-router-dom';

const VotingResultsPage = () => {
    const location = useLocation();
    const { votaciones } = location.state || { votaciones: [] };
// Ordena los platos en funcion del numero de votos
    votaciones.sort((a, b) => {
        if (a.votes > b.votes) {
            return -1;
        }

        if (a.votes < b.votes) {
            return 1;
        }

        return 0;


    })

    

  return (
    <div>
      <h1>Resultados de la Votación</h1>
      <ul>
        {votaciones.map((votacion, index) => (
          <li key={index}>
            {votacion.name}: {votacion.votes} estrellas
          </li>
        ))}
      </ul>
    </div>
  )
}

export default VotingResultsPage