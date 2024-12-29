export const getBoldGname = async (cantry:string,amount:number) => {
    try {
        
        const data = await fetch(`http://localhost:2021/api/relationships/top-groups/?cantry=${cantry}&amount=${amount}`)
        return await data.json();
    } catch (error) {
        return error
    }
}