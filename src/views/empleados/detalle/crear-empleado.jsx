import { Paper, Typography } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import FormularioEmpleado from "../../../components/forms/empleado-form";

export default function NuevoEmpleado() {
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
          onSubmit={async (values) => {
            const response = await EmpleadoService.create(values);
            if (response.ok) {
              redirect("/empleados");
            }
          }}
          labelSubmit="Crear"
          iconSubmit={<SaveIcon />}
        />
      </Paper>
    </>
  );
}
