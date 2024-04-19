import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

const events = [
    {
        id: 'a',
        title: 'my event',
        start: '2024-04-16'
    },
    { 
        id: 'b',
        title: 'my event 2242',
        start: '2024-04-09'
    },
    { 
        id: 'c',
        title: 'my event 3',
        start: '2024-04-19'
    },
    { 
        id: 'c',
        title: 'my event 3',
        start: '2024-04-22'
    },
    { 
        id: 'c',
        title: 'my event 3',
        start: '2024-04-23'
    },
    { 
        id: 'd',
        title: 'my event 4',
        start: '2024-04-20'
    },
    { 
        id: 'e',
        title: 'my event 5',
        start: '2024-04-19' 
    }
]
//events.setAllDay( false, [ settings ] )



export function Fullcalendar() {
    const [visibility, setVisibility] = useState(false);
    const [eventTitle, setEventTitle] = useState('Hello 4');
    const [eventDate, setEventDate] = useState('Hello 4');
    const closeModal = () =>{
        setVisibility(false)
    }

    return (
        <div style={{width:1004, height:600, backgroundColor:'#45c572'}}>
            <h3>
                Hello Mike, 
            </h3>
            <Modal 
                show={visibility} 
                eventTitle={eventTitle} 
                eventDate={eventDate}
                closeModal={closeModal} 
            >
                <p>Add Event</p>
            </Modal>

            <div style={{width:1000, height:400, margin:2, backgroundColor:'#FEF'}}>
                <FullCalendar
                    plugins={[timeGridPlugin]}
                    initialView='timeGridWeek'
                    weekends={true}
                    events={events}
                    eventContent={renderEventContent}
                    editable={true}
                    dayCellContent={(val)=>{

                        if(val.isPast){
                            return '';
                        }

                        return (
                            <>
                                <button 
                                    className='btn' 
                                    onClick={(event)=>{
                                        let dtd = val.date.getFullYear()+"-"+('0' + (val.date.getMonth()+1)).slice(-2)+"-"+('0' + val.date.getDate()).slice(-2);
                                        console.log(parseInt(100*Math.random()))
                                        console.log(event);
                                        setEventTitle('New Event');
                                        setEventDate(dtd)
                                        setVisibility(true);

                                    }} 
                                >
                                    Add Item
                                </button>
                            </>)
                    }}
                />
            </div>
        </div>
    )
}

// a custom render function
function renderEventContent(eventInfo) {
    console.log(parseInt(100*Math.random()), eventInfo);
    return (
        <>
            <div onClick={()=>{
                alert(eventInfo.event.title+' | '+eventInfo.event.start);
                //setEventTitle(eventInfo.event.title)
            }}>
                <b>{eventInfo.timeText}</b>
                <i>{eventInfo.event.title}</i>
            </div>
        </>
    )
}


const Modal = ({ closeModal, show, children, eventTitle, eventDate }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
  
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          {children}
          <p>{eventDate}</p>
          <p>{eventTitle}</p>
          <button type="button" onClick={()=>{closeModal(false)}}>
            Close 
          </button>
        </section>
      </div>
    );
  };