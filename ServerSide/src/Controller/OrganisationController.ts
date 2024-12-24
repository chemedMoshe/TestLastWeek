import { Request, Response } from "express";
import { getBoldGnameByCantry, getCasesByStrongGnameAnd, getGnameByYear } from "../Server/GNameServuice";

export const getBoldOrganisation = async (req: Request, res: Response) => {
    try {
        const cantry = req.query.cantry as string
        const amount = +req.query.amount! as number
        
        const data = await getBoldGnameByCantry(cantry, amount||null);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const getGnameByYears = async(req: Request, res: Response) => {
    try {
        
        const year = +req.query.year!
        const org:string|null = req.query.org as string|null
        
        const data = await getGnameByYear(year,org);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}

export const getCasesByStrongGname = async(req: Request, res: Response) => {
    try {
        const gname = req.query.gname as string
        const data = await getCasesByStrongGnameAnd(gname);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
} }