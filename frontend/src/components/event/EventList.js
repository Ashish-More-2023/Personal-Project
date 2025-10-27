import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus, Calendar } from 'lucide-react';
import { eventService } from '../../api/eventService';
import EventCard from './EventCard';
import CreateEventModal from './CreateEventModal';
import EditEventModal from './EditEventModal';
import DeleteEventModal from './DeleteEventModal';
import Button from '../common/Button';
import Loading from '../common/Loading';
import EmptyState from '../common/EmptyState';

const EventList = ({ workspaceId }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ['events', workspaceId],
    queryFn: () => eventService.getAll(workspaceId),
  });

  const events = data?.data || [];

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setShowEditModal(true);
  };

  const handleDelete = (event) => {
    setSelectedEvent(event);
    setShowDeleteModal(true);
  };

  const handleCloseEdit = () => {
    setShowEditModal(false);
    setSelectedEvent(null);
  };

  const handleCloseDelete = () => {
    setShowDeleteModal(false);
    setSelectedEvent(null);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          Events ({events.length})
        </h2>
        <Button
          variant="primary"
          size="sm"
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Event
        </Button>
      </div>

      {events.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title="No events yet"
          message="Create your first event to track important meetings and occasions."
          action={() => setShowCreateModal(true)}
          actionLabel="Create Event"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Create Modal */}
      <CreateEventModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        workspaceId={workspaceId}
      />

      {/* Edit Modal */}
      {selectedEvent && (
        <EditEventModal
          isOpen={showEditModal}
          onClose={handleCloseEdit}
          event={selectedEvent}
          workspaceId={workspaceId}
        />
      )}

      {/* Delete Modal */}
      {selectedEvent && (
        <DeleteEventModal
          isOpen={showDeleteModal}
          onClose={handleCloseDelete}
          event={selectedEvent}
        />
      )}
    </div>
  );
};

export default EventList;
