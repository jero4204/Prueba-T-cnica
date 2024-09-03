import { useState,useEffect } from 'react';
import { PlayerNBA } from '../models/player.model';

export const ShowQuote = () => {
    const [values, setValues] = useState<PlayerNBA[]>([]);
    const [valuesOrg, setValuesOrg] = useState<PlayerNBA[]>([]);
   
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
            console.log(data); 
            setValues(data.values);
            
        }).catch(error => {
            // Manejo de errores
            console.error('There was a problem with the fetch operation:', error);
        });
    }

    const getValuesOrg = async () => {
        setValuesOrg(values.sort((a, b) => Number(a.h_in) - Number(b.h_in)));
    }

    const boton = async () => {
        getValues();
        getValuesOrg();
    }

    useEffect(() => {
        getValues();
        getValuesOrg();
    }, [])

  return (
    <div>
        <button onClick={boton} 
        className="bg-blue-500 text-white font-bold px-4 py-2 rounded mt-4">
            Get Quote</button>
    </div>
  )
}