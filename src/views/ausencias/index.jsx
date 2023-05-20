import ausenciaService from "../../services/ausencias";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment-timezone";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState, useCallback } from "react";
import {
  Modal,
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  IconButton,
  Tooltip,
  Alert,
  Snackbar,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { MESSAGE_CALENDAR } from "../../services/constantes";
import AusenciaForm from "../../components/forms/ausencia-form";
import { useEffect } from "react";

moment.tz.setDefault("America/El_Salvador");
const localizer = momentLocalizer(moment);

const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const eventLabels = Object.freeze({
  SUCCESS: {
    create: "Ausencia creada correctamente",
    update: "Ausencia actualizada correctamente",
    delete: "Ausencia eliminada correctamente",
  },
  FAILED: {
    create: "Error al crear la incapacidad",
    update: "Error al actualizar la incapacidad",
    delete: "Error al eliminar la incapacidad",
  },
});

export default function IncapaList() {
  const [eventos, setEventos] = useState([]);
  const [modalEvent, setModalEvent] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [requestFailed, setRequestFailed] = useState(false);
  const [deleteEvent, setDeleteEvent] = useState(false);
  const [eventLabel, setEventLabel] = useState("");

  const fetchEventos = useCallback(async () => {
    const response = await ausenciaService.getAll();
    if (response.ok) {
      const eventos = response.eventos.map((evento) => {
        return {
          ...evento,
          start: new Date(
            new Date(evento.start).getTime() + 1000 * 60 * 60 * 24
          ),
          end: new Date(new Date(evento.end).getTime() + 1000 * 60 * 60 * 24),
        };
      });
      setEventos(eventos);
    }
  }, []);

  useEffect(() => {
    fetchEventos();
  }, []);

  const [event, setEvent] = useState({});
  const [open, setOpen] = useState(false);

  const onEventClick = useCallback((event) => {
    setEvent(event);
    setOpen(true);
  }, []);

  const createEvento = useCallback(async (values, { resetForm }) => {
    setExpanded(false);
    const response = await ausenciaService.create(values);
    if (response.ok) {
      resetForm();
      setRequestSuccess(true);
      fetchEventos();
      handleEventLabel("SUCCESS", "create");
    } else {
      handleEventLabel("FAILED", "create");
      setRequestFailed(true);
    }
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setRequestFailed(false);
    setRequestSuccess(false);
  };

  const handleEventModal = () => {
    setModalEvent(true);
    handleEventLabel("SUCCESS", "update");
    setOpen(false);
    fetchEventos();
    setTimeout(() => {
      setModalEvent(false);
    }, 4000);
  };

  const handleDeleteEvent = async () => {
    setDeleteEvent(true);
    handleEventLabel("SUCCESS", "delete");
    setOpen(false);
    fetchEventos();
    setDeleteEvent(false);
    setTimeout(() => {
      setDeleteEvent(false);
    }, 4000);
  };

  const handleEventLabel = (status, accion) => {
    setEventLabel(eventLabels[status][accion]);
  };

  return (
    <>
      <Accordion
        sx={{ marginBottom: "20px" }}
        expanded={expanded}
        onChange={() => setExpanded(!expanded)}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" component="h2">
            Agregar Ausencia
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <AusenciaForm
            onSubmit={createEvento}
            labelSubmit="Crear"
            iconSubmit={<SaveIcon />}
            accion="crear"
          />
        </AccordionDetails>
      </Accordion>

      <Calendar
        localizer={localizer}
        events={eventos}
        step={60 * 24}
        defaultView="month"
        views={["month"]}
        defaultDate={new Date()}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100vh" }}
        onSelectEvent={onEventClick}
        messages={MESSAGE_CALENDAR}
        showAllEvents={true}
      />
      <ModalEvento
        evento={event}
        open={open}
        setOpen={setOpen}
        handleEventModal={handleEventModal}
        setRequestSuccess={setRequestSuccess}
        setRequestFailed={setRequestFailed}
        handleDeleteEvent={handleDeleteEvent}
        handleEventLabel={handleEventLabel}
      />

      <Snackbar
        open={requestSuccess}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {eventLabel}
        </Alert>
      </Snackbar>
      <Snackbar
        open={requestFailed}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {eventLabel}
        </Alert>
      </Snackbar>
    </>
  );
}

function ModalEvento({
  evento,
  open,
  setOpen,
  setRequestSuccess,
  setRequestFailed,
  handleEventModal,
  handleDeleteEvent,
}) {
  const [edit, setEdit] = useState(false);

  const editEvento = useCallback(
    async (values) => {
      const response = await ausenciaService.update({
        ...values,
        id_ausencia: evento.resource.id_ausencia,
      });
      if (response.ok) {
        handleEventModal();
        setRequestSuccess(true);
        setEdit(false);
      } else {
        setRequestFailed(true);
        handleEventLabel("FAILED", "update");
      }
    },
    [evento]
  );

  const deleteEvento = useCallback(async () => {
    const response = await ausenciaService.deleteA({
      id_ausencia: evento.resource.id_ausencia,
      id_empleado: evento.resource.id_empleado,
    });
    if (response.ok) {
      handleDeleteEvent();
      setRequestSuccess(true);
    } else {
      setRequestFailed(true);
      handleEventLabel("FAILED", "delete");
    }
  }, [evento]);

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={styleModal}>
        <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            onClick={() => {
              setEdit(false);
              setOpen(false);
            }}
          >
            <CloseIcon />
          </IconButton>
          <Grid>
            <Tooltip title={!edit ? "Editar" : "Ver"}>
              <IconButton
                color="primary"
                size="medium"
                onClick={() => setEdit(!edit)}
              >
                {!edit ? <EditIcon /> : <VisibilityIcon />}
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar">
              <IconButton color="error" size="medium" onClick={deleteEvento}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
        <Typography variant="body1" component="h2">
          Detalles de la ausencia
        </Typography>

        {!edit && (
          <Grid sx={{ width: "100%" }}>
            <Typography variant="body2" component="p">
              Empleado: {evento.title}
            </Typography>
            <Typography variant="body2" component="p">
              Fecha: {moment(evento.start).format("DD/MM/YYYY")}
            </Typography>
            <Typography variant="body2" component="p">
              Motivo: {evento.resource?.motivo}
            </Typography>
            <Typography variant="body2" component="p">
              Observaciones: {evento.resource?.observaciones}
            </Typography>
          </Grid>
        )}

        {edit && (
          <AusenciaForm
            onSubmit={editEvento}
            labelSubmit="Editar"
            iconSubmit={<EditIcon />}
            accion="editar"
            evento={evento.resource}
          />
        )}
      </Box>
    </Modal>
  );
}
