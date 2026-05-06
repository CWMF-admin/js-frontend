import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import 'temporal-polyfill/global'
import '@schedule-x/theme-default/dist/index.css'
import { useState } from 'react';
import { useEffect } from 'react';
import { createEventModalPlugin } from '@schedule-x/event-modal'
import Calendar from '../../../assets/images/Calendar.svg';
import Clock from '../../../assets/images/Clock.svg';
import { Button } from '../atoms/Button'
 
function WeekCal() { 
    const eventsService = useState(() => createEventsServicePlugin())[0]

    const eventModStyle = 
    {
      border: "solid, 1px, #d3d3d3",
      borderRadius: "5px",
      padding: "10px",
    }

    const imgStyle = 
    {
      width: "20px",
    }

    const eventTitle = 
    {
      display: 'grid',
      alignItems: 'flex-start',
      gridTemplateColumns: '30px 1fr',
      padding:"2px",
    };

    const desStyle = 
    {
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      padding: "5px",
    }


    const monthVector = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const customComponents = {
    eventModal: ({ calendarEvent }) => {
      return (
        <div style={eventModStyle}>
          <div style={eventTitle}>
            <div><img style={imgStyle} src={Calendar} alt="" /></div>
            <div>{calendarEvent.title}</div>
          </div>
          <div style={eventTitle}>
            <div><img style={imgStyle} src={Clock} alt="" /></div>
            <div>{monthVector[calendarEvent.start.month - 1] + " " + calendarEvent.start.toString()[8] + calendarEvent.start.toString()[9] + ", " + calendarEvent.start.toString()[0] + calendarEvent.start.toString()[1] + calendarEvent.start.toString()[2] + calendarEvent.start.toString()[3]}</div>
          </div>
          <div style={desStyle}>{calendarEvent.description}</div>
          <div style={desStyle}><Button.Primary>Sign Up</Button.Primary></div>
        </div>
      );
    },
  }


    const calendar = useCalendarApp(
      {
        views: [createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
        events: [
            {
              id: '1',
              title: 'Grocery Giveaway (8/10)',
              start: Temporal.ZonedDateTime.from('2026-04-15T08:00:00-05:00[America/Chicago]'),
              end: Temporal.ZonedDateTime.from('2026-04-15T10:00:00-05:00[America/Chicago]'),
              description: 'At the corner of Church and Dodge families facing food insecurity can come pick-up a free bag of groceries for their household. '
            },
            {
              id: '2',
              title: 'Grocery Giveaway (7/10)',
              start: Temporal.ZonedDateTime.from('2026-04-17T14:00:00-05:00[America/Chicago]'),
              end: Temporal.ZonedDateTime.from('2026-04-17T17:00:00-05:00[America/Chicago]'),
              description: 'At the corner of Church and Dodge families facing food insecurity can come pick-up a free bag of groceries for their household. '
            }
          ],
            dayBoundaries: {
            start: '08:00',
            end: '22:00',
            },
            timezone:'America/Chicago',
          plugins: [eventsService, createEventModalPlugin()]
      })

        useEffect(() => {
    // get all events
    eventsService.getAll()
  }, [])

  return (
      <ScheduleXCalendar customComponents={customComponents} calendarApp={calendar}/>
  )
}
 
export default WeekCal