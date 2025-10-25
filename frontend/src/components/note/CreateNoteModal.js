import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { noteService } from '../../api/noteService';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Textarea from '../common/Textarea';
import Button from '../common/Button';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

const CreateNoteModal = ({ isOpen, onClose, workspaceId }) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: [],
  });
  const [tagInput, setTagInput] = useState('');

  const createMutation = useMutation({
    mutationFn: noteService.create,
    onSuccess: () => {
      queryClient.invalidateQueries(['notes']);
      queryClient.invalidateQueries(['workspace', workspaceId]);
      toast.success('Note created successfully!');
      onClose();
      resetForm();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to create note');
    },
  });

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      tags: [],
    });
    setTagInput('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error('Note title is required');
      return;
    }
    if (!formData.content.trim()) {
      toast.error('Note content is required');
      return;
    }
    createMutation.mutate({ ...formData, workspaceId });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleTagKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Note" size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Note Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter note title"
          required
        />

        <Textarea
          label="Content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Write your note here..."
          rows={6}
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tags
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={handleTagKeyPress}
              placeholder="Add a tag"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button type="button" variant="secondary" onClick={addTag}>
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="hover:bg-blue-200 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="button" variant="secondary" onClick={onClose} fullWidth>
            Cancel
          </Button>
          <Button type="submit" variant="primary" fullWidth loading={createMutation.isPending}>
            Create Note
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateNoteModal;
