import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const CurrentJobs: React.FC = () => {
  const { jobs, loading } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredJobs = jobs.filter(job =>
    job.da_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.job_link.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort jobs by timestamp (most recent first)
  const sortedJobs = [...filteredJobs].sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <img 
            src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1" 
            alt="Loading" 
            className="h-16 w-16 mx-auto mb-4 animate-pulse rounded"
          />
          <p className="text-gray-600">Loading current jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Current Job Openings</h1>
        <p className="text-gray-600">Browse all available job opportunities</p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <img 
          src="https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&dpr=1" 
          alt="Search" 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 rounded"
        />
        <input
          type="text"
          placeholder="Search by DA name or job details..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Job Count */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">
            Showing {sortedJobs.length} of {jobs.length} job openings
          </span>
          <span className="text-sm text-blue-600">
            {sortedJobs.length > 0 && `Most recent: ${new Date(sortedJobs[0].created_at).toLocaleDateString()}`}
          </span>
        </div>
      </div>

      {/* Jobs List */}
      {sortedJobs.length === 0 ? (
        <div className="text-center py-12">
          <img 
            src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&dpr=1" 
            alt="No jobs" 
            className="mx-auto h-12 w-12 mb-4 rounded"
          />
          <p className="text-gray-500">No job openings found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedJobs.map((job) => (
            <div key={job.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Job Opening</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <img 
                        src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&dpr=1" 
                        alt="DA" 
                        className="h-4 w-4 rounded"
                      />
                      <span className="text-gray-700">DA: {job.da_name}</span>
                    </div>
                    {job.phone_number && (
                      <div className="flex items-center space-x-2 text-sm">
                        <img 
                          src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&dpr=1" 
                          alt="Phone" 
                          className="h-4 w-4 rounded"
                        />
                        <span className="text-gray-700">{job.phone_number}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2 text-sm">
                      <img 
                        src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&dpr=1" 
                        alt="Date" 
                        className="h-4 w-4 rounded"
                      />
                      <span className="text-gray-700">
                        {new Date(job.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    {job.file_name && (
                      <div className="flex items-center space-x-2 text-sm">
                        <img 
                          src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&dpr=1" 
                          alt="File" 
                          className="h-4 w-4 rounded"
                        />
                        <span className="text-gray-700">{job.file_name}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-1 text-xs text-gray-500">
                  <span>New</span>
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <a
                  href={job.job_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <img 
                    src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&dpr=1" 
                    alt="External Link" 
                    className="h-4 w-4 rounded"
                  />
                  <span>View Job Details</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CurrentJobs;