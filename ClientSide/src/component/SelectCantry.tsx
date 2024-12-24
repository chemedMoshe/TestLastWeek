import { socket } from "../main";
import { useEffect, useState } from "react";

interface Props {
    selected:string
    selectCantry:string
    setSelectCantry:React.Dispatch<React.SetStateAction<string|null>>
    setAmount:React.Dispatch<React.SetStateAction<number|undefined>>
    setLocationMap:React.Dispatch<React.SetStateAction<[number, number]>>
    amount:number
}
export default function SelectCantry({setSelectCantry,setAmount,selected,amount,selectCantry}:Props) {
    const [cantry, setCantry] = useState<string[]>([]);
    useEffect(() => {
     socket.emit('getCantry');
     socket.on('sendCantry', (res: string[]) => setCantry(res));   
    },[])
    const handleCantry = (e:string) => {
       
        setSelectCantry(e as string);
        }

    return (
        <div className="selectCantry">
            <select 
            value={selectCantry}
            onChange={(e:any)=>handleCantry(e.target.value)}>
            {cantry.map((e,i)=><option key={i}  value={e}>{e}</option>)}
            </select>
            {selected === "Option 4" && <select value={amount}
             onChange={(e:any)=>setAmount(e.target.value)}>
                <option value={""}>All</option>
            {[1,2,3,4,5].map((e,i)=><option key={i}  value={e}>{e}</option>
            )}</select>}
        </div>
  )
}
