import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Clock, Plus, Filter } from 'lucide-react';
import { timelineService } from '../api/timelineService';
import { workspaceService } from '../api/workspaceService';
import Layout from '../components/layout/Layout';
import TimelineCard from '../components/timeline/TimelineCard';
import CreateTimelineModal from '../components/timeline/CreateTimelineModal';
import Select from '../components/common/Select';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';
import EmptyState from '../components/common/EmptyState';

const TimelinesPage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState('');

  const { data: workspacesData } = useQuery({
    queryKey: ['workspaces'],
    queryFn: workspaceService.getAll,
  });

  const { data: timelinesData, isLoading } = useQuery({
    queryKey: ['timelines', selectedWorkspace],
    queryFn: () => timelineService.getAll(selectedWorkspace || undefined),
  });

  const workspaces = workspacesData?.data || [];
  const timelines = timelinesData?.data || [];

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
            <Clock className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl font-bold text-gray-800">All Timelines</h1>
          </div>
          <Button
            variant="primary"
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            New Timeline
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
        ) : timelines.length === 0 ? (
          <EmptyState
            icon={Clock}
            title="No timelines found"
            message="Create your first timeline or select a different workspace."
            action={() => setShowCreateModal(true)}
            actionLabel="Create Timeline"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {timelines.map((timeline) => (
              <TimelineCard
                key={timeline.id}
                timeline={timeline}
                clashes={[]}
                onEdit={() => {}}
                onDelete={() => {}}
              />
            ))}
          </div>
        )}
      </div>

      {selectedWorkspace && (
        <CreateTimelineModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          workspaceId={selectedWorkspace}
        />
      )}
    </Layout>
  );
};

export default TimelinesPage;
