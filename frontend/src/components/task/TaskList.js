import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { taskService } from '../../api/taskService';
import TaskCard from './TaskCard';
import CreateTaskModal from './CreateTaskModal';
import Button from '../common/Button';
import Loading from '../common/Loading';
import EmptyState from '../common/EmptyState';

const TaskList = ({ workspaceId }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['tasks', workspaceId],
    queryFn: () => taskService.getAll(workspaceId),
  });

  const tasks = data?.data || [];

  if (isLoading) return <Loading />;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          Tasks ({tasks.length})
        </h2>
        <Button
          variant="primary"
          size="sm"
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Task
        </Button>
      </div>

      {tasks.length === 0 ? (
        <EmptyState
          title="No tasks yet"
          message="Create your first task to get started."
          action={() => setShowCreateModal(true)}
          actionLabel="Create Task"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={() => {}}
              onDelete={() => {}}
            />
          ))}
        </div>
      )}

      <CreateTaskModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        workspaceId={workspaceId}
      />
    </div>
  );
};

export default TaskList;
