import React, { useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";

// Estilo personalizado para el switch
const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translate(8px,8px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translate(30px,8px)",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "var(--color-primario)", // Color del track cuando está activado
        border: "solid 2px var(--color-primario)",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: "#94adb7",
    width: 20,
    height: 20,
    "&::before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: "var(--color-fondo)", // Color del track cuando está desactivado
    borderRadius: 20 / 2,
    border: "solid #94adb7 2px",
  },
}));

// Estilo personalizado para el FormControlLabel
const CustomFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  "& .MuiFormControlLabel-label": {
    fontFamily: "Poppins", // Cambia aquí la fuente
    fontWeight: 400, // Ajusta el grosor si lo necesitas
    fontSize: "0.7rem",
  },
}));

export const Categorias = () => {
  // Estados para cada switch
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [checked5, setChecked5] = useState(false);

  // Manejadores de cambio
  const handleChange1 = (event) => setChecked1(event.target.checked);
  const handleChange2 = (event) => setChecked2(event.target.checked);
  const handleChange3 = (event) => setChecked3(event.target.checked);
  const handleChange4 = (event) => setChecked4(event.target.checked);
  const handleChange5 = (event) => setChecked5(event.target.checked);

  return (
    <FormGroup>
      <CustomFormControlLabel
        control={
          <MaterialUISwitch
            sx={{ m: 1 }}
            checked={checked1}
            onChange={handleChange1}
          />
        }
        label="Acciones ( Cedears)"
        labelPlacement="start"
      />
      <CustomFormControlLabel
        control={
          <MaterialUISwitch
            sx={{ m: 1 }}
            checked={checked2}
            onChange={handleChange2}
          />
        }
        label="Bonos"
        labelPlacement="start"
      />
      <CustomFormControlLabel
        control={
          <MaterialUISwitch
            sx={{ m: 1 }}
            checked={checked3}
            onChange={handleChange3}
          />
        }
        label="ETFs"
        labelPlacement="start"
      />
      <CustomFormControlLabel
        control={
          <MaterialUISwitch
            sx={{ m: 1 }}
            checked={checked4}
            onChange={handleChange4}
          />
        }
        label="Fondos comunes"
        labelPlacement="start"
      />
      <CustomFormControlLabel
        control={
          <MaterialUISwitch
            sx={{ m: 1 }}
            checked={checked5}
            onChange={handleChange5}
          />
        }
        label="Metales preciosos"
        labelPlacement="start"
      />
    </FormGroup>
  );
};
