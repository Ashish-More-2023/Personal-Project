import Layout from '../components/layout/Layout';
import Card from '../components/common/Card';
import { LayoutDashboard } from 'lucide-react';

const DashboardPage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <LayoutDashboard className="w-8 h-8 text-blue-500" />
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        </div>

        <Card>
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Welcome to Timeline Tracker!
            </h2>
            <p className="text-gray-600">
              Your dashboard is being built. Stay tuned!
            </p>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default DashboardPage;
