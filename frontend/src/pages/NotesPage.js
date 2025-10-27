import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { StickyNote, Plus, Filter } from 'lucide-react';
import { noteService } from '../api/noteService';
import { workspaceService } from '../api/workspaceService';
import Layout from '../components/layout/Layout';
import NoteCard from '../components/note/NoteCard';
import CreateNoteModal from '../components/note/CreateNoteModal';
import EditNoteModal from '../components/note/EditNoteModal';
import DeleteNoteModal from '../components/note/DeleteNoteModal';
import Select from '../components/common/Select';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';
import EmptyState from '../components/common/EmptyState';

const NotesPage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState('');
  const [selectedNote, setSelectedNote] = useState(null);

  const { data: workspacesData } = useQuery({
    queryKey: ['workspaces'],
    queryFn: workspaceService.getAll,
  });

  const { data: notesData, isLoading } = useQuery({
    queryKey: ['notes', selectedWorkspace],
    queryFn: () => noteService.getAll(selectedWorkspace || undefined),
  });

  const workspaces = workspacesData?.data || [];
  const notes = notesData?.data || [];

  const workspaceOptions = [
    { value: '', label: 'All Workspaces' },
    ...workspaces.map((ws) => ({ value: ws.id, label: ws.name })),
  ];

  const handleEdit = (note) => {
    setSelectedNote(note);
    setShowEditModal(true);
  };

  const handleDelete = (note) => {
    setSelectedNote(note);
    setShowDeleteModal(true);
  };

  const handleCloseEdit = () => {
    setShowEditModal(false);
    setSelectedNote(null);
  };

  const handleCloseDelete = () => {
    setShowDeleteModal(false);
    setSelectedNote(null);
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <StickyNote className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl font-bold text-gray-800">All Notes</h1>
          </div>
          <Button
            variant="primary"
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2"
            disabled={!selectedWorkspace}
          >
            <Plus className="w-5 h-5" />
            New Note
          </Button>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-3">
          <Filter className="w-5 h-5 text-gray-600" />
          <Select
            name="workspace"
            value={selectedWorkspace}
            onChange={(e) => setSelectedWorkspace(e.target.value)}
            options={workspaceOptions}
            className="max-w-xs"
          />
        </div>

        {/* Content */}
        {isLoading ? (
          <Loading />
        ) : notes.length === 0 ? (
          <EmptyState
            icon={StickyNote}
            title="No notes found"
            message={selectedWorkspace ? "Create your first note in this workspace." : "Select a workspace to view notes or create a new one."}
            action={selectedWorkspace ? () => setShowCreateModal(true) : undefined}
            actionLabel={selectedWorkspace ? "Create Note" : undefined}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {/* Create Modal */}
      {selectedWorkspace && (
        <CreateNoteModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          workspaceId={selectedWorkspace}
        />
      )}

      {/* Edit Modal */}
      {selectedNote && (
        <EditNoteModal
          isOpen={showEditModal}
          onClose={handleCloseEdit}
          note={selectedNote}
          workspaceId={selectedNote.workspaceId}
        />
      )}

      {/* Delete Modal */}
      {selectedNote && (
        <DeleteNoteModal
          isOpen={showDeleteModal}
          onClose={handleCloseDelete}
          note={selectedNote}
        />
      )}
    </Layout>
  );
};

export default NotesPage;
