import { useLoaderData } from "react-router-dom";
import EmpleadoService from "../../services/empleados";
import {
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import moment from "moment";

export async function loader({ params }) {
  const response = await EmpleadoService.getBoleta(params.id_empleado, params.id_boleta);
  return { response };
}

export default function DetalleEmpleado() {
  const { response } = useLoaderData();

  const {
    empleado : {
      codigo,
      datos_personales: { nombres, apellidos },
      datos_laborales: { cargo: {
        plaza, salario
      }}
    },
    ...boleta
  } = response.boleta;

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
        <Typography variant="h4" gutterBottom>
          Comprobante de pago
        </Typography>
        <Typography variant="h6" gutterBottom>
          Empleado: {codigo + " - " + nombres + " " + apellidos}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Dias laborales: 15 - Trabajados: {boleta.dias_trabajados}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Plaza: {plaza} - Salario: ${salario} (mensual)
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
                      Devenga en concepto de:
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Salario a pagar</TableCell>
                  <TableCell>{boleta.salario_quincenal}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Incapacidades</TableCell>
                  <TableCell>{boleta.incapacidad}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Vacaciones</TableCell>
                  <TableCell>{boleta.vacacion}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Otros ingresos</TableCell>
                  <TableCell>{boleta.otros_ingresos}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total devengado</TableCell>
                  <TableCell>{
                    (parseFloat(boleta.salario_quincenal )
                    + parseFloat(boleta.incapacidad)
                    + parseFloat(boleta.vacacion)
                    + parseFloat(boleta.otros_ingresos)).toFixed(2)
                  }</TableCell>
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
                      Descuentos y retenciones:
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>ISSS</TableCell>
                  <TableCell>{boleta.isss}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>AFP</TableCell>
                  <TableCell>{boleta.afp}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>RENTA</TableCell>
                  <TableCell>{boleta.renta}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Otros descuentos</TableCell>
                  <TableCell>{boleta.otros_descuentos}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Descuentos cíclicos</TableCell>
                  <TableCell>{boleta.descuentos_ciclicos}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total descuentos</TableCell>
                  <TableCell>{
                    (parseFloat(boleta.isss)
                    + parseFloat(boleta.afp)
                    + parseFloat(boleta.renta)
                    + parseFloat(boleta.otros_descuentos)).toFixed(2)
                  }</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <br />
        <br />
        <Typography variant="h6" gutterBottom>
          Liquido a pagar: ${boleta.salario_neto}
        </Typography>
      </Paper>
    </>
  );
}
