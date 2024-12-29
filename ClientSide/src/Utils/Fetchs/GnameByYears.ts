export const getGnameByYear = async(filter:{year:number,org:string}) => {
    try{
        
    const data = await fetch(`http://localhost:2021/api/relationships/groups-by-year/?year=${filter.year}&org=${filter.org}`)
    return await data.json();
    }
    catch(err){
        return err
    }
    
}