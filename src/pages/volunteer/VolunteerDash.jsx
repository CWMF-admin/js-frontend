import WeekCal from "@/common/components/dashboard/WeekCal";
import PageHeader from '@/common/components/atoms/PageHeader';
import { BodyContainer } from '@/common/components/form/styles';
import 'temporal-polyfill/global'
import '@schedule-x/theme-default/dist/index.css'
import styled from 'styled-components';
import { auth } from '@/firebase-config';
import UpcomingEvents from '@/common/components/dashboard/UpcomingEvents';
import { useEffect, useState } from "react";

const VolunteerDash = () => {
    const styleBody = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    };
    const StyleEventsTitle = styled.h3`
    margin-bottom: 0px;
  `;
  const EventsContainerStyle = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    margin-left: 40px;
    margin-top: 20px;
    background-color: #fff;
    padding: 10px 20px;
    border-radius: 15px;
    box-shadow: 0px 1px 2px lightgray;
    gap: 20px;
    @media (max-width: 768px) {
      width: 80%;
      margin-left: 0px;
    }
  `;
      const [events, setEvents] = useState([]);
    useEffect(() => {
      const fetchEvents = async () => {
        try {
          const token = await auth.currentUser?.getIdToken();
          const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/events`, 
            {
              credentials: 'include', 
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
  
          );
          if (!response.ok) {
            throw new Error('Failed to fetch events');
          }
          const data = await response.json();
          console.log('Fetched events:', data);
          setEvents(data);
        }
        catch (err) {
          console.error('Error fetching events:', err);
        }
      };
      fetchEvents();
    }, []);

    return(
        <div style ={styleBody}>
            <PageHeader title = "Dashboard"/>
            <BodyContainer>
                <WeekCal></WeekCal>
            <EventsContainerStyle>
          <StyleEventsTitle>Upcoming Events</StyleEventsTitle>
          {events.map((event) => (
            <UpcomingEvents
              key={event.id}
              EventTitle={event.title}
              tag="Holiday Event"
              currVol={event.currentVolunteers}
              volCap={event.capacity}
              date={new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              time={`${new Date(event.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${new Date(event.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
              location={event.location}
            />
          ))}
        {/*  <UpcomingEvents EventTitle="Spring Holiday Meal Drive" tag="Holiday Event" currVol="2" volCap="25" date="Mar 27, 2026" time="8:00 AM - 2:00 PM" location="CW Foundation Community Center"/>
          <UpcomingEvents EventTitle="Grocery Giveaway" tag="Grocery Giveaway" currVol="0" volCap="15" date="Feb 27, 2026" time="9:00 AM - 12:00 PM" location="CW Foundation Community Center"/>*/}
        </EventsContainerStyle>
            </BodyContainer>
        </div>
    );
};

export default VolunteerDash;