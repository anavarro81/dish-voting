import React, {useEffect, useState} from 'react'
import { FaUtensils, FaVoteYea, FaChartBar, FaCog } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import pumpkin from '../../assets/images/pumpkin.svg';
import axios from 'axios';

const Home = () => {

    const navigate = useNavigate();

    const [showResults, setShowResults] = useState(false);

    const [disableVote, setDisableVote] = useState(false);

    const buttons = [
        {
            name: 'newChef',
            label: 'Alta de chef',
            onClick: () => navigate('/new-chef'),
            icon: <FaUtensils/>,
            disabled: false
        },

        {
            name: 'VoteDishes',
            label: 'Votar platos',
            onClick: () => navigate('/select-chef'),
            icon: <FaVoteYea/>,
            disabled: disableVote
        },

        {
            name: 'showResults',
            label: 'Ver Resultados',
            onClick: () => navigate('/voting-results'),
            icon: <FaChartBar/>,
            disabled: showResults

        }
    ]

    // Obtenemos los platos del concurso
    const getDishes = async () => {
       try {            
            const response = await axios.get('http://localhost:5000/dishes/dishes')    
            console.log('dishes:', response.data)        
        } catch (error) {
            console.log('Error al cargar los platos del concurso', error)           
            if (error.response.status === 404) {
                setDisableVote(true)
            }            
        }

    }

    useEffect(() => {
        
        const getData = async () => {   
            await getDishes()
        }
        
        axios.get('http://localhost:5000/vote/count-votes-realized').
        then((response) => {
            console.log('Se puede votar: ', response.data.showResult)
            setShowResults(!response.data.showResult)
        })

        getData()
    
    }, [])

  return (
    <div className='flex flex-col min-h-screen items-center justify-center bg-gray-100 p-4'> 
        <img src={pumpkin} alt='logo' className='h-24 mb-2'/>
        <h2 className='text-2xl text-center text-blod text-orange-500 mb-2'> Concurso Halloween </h2>

        <div className='space-y-4 w-full max-w-md'> 
            {buttons.map((button, index) => (
                <button key={index} 
                        onClick={button.onClick} 
                        disabled={button.disabled}
                        className='flex  w-full justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400'>
                    <span className='mr-2'> {button.icon} </span>
                    {button.label}
                </button>
            ))}
        </div>

        <button 
            onClick={() => navigate('/settings')}
            className='fixed bottom-4 right-4 bg-gray-800 hover:bg-gray-900 text-white p-3 rounded-full'>
            <FaCog size={24} />
        </button>
    </div>
  )
}

export default Home
