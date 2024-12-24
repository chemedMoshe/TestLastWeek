import { Request, Response } from "express";
import { getCasesByHighNkill, getSumCasualties } from "../Server/CasesServer";

export const getCases = async (req: Request, res: Response) => {
    try{
        
    const data = await getCasesByHighNkill(req.body); 
      
    res.json(data);
    }
    catch (error) {res.status(500).json({ message: (error as Error).message });}
}

export const getMarker = async (req: Request, res: Response) => {
    try{
        const cantry = req.params.cantry
        const data =cantry == "null"? await getSumCasualties():
        await getSumCasualties(cantry); 
        res.json(data);
    }
    catch (error) {res.status(500).json({ message: (error as Error).message });}
}