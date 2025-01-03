export const getCasesByYear = async(year:{fromYear: number, toYear: number|undefined}) => {
    try{
        
    const data = await fetch(`https://testlastweek.onrender.com/api/analysis/incident-trends/${year.fromYear}/${year.toYear}/`) 
    return await data.json();
    }
    catch(err){
        return err
    }
}