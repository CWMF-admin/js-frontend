export const acknowledgementTemplate = (volunteerName) => `
<p>Hello ${volunteerName},</p>
<p>Thank you for your valuable contribution and dedication to C&W Market Foundation.</p>
<p>Your hard work and commitment are greatly appreciated.</p>
<p>Best regards,
<br/>C&W Market Foundation</p>
`;

export const thankyouTemplate = (volunteerName, eventName) => `
<p>Hello ${volunteerName},</p>
<p>We want to express our sincere gratitude for your service at ${eventName}!</p>
<p>Your efforts have made a real difference.</p>
<p>Warm regards,
<br/>C&W Market Foundation</p>
`;

export const invitationTemplate = (volunteerName, eventName, eventDate, eventLocation) => `
<p>Hello ${volunteerName},</p>
<p>We would like to invite you to <strong>${eventName}</strong>!</p>
<p><strong>Date:</strong> ${eventDate}</p>
<p><strong>Location:</strong> ${eventLocation}</p>
<p>We hope you can join us!</p>
<p>Looking forward to seeing you,
<br/>C&W Market Foundation</p>
`;

export const confirmationTemplate = (volunteerName, eventName) => `
<p>Hello ${volunteerName},</p>
<p>We're excited to have you signed up for <strong>${eventName}</strong>!</p>
<p>See you there!</p>
<p>Best regards,<br/>C&W Market Foundation</p>
`;

