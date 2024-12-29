import CaseForm from "./FormForCrad";
import { socket } from "../main";
import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Delete from "./Delete";
import Update from "./Updte";

export default function CradComponent() {
  const [message, setMessage] = useState("");
  const [choose, setChoose] = useState("");
  const navigage = useNavigate();
 
  const handleChange = (event: any) => {
    setChoose(event.target.value);
    navigage(event.target.value === "create" ? "/crad/create" : event.target.value === "delete" ? "/crad/delete" : "/crad/update");
    
  }
  const handleSabmit = (data: any)=>{
    socket.emit("createCase",data)
    socket.on("caseCreated", (res: any) => setMessage(res.message))
  }
  return (
    <div className="crad">
      <select value={choose} onChange={handleChange}>
        <option value="/">Select</option>
        <option value="create">Create</option>
        <option value="delete">Delete</option>
        <option value="update">Update</option>
      </select>
      <div className="formCrad">
        <Routes>
          <Route path="/create"  element={ <CaseForm onSubmit={(data) => handleSabmit(data)} />} />
          <Route path="/delete"  element={ <Delete />} />
          <Route path="/update"  element={ <Update />} />
        </Routes>
        {message && <p>{message}</p>}
      </div>
    </div>
  )
}
