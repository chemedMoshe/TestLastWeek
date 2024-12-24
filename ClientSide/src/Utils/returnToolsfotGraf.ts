export interface TypereturnTools{
    XAxis:string,
    Bar:string
}
export const returnToolsfotGraf = (selected:string|null) => {
    if(selected === "Select") return {XAxis: "name",Bar:"sum"}
    if(selected === "Option 1") return {XAxis: "name",Bar:"sum"}
    if(selected === "Option 2") return {XAxis: "name",Bar:"sum"}
    if(selected === "Option 3") return {XAxis: "year",Bar:"sum"}
    if(selected === "Option 4") return {XAxis: "info",Bar:"sum"}
    if(selected === "Option 5") return {XAxis: "org",Bar:"sum"}
}