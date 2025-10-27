import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus, AlertTriangle } from 'lucide-react';
import { timelineService } from '../../api/timelineService';
import TimelineCard from './TimelineCard';
import CreateTimelineModal from './CreateTimelineModal';
import EditTimelineModal from './EditTimelineModal';
import DeleteTimelineModal from './DeleteTimelineModal';
import Button from '../common/Button';
import Card from '../common/Card';
import Loading from '../common/Loading';
import EmptyState from '../common/EmptyState';

const TimelineList = ({ workspaceId }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTimeline, setSelectedTimeline] = useState(null);

  const { data: timelinesData, isLoading: timelinesLoading } = useQuery({
    queryKey: ['timelines', workspaceId],
    queryFn: () => timelineService.getAll(workspaceId),
  });

  const { data: clashesData } = useQuery({
    queryKey: ['timeline-clashes', workspaceId],
    queryFn: () => timelineService.checkClashes(workspaceId),
  });

  const timelines = timelinesData?.data || [];
  const allClashes = clashesData?.data || [];

  const handleEdit = (timeline) => {
    setSelectedTimeline(timeline);
    setShowEditModal(true);
  };

  const handleDelete = (timeline) => {
    setSelectedTimeline(timeline);
    setShowDeleteModal(true);
  };

  const getClashesForTimeline = (timelineId) => {
    return allClashes.filter((clash) => 
      clash.timeline1Id === timelineId || clash.timeline2Id === timelineId
    ).map((clash) => {
      return clash.timeline1Id === timelineId ? clash.timeline2 : clash.timeline1;
    });
  };

  if (timelinesLoading) return <Loading />;

  const totalClashes = allClashes.length;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          Timelines ({timelines.length})
        </h2>
        <Button
          variant="primary"
          size="sm"
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Timeline
        </Button>
      </div>

      {totalClashes > 0 && (
        <Card className="bg-red-50 border-red-200">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            <div>
              <p className="font-semibold text-red-800">
                {totalClashes} timeline clash{totalClashes > 1 ? 'es' : ''} detected
              </p>
              <p className="text-sm text-red-700">
                Some timelines overlap. Review the warnings below.
              </p>
            </div>
          </div>
        </Card>
      )}

      {timelines.length === 0 ? (
        <EmptyState
          title="No timelines yet"
          message="Create your first timeline to track important periods."
          action={() => setShowCreateModal(true)}
          actionLabel="Create Timeline"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {timelines.map((timeline) => (
            <TimelineCard
              key={timeline.id}
              timeline={timeline}
              clashes={getClashesForTimeline(timeline.id)}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <CreateTimelineModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        workspaceId={workspaceId}
      />

      {selectedTimeline && (
        <EditTimelineModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setSelectedTimeline(null);
          }}
          timeline={selectedTimeline}
          workspaceId={workspaceId}
        />
      )}

      {selectedTimeline && (
        <DeleteTimelineModal
          isOpen={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedTimeline(null);
          }}
          timeline={selectedTimeline}
        />
      )}
    </div>
  );
};

export default TimelineList;
