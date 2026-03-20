import React, { useState } from 'react'
import moment from 'moment'
import 'moment/dist/locale/pt-br'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop"
import "react-big-calendar/lib/css/react-big-calendar.css"
import "react-big-calendar/lib/addons/dragAndDrop/styles.css"
import styles from "./Calendario.module.css"
import EventModal from './EventModal'

const DragAndDropCalendar = withDragAndDrop(Calendar);
moment.locale('pt-br')
const localizer = momentLocalizer(moment);


const Calendario = () => {

    const [eventos, setEventos] = useState([{
        id: 1,
        title: 'Fox Oficina',
        start: new Date(2026, 2, 19, 8, 0),
        end: new Date(2026, 2, 19, 9, 0),
        desc: 'Levar o Fox na oficina. OBS: Ir em 2 carros',
        color: 'red',
        tipo: 'atividade',
    },
    {
        id: 2,
        title: 'Mae Endocrino',
        start: new Date(2026, 2, 19, 13, 0),
        end: new Date(2026, 2, 19, 14, 0),
        desc: 'Evento2',
        color: 'blue',
        tipo: 'atividade',
    }
    ])

    const [eventoSelecionado, setEventoSelecionado] = useState(null);

    const eventStyle = (event) => ({
        style: {
            backgroundColor: event.color,
        },
    })

    const handleEventClick = (evento) => {
        setEventoSelecionado(evento);
    }

    const handlEventClose = () => {
        setEventoSelecionado(null);
    }

    const moverEventos = (data) => {
        const { start, end } = data;
        const updatedEvents = eventos.map((event) => {
            if (event.id === data.event.id) {
                return {
                    ...event,
                    start: new Date(start),
                    end: new Date(end)
                };
            }
            return event;
        });

        setEventos(updatedEvents)
    }


    return (
        <>
            <DragAndDropCalendar
                defaultDate={moment().toDate()}
                defaultView='month'
                events={eventos}
                localizer={localizer}
                resizable
                onEventDrop={moverEventos}
                onEventResize={moverEventos}
                onSelectEvent={handleEventClick}
                eventPropGetter={eventStyle}
                components={{
                    toolbar: CustomToolbar,
                }}
                className={styles.calendar}
            />

            {eventoSelecionado && (
                <EventModal
                    evento={eventoSelecionado}
                    onClose={handlEventClose}
                />
            )}

        </>
    )
}

const CustomToolbar = ({ label, onView, onNavigate, views }) => {

    const [itemText, setItemText] = useState('month');

    const traducoesPTBR = {
    month: 'Mês',
    week: 'Semana',
    day: 'Dia',
    agenda: 'Agenda',
    }  

    return (
        <div className={styles.toolbarContainer}>

            <h1 className={styles.mesAno}>{label}</h1>

            <div className={styles.dirTop}>

                <div className={styles.dropdown}>

                    <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        {traducoesPTBR[itemText] || itemText}
                    </button>

                    <ul className="dropdown-menu dropdown-menu-end">
                        {views.map((view, index) => (
                            <div key={index}>
                                <li><button className='dropdown-item' onClick={() => onView(view) + setItemText(view)}>{traducoesPTBR[view] || view}</button></li>
                                {index == 2 && <hr className='dropdownDivisor'></hr>}
                            </div>
                        ))}
                    </ul>

                </div>

                <div className="toolbarNavigation" style={{marginLeft: '15px'}}>
                    <button className='btn btn-secondary btn-ls mr-2 border-0' onClick={() => onNavigate('TODAY')}>Hoje</button>
                    <button className='btn btn-sm mr-2 text-secondary' onClick={()=> onNavigate('PREV')} style={{marginLeft: '15px', backgroundColor: "#6c757d", borderRadius: "10px"}}><i class="bi bi-caret-left" style={{padding: "5px", color: "#fff"}}></i></button>
                    <button className='btn btn-sm mr-2 text-secondary' onClick={()=> onNavigate('NEXT')} style={{marginLeft: '2px', backgroundColor: "#6c757d", borderRadius: "10px"}}><i class="bi bi-caret-right" style={{padding: "5px", color: "#fff"}}></i></button>
                </div>

            </div>
        </div>
    )
}

export default Calendario