import { useState } from "react";
import { socket } from "../main";

export default function Delete() {
    const [cases, setCases] = useState<any[]|null>(null);
    socket.emit("getAllCases");
    socket.on("sendCases", (res: any) => setCases(res));

    return (
        <div className="deleteOrUpdate">
            {cases && cases.map((e: any) => (<div className="card" key={e._id}>City: {e.city}  Gname: {e.gname} <button>Delete</button></div>))}
        </div>
    );
}