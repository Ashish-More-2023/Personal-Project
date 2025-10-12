import prisma from '../config/database.js';

export const getAllWorkspaces = async () => {
    return await prisma.workspace.findMany({
        orderBy:{ updatedAt: 'desc' },
    });
};

export const getWorkspaceById = async (id)=>{
    return await prisma.workspace.findUnique({
        where: { id },
        include: {
            tasks: true,
            timelines: true,
            events: true,
            notes: true,
        },
    });
};


export const createWorkspace = async (data) => {
    return await prisma.workspace.create({
        data:{
            name: data.name,
            color: data.color,
        },
    });
};

export const updateWorkspace = async (id, data) => {
    return await prisma.workspace.update({
        where: { id },
        data: {
            name: data.name,
            color: data.color,
        },
    });
};
export const deleteWorkspace = async (id) => {
    await prisma.workspace.deleteMany({
        where: { workspaceId: id },
    });

    return await prisma.workspace.delete({
        where: { id },
    });
};

export const getWorkspaceStats = async (id) => {
    const workspace = await prisma.workspace.findUnique({
        where: { id },
        include:{
            tasks:{
                select:{
                    status: true,
                    dueDate:true,

               },
            },
            timelines:{
                select:{
                    startDate:true,
                    endDate:true,
                },
            },
            events:{
                select:{
                    eventDate:true,
                },
            },
            notes:true,
        },
    });

    if(!workspace){
        throw new Error('Workspace not found');
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return {
        workspaceId: workspace.id,
        workspaceName: workspace.name,
        taskStats: {
            total: workspace.tasks.length,
            pending: workspace.tasks.filter(t => t.status === 'pending').length,
            inProgress: workspace.tasks.filter(t => t.status === 'in_progress').length,
            completed: workspace.tasks.filter(t => t.status === 'completed').length,
            dueToday: workspace.tasks.filter(t=>{
                if(!t.dueDate) return false;
                const due = new Date(t.dueDate);
                return due >= today && due < tomorrow;
            }).length,

        },

        timelineStats: {
            total: workspace.timelines.length,
            active:workspace.timelines.filter(t=>{
                const start = new Date(t.startDate);
                const end = new Date(t.endDate);
                return start <= now && end >= now;
            }).length,
            upcoming: workspace.timelines.filter(t => new Date(t.startDate) > now).length,
        },

        eventStats:{
            total:workspace.events.length,
            today: workspace.events.filter(e=>{
                const eventDate = new Date(e.eventDate)
            }).length,
            upcoming:workspace.events.filter(e=> new Date(e.eventDate) > now).length,
        },

        noteStats:{
            total:workspace.notes.length,
        },
    };
};