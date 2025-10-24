import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { workspaceService } from '../../api/workspaceService';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';
import { WORKSPACE_COLORS, getRandomColor } from '../../utils/constants';
import toast from 'react-hot-toast';

const CreateWorkspaceModal = ({ isOpen, onClose }) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: '',
    color: getRandomColor(WORKSPACE_COLORS),
  });

  const createMutation = useMutation({
    mutationFn: workspaceService.create,
    onSuccess: () => {
      queryClient.invalidateQueries(['workspaces']);
      queryClient.invalidateQueries(['dailySummary']);
      toast.success('Workspace created successfully!');
      onClose();
      setFormData({ name: '', color: getRandomColor(WORKSPACE_COLORS) });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to create workspace');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error('Workspace name is required');
      return;
    }
    createMutation.mutate(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Workspace" size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Workspace Name"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g., SWC Projects, Academics"
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Choose Color
          </label>
          <div className="grid grid-cols-5 gap-3">
            {WORKSPACE_COLORS.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setFormData({ ...formData, color })}
                className={`w-12 h-12 rounded-lg transition-all ${
                  formData.color === color
                    ? 'ring-4 ring-offset-2 ring-blue-500 scale-110'
                    : 'hover:scale-105'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="button" variant="secondary" onClick={onClose} fullWidth>
            Cancel
          </Button>
          <Button type="submit" variant="primary" fullWidth loading={createMutation.isPending}>
            Create Workspace
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateWorkspaceModal;
