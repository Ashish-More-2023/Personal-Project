import { useState } from 'react';
import { LayoutDashboard } from 'lucide-react';
import Layout from '../components/layout/Layout';
import DailySummary from '../components/dashboard/DailySummary';
import QuickActions from '../components/dashboard/QuickActions';
import RecentActivity from '../components/dashboard/RecentActivity';
import CreateWorkspaceModal from '../components/workspace/CreateWorkspaceModal';

const DashboardPage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <LayoutDashboard className="w-8 h-8 text-blue-500" />
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        </div>

        <QuickActions onCreateWorkspace={() => setShowCreateModal(true)} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <DailySummary />
          </div>

          <div className="lg:col-span-1">
            <RecentActivity />
          </div>
        </div>
      </div>


      <CreateWorkspaceModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </Layout>
  );
};

export default DashboardPage;
