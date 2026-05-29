import Paperclip from '../../../assets/images/Paperclip.svg';
import { useEffect, useState } from 'react';

import { auth } from '@/firebase-config';


const AcknowForm = () => {

    const sendStyle =
    {
        display: 'flex',
        justifyContent: 'right',
        alignItems: 'center',
        gap: '8px',
    };
    const utilStyle =
    {
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center',
    };
    const buttonCont =
    {
        display: 'flex',
        justifyContent: 'space-between',
    }
    const imgStyle =
    {
        width: '16px',
    }

    const hStyle =
    {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        marginTop: '10px',
        width: '90%',
        height: '20%',
        borderRadius: '5px'
    }

    const dropStyle =
    {
        height: '30px',
        marginRight: '15px',
        marginLeft: '15px',
        marginTop: '6px',
        borderRadius: '5px'
    }

    const lblStyle = {
        height: '20px',
        borderRadius: '5px',
        marginTop: '4px',
        marginBottom: '3px',
    }

    const sbjContainer=
    {
        display: 'grid',
        gridTemplateColumns: '0.5fr 3fr',
        alignItems: 'center',
    }

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [emailSubject, setEmailSubject] = useState('');
    const [selectedVolunteer, setSelectedVolunteer] = useState('');
    const [emailBody, setEmailBody] = useState('');
    const [sending, setSending] = useState(false);

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

    const sendEmail = async (e) => {
  e.preventDefault();

    if (!emailSubject) {
    alert('Please enter a subject line');
    return;
  }

  if (!selectedVolunteer) {
    alert('Please select a volunteer');
    return;
  }

  if (!emailBody.trim()) {
    alert('Please enter the email body');
    return;
  }

  setSending(true);

  try {
    const token = await auth.currentUser?.getIdToken();
    
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/email/sendEmail`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        to: selectedVolunteer,
        subject: emailSubject,
        html: emailBody,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      alert('Email sent successfully!');
      setEmailSubject('');
      setEmailBody('');
      setSelectedVolunteer('');
    } else {
      alert('Error: ' + (data.error || 'Failed to send email'));
    }
  } catch (error) {
    console.error('Error sending email:', error);
    alert('Error sending email: ' + error.message);
  } finally {
    setSending(false);
  }
};

    if (loading) {
        return <div>Loading users...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div class="container">
            <form onSubmit={sendEmail}>
                <div>                    
                    <label htmlFor="volunteers" >
                        <strong>Select Volunteer:</strong>
                    </label>
                    <select
                        style={dropStyle}
                        name="volunteers"
                        id="volunteers"
                        value={selectedVolunteer}
                        onChange={(e) => setSelectedVolunteer(e.target.value)}
                    >
                        <option value="">Select Volunteer</option>
                        {users.map((user) => (
                            <option key={user.email} value={user.email}>{user.firstname} {user.lastname}</option>
                        ))}
                    </select>
                </div>
                <div style={sbjContainer}>
                    <label for="subject"><strong>Subject:</strong></label>
                    <textarea style={lblStyle}
                            value={emailSubject}
                            onChange={(e) => setEmailSubject(e.target.value)}
                    >    
                    </textarea>
                </div>
                <textarea
                    id="subject"
                    name="subject"
                    class="body"
                    placeholder="Write something.."
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                />
                <div style={buttonCont}>
                    <span style={sendStyle}><input type="submit" value="+" />
                        <input type='image' style={imgStyle} src={Paperclip} alt=""></input></span>
                    <span style={utilStyle}>
                        <input
                            type="submit"
                            value={sending ? "Sending..." : "Send Email"}
                            disabled={sending}
                        />
                    </span>
                </div>
            </form>
        </div>
    );
};

export default AcknowForm;