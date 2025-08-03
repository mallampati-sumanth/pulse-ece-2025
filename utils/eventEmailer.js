const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD,
    },
    tls: { ciphers: 'SSLv3', rejectUnauthorized: false },
    connectionTimeout: 5 * 60 * 1000,
  });
};

// Event registration confirmation email template
const eventRegistrationTemplate = (user, event, registrationDetails) => {
  const eventDate = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const eventTime = event.time || 'TBD';
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Event Registration Confirmation</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f4f4f4;
            }
            .container {
                background: white;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 0 20px rgba(0,0,0,0.1);
            }
            .header {
                text-align: center;
                border-bottom: 3px solid #2b8a3e;
                padding-bottom: 20px;
                margin-bottom: 30px;
            }
            .logo {
                color: #2b8a3e;
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 10px;
            }
            .event-card {
                background: linear-gradient(135deg, #2b8a3e, #51cf66);
                color: white;
                padding: 25px;
                border-radius: 8px;
                margin: 20px 0;
            }
            .event-title {
                font-size: 22px;
                font-weight: bold;
                margin-bottom: 15px;
            }
            .event-details {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 15px;
                margin-top: 20px;
            }
            .detail-item {
                background: rgba(255,255,255,0.1);
                padding: 10px;
                border-radius: 5px;
            }
            .detail-label {
                font-weight: bold;
                font-size: 12px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                opacity: 0.9;
            }
            .detail-value {
                font-size: 14px;
                margin-top: 5px;
            }
            .registration-info {
                background: #f8f9fa;
                padding: 20px;
                border-radius: 8px;
                margin: 20px 0;
                border-left: 4px solid #2b8a3e;
            }
            .footer {
                text-align: center;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #eee;
                color: #666;
                font-size: 14px;
            }
            .btn {
                display: inline-block;
                background: #2b8a3e;
                color: white;
                padding: 12px 24px;
                text-decoration: none;
                border-radius: 5px;
                margin: 10px 0;
                font-weight: bold;
            }
            @media (max-width: 600px) {
                .event-details {
                    grid-template-columns: 1fr;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">🔋 PULSE ECE</div>
                <h1 style="color: #2b8a3e; margin: 0;">Registration Confirmed!</h1>
                <p style="margin: 10px 0 0 0; color: #666;">Thank you for registering for our event</p>
            </div>

            <div style="margin-bottom: 25px;">
                <h2 style="color: #333;">Hello ${user.name}!</h2>
                <p>Great news! Your registration for the following event has been confirmed:</p>
            </div>

            <div class="event-card">
                <div class="event-title">${event.title}</div>
                <p style="margin: 0; opacity: 0.9;">${event.description || 'Join us for an exciting event!'}</p>
                
                <div class="event-details">
                    <div class="detail-item">
                        <div class="detail-label">📅 Date</div>
                        <div class="detail-value">${eventDate}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">⏰ Time</div>
                        <div class="detail-value">${eventTime}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">📍 Venue</div>
                        <div class="detail-value">${event.venue}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">🏷️ Category</div>
                        <div class="detail-value">${event.category}</div>
                    </div>
                    ${event.entryFee > 0 ? `
                    <div class="detail-item">
                        <div class="detail-label">💰 Entry Fee</div>
                        <div class="detail-value">₹${event.entryFee}</div>
                    </div>
                    ` : ''}
                    ${event.capacity ? `
                    <div class="detail-item">
                        <div class="detail-label">👥 Capacity</div>
                        <div class="detail-value">${event.capacity} participants</div>
                    </div>
                    ` : ''}
                </div>
            </div>

            <div class="registration-info">
                <h3 style="margin-top: 0; color: #2b8a3e;">📋 Registration Details</h3>
                <p><strong>Registration ID:</strong> ${registrationDetails._id}</p>
                <p><strong>Registration Date:</strong> ${new Date(registrationDetails.registrationDate).toLocaleDateString()}</p>
                <p><strong>Status:</strong> <span style="color: #2b8a3e; font-weight: bold;">${registrationDetails.status}</span></p>
                ${registrationDetails.isTeamEvent ? `
                <p><strong>Team Event:</strong> Yes</p>
                ${registrationDetails.teamMembers.length > 0 ? `
                <p><strong>Team Members:</strong> ${registrationDetails.teamMembers.length} member(s)</p>
                ` : ''}
                ` : ''}
            </div>

            <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.FRONTEND_URL || 'http://localhost:4000'}/events/${event._id}" class="btn">
                    View Event Details
                </a>
            </div>

            <div style="background: #e3f2fd; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <h4 style="margin-top: 0; color: #1976d2;">📌 Important Notes:</h4>
                <ul style="margin: 0; padding-left: 20px;">
                    <li>Please arrive 15 minutes before the event starts</li>
                    <li>Bring a valid ID for verification</li>
                    <li>Check your email for any event updates</li>
                    ${event.entryFee > 0 ? '<li>Entry fee payment details will be shared separately</li>' : ''}
                    <li>Contact us if you need to make any changes to your registration</li>
                </ul>
            </div>

            <div class="footer">
                <p><strong>Need Help?</strong></p>
                <p>Contact us at: <a href="mailto:${process.env.GMAIL_USERNAME}" style="color: #2b8a3e;">${process.env.GMAIL_USERNAME}</a></p>
                <p>Visit our website: <a href="${process.env.FRONTEND_URL || 'http://localhost:4000'}" style="color: #2b8a3e;">Pulse ECE</a></p>
                <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
                <p style="font-size: 12px; color: #999;">
                    This is an automated email. Please do not reply to this email address.
                </p>
            </div>
        </div>
    </body>
    </html>
  `;
};

// Send event registration confirmation email
const sendEventRegistrationEmail = async (user, event, registrationDetails) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: {
        name: 'Pulse ECE Club',
        address: process.env.GMAIL_USERNAME
      },
      to: user.email,
      subject: `✅ Registration Confirmed: ${event.title}`,
      html: eventRegistrationTemplate(user, event, registrationDetails),
      // Text fallback for email clients that don't support HTML
      text: `
        Hello ${user.name},

        Your registration for "${event.title}" has been confirmed!

        Event Details:
        - Date: ${new Date(event.date).toLocaleDateString()}
        - Time: ${event.time || 'TBD'}
        - Venue: ${event.venue}
        - Category: ${event.category}
        ${event.entryFee > 0 ? `- Entry Fee: ₹${event.entryFee}` : ''}

        Registration ID: ${registrationDetails._id}
        Status: ${registrationDetails.status}

        Please arrive 15 minutes before the event starts and bring a valid ID.

        For any queries, contact us at ${process.env.GMAIL_USERNAME}

        Best regards,
        Pulse ECE Club Team
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Event registration email sent successfully:', result.messageId);
    return result;
  } catch (error) {
    console.error('Error sending event registration email:', error);
    throw error;
  }
};

// Send event reminder email (can be used for cron jobs)
const sendEventReminderEmail = async (user, event) => {
  try {
    const transporter = createTransporter();
    
    const eventDate = new Date(event.date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const mailOptions = {
      from: {
        name: 'Pulse ECE Club',
        address: process.env.GMAIL_USERNAME
      },
      to: user.email,
      subject: `🔔 Reminder: ${event.title} is Tomorrow!`,
      html: `
        <h2>Event Reminder</h2>
        <p>Hello ${user.name},</p>
        <p>This is a friendly reminder that you're registered for <strong>${event.title}</strong> which is scheduled for tomorrow!</p>
        <p><strong>Event Details:</strong></p>
        <ul>
          <li>Date: ${eventDate}</li>
          <li>Time: ${event.time || 'TBD'}</li>
          <li>Venue: ${event.venue}</li>
        </ul>
        <p>Don't forget to attend! See you there.</p>
        <p>Best regards,<br>Pulse ECE Club Team</p>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Event reminder email sent successfully:', result.messageId);
    return result;
  } catch (error) {
    console.error('Error sending event reminder email:', error);
    throw error;
  }
};

module.exports = {
  sendEventRegistrationEmail,
  sendEventReminderEmail
};
