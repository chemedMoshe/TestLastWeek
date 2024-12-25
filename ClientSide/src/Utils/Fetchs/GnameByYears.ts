export const getGnameByYear = async(filter:{year:number,org:string}) => {
    try{
        
    const data = await fetch(`https://testlastweek.onrender.com/api/relationships/groups-by-year/?year=${filter.year}&org=${filter.org}`)
    return await data.json();
    }
    catch(err){
        return err
    }
    
}