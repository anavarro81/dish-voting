import React, {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SelectChefPage = () => {

    const navigate = useNavigate()

    const [dishes, setDishes] = useState([])

    const [chef, setChef] = useState('')

    const [chefsShowed, setChefsShowed] = useState([])


    const getVotes = async () => {
        try {
            return await axios.get('http://localhost:5000/vote/votes')            
        } catch (error) {
            console.log(error);
            alert(`Error al cargar los datos ${error}`)            
        }    
    }

    const getDishes = async () => {

        try {
            return axios.get('http://localhost:5000/dishes/dishes')
        } catch (error) {
            console.log(error)
            alert(`Error al cargar los datos ${error}`)
        }      
    
    }

    useEffect(() => {

        const getData = async () => {

            const votesResponse = await getVotes()
            const dishesResponse = await getDishes()

            
            const votes = votesResponse.data                // Votos emitidos con el chef que votó
            const dishes = dishesResponse.data.data         // Platos del consurso    


            //Si el chef ya votó, no puede volver a aparecer en el combo para votar

            const chefShowed = []

            for (const dish of dishes) {
                const chefFounded = votes.find(vote => vote.chef === dish.chef)

                if (!chefFounded) {
                    chefShowed.push(dish.chef)                    
                }
            }            
            
            setChefsShowed(chefShowed)
            
        
        }


        getData()
    
    }, [])
    

    const handleChange = (e) => {
        setChef(e.target.value)
        
        
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
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
                        <option  value="" > Selecciona un Chef </option>
                        {chefsShowed.map((chef, index) => {                            
                                return <option key={index} value={chef} >{chef}</option>                                
                        })}                        
                    </select>

                    <button 
                        type='submit'
                        oncClick={handleSubmit}
                        disabled={chef === '' ? true : false}
                        className='flex  w-full justify-center disabled:bg-gray-400 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                    
                        Seleccionar Chef    
                    </button>

                </div>   
            </form>
        </div>

      )
    
}

export default SelectChefPage