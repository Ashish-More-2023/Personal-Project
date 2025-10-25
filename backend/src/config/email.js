import nodemailer from 'nodemailer';
import { config } from './env.js';

// Create transporter (only if email credentials exist)
let transporter = null;

if (config.email.user && config.email.password) {
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.email.user,
            pass: config.email.password,
        },
    });
} else {
    console.warn('⚠️  Email configuration missing. Email notifications are disabled.');
}

// Email templates
export const emailTemplates = {
    taskDueReminder: (task, workspace) => ({
        subject: `⏰ Reminder: "${task.title}" is due soon!`,
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">Smart Timeline</h1>
        </div>
        
        <div style="padding: 30px; background: #f9fafb;">
          <h2 style="color: #1f2937;">Task Reminder 📋</h2>
          <p style="color: #4b5563; font-size: 16px;">Your task is due soon:</p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
            <h3 style="margin: 0 0 10px 0; color: #1f2937;">${task.title}</h3>
            <p style="color: #6b7280; margin: 5px 0;">
              <strong>Workspace:</strong> ${workspace.name}
            </p>
            <p style="color: #6b7280; margin: 5px 0;">
              <strong>Priority:</strong> <span style="color: ${task.priority === 'high' ? '#ef4444' : task.priority === 'medium' ? '#f59e0b' : '#10b981'}; text-transform: uppercase;">${task.priority}</span>
            </p>
            <p style="color: #6b7280; margin: 5px 0;">
              <strong>Due Date:</strong> ${new Date(task.dueDate).toLocaleString()}
            </p>
            ${task.description ? `<p style="color: #6b7280; margin: 15px 0 5px 0;">${task.description}</p>` : ''}
          </div>
          
          <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">
            Stay organized with Smart Timeline!
          </p>
        </div>
        
        <div style="background: #e5e7eb; padding: 20px; text-align: center;">
          <p style="color: #6b7280; font-size: 12px; margin: 0;">
            Smart Timeline - Your intelligent task manager
          </p>
        </div>
      </div>
    `,
    }),

    timelineClashAlert: (timeline, clashes) => ({
        subject: `⚠️ Timeline Clash Detected: "${timeline.title}"`,
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">Smart Timeline</h1>
        </div>
        
        <div style="padding: 30px; background: #f9fafb;">
          <h2 style="color: #ef4444;">⚠️ Timeline Clash Alert</h2>
          <p style="color: #4b5563; font-size: 16px;">Your timeline overlaps with ${clashes.length} other timeline(s):</p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ef4444;">
            <h3 style="margin: 0 0 10px 0; color: #1f2937;">${timeline.title}</h3>
            <p style="color: #6b7280; margin: 5px 0;">
              <strong>Duration:</strong> ${new Date(timeline.startDate).toLocaleDateString()} - ${new Date(timeline.endDate).toLocaleDateString()}
            </p>
          </div>
          
          <h3 style="color: #1f2937; margin-top: 25px;">Clashing with:</h3>
          ${clashes.map(clash => `
            <div style="background: #fef2f2; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 3px solid #fca5a5;">
              <p style="margin: 5px 0; color: #991b1b;">
                <strong>${clash.title}</strong> (${clash.workspaceName})
              </p>
              <p style="margin: 5px 0; color: #6b7280; font-size: 14px;">
                ${new Date(clash.startDate).toLocaleDateString()} - ${new Date(clash.endDate).toLocaleDateString()}
              </p>
            </div>
          `).join('')}
          
          <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">
            Please review your timelines to avoid conflicts.
          </p>
        </div>
        
        <div style="background: #e5e7eb; padding: 20px; text-align: center;">
          <p style="color: #6b7280; font-size: 12px; margin: 0;">
            Smart Timeline - Your intelligent task manager
          </p>
        </div>
      </div>
    `,
    }),

    welcomeEmail: (userName) => ({
        subject: '🎉 Welcome to Smart Timeline!',
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">Smart Timeline</h1>
        </div>
        
        <div style="padding: 30px; background: #f9fafb;">
          <h2 style="color: #1f2937;">Welcome, ${userName}! 🎉</h2>
          <p style="color: #4b5563; font-size: 16px;">
            Thank you for choosing Smart Timeline to organize your projects and tasks!
          </p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1f2937; margin-top: 0;">What you can do:</h3>
            <ul style="color: #6b7280; line-height: 1.8;">
              <li>📁 Create multiple workspaces for different projects</li>
              <li>✅ Manage tasks with priorities and due dates</li>
              <li>⏰ Track timelines with automatic clash detection</li>
              <li>📅 Schedule events and meetings</li>
              <li>📝 Take notes with tags</li>
              <li>📊 View daily summaries of your activities</li>
            </ul>
          </div>
          
          <p style="color: #4b5563; font-size: 16px;">
            Start by creating your first workspace and add some tasks!
          </p>
        </div>
        
        <div style="background: #e5e7eb; padding: 20px; text-align: center;">
          <p style="color: #6b7280; font-size: 12px; margin: 0;">
            Smart Timeline - Your intelligent task manager
          </p>
        </div>
      </div>
    `,
    }),
};

// Send email function
export const sendEmail = async (to, { subject, html }) => {
    if (!transporter) {
        console.warn('⚠️  Email not sent - transporter not configured');
        return { success: false, error: 'Email not configured' };
    }

    try {
        const info = await transporter.sendMail({
            from: `"Smart Timeline" <${config.email.user}>`,
            to,
            subject,
            html,
        });
        console.log('Email sent:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Email sending failed:', error);
        return { success: false, error: error.message };
    }
};

export default transporter;
