import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useEffect, useState } from 'react';
import { socket } from '../main';
interface Props {
    setFromYear: React.Dispatch<React.SetStateAction<number|undefined>>;
    setToYear: React.Dispatch<React.SetStateAction<number|undefined>>;
    fromYear?: number;
    toYear?: number;
}

export default function FilteringYears({ fromYear, toYear, setFromYear, setToYear }: Props) {
    const [years, setYears] = useState<number[]|null>(null);
    

    useEffect(() => {
        socket.emit('getAllYears');
        socket.on('sendYears', (res: number[]) => setYears(res));
        
    }, []);

    return (
        <div style={{ display: 'flex', gap: '1rem' }}>
            <FormControl style={{ minWidth: 120 }}>
                <InputLabel id="from-year-label">From Year</InputLabel>
                <Select
                    labelId="from-year-label"
                    value={fromYear||""}
                    onChange={(e) => setFromYear(+e.target.value)}
                    label="From Year"
                >
                    {years?.sort((a, b) => a - b).map((year) => (
                        <MenuItem key={year} value={year||""}>
                            {year}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl style={{ minWidth: 120 }}>
                <InputLabel id="to-year-label">To Year</InputLabel>
                <Select
                    labelId="to-year-label"
                    value={toYear||""}
                    onChange={(e) => setToYear(+e.target.value)}
                    label="To Year"
                >
                    {years?.sort((a, b) => b - a).filter((year) => year > fromYear!).map((year) => (
                        <MenuItem key={year} value={year||""}>
                            {year}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
