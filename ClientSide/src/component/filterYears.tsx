import { useEffect, useState } from "react";
import { socket } from "../main";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface Props {
    yearForGname: number
    setYearForGname: React.Dispatch<React.SetStateAction<number>>
    org:string
    setOrg:React.Dispatch<React.SetStateAction<string>>
}
export default function FilterYears({ setYearForGname,yearForGname ,org, setOrg}: Props) {
    const [year, setYear] = useState<number[]>();
    const [allOrganizations, setAllOrganizations] = useState<string[]>([]);
    useEffect(() => {
            socket.emit('getAllYears');
            socket.on('sendYears', (res: number[]) => setYear(res));
            socket.emit("getAllOrg",yearForGname)
            socket.on("sendOrg", (res: string[]) => setAllOrganizations(res));
        }, [yearForGname]);
            
  return (
    <div>
      <FormControl style={{ minWidth: 120 }}>
                <InputLabel id="from-year-label">From Year</InputLabel>
                <Select
                    labelId="from-year-label"
                    value={yearForGname||""}
                    onChange={(e) => setYearForGname(+e.target.value)}
                    label="From Year"
                >
                    {year?.sort((a, b) => a - b).map((year) => (
                        <MenuItem key={year} value={year||""}>
                            {year}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl style={{ minWidth: 120 }}>
                <InputLabel id="to-year-label">All Org</InputLabel>
                <Select
                    labelId="all-org-label"
                    value={org||""}
                    onChange={(e) => setOrg(e.target.value)}
                    label="All Org"
                >
                    <MenuItem value={""}>All</MenuItem>
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
