import CasesModel from "../DBModel/CasesModel";
import CantryModel from "../DBModel/geografModel";
import OrganisationModel from "../DBModel/OrganisationModel";
import TypesCasesModel from "../DBModel/TypesCasesModel";
import YearsMosel from "../DBModel/YearsMosel";
import { io } from "../index";
import { getAllTypeAttack } from "../Server/AttacktypeServer";
import { getAllCantry } from "../Server/CantryServer";
import { createItem, deleteItem } from "../Server/CRAD";
import { getAllOrg } from "../Server/GNameServuice";
import { getAllYears } from "../Server/YearsService";

io.on("connection", (socket) => {
    //console.log(`Client connected: ${socket.id}`);

    socket.on("getTypes", async () => {
        const types = await getAllTypeAttack();
        socket.emit("sendTypes", types.filter(x => x != "Unknown"));
    });
    socket.on("getCantry", async () => {
        const types = await getAllCantry();
        socket.emit("sendCantry", types);
    });
    socket.on("getAllYears", async () => {
        const years = await getAllYears();
        socket.emit("sendYears", years);
    }
    );
    socket.on("getAllOrg", async (year) => {
        const org = await getAllOrg(year);
        socket.emit("sendOrg", org);
    });

    // Create a new case
    socket.on("createCase", async (data) => {
        try {
            const savedCase = await createItem(data);
            socket.emit("caseCreated", savedCase);
        } catch (err) {
            socket.emit("error", { message: "Failed to create case", error: err });
        }
    });

    // Update an existing case
    socket.on("updateCase", async ({ id, updates }) => {
        try {
            const updatedCase = await CasesModel.findByIdAndUpdate(id, updates, { new: true });
            socket.emit("caseUpdated", updatedCase);
        } catch (err) {
            socket.emit("error", { message: "Failed to update case", error: err });
        }
    });
    
    // Delete a case
    socket.on("deleteCase", async (id) => {
        try {
            const data = await deleteItem(id);
            socket.emit("caseDeleted", { message: data });
        } catch (err) {
            socket.emit("error", { message: "Failed to delete case", error: err });
        }
    });

    //reading all cases
    socket.on("getAllCases", async () => {
        try {
            const data = await CasesModel.find({}).limit(50);
            socket.emit("sendCases", data);
        } catch (err) {
            socket.emit("error", { message: "Failed to get cases", error: err });
        }
    });

});




