import CaseForm from "./FormForCrad";
import { socket } from "../main";
import { useState } from "react";

export default function CradComponent() {
  const [message, setMessage] = useState("");
  const handleSabmit = (data: any)=>{
    socket.emit("createCase",data)
    socket.on("caseCreated", (res: any) => setMessage(res.message))
  }
  return (
    <div className="crad">
      <div className="formCrad">
      <CaseForm onSubmit={(data) => handleSabmit(data)} />
        {message && <p>{message}</p>}
      </div>
    </div>
  )
}
