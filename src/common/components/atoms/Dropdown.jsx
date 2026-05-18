import { useEffect, useState } from 'react';

import { auth } from '@/firebase-config';
const Dropdown = () => 
    {

        const hStyle = 
        {
            display:'flex',
            flexDirection:'column',
            backgroundColor:'#ffffff',
            marginTop:'10px',
            width:'90%',
            height:'20%',
            borderRadius:'5px'
        }

        const dropStyle = 
        {
            height:'30px',
            marginRight:'15px',
            marginLeft:'15px',
            marginTop:'6px',
            borderRadius:'5px'
        }

        const lblStyle = {
            paddingTop:'15px',
            paddingLeft:'15px',
        }

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

        return(
            <div style={hStyle}>
            
                <label htmlFor="cars" style={lblStyle}>
                    <strong>Select Volunteer:</strong>
                </label>
                <select style={dropStyle} name="volunteers" id="volunteers">
                <option value="">Select Volunteer</option>
                {users.map((user) => (
                <option key={user.email} value={user.email}>{user.firstname} {user.lastname}</option>
                ))}
                </select>
            </div>
        );
    };

export default Dropdown;