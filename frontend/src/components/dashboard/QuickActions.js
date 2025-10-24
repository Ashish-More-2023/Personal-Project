import { Plus, FolderPlus, CheckSquare, Clock, Calendar, FileText } from 'lucide-react';
import Card from '../common/Card';
import { useNavigate } from 'react-router-dom';

const QuickActions = ({ onCreateWorkspace }) => {
  const navigate = useNavigate();

  const actions = [
    {
      label: 'New Workspace',
      icon: FolderPlus,
      color: 'bg-blue-500',
      onClick: onCreateWorkspace,
    },
    {
      label: 'Add Task',
      icon: CheckSquare,
      color: 'bg-green-500',
      onClick: () => navigate('/tasks'),
    },
    {
      label: 'Create Timeline',
      icon: Clock,
      color: 'bg-purple-500',
      onClick: () => navigate('/timelines'),
    },
    {
      label: 'New Event',
      icon: Calendar,
      color: 'bg-orange-500',
      onClick: () => navigate('/events'),
    },
    {
      label: 'Add Note',
      icon: FileText,
      color: 'bg-pink-500',
      onClick: () => navigate('/notes'),
    },
  ];

  return (
    <Card>
      <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={action.onClick}
            className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-gray-50 transition-colors group"
          >
            <div className={`${action.color} p-3 rounded-lg group-hover:scale-110 transition-transform`}>
              <action.icon className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700">{action.label}</span>
          </button>
        ))}
      </div>
    </Card>
  );
};

export default QuickActions;
