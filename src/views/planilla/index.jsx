import EmpleadoService from "../../services/empleados";
import DynamicTable from "../../components/tables/dynamictable";
import { useState } from "react";
import {
  Grid,
  Button,
  Typography,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import DownloadIcon from "@mui/icons-material/Download";
import { Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import { MESES, QUINCENA } from "../../services/constantes";
import moment from "moment";

const columns = [
  { id: "codigo", label: "Código", minWidth: 100 },
  { id: "nombre", label: "Nombre", minWidth: 100 },
  { id: "salario_mensual", label: "Salario Mensual", minWidth: 100 },
  { id: "dias_trabajados", label: "Días Trabajados", minWidth: 100 },
  { id: "incapacidad_dias", label: "Días de Incapacidad", minWidth: 100 },
  { id: "incapacidad_obligatorio", label: "Incapacidad", minWidth: 100 },
  {
    id: "incapacidad_remunerado",
    label: "Incapacidad sin descuento",
    minWidth: 100,
  },
  { id: "ausencias_dias", label: "Días de Ausencias", minWidth: 100 },
  { id: "ausencias", label: "Ausencias", minWidth: 100 },
  { id: "salario_quincenal", label: "Salario Quincenal", minWidth: 100 },
  { id: "vacacion", label: "Vacación", minWidth: 100 },
  { id: "otros_ingresos", label: "Otros Ingresos", minWidth: 100 },
  { id: "ingresos_no_gravados", label: "Ingresos No Gravados", minWidth: 100 },
  { id: "salario_bruto", label: "Salario Bruto", minWidth: 100 },
  {
    id: "ss_base_calculo",
    label: "Base de Cálculo para Seguro Social",
    minWidth: 100,
  },
  { id: "insaforp", label: "INSAFORP", minWidth: 100 },
  { id: "isss", label: "ISSS", minWidth: 100 },
  { id: "isss_patrono", label: "ISSS Patrono", minWidth: 100 },
  { id: "afp", label: "AFP", minWidth: 100 },
  { id: "afp_patrono", label: "AFP Patrono", minWidth: 100 },
  { id: "isr_base_calculo", label: "Base de Cálculo para ISR", minWidth: 100 },
  { id: "renta", label: "Renta", minWidth: 100 },
  { id: "renta_devolucion", label: "Devolución de Renta", minWidth: 100 },
  { id: "descuentos_ciclicos", label: "Descuentos Cíclicos", minWidth: 100 },
  { id: "otros_descuentos", label: "Otros Descuentos", minWidth: 100 },
  { id: "salario_neto", label: "Salario Neto", minWidth: 100 },
  { id: "cargo", label: "Cargo", minWidth: 100 },
  { id: "departamento", label: "Departamento", minWidth: 100 },
];

const searchSchema = Yup.object().shape({
  mes: Yup.number().required("Requerido"),
  year: Yup.number().required("Requerido"),
  quincena: Yup.number().required("Requerido"),
});

export default function Planillas() {
  const [planilla, setPlanilla] = useState([]);
  const [mes, setMes] = useState(1);
  const [year, setYear] = useState(moment().year());
  const [quincena, setQuincena] = useState(1);
  const [totales, setTotales] = useState({});

  const [notFound, setNotFound] = useState(false);

  const handleSearch = async (values, { setSubmitting }) => {
    setTotales({});
    EmpleadoService.getPlanilla(mes, year, quincena).then((res) => {
      if (res.ok) {
        setNotFound(res.empleados.length === 0);
        if (res.empleados.length === 0) return;
        setPlanilla(res.empleados);
        setTotales(res.totales);
      } else {
        setPlanilla([]);
      }
    });
  };

  const handleDownload = async () => {
     EmpleadoService.downloadPlanilla(
      mes,
      year,
      quincena
    );
    
  };

  const initialValues = {
    mes: 0,
    year: 0,
    quincena: 0,
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
        <Grid>
          <Formik
            initialValues={initialValues}
            validationSchema={searchSchema}
            onSubmit={handleSearch}
          >
            {({ errors, touched, values, isSubmitting, isValid, dirty }) => (
              <Form>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={3}>
                    <Typography variant="body1" component="h6">
                      Año
                    </Typography>
                    <TextField
                      type="number"
                      name="year"
                      label="Año"
                      variant="outlined"
                      fullWidth
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <InputLabel>Mes</InputLabel>
                    <Select
                      fullWidth
                      name="mes"
                      value={mes}
                      onChange={(e) => setMes(e.target.value)}
                    >
                      {Object.keys(MESES).map((keys) => (
                        <MenuItem key={keys} value={keys} name="mes">
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
                      value={quincena}
                      onChange={(e) => setQuincena(e.target.value)}
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
                      sizer="large"
                      startIcon={<FindInPageIcon />}
                      type="submit"
                      sx={{ height: "100%" }}
                      disabled={isSubmitting || !isValid}
                    >
                      Buscar
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>

      <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" component="h6">
          Planilla
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sizer="large"
          startIcon={<DownloadIcon />}
          sx={{ height: "100%" }}
          onClick={handleDownload}
        >
          Descargar
        </Button>
      </Grid>

      <br />
      {planilla.length === 0 && (
        <Paper sx={{ padding: "10px" }}>
          <Typography variant="body1" component="h6">
            {notFound
              ? "No se encontraron boletas"
              : "Ingrese una fecha para buscar la planilla"}
          </Typography>
        </Paper>
      )}

      {planilla.length > 0 && (
        <>
          <DynamicTable
            columns={columns}
            rows={planilla}
            page={0}
            setPage={0}
            rowsPerPage={10}
            setRowsPerPage={10}
            totalRows={planilla.length}
          />
          <br />
          <Paper>
            <Typography variant="h6" component="h6">
              Totales de la Planilla de Salarios
            </Typography>
            {Object.keys(totales).map((key) => (
              <Typography key={key} variant="body1" component="h6">
                {columns.find((col) => col.id === key).label}: {totales[key]}
              </Typography>
            ))}
          </Paper>
        </>
      )}
    </>
  );
}
