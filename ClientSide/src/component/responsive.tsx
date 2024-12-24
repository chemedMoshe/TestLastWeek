import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { DisplayEnum } from '../Types/Display';

interface Props {
  setDisplay: React.Dispatch<React.SetStateAction<DisplayEnum>>;
  setSelected: React.Dispatch<React.SetStateAction<string | null>>;
  selected: string
}

function ResponsiveAppBar({ setDisplay, setSelected, selected }: Props) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [view, setView] = React.useState<DisplayEnum | string>("grafs");
  const [option, setOption] = React.useState('Select');


  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleViewChange = () => {
    setView(view === DisplayEnum.MAPS ? DisplayEnum.GRAFS : DisplayEnum.MAPS);
    setDisplay(view as DisplayEnum);
  };

  const handleSelectChange = (event: string) => {
    setSelected(event);
    setOption(event);
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            INTEL MAP
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              <MenuItem>
                <Select
                  sx={{ color: "black" }}
                  labelId="demo-select-label"
                  id="demo-select"
                  value={option}
                  onChange={(e) => handleSelectChange(e.target.value)}
                  autoWidth
                >
                  <MenuItem value="Select" defaultChecked>Select</MenuItem>
                  <MenuItem value="Option 1">Option 1</MenuItem>
                  <MenuItem value="Option 2">Option 2</MenuItem>
                  <MenuItem value="Option 3">Option 3</MenuItem>
                  <MenuItem value="Option 4">Option 4</MenuItem>
                  <MenuItem value="Option 5">Option 5</MenuItem>
                  <MenuItem value="Option 6">Option 6</MenuItem>
                </Select>
              </MenuItem>
            </Menu>
          </Box>

          {selected === "Option 4" && <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant={'contained'}
              color="primary"
              onClick={() => handleViewChange()}
              sx={{ mr: 1 }}
            >
              {view}
            </Button>

          </Box>
          }
          <FormControl sx={{ minWidth: 10, margin: 1, border: "hidden", ":hover": { border: "hidden" } }}>
            <InputLabel
              sx={{ color: "white" }}
              id="demo-select-label">Options</InputLabel>
            <Select
              sx={{ color: "white" }}
              labelId="demo-select-label"
              id="demo-select"
              value={option}
              onChange={(e) => handleSelectChange(e.target.value)}
              autoWidth
            >
              <MenuItem value="Select" defaultChecked>Select</MenuItem>
              <MenuItem value="Option 1">Option 1</MenuItem>
              <MenuItem value="Option 2">Option 2</MenuItem>
              <MenuItem value="Option 3">Option 3</MenuItem>
              <MenuItem value="Option 4">Option 4</MenuItem>
              <MenuItem value="Option 5">Option 5</MenuItem>
              <MenuItem value="Option 6">Option 6</MenuItem>
            </Select>
          </FormControl>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
