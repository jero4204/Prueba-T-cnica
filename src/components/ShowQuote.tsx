import { useState,useEffect } from 'react';
import { PlayerNBA } from '../models/player.model';

export const ShowQuote = () => {
    const [quote, setQuote] = useState<PlayerNBA[]>([]);
   
    const getValues = async () => {
        const apiUrl = 'https://mach-eight.uc.r.appspot.com/';
        // Usamos fetch para hacer la solicitud
        fetch(apiUrl).then(response => {
            // Verificamos si la respuesta es exitosa
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Convertimos la respuesta a JSON
            return response.json();
        }).then(data => {
            // Aquí `data` es el objeto JSON obtenido de la API
            // Si `data` es un array, simplemente puedes asignarlo a una variable
            console.log(data); 
            setQuote(data);
            
        }).catch(error => {
            // Manejo de errores
            console.error('There was a problem with the fetch operation:', error);
        });
    }
    const getQuote = async () => {
        getValues();
             
    }
    useEffect(() => {
        getQuote();
    }, [])
  return (
    <div>
        <button onClick={getQuote} 
        className="bg-blue-500 text-white font-bold px-4 py-2 rounded mt-4">
            Get Quote</button>
    </div>
  )
}