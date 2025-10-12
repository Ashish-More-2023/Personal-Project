import prisma from '../config/database.js';

export const getAllTasks = async (workspaceId) => {
    const where = workspaceId ? { workspaceId } : {};
    return await prisma.task.findMany({
        where,
        include:{
            workspace:{
                select:{ id:true, name:true, color:true },
            },
        },
        orderBy: { updatedAt: 'desc' },
    });
};

export const getTaskById = async (id)=>{
    return await prisma.task.findUnique({
        where: {id},
        include:{
            workspace:{
                select:{ id:true, name:true, color:true },
            },
        },
    });
};

export const createTask = async (data)=>{
    return await prisma.task.create({
        data:{
            workspaceId: data.workspaceId,
            title: data.title,
            description: data.description,
            status: data.status,
            priority: data.priority,
            dueDate: data.dueDate ? new Date(data.dueDate) : null,
        },
        include:{
            workspace:{
                select:{ id:true, name:true,},

            },
        },
    });
};

export const updateTask = async (id, data)=>{
    const updateData = {};
    if(data.title !== undefined) updateData.title = data.title;
    if(data.description !== undefined) updateData.description = data.description;
    if(data.status !== undefined) updateData.status = data.status;
    if(data.priority !== undefined) updateData.priority = data.priority;
    if(data.dueDate !== undefined) updateData.dueDate = data.dueDate ? new Date(data.dueDate) : null;

    return await prisma.task.update({
        where: { id },
        data: updateData,
        include:{
            workspace:{
                select:{ id:true, name:true,},
            },
        }
    });
};
export const deleteTask = async (id) => {
    return await prisma.task.delete({
        where: { id },
    });
};