import { MoreVertical, Edit2, Trash2, Tag } from 'lucide-react';
import { useState } from 'react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import { formatRelativeTime, truncateText } from '../../utils/helpers';

const NoteCard = ({ note, onEdit, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const displayContent = expanded ? note.content : truncateText(note.content, 150);

  return (
    <Card hover className="relative">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-gray-800 flex-1">{note.title}</h3>
        
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
                    onEdit(note);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => {
                    setShowMenu(false);
                    onDelete(note);
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

      <p className="text-sm text-gray-700 mb-3 whitespace-pre-wrap">
        {displayContent}
      </p>

      {note.content.length > 150 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium mb-3"
        >
          {expanded ? 'Show less' : 'Show more'}
        </button>
      )}

      {note.tags && note.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {note.tags.map((tag, index) => (
            <Badge key={index} variant="primary" size="sm">
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </Badge>
          ))}
        </div>
      )}

      <p className="text-xs text-gray-500">{formatRelativeTime(note.createdAt)}</p>
    </Card>
  );
};

export default NoteCard;
