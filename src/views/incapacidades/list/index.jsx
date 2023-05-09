import IncapaService from "../../../services/incapacidades";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css"
import { useLoaderData } from "react-router-dom";
import { useState, useCallback } from "react";
import { Modal, Box, Typography } from "@mui/material";

const localizer = momentLocalizer(moment);

const styleModal = {
    position: 'absolute',
    top: '25%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

export async function loader (){
    const response = await IncapaService.getAll();
    return {response};
}

export default function IncapaList () {
    const {response} = useLoaderData();

    const [ event, setEvent ] = useState({});
    const [ open, setOpen ] = useState(false);

    const onEventClick = useCallback((event) => {
        setEvent(event);
        setOpen(true);
    }, []);


    return (
        <>
            <Calendar
                localizer={localizer}
                events={response.eventos}
                step={60}
                defaultView="month"
                views={["month"]}
                defaultDate={new Date()}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                onSelectEvent={onEventClick}
            />
            <ModalEvento evento={event} open={open} setOpen={setOpen} />
        </>
    )
}

const ModalEvento = ({evento, open, setOpen}) => {
    return (
        <Modal open={open} onClose={() => setOpen(false)} >
            <Box sx={styleModal}>
                <Typography variant="body1" component="h2">
                    Detalles del evento
                </Typography>
                <Typography variant="body2" component="p">
                    Empleado: {evento.title}
                </Typography>
                <Typography variant="body2" component="p">
                    Inicio: {moment(evento.start).format("DD/MM/YYYY")}
                </Typography>
                <Typography variant="body2" component="p">
                    Fin: {moment(evento.end).format("DD/MM/YYYY")}
                </Typography>

            </Box>
        </Modal>
    )
}
