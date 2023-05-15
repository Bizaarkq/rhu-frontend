import { Paper, Typography, Alert, Snackbar } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import FormularioIndemnizacion from "../../../components/forms/indemnizacion-form";
import IndemnizacionesService from "../../../services/indemnizaciones";
import { useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";

export default function NuevoEmpleado() {
  const navigate = useNavigate();
  const [updated, setUpdated] = useState(false);
  const [failed, setFailed] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const createIndemnizacion = useCallback(async (values) => {
    try {
      const indemnizacion = await IndemnizacionesService.create(values);
      setUpdated(true);
      navigate("/indemnizaciones");
    } catch (error) {
      console.log(error);
      setFailed(true);
      setErrorMsg(error.response.data.message);
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
          Nueva Indemnización
        </Typography>
        <FormularioIndemnizacion
          onSubmit={createIndemnizacion}
          labelSubmit="Crear"
          iconSubmit={<SaveIcon />}
        />
        <Snackbar open={updated} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Indeminización actualizada con éxito
          </Alert>
        </Snackbar>
        <Snackbar open={failed} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {errorMsg}
          </Alert>
        </Snackbar>
      </Paper>
    </>
  );
}
