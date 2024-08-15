import { PlayerNBA } from "../models/player.model";

//asd
interface SentenceProps {
    quote: PlayerNBA;
}
export const Player = ({quote}:SentenceProps) => {
    return (
       <div>
        <p className="text-2xl font-bold text-gray-800">{quote.first_name}</p>
       
        </div> 
    )
}