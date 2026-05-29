import React, { useEffect, useState } from 'react';

import PageHeader from '@/common/components/atoms/PageHeader';
import { BodyContainer } from '@/common/components/form/styles';
import RecentVolunteer from '@/common/components/dashboard/RecentVolunteer';
import Stats from '../../common/components/dashboard/Stats';
import UpcomingEvents from '@/common/components/dashboard/UpcomingEvents';
import styled from 'styled-components';
import { auth } from '@/firebase-config';
const AdminDashBoard = () => {
 /* const [widthSmall, setWidthSmall] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => {
      setWidthSmall(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);*/
  const StyleBody = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  `;
  const StatsContainerStyle = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    width: 100%;
    @media (max-width: 768px) {
      flex-direction: column;
      align-items: center;
    }
  `;
  const StyleEventsTitle = styled.h3`
    margin-bottom: 0px;
  `;
  const EventsContainerStyle = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin-left: 40px;
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
  const VolunteerContainerStyle = styled.div`
    display: flex;
    flex-direction: column;
    width: 30%;
    height: auto;
    background-color: #fff;
    padding: 10px 20px;
    border-radius: 15px;
    box-shadow: 0px 1px 2px lightgray;
    margin-right: 50px;
    @media (max-width: 768px) {
      width: 80%;
      margin-right: 0px;
    }
  `;
  const EventsVolunteerContainerStyle = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    @media (max-width: 768px) {
      flex-direction: column;
      align-items: center;
      gap: 20px;
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
   const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = await auth.currentUser?.getIdToken();
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/auth/users`, 
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
        console.log('Fetched users:', data);
        setUsers(data);
      }
      catch (err) {
        console.error('Error fetching users:', err);
      }
    };
    fetchUsers();
  }, []);
  const [eventTimes, setEventTimes] = useState([]);
  useEffect(() => {
    const fetchEventTimes = async () => {
      try {
        const token = await auth.currentUser?.getIdToken();
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/events/calendar`,
          {
            credentials: 'include',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        console.log('Fetched Calendar Events', data);
        setEventTimes(data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };

    fetchEventTimes();
  }, []);

  const mergedEvents = events.map((event) => {
    const calData = eventTimes.find((time) => String(time.id) === String(event.id));
    return {
      ...event,
      ...calData,
    };
  });
  useEffect(() => {
  console.log("Merged events:", mergedEvents);
  }, [mergedEvents]);
  events.forEach((event) => {
  console.log("EVENT ID:", event.id);
});

eventTimes.forEach((time) => {
  console.log("TIME ID:", time.id);
  console.log("TIME EVENT ID:", time.event_id);
});


  
  return (
    <StyleBody>
      <PageHeader title='Dashboard' />
      <BodyContainer>
        <StatsContainerStyle id="statsContainerStyle">
          <Stats title="TOTAL VOLUNTEERS" number="6" bottomText="4 active" category="Volunteers"/>
          <Stats title="UPCOMING EVENTS" number="2" bottomText="Scheduled" category="Events"/>
          <Stats title="TOTAL HOURS" number="6" bottomText="Served" category="Hours"/>
          <Stats title="TOTAL SIGNUPS" number="7" bottomText="2 attended" category="Signups"/>
        </StatsContainerStyle>
        <EventsVolunteerContainerStyle>
        <EventsContainerStyle>
          <StyleEventsTitle>Upcoming Events</StyleEventsTitle>
          {mergedEvents.map((event) => (
            <UpcomingEvents
              key={event.id}
              EventTitle={event.title}
              tag="Holiday Event"
              currVol={event.signupCount}
              volCap={event.capacity}
              date={new Date(event.start_time).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              time={`${new Date(event.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${new Date(event.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
              location={event.location}
            />
          ))}
        {/*  <UpcomingEvents EventTitle="Spring Holiday Meal Drive" tag="Holiday Event" currVol="2" volCap="25" date="Mar 27, 2026" time="8:00 AM - 2:00 PM" location="CW Foundation Community Center"/>
          <UpcomingEvents EventTitle="Grocery Giveaway" tag="Grocery Giveaway" currVol="0" volCap="15" date="Feb 27, 2026" time="9:00 AM - 12:00 PM" location="CW Foundation Community Center"/>*/}
        </EventsContainerStyle>
        <VolunteerContainerStyle>
          <h3>Recent Volunteers</h3>
          {users.slice(0, 6).map((user) => (
            <RecentVolunteer
              key={user.email}
              initials={`${user.firstname[0]}${user.lastname[0]}`}
              name={`${user.firstname} ${user.lastname}`}
              email={user.email}
              tag="active"
            />
          ))}
         {/* <RecentVolunteer initials="MY" name="Maddy Young" email="madeleineyoung2029@u.northwestern.edu" tag="active"/>
          <RecentVolunteer initials="HM" name="HayleyMcCormack" email="hayleymccormack@u.northwestern.edu" tag="pending"/>
          <RecentVolunteer initials="KX" name="Kayla Xu" email="kaylaxu@u.northwestern.edu" tag="inactive"/>
          <RecentVolunteer initials="DA" name="Danah Ansari" email="danahansari@u.northwestern.edu" tag="active"/>
          <RecentVolunteer initials= "AW" name="Alivia Wynn" email="aliviawynn@u.northwestern.edu" tag="pending"/>
          <RecentVolunteer initials="BI" name="Ben Isaac" email="benisaac@u.northwestern.edu" tag="inactive"/>*/}
        </VolunteerContainerStyle>
        </EventsVolunteerContainerStyle>
      </BodyContainer>
    </StyleBody>
  );
};

export default AdminDashBoard;
