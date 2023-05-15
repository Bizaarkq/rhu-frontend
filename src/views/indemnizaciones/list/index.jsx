import IndemnizacionService from "../../../services/indemnizaciones";
import DynamicTable from "../../../components/tables/dynamictable";
import { useState, useEffect } from "react";
import { Grid, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import moment from "moment";

const columns = [
  { id: "nombres", label: "Nombres", minWidth: 170 },
  { id: "apellidos", label: "Apellidos", minWidth: 100 },
  { id: "monto", label: "Indemnización", minWidth: 100 },
  { id: "fecha_contratacion", label: "Fecha Contratación", minWidth: 150 },
  { id: "fecha_finalizacion", label: "Fecha Finalización", minWidth: 150 },
];

const actions = [
  {
    id: "ver",
    label: "Ver",
    icon: "visibility",
    color: "secundary",
    path: "/indemnizaciones",
    accion: "ver",
  },
];

export default function ListIndemnizaciones() {
  const [indemnizaciones, setIndemnizaciones] = useState([]);

  useEffect(() => {
    retrieveIndemnizaciones();
  }, []);

  const retrieveIndemnizaciones = () => {
    IndemnizacionService.getAll()
      .then((response) => {
        setIndemnizaciones(
          response.indemnizaciones.map((indemnizacion) => {
            let monto = indemnizacion.indemnizacion.$numberDecimal
            return {
              id: indemnizacion._id,
              fecha_contratacion: moment(indemnizacion.fecha_contratacion).format('YYYY-MM-DD'),
              fecha_finalizacion: indemnizacion.fecha_finalizacion? moment(indemnizacion.fecha_finalizacion).format('YYYY-MM-DD') : '-',
              nombres: indemnizacion.empleado.datos_personales.nombres,
              apellidos: indemnizacion.empleado.datos_personales.apellidos,
              monto,  
            };
          })
        );
      })
      .catch((e) => {
        console.log(e);
      });
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
            Indemnizaciones
        </Typography>
        
        <Link to="/indeminizacion/crear">
        <Button variant="contained" color="primary" startIcon={<AddIcon/>}>
          Agregar
        </Button>
        </Link>
        
      </Grid>

      <DynamicTable
        columns={columns}
        rows={indemnizaciones}
        actions={actions}
        page={0}
        setPage={0}
        rowsPerPage={10}
        setRowsPerPage={10}
        totalRows={indemnizaciones.length}
      />
    </>
  );
}
