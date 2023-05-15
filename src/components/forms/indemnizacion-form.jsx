import {
  Button,
  Grid,
  TextField,
  Typography,
  Autocomplete,
} from "@mui/material";
import { Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import EmpleadoService from "../../services/empleados";

const IndemnizacionSchema = Yup.object({
  empleado: Yup.object()
    .nullable()
    .shape({
        value: Yup.string().required("Campo requerido"),
        label: Yup.string(),
    })
    .required("Campo requerido")
});


export default function FormularioIndemnizacion({ indemnizacion = {}, onSubmit, labelSubmit, iconSubmit }) {
  const [empleados, setEmpleados] = useState([]);
  const [empleadoSelected, setEmpleadoSelected] = useState( indemnizacion.empleado || null);

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

  const initialValues = (indemnizacion) => ({
    empleado: empleadoSelected
  });

  const formik = useFormik({
    initialValues: initialValues(indemnizacion),
    validationSchema: IndemnizacionSchema,
    onSubmit: onSubmit,
  });

  return (
    <Formik>
      <Form 
        onSubmit={formik.handleSubmit} 
        onReset={formik.handleReset}>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            type="submit"
            onAbort={formik.handleSubmit}
            variant="contained"
            color="primary"
            disabled={formik.isSubmitting || !formik.dirty || !formik.isValid}
            endIcon={iconSubmit}
          >
            {labelSubmit}
          </Button>
        </Grid>
        <Grid
          sx={{
            display: "flex",
            gap: "20px",
          }}
        >
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            id="empleado"
            options={empleados}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) =>  option.value === value.value}
            value={formik.values.empleado}
            name="empleado"
            onChange={(event, newValue) => {
              setEmpleadoSelected(newValue);
              formik.setFieldValue("empleado", newValue);
            }}
            onBlur={formik.handleBlur}
            disabled={!indemnizacion}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Empleado"
                
                error={Boolean(formik.errors.empleado) && formik.touched.empleado}
                helperText={formik.touched.empleado && formik.errors.empleado}
              />
            )}
            renderOption={(props, option) => (
              <li {...props} key={option.value}>
                  <Typography variant="body2">{option.label}</Typography>
              </li>
            )}
          />
        </Grid>
      </Form>
    </Formik>
  );
}
