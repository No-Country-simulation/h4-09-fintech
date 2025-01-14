import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function BasicSelect() {
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 50 }}>
      <FormControl fullWidth>
        <InputLabel
          id="demo-simple-select-label"
          sx={{
            fontSize: "10px", // Tamaño de letra cuando está en su posición original
            "&.MuiInputLabel-shrink": {
              fontSize: "12px", // Tamaño de letra cuando se mueve arriba (activo)
            },
          }}
        >
          Filtros
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
          sx={{ width: 90, height: "5vh" }}
        >
          <MenuItem value={10}>dia</MenuItem>
          <MenuItem value={20}>mes</MenuItem>
          <MenuItem value={30}>año</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
