export const GetbyStorGname = async (Gname: string) => {
    try {
        const data = await fetch(`https://testlastweek.onrender.com/api/relationships/deadliest-regions/?gname=${Gname}`)
        
        return await data.json();
    } catch (error) {
        return error
    }
}