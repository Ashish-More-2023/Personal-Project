import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, BarChart3 } from 'lucide-react';
import { workspaceService } from '../api/workspaceService';
import Layout from '../components/layout/Layout';
import WorkspaceTabs from '../components/workspace/WorkspaceTabs';
import TaskList from '../components/task/TaskList';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';
import TimelineList from '../components/timeline/TimelineList';
import EventList from '../components/event/EventList';
import NoteList from '../components/note/NoteList';

const WorkspaceDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('tasks');

  const { data, isLoading } = useQuery({
    queryKey: ['workspace', id],
    queryFn: () => workspaceService.getById(id),
  });

  const workspace = data?.data;

  if (isLoading) return <Layout><Loading fullScreen /></Layout>;

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/workspaces')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: workspace?.color }}
              />
              <h1 className="text-3xl font-bold text-gray-800">{workspace?.name}</h1>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <p className="text-sm text-gray-600">Tasks</p>
            <p className="text-2xl font-bold text-gray-800">{workspace?._count?.tasks || 0}</p>
          </Card>
          <Card>
            <p className="text-sm text-gray-600">Timelines</p>
            <p className="text-2xl font-bold text-gray-800">{workspace?._count?.timelines || 0}</p>
          </Card>
          <Card>
            <p className="text-sm text-gray-600">Events</p>
            <p className="text-2xl font-bold text-gray-800">{workspace?._count?.events || 0}</p>
          </Card>
          <Card>
            <p className="text-sm text-gray-600">Notes</p>
            <p className="text-2xl font-bold text-gray-800">{workspace?._count?.notes || 0}</p>
          </Card>
        </div>

        {/* Tabs */}
        <Card padding="none">
          <WorkspaceTabs activeTab={activeTab} onTabChange={setActiveTab} />
          
          <div className="p-6">
  {activeTab === 'tasks' && <TaskList workspaceId={id} />}
  {activeTab === 'timelines' && <TimelineList workspaceId={id} />}
  {activeTab === 'events' && <EventList workspaceId={id} />}
  {activeTab === 'notes' && <NoteList workspaceId={id} />}
</div>
        </Card>
      </div>
    </Layout>
  );
};

export default WorkspaceDetailPage;
