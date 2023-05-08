import {
  Button,
  Grid,
  TextField,
  Typography,
  Autocomplete,
} from "@mui/material";
import { Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import { useState, useEffect } from "react";
import { getPlazas } from "../../services/catalogos";

const EmpleadoSchema = Yup.object().shape({
  datos_personales: Yup.object().shape({
    nombres: Yup.string().required("Requerido"),
    apellidos: Yup.string().required("Requerido"),
    fecha_nacimiento: Yup.date().required("Requerido"),
    sexo: Yup.string().required("Requerido"),
    estado_civil: Yup.string().required("Requerido"),
    nacionalidad: Yup.string().required("Requerido"),
    dui: Yup.string()
      .matches(/^\d{8}-\d$/, "Escriba el DUI incluyendo el guión (-)")
      .required("Requerido"),
    direccion: Yup.string().required("Requerido"),
    telefono: Yup.string().required("Requerido"),
    correo: Yup.string()
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        "Escriba un correo electrónico válido"
      )
      .required("Requerido"),
  }),
  datos_laborales: Yup.object().shape({
    cargo: Yup.object().nullable().shape({
      value: Yup.string().required('El campo value es requerido'),
      label: Yup.string()
    }).required("Requerido"),
    tipo_contrato: Yup.string().required("Requerido"),
    fecha_ingreso: Yup.date().required("Requerido"),
  }),
  datos_bancarios: Yup.object().shape({
    banco: Yup.string().required("Requerido"),
    cuenta: Yup.string().required("Requerido"),
    tipo_cuenta: Yup.string().required("Requerido"),
  }),
  datos_afiliacion: Yup.object().shape({
    isss: Yup.string().required("Requerido"),
    afp: Yup.object().shape({
      afiliacion: Yup.string().required("Requerido"),
      numero: Yup.string().required("Requerido"),
    }),
  }),
});


