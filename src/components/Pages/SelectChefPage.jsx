import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

const SelectChefPage = () => {

    const navigate = useNavigate()

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

    const handleChange = (e) => {
        setChef(e.target.value)
        console.log(e.target.value);
        
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(chef)
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

                        {chefs.map((chef, index) => {
                            return (
                                <option key={index} value={chef.name} >{chef.name}</option>
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