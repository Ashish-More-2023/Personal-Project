import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Rocket } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    id: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.id || !formData.password) {
      toast.error('Please enter both ID and password');
      return;
    }

    setLoading(true);
    const result = await login(formData);
    setLoading(false);

    if (result.success) {
      toast.success('Login successful!');
      navigate('/dashboard');
    } else {
      toast.error(result.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Rocket className="w-10 h-10 text-blue-500" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Timeline Tracker</h1>
          <p className="text-gray-600">Login to manage your workspaces</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="User ID"
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            placeholder="Enter your ID"
            required
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />

          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={loading}
            className="mt-6"
          >
            <div className="flex items-center justify-center gap-2">
              <LogIn className="w-5 h-5" />
              Login
            </div>
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Timeline Tracker v1.0</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
