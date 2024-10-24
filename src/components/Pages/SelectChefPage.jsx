import React, {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SelectChefPage = () => {

    const navigate = useNavigate()

    const [dishes, setDishes] = useState([])

    const chefs = [
        {
            name: 'Alba',
        },
        {
            name: 'Carlos',
        },
        {
            name: 'Marina',
        },
        {
            name: 'Los Momitos',
        }
    ]

    const [chef, setChef] = useState('')

    useEffect(() => {
        axios.get('http://localhost:5000/dishes/dishes')
        .then(response => {
            console.log(response.data.data)
            setDishes(response.data.data)
        })
        .catch(error => {   
            console.log(error)
            alert(`Error al cargar los datos ${error}`)
        })
    
    }, [])
    

    const handleChange = (e) => {
        setChef(e.target.value)
        console.log('selected chef ', e.target.value);
        
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('selected chef', chef);
        navigate(`/voting-page`, { state: { chef } })
    }

    return (
        
        <div className='flex flex-col min-h-screen items-center justify-center bg-gray-100 p-4'> 
            <form onSubmit={handleSubmit}> 
                <div className='flex flex-col gap-2'> 
                    
                    <label htmlFor='chef-name' className='block text-gray-700 text-md font-bold mb-2 text-center'> ¿Qué chef eres? </label>
                    <select 
                        name="chef-name" 
                        id="" 
                        className='px-4 py-2 '
                        onChange={handleChange}>

                        {dishes.map((dish, index) => {
                            return (
                                <option key={index} value={dish.chef} >{dish.chef}</option>
                            )
                        })}                        
                    </select>

                    <button 
                        type='submit'
                        oncClick={handleSubmit}
                        className='flex  w-full justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                    
                        Seleccionar Chef    
                    </button>

                </div>   
            </form>
        </div>

      )
    
}

export default SelectChefPage