import { MoreVertical, Edit2, Trash2, Calendar } from 'lucide-react';
import { useState } from 'react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import { formatDate, getPriorityColor, getStatusColor, isOverdue } from '../../utils/helpers';

const TaskCard = ({ task, onEdit, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);

  const priorityColor = getPriorityColor(task.priority);
  const statusColor = getStatusColor(task.status);
  const overdue = task.status !== 'completed' && isOverdue(task.dueDate);

  return (
    <Card hover className="relative">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-gray-800 flex-1">{task.title}</h3>
        
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>

          {showMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                <button
                  onClick={() => {
                    setShowMenu(false);
                    onEdit(task);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => {
                    setShowMenu(false);
                    onDelete(task);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {task.description && (
        <p className="text-sm text-gray-600 mb-3">{task.description}</p>
      )}

      <div className="flex flex-wrap gap-2 mb-3">
        <Badge variant={task.status === 'completed' ? 'success' : 'default'} size="sm">
          {task.status.replace('_', ' ')}
        </Badge>
        <Badge variant={task.priority === 'high' ? 'danger' : task.priority === 'medium' ? 'warning' : 'default'} size="sm">
          {task.priority}
        </Badge>
      </div>

      {task.dueDate && (
        <div className={`flex items-center gap-2 text-sm ${overdue ? 'text-red-600' : 'text-gray-600'}`}>
          <Calendar className="w-4 h-4" />
          <span>{formatDate(task.dueDate)}</span>
          {overdue && <span className="font-semibold">(Overdue)</span>}
        </div>
      )}
    </Card>
  );
};

export default TaskCard;
