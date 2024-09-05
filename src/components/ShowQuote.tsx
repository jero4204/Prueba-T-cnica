import { useState,useEffect } from 'react';
import { PlayerNBA } from '../models/player.model';
import { Respuesta } from '../models/respuesta.model';

export const ShowQuote = () => {
    const [values, setValues] = useState<PlayerNBA[]>([]);
    const [valuesOrg, setValuesOrg] = useState<PlayerNBA[]>([]);
    const [respuesta, setRespuesta] = useState<Respuesta[]>([]);

    let menorestatura = 139;
    let mayorestatura = 90;
   
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

    const encontrarParejas = async (estaturaPareja: number) => {
        if(estaturaPareja >= menorestatura && estaturaPareja <= mayorestatura){
            let i = 0;
            let respuestas: Respuesta[] = [];
            while(i<valuesOrg.length){
                let estaturaRequerida = estaturaPareja-Number(valuesOrg[i].h_in);
                let w = i+1;
                while(estaturaRequerida >= Number(valuesOrg[w].h_in)){
                    if(estaturaRequerida = Number(valuesOrg[w].h_in)){
                        respuestas.push({first_name1: valuesOrg[i].first_name, last_name1: valuesOrg[i].last_name, first_name2: valuesOrg[w].first_name, last_name2: valuesOrg[w].last_name})
                    }
                    w = w+1;
                }
                i = i+1;
            }
            setRespuesta(respuestas);
        }else{
            console.log("No hay parejas con esa estatura")
        }
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