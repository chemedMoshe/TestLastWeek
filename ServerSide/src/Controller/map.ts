import { Request, Response } from "express";
import CantryModel from "../DBModel/geografModel";

export const gnameBold = async (req: Request, res: Response) => {
  try {
    const org = req.query.gname as string; 

    if (!org) {
      return res.status(400).json({ message: "Organization is required" });
    }

    const data = await CantryModel.find({}).populate({ path: "caces", match: { gname: org } })

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "No data found for the specified organization" });
    }

    let maxEvent: any = null;
    let totalCasualties = 0;

    data.forEach(country => {
      if (!country.caces || country.caces.length === 0) return;

      const countryMaxEvent = country.caces.reduce((max: any, event: any) => {
        const eventCasualties = (event.nkill || 0) + (event.nwound || 0);
        const maxCasualties = (max.nkill || 0) + (max.nwound || 0);
        return eventCasualties > maxCasualties ? event : max;
      }, country.caces[0]);

      const countryCasualties = (countryMaxEvent.nkill || 0) + (countryMaxEvent.nwound || 0);

      if (!maxEvent || countryCasualties > totalCasualties) {
        maxEvent = countryMaxEvent;
        totalCasualties = countryCasualties;
      }
    });

    if (!maxEvent) {
      return res.status(404).json({ message: "No events found for the specified organization" });
    }

    const result = []
     result.push( {
      info: `${org} - Total Casualties: ${totalCasualties}`,
      location: [maxEvent.longitude, maxEvent.latitude],
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};
