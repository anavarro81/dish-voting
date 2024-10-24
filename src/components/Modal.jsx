import React, {useRef} from 'react'
import { FaTimes } from "react-icons/fa";
import {useNavigate} from "react-router-dom";

const Modal = ({message, showModal}) => {

    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate(`/`)
    }

    const modalRef = useRef(null);

    const handleCLickOutside = (e) => {

        console.log('>> modal Current: ', modalRef.current);
        console.log('>> target: ', e.target);
        
        if(modalRef.current && !modalRef.current.contains(e.target)){
            showModal(false)
        }
        
        
        
    }

  return (
    <div className='flex items-center justify-center ' onClick={handleCLickOutside}> 
        <div className='fixed inset-0 z-50 w-full h-full bg-black bg-opacity-50 flex justify-center items-center' >

{/* Modal */}
            <div className="bg-white px-2 py-4 rounded-lg w-1/4" ref={modalRef}>   
                <div className="flex items-start justify-between mb-4">
                        <h3 className="text-2xl font-semibold text-gray-900">
                            {message}
                        </h3>
                        <button                    
                            className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            aria-label="Close"
                        >
                            <FaTimes className="w-6 h-6" onClick={() => showModal(false)}/>
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