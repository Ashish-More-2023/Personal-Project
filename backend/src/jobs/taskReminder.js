import cron from 'node-cron';
import prisma from '../config/database.js';  
import { emailService } from '../services/emailService.js';

// Run every day at 9:00 AM
export const startTaskReminderJob = () => {
  cron.schedule('47 7 * * *', async () => {
    console.log('🔔 Running daily task reminder job...');
    
    try {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(23, 59, 59, 999);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const tasks = await prisma.task.findMany({
        where: {
          dueDate: {
            gte: today,
            lte: tomorrow,
          },
          status: {
            not: 'completed',
          },
        },
        include: {
          workspace: true,
        },
      });

      for (const task of tasks) {
        await emailService.sendTaskReminder(task, task.workspace);
      }

      console.log(`✅ Sent ${tasks.length} task reminder(s)`);
    } catch (error) {
      console.error('❌ Task reminder job failed:', error);
    }
  });

  console.log('✅ Task reminder cron job scheduled (7:44 AM daily)');
};
