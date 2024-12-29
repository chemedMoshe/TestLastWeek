export const GetbyStorGname = async (Gname: string) => {
    try {
        const data = await fetch(`http://localhost:2021/api/relationships/deadliest-regions/?gname=${Gname}`)
        
        return await data.json();
    } catch (error) {
        return error
    }
}