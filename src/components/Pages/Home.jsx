import React, {useEffect, useState} from 'react'
import { FaUtensils, FaVoteYea, FaChartBar } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import pumpkin from '../../assets/images/pumpkin.svg';
import axios from 'axios';

const Home = () => {

    const navigate = useNavigate();

    const [showResults, setShowResults] = useState(false);

    const buttons = [
        {
            name: 'newChef',
            label: 'Alta de chef',
            onClick: () => navigate('/new-chef'),
            icon: <FaUtensils/>
        },

        {
            name: 'VoteDishes',
            label: 'Votar platos',
            onClick: () => navigate('/select-chef'),
            icon: <FaVoteYea/>
        },

        {
            name: 'showResults',
            label: 'Ver Resultados',
            onClick: () => navigate('/voting-results'),
            icon: <FaChartBar/>

        }


        
    ]

    useEffect(() => {
        axios.get('http://localhost:5000/vote/count-votes-realized').
        then((response) => {
            console.log('Se puede votar: ', response.data.showResult)
            setShowResults(response.data.showResult)
        })
    
    }, [])
    



  return (
    
    <div className='flex flex-col min-h-screen items-center justify-center bg-gray-100 p-4'> 

        <img src={pumpkin} alt='logo' className='h-24 mb-2'/>
        <h2 className='text-2xl text-center text-blod text-orange-500 mb-2'> Concurso Halloween </h2>

        <div className='space-y-4 w-full max-w-md'> 
            {buttons.map((button, index) => (
                <button key={index} 
                        onClick={button.onClick} 
                        disabled={button.name === 'showResults' && !showResults}
                        className='flex  w-full justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400'
                        
                        >
                                            
                <span className='mr-2'> {button.icon} </span>
                {button.label}
                </button>
            ))}
        </div>
    </div>
  )
}

export default Home