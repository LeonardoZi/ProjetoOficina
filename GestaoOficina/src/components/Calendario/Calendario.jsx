import React, { useState, useEffect } from 'react'
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

    const [eventsList, setEventsList] = useState([]);
    const [eventoSelecionado, setEventoSelecionado] = useState(null);
    const [showMoreData, setShowMoreData] = useState(null);

    const [view, setView] = useState(() => {
    return window.innerWidth < 768 ? 'agenda' : 'month';
});

    useEffect(() => {
        fetch("https://projetooficina-la3z.onrender.com/ordens")
            .then(res => res.json())
            .then(eventsList => { setEventsList(eventsList); console.log(eventsList) })
            .catch(err => console.error(err))
    }, [])

    const eventsCalendar = eventsList.map(data => {
        const newData = {
            id: data.id,
            title: data.cliente.nome,
            start: new Date(data.dataAgendada),
            end: new Date(new Date(data.dataAgendada).getTime() + 3600000)
        }

        return newData
    })

    console.log(eventsCalendar)


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

    const handleShowMore = (events, date) => {
        setShowMoreData({ events, date });
    }


    // const moverEventos = (data) => {
    //     const { event, start, end } = data;
    //     const updatedEvents = eventsList.map((ordem) => {
    //         if (ordem.id === event.id) {
    //             return {
    //                 ...ordem,
    //                 start: new Date(start),
    //                 end: new Date(end)
    //             };
    //         }
    //         return event;
    //     });

    //     setEventsList(updatedEvents)
    // }


    return (
        <>
            <DragAndDropCalendar
                defaultDate={moment().toDate()}
                view={view}
                defaultView={view}
                length={30}
                onView={(newView) => setView(newView)}
                // events={eventsCalendar}
                events={eventsCalendar}
                localizer={localizer}
                resizable
                // onEventDrop={moverEventos}
                // onEventResize={moverEventos}
                popup={false}
                onShowMore={handleShowMore}
                onSelectEvent={handleEventClick}
                eventPropGetter={eventStyle}
                components={{
                    toolbar: CustomToolbar,
                }}
                className={styles.calendar}
            />

            {showMoreData && (
                <div className={styles.popupOverlay} onClick={() => setShowMoreData(null)}>
                    <div className={styles.popupBox} onClick={e => e.stopPropagation()}>
                        <div className={styles.popupHeader}>
                            <span>{moment(showMoreData.date).format('DD [de] MMMM')}</span>
                            <button onClick={() => setShowMoreData(null)}>✕</button>
                        </div>
                        <div className={styles.popupList}>
                            {showMoreData.events.map(evento => (
                                <div key={evento.id} className={styles.popupItem}
                                    onClick={() => { setEventoSelecionado(evento); setShowMoreData(null); }}>
                                    🔵 {evento.title}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {eventoSelecionado && (
                <EventModal
                    evento={eventoSelecionado}
                    onClose={handlEventClose}
                />
            )}

        </>
    )
}

const CustomToolbar = ({ label, onView, onNavigate, views, view }) => {


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
                        {traducoesPTBR[view] || view}
                    </button>

                    <ul className="dropdown-menu dropdown-menu-end">
                        {views.map((view, index) => (
                            <div key={index}>
                                <li><button className='dropdown-item' onClick={() => onView(view)}>{traducoesPTBR[view] || view}</button></li>
                                {index == 2 && <hr className='dropdownDivisor'></hr>}
                            </div>
                        ))}
                    </ul>

                </div>

                <div className="toolbarNavigation" style={{ marginLeft: '15px' }}>
                    <button className='btn btn-secondary btn-ls mr-2 border-0' onClick={() => onNavigate('TODAY')}>Hoje</button>
                    <button className='btn btn-sm mr-2 text-secondary' onClick={() => onNavigate('PREV')} style={{ marginLeft: '15px', backgroundColor: "#6c757d", borderRadius: "10px" }}><i className="bi bi-caret-left" style={{ padding: "5px", color: "#fff" }}></i></button>
                    <button className='btn btn-sm mr-2 text-secondary' onClick={() => onNavigate('NEXT')} style={{ marginLeft: '2px', backgroundColor: "#6c757d", borderRadius: "10px" }}><i className="bi bi-caret-right" style={{ padding: "5px", color: "#fff" }}></i></button>
                </div>

            </div>
        </div>
    )
}

export default Calendario