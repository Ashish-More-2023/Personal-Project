import prisma from '../config/database.js';
import { findClashingTimelines } from '../utils/clashDetection.util.js';

export const getAllTimelines = async (workspaceId) => {
    const where = workspaceId ? { workspaceId } : {};
    return await prisma.timeline.findMany({
        where,
        include:{
            workspace:{
                select:{ id:true, name:true, color:true },
            },
        },
        orderBy: { updatedAt: 'desc' },
    });
};


export const getTimelineById = async (id)=>{
    return await prisma.timeline.findUnique({
        where: {id},
        include:{
            workspace:{
                select:{ id:true, name:true, color:true },
            },
        },
    });
};

export const createTimeline = async (data)=>{
    const workspace = await prisma.workSpace.findUnique({
        where:{id:data.workspaceId},
    });

    if(!workspace){
        throw new Error('Workspace not found');
    }

    const timeline = await prisma.timeline.create({
        data:{
            workspaceId: data.workspaceId,
            title: data.title,
            description: data.description,
            startDate: new Date(data.startDate),
            endDate: new Date(data.endDate),
            color: data.color,
        },
        include:{
            workspace:{
                select:{ id:true, name:true, color:true },
            },
        },
    });

    await prisma.centralTimeline.create({
        data:{
            timelineId: timeline.id,
            workspaceId: data.workspaceId,
            workspaceName: workspace.name,
            workspaceColor: workspace.color,
            title: timeline.title,
            description: timeline.description,
            startDate: timeline.startDate,
            endDate: timeline.endDate,
            color: timeline.color,
        },
    });

    const allCentralTimelines = await prisma.centralTimeline.findMany();
    const clashes = findClashingTimelines(allCentralTimelines, timeline);

    if(clashes.length > 0){
        return { 
            timeline,
            clashes: clashes.map(c => ({
                id:c.timelineId,
                title:c.title,
                workspaceName:c.workspaceName,
                workspaceId:c.workspaceId,
                workspaceColor:c.workspaceColor,
                startDate:c.startDate,
                endDate:c.endDate,
            })), 
        };
    };

    return { timeline, clashes: [] };
};


export const updateTimeline = async (id, data) => {
  const updateData = {};
  
  if (data.title) updateData.title = data.title;
  if (data.description !== undefined) updateData.description = data.description;
  if (data.startDate) updateData.startDate = new Date(data.startDate);
  if (data.endDate) updateData.endDate = new Date(data.endDate);
  if (data.color !== undefined) updateData.color = data.color;

  const [timeline] = await prisma.$transaction([
    prisma.timeline.update({
      where: { id },
      data: updateData,
      include: {
        workspace: {
          select: {
            id: true,
            name: true,
            color: true,
          },
        },
      },
    }),
    prisma.centralTimeline.update({
      where: { timelineId: id },
      data: updateData,
    }),
  ]);

  const allCentralTimelines = await prisma.centralTimeline.findMany();
  const clashes = findClashingTimelines(allCentralTimelines, timeline);

  if (clashes.length > 0) {
    return {
      timeline,
      clashes: clashes.map(clash => ({
        id: clash.timelineId,
        title: clash.title,
        workspaceId: clash.workspaceId,
        workspaceName: clash.workspaceName,
        workspaceColor: clash.workspaceColor,
        startDate: clash.startDate,
        endDate: clash.endDate,
      })),
    };
  }

  return { timeline, clashes: [] };
};

export const deleteTimeline = async (id) => {
  await prisma.$transaction([
    prisma.timeline.delete({ where: { id } }),
    prisma.centralTimeline.delete({ where: { timelineId: id } }),
  ]);
};

export const findAllClashes = async (workspaceId) => {
  const where = workspaceId ? { workspaceId } : {};
  const centralTimelines = await prisma.centralTimeline.findMany({ where });

  const clashResults = [];

  for (let i = 0; i < centralTimelines.length; i++) {
    const clashes = findClashingTimelines(centralTimelines, centralTimelines[i]);
    if (clashes.length > 0) {
      clashResults.push({
        timeline: {
          id: centralTimelines[i].timelineId,
          title: centralTimelines[i].title,
          workspaceId: centralTimelines[i].workspaceId,
          workspaceName: centralTimelines[i].workspaceName,
          startDate: centralTimelines[i].startDate,
          endDate: centralTimelines[i].endDate,
        },
        clashesWith: clashes.map(clash => ({
          id: clash.timelineId,
          title: clash.title,
          workspaceId: clash.workspaceId,
          workspaceName: clash.workspaceName,
          workspaceColor: clash.workspaceColor,
          startDate: clash.startDate,
          endDate: clash.endDate,
        })),
      });
    }
  }

  return clashResults;
};