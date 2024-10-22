import React from 'react'
import { FaTimes } from "react-icons/fa";
import {useNavigate} from "react-router-dom";

const Modal = () => {

    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate(`/`)
    }

  return (
    <div className='flex items-center justify-center '> 
        <div className='fixed inset-0 z-50 w-full h-full bg-black bg-opacity-50 flex justify-center items-center'>

{/* Modal */}
            <div className="bg-white px-2 py-4 rounded-lg ">   
                <div className="flex items-start justify-between mb-4">
                        <h3 className="text-2xl font-semibold text-gray-900">
                            Chef dado de alta correctamente
                        </h3>
                        <button                    
                            className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            aria-label="Close"
                        >
                            <FaTimes className="w-6 h-6" />
                        </button>
                </div>

                <div className='mt-6'>

                    <button
                        onClick={handleRedirect}
                        className='w-full px-4 py-2 text-white bg-blue-500 rounded'
                    >
                        Aceptar
                    </button>

                </div>

            </div>
        
        </div>
            
    </div>
    
  )
}

export default Modal