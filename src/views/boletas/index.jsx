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
  TextField,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Visibility } from "@mui/icons-material";
import { Link, useLoaderData } from "react-router-dom";
import moment from "moment";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { MESES, QUINCENA } from "../../services/constantes";

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
  { id: "ingresos_no_gravados", label: "Ingresos no gravados", minWidth: 100 },
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

const boletaSchema = Yup.object().shape({
  anio: Yup.number().required("El anio es requerida"),
  mes: Yup.number().required("El mes es requerido"),
  quincena: Yup.number().required("La quincena es requerida"),
});

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

  const [listado, setListado] = useState(empleados);
  const [generadasLabel, setGeneradasLabel] = useState(
    "Generar Boletas de Pago"
  );
  const [generar, setGenerar] = useState(false);

  const genBoletasHandler = async (values) => {
    let response = await EmpleadoService.generarBoletas(values);
    setGeneradasLabel(response.message);
    setGenerar(true);
  };

  const fetchListado = async () => {
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
    setListado(empleados);
  };

  useEffect(() => {
    fetchListado();
  }, [generar]);

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
        <Grid>
          <Formik
            initialValues={{
              anio: moment().year(),
              mes: 1,
              quincena: 1,
            }}
            validationSchema={boletaSchema}
            onSubmit={genBoletasHandler}
          >
            {({
              errors,
              handleChange,
              touched,
              values,
              isSubmitting,
              isValid,
              dirty,
            }) => (
              <Form>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={3}>
                    <Typography variant="body1" component="h6">
                      Año
                    </Typography>
                    <TextField
                      type="number"
                      name="anio"
                      variant="outlined"
                      value={values.anio}
                      fullWidth
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <InputLabel>Mes</InputLabel>
                    <Select
                      fullWidth
                      name="mes"
                      value={values.mes}
                      onChange={handleChange}
                    >
                      {Object.keys(MESES).map((keys) => (
                        <MenuItem key={keys} value={keys}>
                          {MESES[keys]}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <InputLabel>Quincena</InputLabel>
                    <Select
                      fullWidth
                      name="quincena"
                      value={values.quincena}
                      onChange={handleChange}
                    >
                      {Object.keys(QUINCENA).map((keys) => (
                        <MenuItem key={keys} value={keys}>
                          {QUINCENA[keys]}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<AddIcon />}
                      type="submit"
                    >
                      Generar Boletas
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>

      <DynamicTable
        columns={columns}
        subColumns={subColumns}
        subColumnsKey={subColumnsKey}
        rows={listado}
        actions={actions}
        subColumnActions={subColumnActions}
        page={0}
        setPage={0}
        rowsPerPage={10}
        setRowsPerPage={10}
        totalRows={listado.length}
      />

      <Snackbar open={generar} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {generadasLabel}
        </Alert>
      </Snackbar>
    </>
  );
}
