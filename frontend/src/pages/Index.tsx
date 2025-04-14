
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to the landing page
    navigate('/');
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <div className="text-center">
        <div className="animate-spin h-10 w-10 border-4 border-azure-600 rounded-full border-t-transparent mx-auto mb-4"></div>
        <p className="text-xl text-gray-600">Redirecting to Azure Scholars Hub...</p>
      </div>
    </div>
  );
};

export default Index;
