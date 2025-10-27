import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CheckSquare, Plus, Filter } from 'lucide-react';
import { taskService } from '../api/taskService';
import { workspaceService } from '../api/workspaceService';
import Layout from '../components/layout/Layout';
import TaskCard from '../components/task/TaskCard';
import CreateTaskModal from '../components/task/CreateTaskModal';
import EditTaskModal from '../components/task/EditTaskModal';
import DeleteTaskModal from '../components/task/DeleteTaskModal';
import Select from '../components/common/Select';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';
import EmptyState from '../components/common/EmptyState';

const TasksPage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);

  const { data: workspacesData } = useQuery({
    queryKey: ['workspaces'],
    queryFn: workspaceService.getAll,
  });

  const { data: tasksData, isLoading } = useQuery({
    queryKey: ['tasks', selectedWorkspace],
    queryFn: () => taskService.getAll(selectedWorkspace || undefined),
  });

  const workspaces = workspacesData?.data || [];
  const tasks = tasksData?.data || [];

  const workspaceOptions = [
    { value: '', label: 'All Workspaces' },
    ...workspaces.map((ws) => ({ value: ws.id, label: ws.name })),
  ];

  const handleEdit = (task) => {
    setSelectedTask(task);
    setShowEditModal(true);
  };

  const handleDelete = (task) => {
    setSelectedTask(task);
    setShowDeleteModal(true);
  };

  const handleCloseEdit = () => {
    setShowEditModal(false);
    setSelectedTask(null);
  };

  const handleCloseDelete = () => {
    setShowDeleteModal(false);
    setSelectedTask(null);
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckSquare className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl font-bold text-gray-800">All Tasks</h1>
          </div>
          <Button
            variant="primary"
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2"
            disabled={!selectedWorkspace}
          >
            <Plus className="w-5 h-5" />
            New Task
          </Button>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-3">
          <Filter className="w-5 h-5 text-gray-600" />
          <Select
            name="workspace"
            value={selectedWorkspace}
            onChange={(e) => setSelectedWorkspace(e.target.value)}
            options={workspaceOptions}
            className="max-w-xs"
          />
        </div>

        {/* Content */}
        {isLoading ? (
          <Loading />
        ) : tasks.length === 0 ? (
          <EmptyState
            icon={CheckSquare}
            title="No tasks found"
            message={selectedWorkspace ? "Create your first task in this workspace." : "Select a workspace to view tasks or create a new one."}
            action={selectedWorkspace ? () => setShowCreateModal(true) : undefined}
            actionLabel={selectedWorkspace ? "Create Task" : undefined}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {/* Create Modal */}
      {selectedWorkspace && (
        <CreateTaskModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          workspaceId={selectedWorkspace}
        />
      )}

      {/* Edit Modal */}
      {selectedTask && (
        <EditTaskModal
          isOpen={showEditModal}
          onClose={handleCloseEdit}
          task={selectedTask}
          workspaceId={selectedTask.workspaceId}
        />
      )}

      {/* Delete Modal */}
      {selectedTask && (
        <DeleteTaskModal
          isOpen={showDeleteModal}
          onClose={handleCloseDelete}
          task={selectedTask}
        />
      )}
    </Layout>
  );
};

export default TasksPage;
