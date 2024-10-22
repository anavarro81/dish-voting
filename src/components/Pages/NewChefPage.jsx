import { data } from 'autoprefixer'
import React,{useState} from 'react'
import axios from 'axios'
import Modal from '../Modal'



const NewChefPage = () => {

    const [file, setFile] = useState(null)

    const [chef, setChef] = useState({})

    const [showModal, setShowModal] = useState(false)

    
    const handleChange = (e) => {

        const { type, name, value, files } = e.target;

        
        // Si recibo un arhivo, lo guardo en el estado
        if (type === 'file') {
            setChef({...chef, [name]: files[0]})
            
                       
        } else {
            setChef({...chef, [name]: value})
        }     
        
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = new FormData();

        console.log('chef', chef);
        
        
        Object.keys(chef).forEach(key => {
            data.append(key, chef[key]);
          });       

        console.log('data', data);
        

        try {
            const res = await axios.post('http://localhost:5000/dishes/new-dish', data)    
            console.log(res)

            

            if (res.status === 201) {                
                setShowModal(true)

            } else {    
                alert('Failed to upload form.')
            }

        } catch (error) {
            console.error('Failed to upload form.');
        }         
        
    }

  return (

    <> 

    

    <main class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">

        {showModal && <Modal/>}    

        <h2 class="text-2xl font-bold mb-6"> ALTA DE CHEF </h2>
        <form onSubmit={handleSubmit} id='newSitForm'class="space-y-4">
{/* photo */}            
            <div> 
                <label for="photo"> Foto del plato </label>
                <input type="file" name='photo' accept='image/*' onChange={handleChange}/>
            </div>
{/* chef name */}            
            <div>
                <label for="chef" className='block'> Nombre del chef </label>
                <input type="text" id='chef' name='chef' onChange={handleChange} className='mt-1 block w-full border py-2 px-2'/>
            </div>
{/* name of dish */}
            <div>
                <label for="name" className='block'> Nombre del plato </label>
                <input type="text" id='name' name='name' onChange={handleChange} className='mt-1 block w-full border py-2 px-2'/>
            </div>
{/* description */}
            <div>
                <label for="description" className='block'> Descripcion del plato </label>
                <input type="text" id='description' name='description' onChange={handleChange} className='mt-1 block w-full border py-2 px-2' />
            </div>

            <div className='flex justify-center w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'> 
                <button type='submit'>
                    Guardar
                </button>
            </div>
        </form>
    </main>
    </>
  )
}

export default NewChefPage
