import mongoose from "mongoose";
import CasesModel from "../DBModel/CasesModel";
import CantryModel from "../DBModel/geografModel";
import OrganisationModel from "../DBModel/OrganisationModel";
import TypesCasesModel from "../DBModel/TypesCasesModel";
import YearsMosel from "../DBModel/YearsMosel";

export const deleteItem = async (id: mongoose.Types.ObjectId) => {
    try {
        await CasesModel.findByIdAndDelete(id);

        await CantryModel.updateMany(
            { caces: id },
            { $pull: { caces: id } }
        );
        await OrganisationModel.updateMany(
            { caces: id },
            { $pull: { caces: id } }
        );
        await TypesCasesModel.updateMany(
            { Cases: id },
            { $pull: { caces: id } }
        );
        await YearsMosel.updateMany(
            { caces: id },
            { $pull: { caces: id } }
        );
        return "Deleted";
    } catch (error) {
        throw new Error(error as string);
    }
};


export const createItem = async (data: any) => {
        try {
            const newCase = new CasesModel(data);
            const savedCase = await newCase.save();
            await CantryModel.updateOne({ name: data.country }, { $push: { caces: savedCase._id } });
            await OrganisationModel.updateOne({ name: data.gname }, { $push: { caces: savedCase._id } });
            await TypesCasesModel.updateOne({ Name: data.attacktype1_txt }, { $push: { Cases: savedCase._id } });
            await YearsMosel.updateOne({ iyear: data.iyear }, { $push: { caces: savedCase._id } });
            return savedCase;
        } catch (error) {
            throw new Error("Failed to create case");

        }
    };