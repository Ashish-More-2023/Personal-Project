import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus, StickyNote } from 'lucide-react';
import { noteService } from '../../api/noteService';
import NoteCard from './NoteCard';
import CreateNoteModal from './CreateNoteModal';
import EditNoteModal from './EditNoteModal';
import DeleteNoteModal from './DeleteNoteModal';
import Button from '../common/Button';
import Loading from '../common/Loading';
import EmptyState from '../common/EmptyState';

const NoteList = ({ workspaceId }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ['notes', workspaceId],
    queryFn: () => noteService.getAll(workspaceId),
  });

  const notes = data?.data || [];

  const handleEdit = (note) => {
    setSelectedNote(note);
    setShowEditModal(true);
  };

  const handleDelete = (note) => {
    setSelectedNote(note);
    setShowDeleteModal(true);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          Notes ({notes.length})
        </h2>
        <Button
          variant="primary"
          size="sm"
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Note
        </Button>
      </div>

      {notes.length === 0 ? (
        <EmptyState
          icon={StickyNote}
          title="No notes yet"
          message="Create your first note to capture important information."
          action={() => setShowCreateModal(true)}
          actionLabel="Create Note"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

      <CreateNoteModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        workspaceId={workspaceId}
      />

      {selectedNote && (
        <EditNoteModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setSelectedNote(null);
          }}
          note={selectedNote}
          workspaceId={workspaceId}
        />
      )}

      {selectedNote && (
        <DeleteNoteModal
          isOpen={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedNote(null);
          }}
          note={selectedNote}
        />
      )}
    </div>
  );
};

export default NoteList;
