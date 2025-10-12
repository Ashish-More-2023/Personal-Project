import prisma from '../config/database.js';

export const getAllEvents = async (workspaceId) => {
    const where = workspaceId ? { workspaceId } : {};
    return await prisma.event.findMany({
        where,
        include:{
            workspace:{
                select:{ id:true, name:true, color:true },
            },
        },
        orderBy: { updatedAt: 'desc' },
    });
};


export const getEventById = async (id)=>{
    return await prisma.event.findUnique({
        where: {id},
        include:{
            workspace:{
                select:{ id:true, name:true, color:true },
            },
        },
    });
};

export const createEvent = async (data)=>{
    return await prisma.event.create({
        data:{
            workspaceId: data.workspaceId,
            title: data.title,
            description: data.description,
            eventDate: new Date(data.eventDate),
            location: data.location,
        },
        include:{
            workspace:{
                select:{ id:true, name:true,},
            },
        },
    });
};


export const updateEvent = async (id, data) => {
  const updateData = {};
  
  if (data.title) updateData.title = data.title;
  if (data.description !== undefined) updateData.description = data.description;
  if (data.eventDate) updateData.eventDate = new Date(data.eventDate);
  if (data.location !== undefined) updateData.location = data.location;

  return await prisma.event.update({
    where: { id },
    data: updateData,
    include: {
      workspace: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

export const deleteEvent = async (id) => {
  return await prisma.event.delete({
    where: { id },
  });
};