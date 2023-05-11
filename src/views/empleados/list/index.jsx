import EmpleadoService from "../../../services/empleados";
import DynamicTable from "../../../components/tables/dynamictable";
import { useState, useEffect } from "react";
import { Grid, Button, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

const columns = [
  { id: "codigo", label: "Código", minWidth: 100 },
  { id: "nombres", label: "Nombres", minWidth: 170 },
  { id: "apellidos", label: "Apellidos", minWidth: 100 },
  { id: "cargo", label: "Cargo", minWidth: 100 },
  { id: "telefono", label: "Teléfono", minWidth: 100 },
];

const actions = [
  {
    id: "ver",
    label: "Ver",
    icon: "visibility",
    color: "secundary",
    path: "/empleados",
    accion: "ver",
  },
  {
    id: "editar",
    label: "Editar",
    icon: "edit",
    color: "secundary",
    path: "/empleados",
    accion: "editar",
  },
];

export default function ListEmpleados() {
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    retrieveEmpleados();
  }, []);

  const retrieveEmpleados = () => {
    EmpleadoService.getAll()
      .then((response) => {
        setEmpleados(
          response.empleado.map((empleado) => {
            return {
              id: empleado._id,
              codigo: empleado.codigo,
              nombres: empleado.datos_personales.nombres,
              apellidos: empleado.datos_personales.apellidos,
              cargo: empleado.datos_laborales.cargo.plaza,
              telefono: empleado.datos_personales.telefono,
            };
          })
        );
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <Grid
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
          height: "100%",
        }}
      >
        <Typography variant="h5" gutterBottom>
            Empleados
        </Typography>
        
        <Link to="/empleados/crear">
        <Button variant="contained" color="primary" startIcon={<AddIcon/>}>
          Agregar
        </Button>
        </Link>
        
      </Grid>

      <DynamicTable
        columns={columns}
        rows={empleados}
        actions={actions}
        page={0}
        setPage={0}
        rowsPerPage={10}
        setRowsPerPage={10}
        totalRows={empleados.length}
      />
    </>
  );
}
