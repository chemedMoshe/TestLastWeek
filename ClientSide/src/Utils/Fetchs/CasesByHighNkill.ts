export const getCasesByHighNkill = async(options:string[]|null[])=>{
    try{
    const data = await fetch('https://testlastweek.onrender.com/api/analysis/deadliest-attack-types/',{
        method:"POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(options)
    })
    return data.json();
    }
    catch(err){
        return err
    }
    
}