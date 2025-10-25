import { sendEmail, emailTemplates } from '../config/email.js';
import { config } from '../config/env.js';

export const emailService = {
    sendTaskReminder: async (task, workspace) => {
        const template = emailTemplates.taskDueReminder(task, workspace);
        return await sendEmail(config.email.adminEmail, template);
    },

    sendClashAlert: async (timeline, clashes) => {
        const template = emailTemplates.timelineClashAlert(timeline, clashes);
        return await sendEmail(config.email.adminEmail, template);
    },

    sendWelcomeEmail: async (userName) => {
        const template = emailTemplates.welcomeEmail(userName);
        return await sendEmail(config.email.adminEmail, template);
    },
};