export default function FormularioEmpleado({ empleado = {}, onSubmit, labelSubmit, iconSubmit }) {

  const [plazas, setPlazas] = useState([]);
  const [ plazaSeleccionada, setPlazaSeleccionada ] = useState({ value: empleado.cargo?._id || "", label: empleado.cargo?.plaza || "" });

  const fetchPlazas = async () => {
    const response = await getPlazas();
    const plazasMap = response.plazas.map((plaza) => ({
      value: plaza._id,
      label: plaza.plaza,
      departamento: plaza.departamento.nombre,
    }));

    setPlazas(
      plazasMap
    );
  };

  useEffect(() => {
    fetchPlazas();
  }, []);

  const initialValues = (empleado) => ({
    datos_personales: {
      nombres: empleado.nombres || "",
      apellidos: empleado.apellidos || "",
      fecha_nacimiento:
        moment(empleado.fecha_nacimiento).format("YYYY-MM-DD") || "",
      sexo: empleado.sexo || "",
      estado_civil: empleado.estado_civil || "",
      nacionalidad: empleado.nacionalidad || "",
      dui: empleado.dui || "",
      direccion: empleado.direccion || "",
      telefono: empleado.telefono || "",
      correo: empleado.correo || "",
    },
    datos_laborales: {
      cargo: plazaSeleccionada || "",
      tipo_contrato: empleado.tipo_contrato || "",
      fecha_ingreso: moment(empleado.fecha_ingreso).format("YYYY-MM-DD") || "",
    },
    datos_bancarios: {
      banco: empleado.banco || "",
      cuenta: empleado.cuenta || "",
      tipo_cuenta: empleado.tipo_cuenta || "",
    },
    datos_afiliacion: {
      isss: empleado.isss || "",
      afp: {
        afiliacion: empleado.afp?.afiliacion || "",
        numero: empleado.afp?.numero || "",
      },
    },
  });

  const formik = useFormik({
    initialValues: initialValues(empleado),
    validationSchema: EmpleadoSchema,
    onSubmit: onSubmit,
  });

  return (
    <Formik>
      <Form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
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
          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              flex: 1,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Datos personales
            </Typography>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Nombres"
                name="datos_personales.nombres"
                value={formik.values.datos_personales.nombres}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.datos_personales?.nombres &&
                  Boolean(formik.errors.datos_personales?.nombres)
                }
                helperText={
                  formik.touched.datos_personales?.nombres &&
                  formik.errors.datos_personales?.nombres
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Apellidos"
                name="datos_personales.apellidos"
                value={formik.values.datos_personales.apellidos}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.datos_personales?.apellidos &&
                  Boolean(formik.errors.datos_personales?.apellidos)
                }
                helperText={
                  formik.touched.datos_personales?.apellidos &&
                  formik.errors.datos_personales?.apellidos
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Fecha de nacimiento"
                name="datos_personales.fecha_nacimiento"
                type="date"
                value={formik.values.datos_personales.fecha_nacimiento}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.datos_personales?.fecha_nacimiento &&
                  Boolean(formik.errors.datos_personales?.fecha_nacimiento)
                }
                helperText={
                  formik.touched.datos_personales?.fecha_nacimiento &&
                  formik.errors.datos_personales?.fecha_nacimiento
                }
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Sexo"
                name="datos_personales.sexo"
                value={formik.values.datos_personales.sexo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.datos_personales?.sexo &&
                  Boolean(formik.errors.datos_personales?.sexo)
                }
                helperText={
                  formik.touched.datos_personales?.sexo &&
                  formik.errors.datos_personales?.sexo
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Estado civil"
                name="datos_personales.estado_civil"
                value={formik.values.datos_personales.estado_civil}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.datos_personales?.estado_civil &&
                  Boolean(formik.errors.datos_personales?.estado_civil)
                }
                helperText={
                  formik.touched.datos_personales?.estado_civil &&
                  formik.errors.datos_personales?.estado_civil
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Nacionalidad"
                name="datos_personales.nacionalidad"
                value={formik.values.datos_personales.nacionalidad}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.datos_personales?.nacionalidad &&
                  Boolean(formik.errors.datos_personales?.nacionalidad)
                }
                helperText={
                  formik.touched.datos_personales?.nacionalidad &&
                  formik.errors.datos_personales?.nacionalidad
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="DUI"
                name="datos_personales.dui"
                value={formik.values.datos_personales.dui}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.datos_personales?.dui &&
                  Boolean(formik.errors.datos_personales?.dui)
                }
                helperText={
                  formik.touched.datos_personales?.dui &&
                  formik.errors.datos_personales?.dui
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Dirección"
                name="datos_personales.direccion"
                value={formik.values.datos_personales.direccion}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.datos_personales?.direccion &&
                  Boolean(formik.errors.datos_personales?.direccion)
                }
                helperText={
                  formik.touched.datos_personales?.direccion &&
                  formik.errors.datos_personales?.direccion
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Teléfono"
                name="datos_personales.telefono"
                value={formik.values.datos_personales.telefono}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.datos_personales?.telefono &&
                  Boolean(formik.errors.datos_personales?.telefono)
                }
                helperText={
                  formik.touched.datos_personales?.telefono &&
                  formik.errors.datos_personales?.telefono
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Correo electrónico"
                name="datos_personales.correo"
                value={formik.values.datos_personales.correo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.datos_personales?.correo &&
                  Boolean(formik.errors.datos_personales?.correo)
                }
                helperText={
                  formik.touched.datos_personales?.correo &&
                  formik.errors.datos_personales?.correo
                }
                fullWidth
              />
            </Grid>
          </Grid>

          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              flex: 1,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Datos Laborales
            </Typography>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                options={plazas}
                groupBy={(option) => option.departamento}
                sx={{ width: "100%" }}
                value={formik.values.datos_laborales.cargo}
                isOptionEqualToValue={(option, value) =>  option.value === value.value}
                defaultValue={plazaSeleccionada}
                onChange={
                  (event, value) => {
                    formik.setFieldValue("datos_laborales.cargo", value);
                    setPlazaSeleccionada(value);
                  }
                }
                onBlur={formik.handleBlur}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Plaza"
                    name="datos_laborales.cargo"
                    error={
                      formik.touched.datos_laborales?.cargo &&
                      Boolean(formik.errors.datos_laborales?.cargo)
                    }
                    helperText={
                      formik.touched.datos_laborales?.cargo &&
                      formik.errors.datos_laborales?.cargo
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Tipo de contrato"
                name="datos_laborales.tipo_contrato"
                value={formik.values.datos_laborales.tipo_contrato}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.datos_laborales?.tipo_contrato &&
                  Boolean(formik.errors.datos_laborales?.tipo_contrato)
                }
                helperText={
                  formik.touched.datos_laborales?.tipo_contrato &&
                  formik.errors.datos_laborales?.tipo_contrato
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Fecha de ingreso"
                name="datos_laborales.fecha_ingreso"
                type="date"
                value={formik.values.datos_laborales.fecha_ingreso}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.datos_laborales?.fecha_ingreso &&
                  Boolean(formik.errors.datos_laborales?.fecha_ingreso)
                }
                helperText={
                  formik.touched.datos_laborales?.fecha_ingreso &&
                  formik.errors.datos_laborales?.fecha_ingreso
                }
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Typography variant="h6" gutterBottom>
              Datos Bancarios
            </Typography>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Banco"
                name="datos_bancarios.banco"
                value={formik.values.datos_bancarios.banco}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.datos_bancarios?.banco &&
                  Boolean(formik.errors.datos_bancarios?.banco)
                }
                helperText={
                  formik.touched.datos_bancarios?.banco &&
                  formik.errors.datos_bancarios?.banco
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Número de cuenta"
                name="datos_bancarios.cuenta"
                value={formik.values.datos_bancarios.cuenta}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.datos_bancarios?.cuenta &&
                  Boolean(formik.errors.datos_bancarios?.cuenta)
                }
                helperText={
                  formik.touched.datos_bancarios?.cuenta &&
                  formik.errors.datos_bancarios?.cuenta
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Tipo de cuenta"
                name="datos_bancarios.tipo_cuenta"
                value={formik.values.datos_bancarios.tipo_cuenta}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.datos_bancarios?.tipo_cuenta &&
                  Boolean(formik.errors.datos_bancarios?.tipo_cuenta)
                }
                helperText={
                  formik.touched.datos_bancarios?.tipo_cuenta &&
                  formik.errors.datos_bancarios?.tipo_cuenta
                }
                fullWidth
              />
            </Grid>
          </Grid>

          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              flex: 1,
            }}
          >
            <Typography variant="h6" gutterBottom>
              ISSS y AFP
            </Typography>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Número de ISSS"
                name="datos_afiliacion.isss"
                value={formik.values.datos_afiliacion.isss}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.datos_afiliacion?.isss &&
                  Boolean(formik.errors.datos_afiliacion?.isss)
                }
                helperText={
                  formik.touched.datos_afiliacion?.isss &&
                  formik.errors.datos_afiliacion?.isss
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Número de AFP"
                name="datos_afiliacion.afp.numero"
                value={formik.values.datos_afiliacion.afp.numero}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.datos_afiliacion?.afp?.numero &&
                  Boolean(formik.errors.datos_afiliacion?.afp?.numero)
                }
                helperText={
                  formik.touched.datos_afiliacion?.afp?.numero &&
                  formik.errors.datos_afiliacion?.afp?.numero
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Nombre de AFP"
                name="datos_afiliacion.afp.afiliacion"
                value={formik.values.datos_afiliacion.afp.afiliacion}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.datos_afiliacion?.afp?.nombre &&
                  Boolean(formik.errors.datos_afiliacion?.afp?.afiliacion)
                }
                helperText={
                  formik.touched.datos_afiliacion?.afp?.nombre &&
                  formik.errors.datos_afiliacion?.afp?.afiliacion
                }
                fullWidth
              />
            </Grid>
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
}
