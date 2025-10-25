import dotenv from 'dotenv';
dotenv.config();

export const config = {
    port: process.env.PORT || 5001,
    nodeEnv: process.env.NODE_ENV || 'development',
    databaseUrl: process.env.DATABASE_URL,

    auth: {
        adminId: process.env.ADMIN_ID,
        adminPassword: process.env.ADMIN_PASSWORD,
        jwtSecret: process.env.JWT_SECRET,
        jwtExpiresIn: '7d',
    },

    email: {
        user: process.env.EMAIL_USER,
        password: process.env.EMAIL_PASSWORD,
        adminEmail: process.env.ADMIN_EMAIL,
    },

    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
};

const requiredEnvVars = [
    'DATABASE_URL',
    'ADMIN_ID',
    'ADMIN_PASSWORD',
    'JWT_SECRET',
    'FRONTEND_URL',
];

const optionalEnvVars = ['EMAIL_USER', 'EMAIL_PASSWORD', 'ADMIN_EMAIL'];

requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
        console.error(`Missing required environment variable: ${envVar}`);
    }
});

optionalEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
        console.warn(`Optional environment variable missing: ${envVar} (Email notifications disabled)`);
    }
});
