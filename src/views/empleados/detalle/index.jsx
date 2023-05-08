import { useLoaderData, useParams } from "react-router-dom";
import EmpleadoService from "../../../services/empleados";
import {
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import SendIcon from "@mui/icons-material/Send";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import moment from "moment";
import FormularioEmpleado from "../../../components/forms/empleado-form";
import { Link, redirect } from "react-router-dom";

export async function loader({ params }) {
  const response = await EmpleadoService.getOne(params.id);
  return { response };
}

export default function DetalleEmpleado() {
  const { response } = useLoaderData();
  const { accion, id } = useParams();

  const {
    datos_personales: {
      nombres,
      apellidos,
      fecha_nacimiento,
      sexo,
      estado_civil,
      nacionalidad,
      dui,
      direccion,
      telefono,
      correo,
    },
    datos_laborales: {
      fecha_ingreso,
      cargo: { plaza, salario },
      cargo,
      tipo_contrato,
    },
    datos_bancarios: { banco, cuenta, tipo_cuenta },
    datos_afiliacion: { afp, isss },
    codigo,
    ausencias,
    incapacidades,
  } = response.empleado;

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
        <br />
        {accion === "ver" && (
          <>
            <Typography variant="h5" gutterBottom>
              Empleado: {codigo + " - " + nombres + " " + apellidos}
            </Typography>
            <div style={{ display: "flex" }}>
              <TableContainer
                style={{ flex: 1, marginRight: "10px" }}
                sx={{ border: "1px solid gray", borderCollapse: "collapse" }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={2} align="center">
                        <Typography variant="h6" gutterBottom>
                          Datos personales
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Nombres</TableCell>
                      <TableCell>{nombres}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Apellidos</TableCell>
                      <TableCell>{apellidos}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Fecha de nacimiento</TableCell>
                      <TableCell>
                        {moment(fecha_nacimiento).format("DD/MM/YYYY")}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Sexo</TableCell>
                      <TableCell>{sexo}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Estado civil</TableCell>
                      <TableCell>{estado_civil}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Nacionalidad</TableCell>
                      <TableCell>{nacionalidad}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>DUI</TableCell>
                      <TableCell>{dui}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Dirección</TableCell>
                      <TableCell>
                        <Typography
                          variant="body1"
                          style={{ overflowWrap: "anywhere" }}
                        >
                          {direccion}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Teléfono</TableCell>
                      <TableCell>{telefono}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Correo</TableCell>
                      <TableCell>{correo}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <TableContainer
                style={{ flex: 1 }}
                sx={{ border: "1px solid gray", borderCollapse: "collapse" }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={2} align="center">
                        <Typography variant="h6" gutterBottom>
                          Datos Laborales
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Plaza</TableCell>
                      <TableCell>{plaza}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Salario</TableCell>
                      <TableCell>
                        {parseFloat(salario.$numberDecimal)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Tipo de contrato</TableCell>
                      <TableCell>{tipo_contrato}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Fecha de contratación</TableCell>
                      <TableCell>
                        {moment(fecha_ingreso).format("DD/MM/YYYY")}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={2} align="center">
                        <Typography variant="h6" gutterBottom>
                          Datos Bancarios
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Banco</TableCell>
                      <TableCell>{banco}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Cuenta</TableCell>
                      <TableCell>{cuenta}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Tipo de cuenta</TableCell>
                      <TableCell>{tipo_cuenta}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={2} align="center">
                        <Typography variant="h6" gutterBottom>
                          ISSS y AFP
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>ISSS</TableCell>
                      <TableCell>{isss}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>AFP</TableCell>
                      <TableCell>
                        {afp
                          ? afp.afiliacion + ": " + afp.numero
                          : "No afiliado a AFP"}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <br />
            <br />
            <IncapacidadesEmpleado incapacidades={incapacidades} />
            <AusenciasEmpleado ausencias={ausencias} />
          </>
        )}

        {accion === "editar" && (
          <>
            <Typography variant="h5" gutterBottom>
              Empleado: {codigo + " - " + nombres + " " + apellidos}
            </Typography>
            <FormularioEmpleado
              empleado={{
                nombres,
                apellidos,
                fecha_nacimiento,
                sexo,
                estado_civil,
                nacionalidad,
                dui,
                direccion,
                telefono,
                correo,
                cargo,
                plaza,
                salario,
                tipo_contrato,
                fecha_ingreso,
                banco,
                cuenta,
                tipo_cuenta,
                isss,
                afp,
              }}
              onSubmit={async (values) => {
                console.log("onsubmit", values);
                const response = await EmpleadoService.update(id, values);
                if (response.status === 200) {
                  router.push("/empleados");
                }
              }}
              labelSubmit="Actualizar"
              iconSubmit={<SendIcon />}
            />
          </>
        )}

        {accion !== "editar" && accion !== "ver" && (
          <>
            <Typography variant="h6" gutterBottom>
              Acción desconocida
            </Typography>
            <Link to={"/empleados"} key={"empleados"}>
              <Button>
                <ArrowBackIcon />
                Regresar
              </Button>
            </Link>
          </>
        )}
      </Paper>
    </>
  );
}

const IncapacidadesEmpleado = ({ incapacidades }) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">Incapacidades</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Fecha</TableCell>
                <TableCell>Motivo</TableCell>
                <TableCell>Días</TableCell>
                <TableCell>Comentarios</TableCell>
                <TableCell>Remunerado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {incapacidades.length > 0 && incapacidades.map((inc) => (
                <TableRow key={inc._id}>
                  <TableCell>
                    {moment(inc.fecha).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell>{inc.motivo}</TableCell>
                  <TableCell>{inc.dias}</TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      style={{ overflowWrap: "anywhere" }}
                    >
                      {inc.observaciones}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    {inc.remunerado ? (
                      <CheckCircleIcon color="success" />
                    ) : (
                      <CancelIcon color="error" />
                    )}
                  </TableCell>
                </TableRow>
              ))}

              {
                incapacidades.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      <Typography variant="body1">
                        No hay incapacidades registradas
                      </Typography>
                    </TableCell>
                  </TableRow>
                )
              }
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  );
};

const AusenciasEmpleado = ({ ausencias }) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">Ausencias</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Fecha</TableCell>
                <TableCell>Motivo</TableCell>
                <TableCell>Comentarios</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ausencias.length > 0 && ausencias.map((ausencia) => (
                <TableRow key={ausencia._id}>
                  <TableCell>
                    {moment(ausencia.fecha).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell>{ausencia.motivo}</TableCell>
                  <TableCell>{ausencia.observaciones}</TableCell>
                </TableRow>
              ))}

              {ausencias.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    <Typography variant="body1">
                      No hay ausencias registradas
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  );
};
