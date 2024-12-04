import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useMainContext } from '../contexts/MainContext';
import moment from 'moment';  // Import moment to handle time zone conversion

function CalendarView() {
    const { allTasks } = useMainContext();
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const formattedEvents = allTasks.map(task => {
            const localStartTime = moment.utc(task.startTime).local();
            const localEndTime = moment.utc(task.endTime).local();
            
            // Convert date to the local date
            const localDate = moment.utc(task.date).local().format('YYYY-MM-DD');
            
            console.log('Local Start Time:', localStartTime.toISOString());  // Log local start time
            console.log('Local End Time:', localEndTime.toISOString());      // Log local end time
    
            return {
                title: task.task,
                start: localStartTime.toISOString(),
                end: localEndTime.toISOString(),
                description: task.description,
                status: task.status,
                date: localDate,  // Store the local date for consistency
            };
        });
    
        console.log('Formatted Events:', formattedEvents);  // Log the final events array
        setEvents(formattedEvents);
    }, [allTasks]);
    
    

    return (
        <div className="calendar-container premium-calendar mt-20 p-5 rounded-2xl shadow-2xl">
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay',
                }}
                editable={false}
                droppable={false}
                allDayText="All Day"
                eventClassNames={(event) => {
                    const status = event.event.extendedProps?.status;
                    if (status === 'Pending') {
                        return ['pending-task'];
                    } else {
                        return ['completed-task'];
                    }
                }}
                eventContent={(eventInfo) => {
                    const status = eventInfo.event.extendedProps?.status;
                    const title = eventInfo.event.title;
                    
                    if (status === 'Completed') {
                        return {
                            html: `<span style="text-decoration: line-through">${title}</span>`,
                        };
                    }

                    return { html: title };
                }}
                contentHeight="auto"
                aspectRatio={1.8}
                eventTimeFormat={{
                    hour: '2-digit',
                    minute: '2-digit',
                    meridiem: 'short',
                }}
            />
        </div>
    );
}

export default CalendarView;
