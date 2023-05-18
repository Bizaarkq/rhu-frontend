import EmpleadoService from "../../services/empleados";
import DynamicTable from "../../components/tables/dynCollTable";
import { useState, useEffect } from "react";
import {
  Grid,
  Button,
  IconButton,
  Typography,
  Alert,
  Snackbar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Visibility } from "@mui/icons-material";
import { Link, useLoaderData } from "react-router-dom";
import moment from "moment";

const columns = [
  { id: "codigo", label: "Código", minWidth: 100 },
  { id: "nombres", label: "Nombres", minWidth: 100 },
  { id: "apellidos", label: "Apellidos", minWidth: 100 },
  { id: "cargo", label: "Cargo", minWidth: 50 },
  { id: "telefono", label: "Teléfono", minWidth: 100 },
  { id: "estado", label: "Estado", minWidth: 50 },
];

const subColumns = [
  { id: "fecha", label: "Fecha", minWidth: 100 },
  { id: "correlativo", label: "Correlativo", minWidth: 100 },
  { id: "salario_quincenal", label: "Salario a pagar", minWidth: 100 },
  { id: "incapacidad", label: "Incapacidad", minWidth: 100 },
  { id: "vacacion", label: "Vacaciones", minWidth: 100 },
  { id: "otros_ingresos", label: "Otros Ingresos", minWidth: 100 },
  { id: "isss", label: "ISSS", minWidth: 100 },
  { id: "afp", label: "AFP", minWidth: 100 },
  { id: "renta", label: "Renta", minWidth: 100 },
  { id: "otros_descuentos", label: "Otros Descuentos", minWidth: 100 },
  { id: "descuentos_ciclicos", label: "Descuentos Cíclicos", minWidth: 100 },
  { id: "total", label: "Total", minWidth: 100 },
];

const subColumnActions = [
  {
    id: "ver",
    label: "Ver",
    icon: <Visibility />,
    color: "secundary",
    path: "/boletas",
    accion: "ver",
  },
];

const subColumnsKey = "pagos";

const actions = [
  {
    id: "ver",
    label: "Ver",
    icon: <Visibility />,
    color: "secundary",
    path: "/empleados",
    accion: "ver",
  },
];

export async function loader() {
  const response = await EmpleadoService.boletas();
  const empleados = response.empleados.map((empleado) => {
    return {
      id: empleado._id,
      codigo: empleado.codigo,
      nombres: empleado.datos_personales.nombres,
      apellidos: empleado.datos_personales.apellidos,
      cargo: empleado.datos_laborales.cargo.plaza,
      telefono: empleado.datos_personales.telefono,
      estado: empleado.estado,
      pagos: empleado.pagos.map((pago) => {
        return {
          ...pago,
          fecha: moment(pago.fecha).format("DD/MM/YYYY"),
        };
      }),
    };
  });
  return { empleados };
}

export default function ListEmpleados() {
  const { empleados } = useLoaderData();
  const [ generadasLabel, setGeneradasLabel ] = useState("Generar Boletas de Pago");
  const [ generar, setGenerar ] = useState(false);

  const genBoletasHandler = async () => {
    let response = await EmpleadoService.generarBoletas();
    console.log(response);
    setGeneradasLabel(response.message);
    setGenerar(true);
  };

  const handleClose = (event, reason) => {
    setGenerar(false);
    if (reason === "clickaway") return;
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
          Boletas de Pago
        </Typography>
        <Button
          onClick={genBoletasHandler}
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
        >
          Generar Boletas de Pago
        </Button>
      </Grid>

      <DynamicTable
        columns={columns}
        subColumns={subColumns}
        subColumnsKey={subColumnsKey}
        rows={empleados}
        actions={actions}
        subColumnActions={subColumnActions}
        page={0}
        setPage={0}
        rowsPerPage={10}
        setRowsPerPage={10}
        totalRows={empleados.length}
      />

      <Snackbar
        open={generar}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {generadasLabel}
        </Alert>
      </Snackbar>
    </>
  );
}
