import { MoreVertical, Edit2, Trash2, Calendar, MapPin } from 'lucide-react';
import { useState } from 'react';
import Card from '../common/Card';
import { formatDateTime } from '../../utils/helpers';

const EventCard = ({ event, onEdit, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <Card hover className="relative">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-gray-800 flex-1">{event.title}</h3>
        
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
                    onEdit(event);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => {
                    setShowMenu(false);
                    onDelete(event);
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

      {event.description && (
        <p className="text-sm text-gray-600 mb-3">{event.description}</p>
      )}

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>{formatDateTime(event.eventDate)}</span>
        </div>

        {event.location && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{event.location}</span>
          </div>
        )}
      </div>
    </Card>
  );
};

export default EventCard;
