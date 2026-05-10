import React from 'react';
import { X } from 'lucide-react';

interface ConnectionErrorProps {
  entityName?: string;
  onRetry?: () => void;
  fullScreen?: boolean;
}

const ConnectionError: React.FC<ConnectionErrorProps> = ({ 
  entityName = "data", 
  onRetry,
  fullScreen = true
}) => {
  return (
    <div className={`${fullScreen ? 'h-screen w-full' : 'flex-1 h-full w-full py-20'} flex flex-col items-center justify-center bg-transparent gap-3 px-4 text-center`}>
      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-2 shadow-sm border border-red-100">
        <X size={32} className="text-red-400" />
      </div>
      <p className="font-bold text-lg text-gray-800 tracking-tight">Connection Failed</p>
      <p className="text-sm text-gray-500 max-w-sm">
        Unable to fetch {entityName} because the server is unreachable. Please check your connection.
      </p>
      <button 
        onClick={onRetry || (() => window.location.reload())} 
        className="mt-4 px-6 py-2.5 bg-white shadow-sm border border-gray-200 rounded-full font-bold text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all active:scale-95"
      >
        Retry Connection
      </button>
    </div>
  );
};

export default ConnectionError;
