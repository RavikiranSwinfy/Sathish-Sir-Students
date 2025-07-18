import React from 'react';
import { useApp } from '../context/AppContext';

const Dashboard: React.FC = () => {
  const { hrEntries, questions, answers, loading } = useApp();

  const recentHREntries = hrEntries.slice(0, 5);
  const recentQuestions = questions.slice(0, 5);

  const StatCard: React.FC<{ title: string; value: number; icon: string; color: string }> = ({
    title,
    value,
    icon,
    color
  }) => (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <img src={icon} alt={title} className="h-6 w-6" />
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <img 
            src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1" 
            alt="Loading" 
            className="h-16 w-16 mx-auto mb-4 animate-pulse rounded"
          />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome to your HR management portal</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total HR Entries"
          value={hrEntries.length}
          icon="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=24&h=24&dpr=1"
          color="bg-blue-500"
        />
        <StatCard
          title="Total Questions"
          value={questions.length}
          icon="https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg?auto=compress&cs=tinysrgb&w=24&h=24&dpr=1"
          color="bg-green-500"
        />
        <StatCard
          title="Total Answers"
          value={answers.length}
          icon="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=24&h=24&dpr=1"
          color="bg-purple-500"
        />
        <StatCard
          title="Unanswered Questions"
          value={questions.length - answers.length}
          icon="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=24&h=24&dpr=1"
          color="bg-amber-500"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent HR Entries */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <img 
              src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=20&h=20&dpr=1" 
              alt="HR Entries" 
              className="h-5 w-5 mr-2 rounded"
            />
            Recent HR Entries
          </h2>
          {recentHREntries.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No HR entries yet</p>
          ) : (
            <div className="space-y-4">
              {recentHREntries.map((entry) => (
                <div key={entry.id} className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">{entry.hr_name}</p>
                      <p className="text-sm text-gray-600 flex items-center">
                        <img 
                          src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=12&h=12&dpr=1" 
                          alt="Company" 
                          className="h-3 w-3 mr-1 rounded"
                        />
                        {entry.company_name}
                      </p>
                      <p className="text-sm text-gray-500 flex items-center">
                        <img 
                          src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=12&h=12&dpr=1" 
                          alt="Phone" 
                          className="h-3 w-3 mr-1 rounded"
                        />
                        {entry.hr_contact}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">{entry.da_name}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(entry.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Questions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <img 
              src="https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg?auto=compress&cs=tinysrgb&w=20&h=20&dpr=1" 
              alt="Questions" 
              className="h-5 w-5 mr-2 rounded"
            />
            Recent Questions
          </h2>
          {recentQuestions.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No questions yet</p>
          ) : (
            <div className="space-y-4">
              {recentQuestions.map((question) => (
                <div key={question.id} className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 mb-1">{question.text}</p>
                      <div className="flex items-center space-x-2">
                        <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                          {question.topic}
                        </span>
                        <span className="text-xs text-gray-500">by {question.asked_by}</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 ml-2">
                      {new Date(question.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;