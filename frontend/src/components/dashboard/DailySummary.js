import { useQuery } from '@tanstack/react-query';
import { Calendar, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { summaryService } from '../../api/summaryService';
import Card from '../common/Card';
import Loading from '../common/Loading';
import EmptyState from '../common/EmptyState';
import { formatDate } from '../../utils/helpers';

const DailySummary = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['dailySummary'],
    queryFn: () => summaryService.getDaily(),
  });

  if (isLoading) return <Loading />;
  if (error) return <div className="text-red-500">Failed to load summary</div>;

  const summary = data?.data;

  if (summary?.isEmpty) {
    return (
      <Card>
        <EmptyState
          icon={CheckCircle2}
          title="You're all clear!"
          message="No tasks, events, or timelines for today. Enjoy your free time!"
        />
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Today's Summary</h2>
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="w-5 h-5" />
          <span className="text-sm font-medium">{formatDate(summary?.date)}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500 p-3 rounded-lg">
              <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-blue-600 font-medium">Total Items</p>
              <p className="text-3xl font-bold text-blue-900">{summary?.totalItems || 0}</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center gap-3">
            <div className="bg-purple-500 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-purple-600 font-medium">Workspaces</p>
              <p className="text-3xl font-bold text-purple-900">{summary?.totalWorkspaces || 0}</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center gap-3">
            <div className="bg-green-500 p-3 rounded-lg">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-green-600 font-medium">Active</p>
              <p className="text-3xl font-bold text-green-900">{summary?.totalItems || 0}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Workspace Summaries */}
      <div className="space-y-3">
        {summary?.workspaceSummaries?.map((ws) => (
          <Card key={ws.workspaceName} hover>
            <div className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: ws.workspaceColor }}
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{ws.workspaceName}</h3>
                <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                  {ws.tasksDueToday > 0 && (
                    <span>📋 {ws.tasksDueToday} tasks due</span>
                  )}
                  {ws.activeTimelines > 0 && (
                    <span>⏰ {ws.activeTimelines} active timelines</span>
                  )}
                  {ws.eventsToday > 0 && (
                    <span>📅 {ws.eventsToday} events</span>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DailySummary;
