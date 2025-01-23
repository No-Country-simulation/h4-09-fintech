import React, { useState, useEffect } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";

// Estilo personalizado para el switch
const MaterialUISwitch = styled(Switch)({
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
});

// Estilo personalizado para el FormControlLabel
const CustomFormControlLabel = styled(FormControlLabel)({
  "& .MuiFormControlLabel-label": {
    fontFamily: "Poppins", // Cambia aquí la fuente
    fontWeight: 400, // Ajusta el grosor si lo necesitas
    fontSize: "0.7rem",
  },
});

export const Categorias = () => {
  // Recuperar el estado desde localStorage o establecer un valor por defecto
  const getCheckedState = (key: string) =>
    JSON.parse(localStorage.getItem(key) || "false");

  const [checked1, setChecked1] = useState(getCheckedState("checked1"));
  const [checked2, setChecked2] = useState(getCheckedState("checked2"));
  const [checked3, setChecked3] = useState(getCheckedState("checked3"));
  const [checked4, setChecked4] = useState(getCheckedState("checked4"));
  const [checked5, setChecked5] = useState(getCheckedState("checked5"));

  // Manejadores de cambio y actualización en localStorage
  const handleChange =
    (setChecked: React.Dispatch<React.SetStateAction<boolean>>, key: string) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = event.target.checked;
      setChecked(newChecked);
      localStorage.setItem(key, JSON.stringify(newChecked)); // Guardar en localStorage
    };

  return (
    <FormGroup>
      <CustomFormControlLabel
        control={
          <MaterialUISwitch
            sx={{ m: 1 }}
            checked={checked1}
            onChange={handleChange(setChecked1, "checked1")}
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
            onChange={handleChange(setChecked2, "checked2")}
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
            onChange={handleChange(setChecked3, "checked3")}
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
            onChange={handleChange(setChecked4, "checked4")}
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
            onChange={handleChange(setChecked5, "checked5")}
          />
        }
        label="Metales preciosos"
        labelPlacement="start"
      />
    </FormGroup>
  );
};
