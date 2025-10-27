import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { timelineService } from '../../api/timelineService';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Textarea from '../common/Textarea';
import Button from '../common/Button';
import { WORKSPACE_COLORS } from '../../utils/constants';
import toast from 'react-hot-toast';

const EditTimelineModal = ({ isOpen, onClose, timeline, workspaceId }) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    color: '',
  });

  useEffect(() => {
    if (timeline) {
      setFormData({
        title: timeline.title || '',
        description: timeline.description || '',
        startDate: timeline.startDate ? new Date(timeline.startDate).toISOString().slice(0, 16) : '',
        endDate: timeline.endDate ? new Date(timeline.endDate).toISOString().slice(0, 16) : '',
        color: timeline.color || WORKSPACE_COLORS[0],
      });
    }
  }, [timeline]);

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => timelineService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['timelines']);
      queryClient.invalidateQueries(['workspace', workspaceId]);
      queryClient.invalidateQueries(['dailySummary']);
      toast.success('Timeline updated successfully!');
      onClose();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update timeline');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error('Timeline title is required');
      return;
    }
    if (!formData.startDate || !formData.endDate) {
      toast.error('Start and end dates are required');
      return;
    }
    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      toast.error('End date must be after start date');
      return;
    }
    updateMutation.mutate({ 
      id: timeline.id, 
      data: { ...formData, workspaceId }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Timeline" size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Timeline Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g., Mid-Sem Exams, Project Deadline"
          required
        />

        <Textarea
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter timeline description (optional)"
          rows={2}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Start Date"
            name="startDate"
            type="datetime-local"
            value={formData.startDate}
            onChange={handleChange}
            required
          />

          <Input
            label="End Date"
            name="endDate"
            type="datetime-local"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </div>

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
          <Button type="submit" variant="primary" fullWidth loading={updateMutation.isPending}>
            Update Timeline
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditTimelineModal;
