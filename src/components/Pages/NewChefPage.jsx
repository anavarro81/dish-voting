import React, { useState } from 'react'

import Modal from '../Modal'
import axiosInstance from '../../../config/axiosConfig';


const NewChefPage = () => {

    const [chef, setChef] = useState({})

    const [showModal, setShowModal] = useState(false)

    const [errorChef, seterrorChef] = useState('')
    const [errorName, seterrorName] = useState('')
    const [errorDescription, seterrorDescription] = useState('')
    const [errorPhoto, seterrorPhoto] = useState('')

    const [errorMessage, seterrorMessage] = useState('')

    const [modalState, setModalState] = useState({        
        message: '',
        action: null
      });
    
    const handleChange = (e) => {

        const { type, name, value, files } = e.target;


        switch (name) {
            case 'chef':
                if (value === '') {
                    seterrorChef('El campo chef es obligatorio')
                } else {
                    seterrorChef('')
                }
                break;
            
            case 'name':
                if (value === '') {
                    seterrorName('El campo nombre es obligatorio')
                } else {
                    seterrorName('')
                }
                break;

                case 'description':
                    if (value === '') {
                        seterrorDescription('El campo nombre es obligatorio')
                    } else {
                        seterrorDescription('')
                    }
                    break;
                
                case 'photo':
                    if (files.length === 0) {
                        seterrorPhoto('La foto es obligatoria')
                    } else {
                        seterrorPhoto('')
                    }
                    break;
        
            default:
                break;
        }

        // Si recibo un arhivo, lo guardo en el estado
        if (type === 'file') {
            setChef({...chef, [name]: files[0]})
        } else {

            if (name == 'chef' && value === '') {
                
            }

            setChef({...chef, [name]: value})
        }     
        
        
    }



    const handleSubmit = async (e) => {
        
        e.preventDefault()
        
        // Validar que los campos no estén vacíos    
        if (errorChef || errorName || errorDescription || errorPhoto) {
            return
        }

        // Validar que la foto no esté vacía

        if (!chef.photo) {
            seterrorPhoto('La foto es obligatoria')
            return
        }

        const data = new FormData();

        
        
        
        Object.keys(chef).forEach(key => {
            data.append(key, chef[key]);
          });       

        
        

        try {
            
            // const res = await axios.post('http://localhost:5000/dishes/new-dish', data)                
            const res = await axiosInstance.post('/dishes/new-dish', data)            
            

            if (res.status === 201) {                
                seterrorMessage("Chef dado de alta correctamente")
                setShowModal(true)

                setModalState(prevState => ({
                    ...prevState,
                    message: 'Chef dado de alta correctamente',
                    action: 'redirect'
                }));
                    
    

            } else {    
                alert('Failed to upload form.')
            }

        } catch (error) {
            
            console.log(`Error al dar de alta el chef: ${error.response.data.message}`);            
            setShowModal(true)
            
            setModalState(prevState => ({
                ...prevState,
                message: error.response.data.message,
                action: 'redirect'
            }));


            
            
        }         
        
    }

  return (

    <> 

    

    <main className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">

        {showModal  && <Modal message={modalState.message} showModal={setShowModal}/>}    

        <h2 className="text-2xl font-bold mb-6"> ALTA DE CHEF </h2>
        <form onSubmit={handleSubmit} id='newSitForm'class="space-y-4">
{/* photo */}            
            <div> 
                <label for="photo"> Foto del plato </label>
                <input type="file" name='photo' accept='image/*' onChange={handleChange}/>
                <span className='text-red-500'> {errorPhoto &&  errorPhoto} </span>
            </div>
{/* chef name */}            
            <div>
                <label for="chef" className='block'> Nombre del chef </label>
                <input type="text" id='chef' name='chef' onChange={handleChange} className='mt-1 block w-full border py-2 px-2'/>
                <span className='text-red-500'> {errorChef &&  errorChef}</span>
            </div>
{/* name of dish */}
            <div>
                <label for="name" className='block'> Nombre del plato </label>
                <input type="text" id='name' name='name' onChange={handleChange} className='mt-1 block w-full border py-2 px-2'/>
                <span className='text-red-500'> {errorName &&  errorName}</span>
            </div>
{/* description */}
            <div>
                <label for="description" className='block'> Descripcion del plato </label>
                <input type="text" id='description' name='description' onChange={handleChange} className='mt-1 block w-full border py-2 px-2' />
                <span className='text-red-500'> {errorDescription &&  errorDescription}</span>
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
