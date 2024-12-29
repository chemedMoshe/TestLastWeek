import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

const CaseForm: React.FC<{ onSubmit: (data: any) => void }> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    iyear: "",
    imonth: "",
    iday: "",
    country_txt: "",
    region_txt: "",
    city: "",
    latitude: "",
    longitude: "",
    attacktype1_txt: "",
    targtype1_txt: "",
    target1: "",
    gname: "",
    nkill: "",
    nwound: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      iyear: "",
      imonth: "",
      iday: "",
      country_txt: "",
      region_txt: "",
      city: "",
      latitude: "",
      longitude: "",
      attacktype1_txt: "",
      targtype1_txt: "",
      target1: "",
      gname: "",
      nkill: "",
      nwound: "",
    });
  };

  return (
    <Box
      component="form"
      noValidate
      sx={{
        maxWidth: "100%",
        width: 500,
        margin: "5% auto",
        padding: 3,
        backgroundColor: "#f5f5f5",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        "@media (max-width: 600px)": {
          padding: 2,
        },
      }}
    >
      <Typography variant="h5" sx={{ mb: 2, color: "#333", textAlign: "center" }}>
        Create New Case
      </Typography>
      {[
        { name: "iyear", label: "Year" },
        { name: "imonth", label: "Month" },
        { name: "iday", label: "Day" },
        { name: "country_txt", label: "Country" },
        { name: "region_txt", label: "Region" },
        { name: "city", label: "City" },
        { name: "latitude", label: "Latitude", type: "number" },
        { name: "longitude", label: "Longitude", type: "number" },
        { name: "attacktype1_txt", label: "Attack Type" },
        { name: "targtype1_txt", label: "Target Type" },
        { name: "target1", label: "Target" },
        { name: "gname", label: "Group Name" },
        { name: "nkill", label: "Number Killed", type: "number" },
        { name: "nwound", label: "Number Wounded", type: "number" },
      ].map(({ name, label, type = "text" }) => (
        <Box key={name} sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            name={name}
            label={label}
            type={type}
            value={(formData as any)[name]}
            onChange={handleChange}
            fullWidth
            variant="standard"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#ddd",
                },
                "&:hover fieldset": {
                  borderColor: "#555",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#2196f3",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#666",
                fontWeight: 500,
              },
              "& .Mui-focused": {
                color: "#2196f3",
              },
            }}
            required
          />
        </Box>
      ))}
      <Button
        type="submit"
        variant="contained"
        onClick={handleSubmit}
        fullWidth
        sx={{
          marginTop:"3%",
          backgroundColor: "#2196f3",
          color: "#fff",
          fontWeight: "bold",
          textTransform: "uppercase",
          "&:hover": {
            backgroundColor: "#1e88e5",
          },
        }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default CaseForm;
