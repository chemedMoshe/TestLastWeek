import { DisplayEnum } from "../Types/Display";

export const returnGrafOrMap = (setDisplay:React.Dispatch<React.SetStateAction<DisplayEnum>>,option:string) => {
    if(option == "about") setDisplay(DisplayEnum.ABOUT);
    if(option == "Option 4") return
    option == "Option 1" || option == "Option 5" || option == "Option 3" ?
     setDisplay(DisplayEnum.GRAFS) 
     : 
    setDisplay(DisplayEnum.MAPS);
}