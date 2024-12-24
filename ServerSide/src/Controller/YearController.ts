import { Request, Response } from "express";
import { acountCasesByYears } from "../Server/YearsService";
export const byYear= async (req: Request, res: Response) => {
    try{
        const startyear = +req.params.startyear
        const endyear = +req.params.endyear
        const data = await acountCasesByYears(startyear,endyear||null)
        res.json(data);
    }
    catch (error) {res.status(500).json({ message: (error as Error).message });}
}