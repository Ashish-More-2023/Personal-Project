import { useMutation, useQueryClient } from '@tanstack/react-query';
import { workspaceService } from '../../api/workspaceService';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';

const DeleteWorkspaceModal = ({ isOpen, onClose, workspace }) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: workspaceService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries(['workspaces']);
      queryClient.invalidateQueries(['dailySummary']);
      toast.success('Workspace deleted successfully!');
      onClose();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to delete workspace');
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate(workspace.id);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Workspace" size="sm">
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg">
          <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-800">
            This action cannot be undone. All tasks, timelines, events, and notes in this workspace will be permanently deleted.
          </p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            You are about to delete:
          </p>
          <p className="font-semibold text-gray-800 mt-1">
            {workspace?.name}
          </p>
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={onClose} fullWidth>
            Cancel
          </Button>
          <Button 
            type="button" 
            variant="danger" 
            onClick={handleDelete} 
            fullWidth 
            loading={deleteMutation.isPending}
          >
            Delete Workspace
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteWorkspaceModal;
