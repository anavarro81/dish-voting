import React from 'react'
import { FaUtensils, FaVoteYea, FaChartBar } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate();

    const buttons = [
        {
            name: 'Votar',
            label: 'Alta de chef',
            onClick: () => navigate('/new-chef'),
            icon: <FaUtensils/>
        },

        {
            name: 'Votar',
            label: 'Votar platos',
            onClick: () => navigate('/select-chef'),
            icon: <FaVoteYea/>
        },

        {
            name: 'Votar',
            label: 'Ver Resultados',
            onClick: () => navigate('/VotingPage'),
            icon: <FaChartBar/>

        }


        
    ]


  return (
    
    <div className='flex flex-col min-h-screen items-center justify-center bg-gray-100 p-4'> 
        <div className='space-y-4 w-full max-w-md'> 
            {buttons.map((button, index) => (
                <button key={index} 
                        onClick={button.onClick} 
                        className='flex  w-full justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>                    
                <span className='mr-2'> {button.icon} </span>
                {button.label}
                </button>
            ))}
        </div>
    </div>
  )
}

export default Home