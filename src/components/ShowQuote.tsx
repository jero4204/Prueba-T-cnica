import { useState,useEffect } from 'react';
import { PlayerNBA } from '../models/player.model';
import { Player } from './Sentence';
import { Values } from '../models/values.model';

let aaaa: string[] = []

export const ShowQuote = () => {
    const [quote, setQuote] = useState<PlayerNBA>({
        first_name: '',
        last_name: '',
        h_in: '',
    });
    const [values, setValues] = useState<Values>({
        values: [],
    });
    
    const getQuote = async () => {
        const response = await fetch('https://mach-eight.uc.r.appspot.com/');
        const data = await response.json();
        setQuote(data[0]);      
    }
    useEffect(() => {
        getQuote();
    }, [])
  return (
    <div>
        <Player quote={quote}/>
        <button onClick={getQuote} 
        className="bg-blue-500 text-white font-bold px-4 py-2 rounded mt-4">
            Get Quote</button>
    </div>
  )
}