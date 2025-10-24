import { Rocket } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full">
        <div className="flex items-center justify-center mb-6">
          <Rocket className="w-16 h-16 text-blue-500" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
          Timeline Tracker
        </h1>
        <div className="space-y-2 text-center">
          <p className="text-gray-600 flex items-center justify-center gap-2">
            ✅ React is working
          </p>
          <p className="text-gray-600 flex items-center justify-center gap-2">
            ✅ Tailwind CSS working
          </p>
          <p className="text-gray-600 flex items-center justify-center gap-2">
            ✅ Lucide Icons working
          </p>
        </div>
        <button className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
          Let's Build! 🚀
        </button>
      </div>
    </div>
  );
}

export default App;
