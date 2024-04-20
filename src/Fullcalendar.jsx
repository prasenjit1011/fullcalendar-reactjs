import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'

const apiHost   = 'http://localhost:3000/';

let randNum = parseInt(100*Math.random());

export function Fullcalendar() {
    const [visibility,  setVisibility]  = useState(false);
    const [eventList,   setEventList]   = useState([]);
    const [eventType,   setEventType]   = useState(1);
    const [eventId,     setEventId]     = useState(0);
    const [eventTitle,  setEventTitle]  = useState('');
    const [eventDate,   setEventDate]   = useState('');
    const closeModal = () =>{
        setVisibility(false)
    }

    const deleteEvent = (eventId) => {
        let frmData     = JSON.stringify({eventId: parseInt(eventId)});
        fetch(apiHost+'api/event/delete',{
            method:'delete',
            mode:'cors',
            body:frmData,
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(response=>response.json())
        .then(data=>{
            console.log('-:  Event delete API :-', parseInt(100*Math.random()));
            getEvent();
        })
        .catch(err=>{
            console.log('-- API error to save event--', parseInt(100*Math.random()));
            //console.log(err);
        });;
    }

    const saveEvent = (eventId, eventDtd, eventTitle) => {
        console.log('-- Here --', parseInt(100*Math.random()), eventDtd, eventTitle);

        let frmData     = JSON.stringify({eventId: parseInt(eventId), eventDate:eventDtd, eventTitle:eventTitle});

        fetch(apiHost+'api/event',{
            method:'post',
            mode:'cors',
            body:frmData,
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(response=>response.json())
        .then(data=>{
            getEvent();
            console.log(data);
            setVisibility(false)
        })
        .catch(err=>{
            console.log('-- API error to save event--', parseInt(100*Math.random()));
            //console.log(err);
            setVisibility(false)
        });
    }

    const getEvent = () =>{
        fetch(apiHost+'api/event/list',{
            method:'get',
            mode:'cors',
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(response=>response.json())
        .then(data=>{
            console.log('-:  Event List API Data :-', parseInt(100*Math.random()));
            console.log(eventList);
            setEventList(data);
        })
        .catch(err=>{
            console.log('-- API error to save event--', parseInt(100*Math.random()));
            //console.log(err);
        });;
    }

    useEffect(()=>{
        getEvent();
    }, []);

    return (
        <>
            <Modal 
                show={visibility} 
                eventType={eventType}
                eventId={eventId} 
                eventTitle={eventTitle} 
                eventDate={eventDate}
                closeModal={closeModal} 
                saveEvent={saveEvent}
                deleteEvent={deleteEvent}
            />

            <div style={{width:954, height:600, backgroundColor:'#45c572'}}>
                <h3>Hello Mike {randNum},</h3>

                <div style={{width:950, height:400, margin:2, backgroundColor:'#FFF'}}>
                    <FullCalendar
                        plugins={[timeGridPlugin]}
                        initialView='timeGridWeek'
                        weekends={true}
                        events={eventList}
                        eventContent={(eventInfo)=>{
                            return (
                                <div>
                                    <div
                                        className='eventTitle' 
                                        style={{backgroundColor: eventInfo.event.extendedProps.status ? '#45c572':'#0095ff'}}
                                        onClick={()=>{
                                            let dtd = eventInfo.event.start.getFullYear()+"-"+('0' + (eventInfo.event.start.getMonth()+1)).slice(-2)+"-"+('0' + eventInfo.event.start.getDate()).slice(-2);
                                            setEventType(2)
                                            setEventId(eventInfo.event.id)
                                            setEventTitle(eventInfo.event.title)
                                            setEventDate(dtd)
                                            setVisibility(true);
                                        }}
                                    >
                                        <i>{eventInfo.event.title}</i>
                                    </div>
                                    <div
                                        className='deleteEvent' 
                                        onClick={()=>{
                                            let dtd = eventInfo.event.start.getFullYear()+"-"+('0' + (eventInfo.event.start.getMonth()+1)).slice(-2)+"-"+('0' + eventInfo.event.start.getDate()).slice(-2);
                                            setEventType(3)
                                            setEventId(eventInfo.event.id)
                                            setEventTitle(eventInfo.event.title)
                                            setEventDate(dtd)
                                            setVisibility(true);
                                        }}
                                    >
                                        <i>X</i>
                                    </div>
                                    
                                </div>
                            )
                        }}
                        editable={true}
                        dayCellContent={(val)=>{

                            if(val.isPast){
                                //return '';
                            }

                            return (
                                <>
                                    <button 
                                        className='btn' 
                                        onClick={(event)=>{
                                            let dtd = val.date.getFullYear()+"-"+('0' + (val.date.getMonth()+1)).slice(-2)+"-"+('0' + val.date.getDate()).slice(-2);
                                            setEventType(1)
                                            setEventId(0)
                                            setEventTitle('');
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
        </>
    )
}


const Modal = ({ closeModal, children, show, eventType, eventId, eventDate, eventTitle, saveEvent, deleteEvent }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    const [taskTitle, setTaskTitle] = useState('');

    useEffect(()=>{
        setTaskTitle(eventTitle);
    },[eventTitle]);

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                {   eventType == 1 ? 'Add Event':'' }
                {   eventType == 2 ? 'Edit Event':'' }
                {   eventType == 3 ? 'Delete Event':'' }
                <table className='modalFrm'>
                    <tbody>
                        <tr>
                            <td width="30%">Date : </td>
                            <td style={{textAlign:"left"}}>{eventDate}</td>
                        </tr>
                        <tr>
                            <td>Title : </td>
                            <td style={{textAlign:"left"}}>
                                {
                                    eventType == 1 || eventType == 2 ? 
                                        <input value={taskTitle} style={{width:"100%"}} onChange={(arg)=>{setTaskTitle(arg.target.value)}} />:''
                                }
                                {
                                    eventType == 3 ? taskTitle:''
                                }
                            </td>
                        </tr>
                    </tbody>
                </table>
                
                <button 
                    type="button" 
                    className={eventType == 1 || eventType == 2 ? "modalSaveBtn":"modalDeleteBtn" } 
                    onClick={()=>{
                        eventType == 1 || eventType == 2 ?
                            saveEvent(eventId, eventDate, taskTitle):deleteEvent(eventId)
                    }} 
                >
                    {eventType == 1 || eventType == 2 ? "Save":"Delete" }
                </button>



                {   
                    eventType == 1 || eventType == 2 ? 
                        <button type="button" className='modalSaveBtn' onClick={()=>{saveEvent(eventId, eventDate, taskTitle)}} >
                            Save 
                        </button>:''
                }
                {   
                    eventType == 3 ?
                        <button type="button" className='modalDeleteBtn' onClick={()=>{deleteEvent(eventId)}} >
                            Delete 
                        </button>:''
                }

                <button type="button" className='modalCloseBtn' onClick={()=>{closeModal(false)}} >
                    Close 
                </button>
            </section>
        </div>
    );
  };