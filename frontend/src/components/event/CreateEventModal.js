import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { eventService } from '../../api/eventService';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Textarea from '../common/Textarea';
import Button from '../common/Button';
import toast from 'react-hot-toast';

const CreateEventModal = ({ isOpen, onClose, workspaceId }) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    eventDate: '',
    location: '',
  });

  const createMutation = useMutation({
    mutationFn: eventService.create,
    onSuccess: () => {
      queryClient.invalidateQueries(['events']);
      queryClient.invalidateQueries(['workspace', workspaceId]);
      queryClient.invalidateQueries(['dailySummary']);
      toast.success('Event created successfully!');
      onClose();
      resetForm();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to create event');
    },
  });

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      eventDate: '',
      location: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error('Event title is required');
      return;
    }
    if (!formData.eventDate) {
      toast.error('Event date is required');
      return;
    }
    createMutation.mutate({ ...formData, workspaceId });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Event" size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Event Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g., Team Meeting, Workshop"
          required
        />

        <Textarea
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter event description (optional)"
          rows={3}
        />

        <Input
          label="Event Date & Time"
          name="eventDate"
          type="datetime-local"
          value={formData.eventDate}
          onChange={handleChange}
          required
        />

        <Input
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="e.g., Conference Room A, Online"
        />

        <div className="flex gap-3 pt-4">
          <Button type="button" variant="secondary" onClick={onClose} fullWidth>
            Cancel
          </Button>
          <Button type="submit" variant="primary" fullWidth loading={createMutation.isPending}>
            Create Event
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateEventModal;
