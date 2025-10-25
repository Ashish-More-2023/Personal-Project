import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Calendar, Plus, Filter } from 'lucide-react';
import { eventService } from '../api/eventService';
import { workspaceService } from '../api/workspaceService';
import Layout from '../components/layout/Layout';
import EventCard from '../components/event/EventCard';
import CreateEventModal from '../components/event/CreateEventModal';
import Select from '../components/common/Select';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';
import EmptyState from '../components/common/EmptyState';

const EventsPage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState('');

  const { data: workspacesData } = useQuery({
    queryKey: ['workspaces'],
    queryFn: workspaceService.getAll,
  });

  const { data: eventsData, isLoading } = useQuery({
    queryKey: ['events', selectedWorkspace],
    queryFn: () => eventService.getAll(selectedWorkspace || undefined),
  });

  const workspaces = workspacesData?.data || [];
  const events = eventsData?.data || [];

  const workspaceOptions = [
    { value: '', label: 'All Workspaces' },
    ...workspaces.map((ws) => ({ value: ws.id, label: ws.name })),
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calendar className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl font-bold text-gray-800">All Events</h1>
          </div>
          <Button
            variant="primary"
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            New Event
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
        ) : events.length === 0 ? (
          <EmptyState
            icon={Calendar}
            title="No events found"
            message="Create your first event or select a different workspace."
            action={() => setShowCreateModal(true)}
            actionLabel="Create Event"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onEdit={() => {}}
                onDelete={() => {}}
              />
            ))}
          </div>
        )}
      </div>

      {selectedWorkspace && (
        <CreateEventModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          workspaceId={selectedWorkspace}
        />
      )}
    </Layout>
  );
};

export default EventsPage;
