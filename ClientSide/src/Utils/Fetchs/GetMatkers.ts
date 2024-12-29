
export const getSumCasualties = async(cantryName:string|null)=>{
try {
    
    const data = await fetch(`http://localhost:2021/api/analysis/highest-casualty-regions/${cantryName||"null"}/`)
    return await data.json();
} catch (error) {
    return error
}
}