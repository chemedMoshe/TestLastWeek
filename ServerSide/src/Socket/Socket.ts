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
}) 