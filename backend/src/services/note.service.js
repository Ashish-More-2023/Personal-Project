
import prisma from '../config/database.js';

export const getAllNotes = async (workspaceId) => {
  const where = workspaceId ? { workspaceId } : {};
  
  return await prisma.note.findMany({
    where,
    include: {
      workspace: {
        select: {
          id: true,
          name: true,
          color: true,
        },
      },
    },
    orderBy: { updatedAt: 'desc' },
  });
};

export const getNoteById = async (id) => {
  return await prisma.note.findUnique({
    where: { id },
    include: {
      workspace: {
        select: {
          id: true,
          name: true,
          color: true,
        },
      },
    },
  });
};

export const createNote = async (data) => {
  return await prisma.note.create({
    data: {
      workspaceId: data.workspaceId,
      title: data.title,
      content: data.content,
      tags: data.tags || [],
    },
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

export const updateNote = async (id, data) => {
  const updateData = {};
  
  if (data.title) updateData.title = data.title;
  if (data.content) updateData.content = data.content;
  if (data.tags !== undefined) updateData.tags = data.tags;

  return await prisma.note.update({
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

export const deleteNote = async (id) => {
  return await prisma.note.delete({
    where: { id },
  });
};
