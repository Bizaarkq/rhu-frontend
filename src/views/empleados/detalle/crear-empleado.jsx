import { Paper, Typography, Alert, Snackbar } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import FormularioEmpleado from "../../../components/forms/empleado-form";
import EmpleadoService from "../../../services/empleados";
import { useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";

export default function NuevoEmpleado() {
  const navigate = useNavigate();
  const [updated, setUpdated] = useState(false);
  const [failed, setFailed] = useState(false);

  const createEmpleado = useCallback(async (values) => {
    const response = await EmpleadoService.create(values);
    if (response.ok) {
      setUpdated(true);
      navigate("/empleados");
    }else{
      setFailed(true);
    }
  }, []);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setUpdated(false);
  };

  return (
    <>
      <Paper
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          padding: 2,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Nuevo Empleado
        </Typography>
        <FormularioEmpleado
          onSubmit={createEmpleado}
          labelSubmit="Crear"
          iconSubmit={<SaveIcon />}
        />
        <Snackbar open={updated} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Empleado actualizado con éxito
          </Alert>
        </Snackbar>
        <Snackbar open={failed} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Error al actualizar el empleado
          </Alert>
        </Snackbar>
      </Paper>
    </>
  );
}
