import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { StickyNote, Plus, Filter } from 'lucide-react';
import { noteService } from '../api/noteService';
import { workspaceService } from '../api/workspaceService';
import Layout from '../components/layout/Layout';
import NoteCard from '../components/note/NoteCard';
import CreateNoteModal from '../components/note/CreateNoteModal';
import Select from '../components/common/Select';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';
import EmptyState from '../components/common/EmptyState';

const NotesPage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState('');

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
            message="Create your first note or select a different workspace."
            action={() => setShowCreateModal(true)}
            actionLabel="Create Note"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={() => {}}
                onDelete={() => {}}
              />
            ))}
          </div>
        )}
      </div>

      {selectedWorkspace && (
        <CreateNoteModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          workspaceId={selectedWorkspace}
        />
      )}
    </Layout>
  );
};

export default NotesPage;
