import { useState } from "react";
import Filtering from "./filtering";
import FilteringYears from "./FilteringYears";
import FilterYears from "./filterYears";

interface Props {
    comp:JSX.Element
    selected: string | null;
    options: string[] | null[];
      setOptions: React.Dispatch<React.SetStateAction<string[] | null[]>>;
      setFromYear: React.Dispatch<React.SetStateAction<number|undefined>>;
      setToYear: React.Dispatch<React.SetStateAction<number|undefined>>;
      fromYear?: number;
      toYear?: number;
      yearForGname: number
      setYearForGname: React.Dispatch<React.SetStateAction<number>>
      org:string
      setOrg:React.Dispatch<React.SetStateAction<string>>
}
export default function ReturnCompBySelected({setYearForGname,selected,comp,options, setOptions, setFromYear, setToYear, fromYear, toYear, yearForGname,org,setOrg}: Props) {
 
    return   selected === "Option 1" ? <Filtering setOptions={setOptions} options={options}/>
    :
    selected === "Option 3" ? <FilteringYears setFromYear={setFromYear} setToYear={setToYear} fromYear={fromYear} toYear={toYear}/>:
    selected === "Option 5" ? <FilterYears setYearForGname={setYearForGname} yearForGname={yearForGname} org={org} setOrg={setOrg} />: comp
  
}
