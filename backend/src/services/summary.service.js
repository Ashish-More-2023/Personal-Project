import prisma from "../config/database.js";

export const getDailySummary = async (date = new Date()) => {
    const targetDate = new Date(date);
    const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));

    const workspaces = await prisma.workSpace.findMany({
        include:{
            tasks:{
                where:{
                    OR:[
                        { dueDate: {
                            gte: startOfDay,
                            lte: endOfDay,
                          },
                        },
                        {
                            status:{in: ['pending', 'in-progress']},
                        },
                    ],
                },
            },
            events:{
                where:{
                    eventDate: {gte: startOfDay, lte: endOfDay},
                },
            },
        },
    });

    const timelinesActive = await prisma.timeline.findMany({
        where:{
            startDate: {lte: endOfDay},
            endDate: {gte: startOfDay},
        },
    });

    const timelinesEndingToday = await prisma.centralTimeline.findMany({
        where:{
            endDate: {gte: startOfDay, lte: endOfDay},
        },
    });

    const summary = workspaces.map(ws => {
        const tasksDueToday = ws.tasks.filter(t=>{
            if(t.dueDate) return false;
            const dueDate = new Date(t.dueDate);
            return dueDate >= startOfDay && dueDate <= endOfDay;
        });

        const workspaceTimelinesActive = timelinesActive.filter(t => t.workspaceId === ws.id);
        const workspaceTimelinesEndingToday = timelinesEndingToday.filter(t => t.workspaceId === ws.id);
        return {
            wsorkspaceId: ws.id,
            workspaceName: ws.name,
            workspaceColor: ws.color,
            tasksDueToday:tasksDueToday.length,
            tasksDetails: tasksDueToday.map(t=>({
                id: t.id, title: t.title,
                status: t.status,
                priority: t.priority,
            })),

            eventsToday: ws.events.length,
            eventsDetails: ws.events.map(e=>({
                id: e.id, title: e.title,
                eventDate: e.eventDate,
                location: e.location,
            })),
        };

    });
    const totalItems = summary.reduce((acc, ws) => {
        return acc + ws.tasksDueToday + ws.eventsToday + ws.timelinesEndingToday;

    }, 0);

    return {
        date:targetDate.toISOString().split('T')[0],
        totalItems,
        totalWorkspaces: workspaces.length,
        workspaceSummaries: summary,
        isEmpty: totalItems === 0,
    };

};
