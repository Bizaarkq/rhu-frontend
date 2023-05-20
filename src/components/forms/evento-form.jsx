import {
  Button,
  Grid,
  TextField,
  Typography,
  Autocomplete,
  Switch
} from "@mui/material";
import { Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import { useState, useEffect } from "react";
import EmpleadoService from "../../services/empleados";

const eventoSchema = Yup.object({
  dias: Yup.number().required("Campo requerido"),
  fecha: Yup.date().required("Campo requerido"),
  motivo: Yup.string().required("Campo requerido"),
  observaciones: Yup.string(),
  remunerado: Yup.boolean(),
  empleado: Yup.object()
    .nullable()
    .shape({
        value: Yup.string().required("Campo requerido"),
        label: Yup.string(),
    })
    .required("Campo requerido")
});

export default function EventoForm({
  onSubmit,
  labelSubmit,
  iconSubmit,
  evento,
  accion,
}) {
  const [empleados, setEmpleados] = useState([]);
  const [empleadoSelected, setEmpleadoSelected] = useState(evento ? evento.empleado : null);

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
    dias: evento ? evento.dias : "",
    fecha: evento ? moment(evento.fecha).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD"),
    motivo: evento ? evento.motivo : "",
    observaciones: evento ? evento.observaciones : "",
    remunerado: evento ? evento.remunerado : false,
    empleado: empleadoSelected
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
          resetForm
        }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Datos del evento
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  id="empleado"
                  options={empleados}
                  getOptionLabel={(option) => option.label}
                  isOptionEqualToValue={(option, value) =>  option.value === value.value}
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
                  label="Fecha de inicio"
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
              <Grid item xs={6}>
                <TextField
                  label="Días"
                  name="dias"
                  type="number"
                  value={values.dias}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.dias && Boolean(errors.dias)}
                  helperText={touched.dias && errors.dias}
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
              {values.dias > 3 && (
                <>
                  <Grid item xs={12} sx={{display:'flex'}}>
                    <Typography variant="body2">
                        ¿Días remunerados? (a partir del 4to día)
                    </Typography>
                    <Switch
                      label="Remunerado"
                      name="remunerado"
                      value={values.remunerado}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                </>
              )}
                <Grid item xs={12}> 
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        startIcon={iconSubmit}
                        disabled={ isSubmitting || !dirty || !isValid}
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
