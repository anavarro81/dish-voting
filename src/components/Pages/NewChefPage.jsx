import { data } from 'autoprefixer'
import React,{useState} from 'react'

const NewChefPage = () => {

    const [file, setFile] = useState(null)

    const [chef, setChef] = useState({})

    
    const handleChange = (e) => {

        const { type, name, value, files } = e.target;

        
        // Si recibo un arhivo, lo guardo en el estado
        if (type === 'file') {
            setChef({...chef, [name]: files[0]})
            console.log('Guardo el archivo');
                       
        } else {
            setChef({...chef, [name]: value})
        }     
        
        console.log(chef)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = new FormData();
        
        Object.keys(chef).forEach(key => {
            data.append(key, chef[key]);
          });
          
        try {
            const response = await fetch('/upload', {
                method: 'POST',
                body: data,
              });

              if (response.ok) {
                console.log('File uploaded!');
              } else {
                console.error('Failed to upload file.');
              }
            
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }

  return (
    <main class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
        <h2 class="text-2xl font-bold mb-6"> ALTA DE CHEF </h2>
        <form onSubmit={handleSubmit} id='newSitForm'class="space-y-4">
            
            <div> 
                <label for="dish-photo"> Foto del plato </label>
                <input type="file" name='photo' accept='image/*' onChange={handleChange}/>
            </div>

            <div>
                <label for="chef-name" className='block'> Nombre del chef </label>
                <input type="text" id='chef-name' name='chef-name' onChange={handleChange} className='mt-1 block w-full border py-2 px-2'/>
            </div>

            <div>
                <label for="dish" className='block'> Nombre del plato </label>
                <input type="text" id='dish' name='dish' onChange={handleChange} className='mt-1 block w-full border py-2 px-2'/>
            </div>

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
  )
}

export default NewChefPage
