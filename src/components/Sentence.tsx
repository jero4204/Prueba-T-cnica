import { Respuesta } from "../models/respuesta.model"

//asd
interface SentenceProps {
    quote: Respuesta[];
}
export const ParejasRespuesta = ({quote}:SentenceProps) => {
    if(quote.length>0){
        return (
            <div>
                {quote.map((pareja,index)=>(
                    <p key={index} className="text-xl font-bold text-gray-800">{pareja.first_name1} {pareja.last_name1} y {pareja.first_name2} {pareja.last_name2}</p>
                ))}
            </div> 
        )
    }else{
        return(
            <div>
                <p className="text-xl font-bold text-gray-800">No matches found</p>
            </div>
        )
    }
    
}