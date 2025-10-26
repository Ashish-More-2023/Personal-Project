import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    
    datasources: {
        db: {
            url: process.env.DATABASE_URL,
        },
    },
});

export const connectDatabase = async () => {
    let retries = 5;
    
    while (retries > 0) {
        try {
            await prisma.$connect();
            
            // Test the connection
            await prisma.$queryRaw`SELECT 1`;
            
            console.log('Database connected successfully');
            return;
        } catch (error) {
            retries--;
            console.error(`Database connection failed. Retries left: ${retries}`);
            console.error('Error:', error.message);
            
            if (retries === 0) {
                console.error('Could not connect to database after 5 attempts');
                process.exit(1);
            }

            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }
};

export const disconnectDatabase = async () => {
    try {
        await prisma.$disconnect();
        console.log('Database disconnected successfully');
    } catch (error) {
        console.error('Error disconnecting from database:', error);
    }
};

prisma.$on('error', (e) => {
    console.error('Prisma error:', e);
});

setInterval(async () => {
    try {
        await prisma.$queryRaw`SELECT 1`;
    } catch (error) {
        console.error('Keep-alive query failed:', error.message);
    }
}, 60000); 

export default prisma;
