import { CheckSquare, Clock, Calendar, StickyNote } from 'lucide-react';
import clsx from 'clsx';

const WorkspaceTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'timelines', label: 'Timelines', icon: Clock },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'notes', label: 'Notes', icon: StickyNote },
  ];

  return (
    <div className="border-b border-gray-200">
      <nav className="flex gap-2 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={clsx(
              'flex items-center gap-2 px-4 py-3 font-medium transition-all whitespace-nowrap',
              activeTab === tab.id
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            )}
          >
            <tab.icon className="w-5 h-5" />
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default WorkspaceTabs;
