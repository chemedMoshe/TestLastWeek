export const getBoldGname = async (cantry:string,amount:number) => {
    try {
        
        const data = await fetch(`https://testlastweek.onrender.com/api/relationships/top-groups/?cantry=${cantry}&amount=${amount}`)
        return await data.json();
    } catch (error) {
        return error
    }
}