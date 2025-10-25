import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FolderKanban, Plus } from 'lucide-react';
import { workspaceService } from '../api/workspaceService';
import Layout from '../components/layout/Layout';
import WorkspaceCard from '../components/workspace/WorkspaceCard';
import CreateWorkspaceModal from '../components/workspace/CreateWorkspaceModal';
import EditWorkspaceModal from '../components/workspace/EditWorkspaceModal';
import DeleteWorkspaceModal from '../components/workspace/DeleteWorkspaceModal';
import Loading from '../components/common/Loading';
import EmptyState from '../components/common/EmptyState';
import Button from '../components/common/Button';

const WorkspacesPage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ['workspaces'],
    queryFn: workspaceService.getAll,
  });

  const workspaces = data?.data || [];

  const handleEdit = (workspace) => {
    setSelectedWorkspace(workspace);
    setShowEditModal(true);
  };

  const handleDelete = (workspace) => {
    setSelectedWorkspace(workspace);
    setShowDeleteModal(true);
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FolderKanban className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl font-bold text-gray-800">Workspaces</h1>
          </div>
          <Button
            variant="primary"
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            New Workspace
          </Button>
        </div>

        {/* Content */}
        {isLoading ? (
          <Loading />
        ) : workspaces.length === 0 ? (
          <EmptyState
            icon={FolderKanban}
            title="No workspaces yet"
            message="Create your first workspace to organize your tasks, timelines, and events."
            action={() => setShowCreateModal(true)}
            actionLabel="Create Workspace"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workspaces.map((workspace) => (
              <WorkspaceCard
                key={workspace.id}
                workspace={workspace}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      <CreateWorkspaceModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
      <EditWorkspaceModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedWorkspace(null);
        }}
        workspace={selectedWorkspace}
      />
      <DeleteWorkspaceModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedWorkspace(null);
        }}
        workspace={selectedWorkspace}
      />
    </Layout>
  );
};

export default WorkspacesPage;
