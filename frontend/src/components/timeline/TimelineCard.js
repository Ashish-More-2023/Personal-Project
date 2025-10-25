import { MoreVertical, Edit2, Trash2, Calendar, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import Card from '../common/Card';
import { formatDate } from '../../utils/helpers';

const TimelineCard = ({ timeline, clashes = [], onEdit, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);
  const hasClashes = clashes.length > 0;

  return (
    <Card hover className="relative">
      {/* Clash Warning Banner */}
      {hasClashes && (
        <div className="absolute top-0 left-0 right-0 bg-red-500 text-white px-3 py-1 text-xs font-medium rounded-t-lg flex items-center gap-1">
          <AlertTriangle className="w-3 h-3" />
          {clashes.length} clash{clashes.length > 1 ? 'es' : ''} detected
        </div>
      )}

      <div className={`${hasClashes ? 'pt-6' : ''}`}>
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800">{timeline.title}</h3>
            <div
              className="w-full h-2 rounded-full mt-2"
              style={{ backgroundColor: timeline.color }}
            />
          </div>
          
          <div className="relative ml-2">
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
                      onEdit(timeline);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      onDelete(timeline);
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

        {/* Description */}
        {timeline.description && (
          <p className="text-sm text-gray-600 mb-3">{timeline.description}</p>
        )}

        {/* Dates */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(timeline.startDate)}</span>
          </div>
          <span>→</span>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(timeline.endDate)}</span>
          </div>
        </div>

        {/* Clashes List */}
        {hasClashes && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm font-semibold text-red-800 mb-2">Clashes with:</p>
            <ul className="space-y-1">
              {clashes.map((clash) => (
                <li key={clash.id} className="text-xs text-red-700 flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: clash.workspaceColor }}
                  />
                  <span className="font-medium">{clash.workspaceName}:</span>
                  <span>{clash.title}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Card>
  );
};

export default TimelineCard;
