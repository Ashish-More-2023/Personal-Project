import { useMutation, useQueryClient } from '@tanstack/react-query';
import { timelineService } from '../../api/timelineService';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';

const DeleteTimelineModal = ({ isOpen, onClose, timeline }) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: timelineService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries(['timelines']);
      queryClient.invalidateQueries(['workspace']);
      queryClient.invalidateQueries(['dailySummary']);
      toast.success('Timeline deleted successfully!');
      onClose();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to delete timeline');
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate(timeline.id);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Timeline" size="sm">
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg">
          <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-800">
            This action cannot be undone. This timeline will be permanently deleted.
          </p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">You are about to delete:</p>
          <p className="font-semibold text-gray-800 mt-1">{timeline?.title}</p>
          {timeline?.startDate && timeline?.endDate && (
            <p className="text-sm text-gray-600 mt-1">
              {new Date(timeline.startDate).toLocaleDateString()} - {new Date(timeline.endDate).toLocaleDateString()}
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
            Delete Timeline
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteTimelineModal;
