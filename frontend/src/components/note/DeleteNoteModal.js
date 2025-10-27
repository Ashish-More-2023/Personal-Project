import { useMutation, useQueryClient } from '@tanstack/react-query';
import { noteService } from '../../api/noteService';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';

const DeleteNoteModal = ({ isOpen, onClose, note }) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: noteService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries(['notes']);
      queryClient.invalidateQueries(['workspace']);
      toast.success('Note deleted successfully!');
      onClose();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to delete note');
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate(note.id);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Note" size="sm">
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg">
          <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-800">
            This action cannot be undone. This note will be permanently deleted.
          </p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">You are about to delete:</p>
          <p className="font-semibold text-gray-800 mt-1">{note?.title}</p>
          {note?.tags && note.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {note.tags.map((tag) => (
                <span key={tag} className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
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
            Delete Note
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteNoteModal;
