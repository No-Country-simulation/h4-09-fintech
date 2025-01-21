import * as React from "react";
import { Link } from "react-router-dom";
import "./AlertasInversion.css";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { styled } from "@mui/material/styles";
import check from "../../../../assets/svg/CHECK.svg";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch, { SwitchProps } from "@mui/material/Switch";

// Estilo personalizado para el switch
const MaterialUISwitch = styled(Switch)(({ theme, checked }) => ({
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
      "& .MuiSwitch-thumb:before": {
        // backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        //   "#fff"
        // )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "var(--color-primario)", // Color del track cuando está activado
        border: "solid 2px var(--color-primario)",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: checked ? "var(--color-fondo)" : "#94adb7", // Cambia el color según el estado
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
      // backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
      //   "#fff"
      // )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
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
    fontSize: "0.8rem",
  },
}));

export const AlertasInversion = () => {
  const [checked1, setChecked1] = React.useState(true);
  const [checked2, setChecked2] = React.useState(true);
  const [checked3, setChecked3] = React.useState(true);
  const [checked4, setChecked4] = React.useState(true);
  const [checked5, setChecked5] = React.useState(true);

  const handleChange1 = (event) => {
    setChecked1(event.target.checked);
  };
  const handleChange2 = (event) => {
    setChecked2(event.target.checked);
  };
  const handleChange3 = (event) => {
    setChecked3(event.target.checked);
  };
  const handleChange4 = (event) => {
    setChecked4(event.target.checked);
  };
  const handleChange5 = (event) => {
    setChecked5(event.target.checked);
  };

  return (
    <div className="container-alertas-inversion">
      <h1>
        <Link to="/notificaciones" className="link-rrdom">
          <ArrowLeftIcon className="iconos-hero flecha-izquierda" />
        </Link>
        <div>
          Progreso en tus alertas de inversión
          <p>
            Activa las alertas restantes para mejorar el monitoreo de tu
            portafolio.
          </p>
        </div>
      </h1>
      <FormGroup>
        <CustomFormControlLabel
          control={
            <MaterialUISwitch
              sx={{ m: 1 }}
              checked={checked1}
              onChange={handleChange1}
            />
          }
          label="Cambios en el mercado"
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
          label="Límite de pérdidas"
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
          label="Nuevas oportunidades"
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
          label="Revisión de portafolio"
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
          label="Actualización de bonos"
          labelPlacement="start"
        />
      </FormGroup>
    </div>
  );
};
