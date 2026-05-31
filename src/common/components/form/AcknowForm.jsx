import { useEffect, useState } from 'react';
import { auth } from '@/firebase-config';
import {     acknowledgementTemplate, 
    thankyouTemplate, 
    invitationTemplate
 } from '../emails/templates.js';

const AcknowForm = () => {

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
    const [templateDropdown, setTemplateDropdown] = useState('');
    
    const [templateVars, setTemplateVars] = useState({
        volunteerName: '',
        eventName: '',
        eventDate: '',
        eventLocation: '',
    });

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

    const handleTemplateSelect = (e) => {
        const selectedTemplate = e.target.value;
        setTemplateDropdown(selectedTemplate);
        
        const volunteer = users.find(u => u.email === selectedVolunteer);
        if (volunteer) {
            setTemplateVars(prev => ({
                ...prev,
                volunteerName: `${volunteer.firstname}`
            }));
        }

        const organizationName = '';

        if (selectedTemplate === 'acknowledgement') {
            setEmailBody(acknowledgementTemplate(
                templateVars.volunteerName || 'Valued Volunteer',
                organizationName
            ));
            setEmailSubject('Acknowledgement Letter');
        } else if (selectedTemplate === 'thankyou') {
            setEmailBody(thankyouTemplate(
                templateVars.volunteerName || 'Valued Volunteer',
                templateVars.eventName || 'Your Service'
            ));
            setEmailSubject('Thank You');
        } else if (selectedTemplate === 'invitation') {
            setEmailBody(invitationTemplate(
                templateVars.volunteerName || 'Valued Volunteer',
                templateVars.eventName || 'Our Event',
                templateVars.eventDate || 'TBD',
                templateVars.eventLocation || 'TBD'
            ));
            setEmailSubject('You\'re Invited!');
        }
    };

    const handleVolunteerChange = (e) => {
        const volunteerId = e.target.value;
        setSelectedVolunteer(volunteerId);
        
        const volunteer = users.find(u => u.email === volunteerId);
        if (volunteer) {
            setTemplateVars(prev => ({
                ...prev,
                volunteerName: `${volunteer.firstname}`
            }));
        }
    };

    const handleTemplateVarChange = (e) => {
        const { name, value } = e.target;
        setTemplateVars(prev => ({
            ...prev,
            [name]: value
        }));
    };

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
      setTemplateDropdown('');
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

    return (
        <div className="container">
            <form onSubmit={sendEmail}>
                <div>                    
                    <label htmlFor="volunteers">
                        <strong>Select Volunteer:</strong>
                    </label>
                    <select
                        style={dropStyle}
                        name="volunteers"
                        id="volunteers"
                        value={selectedVolunteer}
                        onChange={handleVolunteerChange}
                    >
                        <option value="">Select Volunteer</option>
                        {users.map((user) => (
                            <option key={user.email} value={user.email}>{user.firstname} {user.lastname}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="template"><strong>Email Template:</strong></label>
                    <select
                        style={dropStyle}
                        name="template"
                        id="template"
                        value={templateDropdown}
                        onChange={handleTemplateSelect}
                    >
                        <option value="">-- Select a template --</option>
                        <option value="acknowledgement">Acknowledgement Letter</option>
                        <option value="thankyou">Thank You</option>
                        <option value="invitation">Invitation</option>
                    </select>
                </div>

                {/* Template Variables Form */}
                {templateDropdown && (
                    <div style={{border: '1px solid #ddd', padding: '10px', marginTop: '10px', borderRadius: '5px'}}>
                        <strong>Customize Template:</strong>
                    
                        {(templateDropdown === 'thankyou' || templateDropdown === 'invitation') && (
                            <div>
                                <label>Event Name:</label>
                                <input 
                                    type="text"
                                    name="eventName"
                                    value={templateVars.eventName}
                                    onChange={handleTemplateVarChange}
                                    style={{width: '100%', padding: '5px', marginTop: '5px'}}
                                />
                            </div>
                        )}
                        {templateDropdown === 'invitation' && (
                            <>
                                <div>
                                    <label>Event Date:</label>
                                    <input 
                                        type="text"
                                        name="eventDate"
                                        value={templateVars.eventDate}
                                        onChange={handleTemplateVarChange}
                                        style={{width: '100%', padding: '5px', marginTop: '5px'}}
                                    />
                                </div>
                                <div>
                                    <label>Event Location:</label>
                                    <input 
                                        type="text"
                                        name="eventLocation"
                                        value={templateVars.eventLocation}
                                        onChange={handleTemplateVarChange}
                                        style={{width: '100%', padding: '5px', marginTop: '5px'}}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                )}

                <div style={sbjContainer}>
                    <label htmlFor="subject"><strong>Subject:</strong></label>
                    <textarea style={lblStyle}
                            id="subject"
                            value={emailSubject}
                            onChange={(e) => setEmailSubject(e.target.value)}
                    >    
                    </textarea>
                </div>
                <textarea
    id="body"
    name="body"
    className="body"
    placeholder="Write something.."
    value={emailBody}
    onChange={(e) => setEmailBody(e.target.value)}
/>
                <div style={buttonCont}>
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
