import { useState,useEffect } from 'react';
import { PlayerNBA } from '../models/player.model';
import { Respuesta } from '../models/respuesta.model';
import { ParejasRespuesta } from './Sentence';

export const ShowQuote = () => {
    const [values, setValues] = useState<PlayerNBA[]>([]);
    const [valuesOrg, setValuesOrg] = useState<PlayerNBA[]>([]);
    const [respuesta, setRespuesta] = useState<Respuesta[]>([]);
    const [estaturaPareja, setEstaturaPareja] = useState<number | string>('');

    let menorestatura = 139;
    let mayorestatura = 177;
   
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

    const encontrarParejas = async () => {
        let respuestas: Respuesta[] = [];
        if(Number(estaturaPareja) >= menorestatura && Number(estaturaPareja) <= mayorestatura){
            let i = 0;
            while(i<(valuesOrg.length-1) && ((Number(valuesOrg[i].h_in)+Number(valuesOrg[i+1].h_in))<=Number(estaturaPareja))){
                let estaturaRequerida = Number(estaturaPareja)-Number(valuesOrg[i].h_in);
                let w = i+1;
                while(w<(valuesOrg.length) && estaturaRequerida >= Number(valuesOrg[w].h_in)){
                    if(estaturaRequerida == Number(valuesOrg[w].h_in)){
                        respuestas.push({first_name1: valuesOrg[i].first_name, last_name1: valuesOrg[i].last_name, first_name2: valuesOrg[w].first_name, last_name2: valuesOrg[w].last_name})
                    }
                    w = w+1;
                }
                i = i+1;
            }
        }else{
            console.log("No hay parejas con esa estatura")
        }
        setRespuesta(respuestas);
    }

    const boton = async () => {
        getValues();
        getValuesOrg();
        encontrarParejas();
    }

    useEffect(() => {
        getValues();
        getValuesOrg();
        encontrarParejas();
    }, [])

  return (
    <div>
        <h1 className="bg-blue-500 text-white text-2xl font-bold px-4 py-4 rounded mt-4">Mach Eight Sample Project</h1>
        <input className="font-bold px-2 py-2 rounded mt-4" type="number" value={estaturaPareja} onChange={(e)=> setEstaturaPareja(e.target.value)}
        placeholder="Ingrese la estatura"></input>
        <button onClick={boton} 
        className="bg-blue-500 text-white font-bold px-4 py-2 rounded mt-4">
            Obtener Parejas</button>
        <ParejasRespuesta quote={respuesta}/>
    </div>
  )
}