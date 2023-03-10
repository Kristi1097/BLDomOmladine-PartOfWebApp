import FullCalendar, { eventTupleToStore } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import loklLocale from '@fullcalendar/core/locales/sr-cyrl'
import Dogadjaji from './Dogadjaji';
import useFetch from './useFetch';
import { useParams } from 'react-router-dom';
/*const events = [
  {
    id: 1,
    title: 'Sala 1',
    start: '2022-06-14T10:00:00',
    end: '2022-06-14T12:00:00',
    color:'green',
  },
  {
    id: 2,
    title: 'Sala 2',
    start: '2022-06-16T13:00:00',
    end: '2022-06-16T18:00:00',
    color:'yellow',
  },
  { 
    id: 3, 
    title: 'Sala 3', 
    start: '2022-06-17', 
    end: '2022-06-20' ,
    color:'orange',
  },
  {
      id: 4,
      title: 'Sala 1',
      start: '2022-06-14T10:00:00',
      end: '2022-06-14T13:00:00',
      color:'red',
  },
  {
      id: 5,
      title: 'Sala 2',
      start: '2022-06-16T13:00:00',
      end: '2022-06-16T18:00:00',
      color:'orange',
    },
    { 
      id: 6, 
      title: 'Sala 3', 
      start: '2022-06-17', 
      end: '2022-06-20' ,
      color:'orange',}
      ,
];
   */
function KalendarPocetna() {
  /* {dogadjaji.map((dogadjaj)=>(
    <div className="dogadjaji-dogadjaj" key={dogadjaj.idDogadjaj}>
    {dogadjaj.id}
   { dogadjaj.naziv}
    {dogadjaj.datumOd}
    {dogadjaj.datumDo}
    </div>
  ))}
  });*//*{
    calendar.fullCalendar('renderEvent',{
      '{title: "${dogadjaj.title}"}`,
      start:`${dogadjaj.start}`,
      end: `${dogadjaj.end}`,
      })*/
      const {errord,isPendingd,data: rasporedi}=useFetch(global.urls.links.kalendarPocetna);
      //const events = dogadjaji.map(item => { return { title: item.naziv, start: item.datumOd, end: item.datumDo } })
      let events = []
    
        for(var j in rasporedi) {
          const evObject = {
            id:rasporedi[j].idDogadjajRaspored,
            title:rasporedi[j].nazivSala,
            start: rasporedi[j].zauzetaOd,
            end:rasporedi[j].zauzetaDo,
            
          }
            events.push(evObject)
        }     
            
     /* let events = []
    
    for(let i=0;i<dogadjaji.length;i++){
          const evObject = {
            id:dogadjaji[i].id,
            title: dogadjaji[i].naziv,
            start: dogadjaji[i].datumOd,
            end:dogadjaji[i].datumDo,
          }
          console.log({evObject});
          events.push(evObject)
          }
      ;*/
      return (
        <div className="App">    
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridWeek"
            headerToolbar={{
              center: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            locale={loklLocale}
            events={events}
            eventColor="red"
            nowIndicator
            dateClick={(e) => console.log(e.dateStr)}
            eventClick={(e) => console.log(e.event.id)}
          />
        </div>
      );
    
}  
 
export default KalendarPocetna;