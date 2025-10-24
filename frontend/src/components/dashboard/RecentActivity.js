import { useQuery } from '@tanstack/react-query';
import { Clock, CheckCircle2, Calendar, FileText } from 'lucide-react';
import { taskService } from '../../api/taskService';
import { eventService } from '../../api/eventService';
import Card from '../common/Card';
import Loading from '../common/Loading';
import { formatRelativeTime } from '../../utils/helpers';

const RecentActivity = () => {
  const { data: tasksData, isLoading: tasksLoading } = useQuery({
    queryKey: ['recentTasks'],
    queryFn: () => taskService.getAll(),
  });

  const { data: eventsData, isLoading: eventsLoading } = useQuery({
    queryKey: ['recentEvents'],
    queryFn: () => eventService.getAll(),
  });

  if (tasksLoading || eventsLoading) return <Loading />;

  const recentTasks = tasksData?.data?.slice(0, 5) || [];
  const recentEvents = eventsData?.data?.slice(0, 5) || [];

  return (
    <Card>
      <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
      
      <div className="space-y-3">
        {recentTasks.map((task) => (
          <div
            key={task.id}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="bg-green-100 p-2 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-800 truncate">{task.title}</p>
              <p className="text-sm text-gray-500">{formatRelativeTime(task.createdAt)}</p>
            </div>
          </div>
        ))}

        {recentEvents.map((event) => (
          <div
            key={event.id}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="bg-blue-100 p-2 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-800 truncate">{event.title}</p>
              <p className="text-sm text-gray-500">{formatRelativeTime(event.createdAt)}</p>
            </div>
          </div>
        ))}

        {recentTasks.length === 0 && recentEvents.length === 0 && (
          <p className="text-center text-gray-500 py-8">No recent activity</p>
        )}
      </div>
    </Card>
  );
};

export default RecentActivity;
