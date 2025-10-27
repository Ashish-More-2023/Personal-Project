import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taskService } from '../../api/taskService';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';

const DeleteTaskModal = ({ isOpen, onClose, task }) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: taskService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks']);
      queryClient.invalidateQueries(['workspace']);
      queryClient.invalidateQueries(['dailySummary']);
      toast.success('Task deleted successfully!');
      onClose();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to delete task');
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate(task.id);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Task" size="sm">
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg">
          <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-800">
            This action cannot be undone. This task will be permanently deleted.
          </p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">You are about to delete:</p>
          <p className="font-semibold text-gray-800 mt-1">{task?.title}</p>
          {task?.dueDate && (
            <p className="text-sm text-gray-600 mt-1">
              Due: {new Date(task.dueDate).toLocaleString()}
            </p>
          )}
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
            Delete Task
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteTaskModal;
