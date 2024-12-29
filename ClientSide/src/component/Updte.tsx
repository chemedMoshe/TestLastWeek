import { useState } from "react";
import { socket } from "../main";

export default function Update() {
    const [cases, setCases] = useState<any[]|null>(null);
    socket.emit("getAllCases");
    socket.on("sendCases", (res: any) => setCases(res));

    return (
        <div className="deleteOrUpdate">
            {cases && cases.map((e: any) => (<div className="card" key={e._id}>{e._id} <button>Update</button></div>))}
        </div>
    );
}
