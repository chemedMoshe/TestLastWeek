import CasesModel from "../DBModel/CasesModel";
import { io } from "../index";
import { getAllTypeAttack } from "../Server/AttacktypeServer";
import { getAllCantry } from "../Server/CantryServer";
import { getAllOrg } from "../Server/GNameServuice";
import { getAllYears } from "../Server/YearsService";

io.on("connection", (socket) => {
    //console.log(`Client connected: ${socket.id}`);
    
socket.on("getTypes", async() => {
    const types = await getAllTypeAttack()
    socket.emit("sendTypes", types.filter(x => x != "Unknown"));
})
socket.on("getCantry",async() => {
    const types = await getAllCantry()
    socket.emit("sendCantry", types);
})
socket.on("getAllYears",async() => {
    const years = await getAllYears()
    socket.emit("sendYears", years);}
)
socket.on("getAllOrg", async(year) =>{
    const org = await getAllOrg(year)
    
    socket.emit("sendOrg", org);
} )
// Create a new case
    socket.on("createCase", async (data) => {
        try {
            const newCase = new CasesModel(data);
            const savedCase = await newCase.save();
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
                await CasesModel.findByIdAndDelete(id);
                socket.emit("caseDeleted", { id }); // מאשר את המחיקה ללקוח
            } catch (err) {
                socket.emit("error", { message: "Failed to delete case", error: err });
            }
        });
    });
    


