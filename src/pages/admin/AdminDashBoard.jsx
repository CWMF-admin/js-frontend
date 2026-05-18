import React from 'react';

import PageHeader from '@/common/components/atoms/PageHeader';
import { BodyContainer } from '@/common/components/form/styles';
import RecentVolunteer from '@/common/components/dashboard/RecentVolunteer';
import Stats from '../../common/components/dashboard/Stats';
import UpcomingEvents from '@/common/components/dashboard/UpcomingEvents';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

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
      `;

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <StyleBody>
      <PageHeader title='Dashboard' />
      <BodyContainer>
        <StatsContainerStyle id="statsContainerStyle">
          <Stats title="TOTAL VOLUNTEERS" number="6" bottomText="4 active" category="Volunteers" />
          <Stats title="UPCOMING EVENTS" number="2" bottomText="Scheduled" category="Events" />
          <Stats title="TOTAL HOURS" number="6" bottomText="Served" category="Hours" />
          <Stats title="TOTAL SIGNUPS" number="7" bottomText="2 attended" category="Signups" />
        </StatsContainerStyle>
        <EventsVolunteerContainerStyle>
          <EventsContainerStyle>
            <StyleEventsTitle>Upcoming Events</StyleEventsTitle>
            <UpcomingEvents EventTitle="Spring Holiday Meal Drive" tag="Holiday Event" currVol="2" volCap="25" date="Mar 27, 2026" time="8:00 AM - 2:00 PM" location="CW Foundation Community Center" />
            <UpcomingEvents EventTitle="Grocery Giveaway" tag="Grocery Giveaway" currVol="0" volCap="15" date="Feb 27, 2026" time="9:00 AM - 12:00 PM" location="CW Foundation Community Center" />
          </EventsContainerStyle>
          <VolunteerContainerStyle>
            <h3>Recent Volunteers</h3>
            {users.map((user) => (
              <RecentVolunteer initials={user.firstname[0] + user.lastname[0]} firstname={user.firstname} lastname={user.lastname} email={user.email} tag="active" />
            ))}
          </VolunteerContainerStyle>
        </EventsVolunteerContainerStyle>
      </BodyContainer>
    </StyleBody>
  );
};

export default AdminDashBoard;
