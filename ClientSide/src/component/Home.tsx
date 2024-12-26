import { Box, Button, Grid, Typography } from "@mui/material";

interface Props{
  setSelected: React.Dispatch<React.SetStateAction<string | null>>;
}
export default function Home({ setSelected}: Props) {
  const handleSelectChange = (event: string) => {
    setSelected(event);
  };

  const options = [
    { label: "Option 1", route: "/option1" },
    { label: "Option 2", route: "/option2" },
    { label: "Option 3", route: "/option3" },
    { label: "Option 4", route: "/option4" },
    { label: "Option 5", route: "/option5" },
    { label: "Option 6", route: "/option6" },
    { label: "CRAD", route: "/crad" },
  ];

  return (
    <div className="home">
      <div className="container">
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography sx={{ fontSize: "2rem", fontWeight: "bold", mb: 2, width: "100%", textAlign: "center" }}>
        Welcome to the Home Page
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {options.map((option, index) => (
          <Grid item key={index}  xs={0} sm={0} md={0}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={()=>handleSelectChange(option.label)}
              sx={{
              
                fontSize: "1rem",
                borderRadius: "8px",
              }}
            >
              {option.label}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
    </div>
    </div>
  )
}
