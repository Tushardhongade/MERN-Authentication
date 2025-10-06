import React from "react";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-[calc(100vh-70px)] flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl p-6 sm:p-8">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 sm:mb-3">
              Welcome to Dashboard
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600">
              Hello,{" "}
              <span className="font-semibold text-blue-600">{user?.name}</span>!
              You're successfully logged in.
            </p>
          </div>

          {/* User Info */}
          <div className="mb-6 sm:mb-8">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-blue-100">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6 text-center">
                Profile Information
              </h3>

              <div className="space-y-3 sm:space-y-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 sm:py-3 border-b border-blue-200">
                  <span className="font-semibold text-gray-700 text-sm sm:text-base mb-1 sm:mb-0">
                    Name:
                  </span>
                  <span className="text-gray-900 font-medium text-sm sm:text-base break-all">
                    {user?.name}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 sm:py-3 border-b border-blue-200">
                  <span className="font-semibold text-gray-700 text-sm sm:text-base mb-1 sm:mb-0">
                    Email:
                  </span>
                  <span className="text-gray-900 font-medium text-sm sm:text-base break-all">
                    {user?.email}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 sm:py-3">
                  <span className="font-semibold text-gray-700 text-sm sm:text-base mb-1 sm:mb-0">
                    User ID:
                  </span>
                  <span className="text-gray-900 font-mono text-xs sm:text-sm bg-blue-100 px-2 py-1 rounded break-all">
                    {user?.id}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <div className="text-center mb-6 sm:mb-8">
            <button
              onClick={handleLogout}
              className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 text-sm sm:text-base"
            >
              Logout
            </button>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-center">
            <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200 shadow-sm">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600">
                100%
              </div>
              <div className="text-gray-600 text-xs sm:text-sm">Secure</div>
            </div>
            <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200 shadow-sm">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600">
                24/7
              </div>
              <div className="text-gray-600 text-xs sm:text-sm">Available</div>
            </div>
            <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200 shadow-sm">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-600">
                99.9%
              </div>
              <div className="text-gray-600 text-xs sm:text-sm">Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
