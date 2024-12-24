import React, { useEffect, useState } from 'react';
import { Drawer, FormControlLabel, FormGroup, Switch, Button, Box, Typography } from '@mui/material';
import { socket } from '../main';

interface Props {
  options: string[] | null[];
  setOptions: React.Dispatch<React.SetStateAction<string[] | null[]>>;
}

export default function Filtering({ setOptions, options }: Props) {
  const [types, setTypes] = useState<string[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  useEffect(() => {
    socket.emit('getTypes');
    socket.on('sendTypes', (res: string[]) => setTypes(res));

    return () => {
      socket.off('sendTypes');
    };
  }, []);

  const handleChange = (newOption: string) => {
    setOptions([newOption, ...options.filter(x => x != null)]);
  };

  const handleChangeOutOptions = (newOption: string) => {
    setOptions(options.filter(x => x != null).filter(x => x !== newOption));
  };

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.checked) {
      handleChangeOutOptions(e.target.name);
    } else {
      handleChange(e.target.name);
    }
  };

  return (
    <>
      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsDrawerOpen(true)}
        >
          Open Filters
        </Button>
      </Box>

      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box
          sx={{
            width: 300,
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Typography variant="h6" textAlign="center">
            Filter Options
          </Typography>
          <FormGroup>
            {types.map((x) => (
              <FormControlLabel
                key={x}
                control={
                  <Switch
                    name={x}
                    checked={options.includes(x)}
                    onChange={handleSwitchChange}
                    color="primary"
                  />
                }
                label={x}
              />
            ))}
          </FormGroup>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setIsDrawerOpen(false)}
          >
            Close
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
