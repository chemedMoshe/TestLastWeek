import { useEffect, useState } from "react";
import { socket } from "../main";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface Props{
    org:string,
    setOrg:React.Dispatch<React.SetStateAction<string>>;
}
export default function SelectGname({org,setOrg}:Props) {
    const [allOrganizations, setAllOrganizations] = useState<string[]>([]);

    useEffect(() => {
                socket.emit("getAllOrg")
                socket.on("sendOrg", (res: string[]) => setAllOrganizations(res));
            }, []);
    
  return (
    <div>
       <FormControl style={{ minWidth: 120 }}>
                <InputLabel id="to-year-label">All Org</InputLabel>
                <Select
                    labelId="all-org-label"
                    value={org||""}
                    onChange={(e) => setOrg(e.target.value)}
                    label="All Org"
                >
                    {allOrganizations?.map((organisation) => (
                        <MenuItem key={organisation} value={organisation||""}>
                            {organisation}
                        </MenuItem>

                    ))}
                </Select>
            </FormControl>
    </div>
  )
}
