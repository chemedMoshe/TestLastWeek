import CasesModel from "../DBModel/CasesModel";
import YearsMosel from "../DBModel/YearsMosel";
import CasesType from "../Types/CasesType";
import CantryModel from "../DBModel/geografModel";
import OrganisationModel from "../DBModel/OrganisationModel";
interface Element {
    org: string,
    sum: number;
    location?: [number, number];
}

interface GnameType {
    caces: any[];
}



export const getBoldGnameByCantry = async (cantry: string, amount: number | null = null) => {
    const organisation: Element | any = {};
    const organisationList: Element[] | any = [];
    const data: CasesType[] = await CasesModel.find({ country_txt: cantry });
    data.map((x: CasesType) => {
        if (!organisation[x.gname]) {
             organisation[x.gname] = { sum: 0,location:[x.longitude, x.latitude]}
             }
        organisation[x.gname].sum += 1;
    });
    
    Object.entries(organisation).forEach(([org, sum]) => organisationList.push({ org, sum }));
    
    const sortList = organisationList.sort((a: any, b: any) => b.sum.sum - a.sum.sum);
    return sortList.slice(0, amount || organisationList.length - 1).map((x:any) => ({info:`${x.org},Nilk:${x.sum.sum}`,location:x.sum.location, sum:x.sum.sum}));
};

export const getGnameByYear = async (year: number, Gname: string | null = null) => {
    const elements: { [key: string]: number; } = {};

    const data: any = await YearsMosel.findOne({ iyear: year }).populate("caces");
    data?.caces.map((x: CasesType) => {
        if (!elements[x.gname]) elements[x.gname] = 0;
        elements[x.gname] += 1;
    });
    const sortList = Object.entries(elements).sort((a: any, b: any) => b[1] - a[1]);
    const elementList = sortList.map(([x, y]) => ({ org: x, sum: y }));

    return !Gname ?
        elementList :
        elementList.filter((x: Element) => x.org == Gname)//);

};



export const getCasesByStrongGnameAnd = async (Gname: string) => {

    const data = await CantryModel.find()
    .populate({
        path: 'caces',
        match: { 
          gname: Gname, 
          $or: [
            { nkill: { $ne: 0 } },
            { nwound: { $ne: 0 } }
          ]
        },
        options: { sort: { nkill: -1 }, limit: 1 }
      });

        const cases = data.filter((x: GnameType) => x.caces[0]?.gname).map(x => {
            //@ts-ignore
            return { info: `${x.name}, casualties:${x.caces[0].nkill + x.caces[0].nwound}`, location:[x.caces[0].longitude, x.caces[0].latitude]};
        });
    
    return cases.length > 0 ? cases.slice(0,1):cases
}

export const getAllOrg = async (iyear:number|null) => {
    try{
    const data = iyear? await CasesModel.find({iyear}).distinct("gname"):
    await OrganisationModel.find({
        caces: { $exists: true, $ne: [] }
      });
    
   const res = iyear? data.length > 50 ? data.slice(data.length - 50, data.length-1) : data
   :data.map(x => x.name).slice(0,50)
   return res
    }    catch(e){
        return []
    }
}


