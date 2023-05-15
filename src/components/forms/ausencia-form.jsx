import {
  Button,
  Grid,
  TextField,
  Typography,
  Autocomplete,
  Switch,
} from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import { useState, useEffect } from "react";
import EmpleadoService from "../../services/empleados";

const eventoSchema = Yup.object({
  fecha: Yup.date().required("Campo requerido"),
  motivo: Yup.string().required("Campo requerido"),
  observaciones: Yup.string(),
  empleado: Yup.object()
    .nullable()
    .shape({
      value: Yup.string().required("Campo requerido"),
      label: Yup.string(),
    })
    .required("Campo requerido"),
});

export default function EventoForm({
  onSubmit,
  labelSubmit,
  iconSubmit,
  evento,
}) {
  const [empleados, setEmpleados] = useState([]);
  const [empleadoSelected, setEmpleadoSelected] = useState(
    evento ? evento.empleado : null
  );

  const fetchEmpleados = async () => {
    const response = await EmpleadoService.getAll();
    const empleadosMap = response.empleado.map((empleado) => {
      return {
        value: empleado._id,
        label:
          empleado.datos_personales.nombres +
          " " +
          empleado.datos_personales.apellidos,
      };
    });
    setEmpleados(empleadosMap);
  };

  useEffect(() => {
    fetchEmpleados();
  }, []);

  const initialValues = (evento) => ({
    fecha: evento
      ? moment(evento.fecha).format("YYYY-MM-DD")
      : moment().format("YYYY-MM-DD"),
    motivo: evento ? evento.motivo : "",
    observaciones: evento ? evento.observaciones : "",
    empleado: empleadoSelected,
  });

  return (
    <>
      <Formik
        initialValues={initialValues(evento)}
        validationSchema={eventoSchema}
        onSubmit={onSubmit}
      >
        {({
          errors,
          touched,
          values,
          setFieldValue,
          handleBlur,
          handleChange,
          isSubmitting,
          dirty,
          isValid,
          resetForm,
        }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Datos de la ausencia
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  id="empleado"
                  options={empleados}
                  getOptionLabel={(option) => option.label}
                  isOptionEqualToValue={(option, value) =>
                    option.value === value.value
                  }
                  value={values.empleado}
                  name="empleado"
                  onChange={(event, newValue) => {
                    setEmpleadoSelected(newValue);
                    setFieldValue("empleado", newValue);
                  }}
                  onBlur={handleBlur}
                  disabled={evento ? true : false}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Empleado"
                      error={Boolean(errors.empleado) && touched.empleado}
                      helperText={touched.empleado && errors.empleado}
                    />
                  )}
                  renderOption={(props, option) => (
                    <li {...props} key={option.value}>
                      <Typography variant="body2">{option.label}</Typography>
                    </li>
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Fecha"
                  name="fecha"
                  type="date"
                  value={values.fecha}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.fecha && Boolean(errors.fecha)}
                  helperText={touched.fecha && errors.fecha}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Motivo"
                  name="motivo"
                  type="text"
                  value={values.motivo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.motivo && Boolean(errors.motivo)}
                  helperText={touched.motivo && errors.motivo}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Observaciones"
                  name="observaciones"
                  type="text"
                  value={values.observaciones}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.observaciones && Boolean(errors.observaciones)}
                  helperText={touched.observaciones && errors.observaciones}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  startIcon={iconSubmit}
                  disabled={isSubmitting || !dirty || !isValid}
                >
                  {labelSubmit}
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
}
