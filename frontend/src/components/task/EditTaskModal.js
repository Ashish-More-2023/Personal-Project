import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taskService } from '../../api/taskService';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Select from '../common/Select';
import Textarea from '../common/Textarea';
import Button from '../common/Button';
import { TASK_STATUS, TASK_PRIORITY } from '../../utils/constants';
import toast from 'react-hot-toast';

const EditTaskModal = ({ isOpen, onClose, task, workspaceId }) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: TASK_STATUS.PENDING,
    priority: TASK_PRIORITY.MEDIUM,
    dueDate: '',
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        status: task.status || TASK_STATUS.PENDING,
        priority: task.priority || TASK_PRIORITY.MEDIUM,
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 16) : '',
      });
    }
  }, [task]);

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => taskService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks']);
      queryClient.invalidateQueries(['workspace', workspaceId]);
      queryClient.invalidateQueries(['dailySummary']);
      toast.success('Task updated successfully!');
      onClose();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update task');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error('Task title is required');
      return;
    }
    updateMutation.mutate({ 
      id: task.id, 
      data: { ...formData, workspaceId }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Task" size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Task Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter task title"
          required
        />

        <Textarea
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter task description (optional)"
          rows={3}
        />

        <Select
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          options={[
            { value: TASK_STATUS.PENDING, label: 'Pending' },
            { value: TASK_STATUS.IN_PROGRESS, label: 'In Progress' },
            { value: TASK_STATUS.COMPLETED, label: 'Completed' },
          ]}
        />

        <Select
          label="Priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          options={[
            { value: TASK_PRIORITY.LOW, label: 'Low' },
            { value: TASK_PRIORITY.MEDIUM, label: 'Medium' },
            { value: TASK_PRIORITY.HIGH, label: 'High' },
          ]}
        />

        <Input
          label="Due Date"
          name="dueDate"
          type="datetime-local"
          value={formData.dueDate}
          onChange={handleChange}
        />

        <div className="flex gap-3 pt-4">
          <Button type="button" variant="secondary" onClick={onClose} fullWidth>
            Cancel
          </Button>
          <Button type="submit" variant="primary" fullWidth loading={updateMutation.isPending}>
            Update Task
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditTaskModal;
