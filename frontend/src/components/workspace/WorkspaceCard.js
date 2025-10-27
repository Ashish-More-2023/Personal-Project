import { useNavigate } from 'react-router-dom';
import { MoreVertical, Edit2, Trash2, Palette, Calendar } from 'lucide-react';
import { useState } from 'react';
import Card from '../common/Card';
import { formatRelativeTime } from '../../utils/helpers';

const WorkspaceCard = ({ workspace, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleCardClick = () => {
    navigate(`/workspace/${workspace.id}`);
  };

  return (
    <Card 
      hover 
      className="cursor-pointer relative"
      onClick={handleCardClick}
    >
      <div
        className="absolute top-0 left-0 right-0 h-2 rounded-t-lg"
        style={{ backgroundColor: workspace.color }}
      />

      <div className="pt-2">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-800 flex-1">
            {workspace.name}
          </h3>
          
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(!showMenu);
              }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>

            {showMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMenu(false);
                  }}
                />
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowMenu(false);
                      onEdit(workspace);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowMenu(false);
                      onDelete(workspace);
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

        {/* Info */}
        <div className="space-y-3 mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-gray-500" />
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-full border-2 border-white shadow"
                style={{ backgroundColor: workspace.color }}
              />
              <p className="text-sm text-gray-600">
                {workspace.color}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <p className="text-sm text-gray-600">
              Updated {formatRelativeTime(workspace.updatedAt)}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WorkspaceCard;
