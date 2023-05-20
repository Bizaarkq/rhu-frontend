import { useLoaderData, useParams } from "react-router-dom";
import IndemnizacionService from "../../../services/indemnizaciones";
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
  Button,
  Snackbar,
  Alert
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import moment from "moment";
import { Link, redirect, useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";

export async function loader({ params }) {
  const response = await IndemnizacionService.getOne(params.id);
  return { response };
}

export default function DetalleIndemnizacion() {
  const { response } = useLoaderData();
  const { accion, id } = useParams();
  const navigate = useNavigate();
  console.log(response);
  const [updated, setUpdated] = useState(false);
  const [failed, setFailed] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setUpdated(false);
  };

  const {
    empleado: {
      codigo,
      datos_personales: {
        nombres,
        apellidos,
        dui,
        direccion,
        telefono,
        correo,
      },
      datos_laborales: {
        tipo_contrato,
      },
    },
    fecha_contratacion,
    fecha_finalizacion,
    indemnizacion,
  } = response.indemnizacion;

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
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Detalle indemnización
            </Typography>
            <br />
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
                      <TableCell>DUI:</TableCell>
                      <TableCell>{dui}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Dirección:</TableCell>
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
                      <TableCell>Teléfono:</TableCell>
                      <TableCell>{telefono}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Correo:</TableCell>
                      <TableCell>{correo}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <TableContainer
                style={{ flex: 1, marginRight: "10px" }}
                sx={{ border: "1px solid gray", borderCollapse: "collapse" }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={2} align="center">
                        <Typography variant="h6" gutterBottom>
                          Datos sobre Indemnizacion
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Fecha contratación:</TableCell>
                      <TableCell>{moment(fecha_contratacion).format('YYYY-MM-DD')}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Fecha de finalización de contrato:</TableCell>
                      <TableCell>{moment(fecha_finalizacion).format('YYYY-MM-DD')}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Indemnización correspondiente:</TableCell>
                      <TableCell>
                        <Typography
                          variant="body1"
                          style={{ overflowWrap: "anywhere" }}
                        >
                          ${indemnizacion.$numberDecimal}
                        </Typography>
                      </TableCell>
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
                      <TableCell>Tipo de contrato:</TableCell>
                      <TableCell>{tipo_contrato}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <br />
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
