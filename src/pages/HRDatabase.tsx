import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const HRDatabase: React.FC = () => {
  const { hrEntries, addHREntry, loading } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    da_name: '',
    company_name: '',
    hr_name: '',
    hr_contact: '',
  });

  const filteredEntries = hrEntries.filter(entry =>
    entry.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.hr_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.hr_contact.includes(searchTerm)
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.da_name && formData.company_name && formData.hr_name && formData.hr_contact) {
      try {
        await addHREntry(formData);
        setFormData({ da_name: '', company_name: '', hr_name: '', hr_contact: '' });
        setShowForm(false);
      } catch (error) {
        console.error('Error adding HR entry:', error);
        alert('Failed to add HR entry. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <img 
            src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1" 
            alt="Loading" 
            className="h-16 w-16 mx-auto mb-4 animate-pulse rounded"
          />
          <p className="text-gray-600">Loading HR database...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">HR Database</h1>
          <p className="text-gray-600">Manage your HR contacts and company information</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <img 
            src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&dpr=1" 
            alt="Add" 
            className="h-4 w-4 rounded"
          />
          <span>Add HR Entry</span>
        </button>
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
          placeholder="Search by company name, HR name, or phone number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Add HR Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Add New HR Entry</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">DA Name</label>
                  <input
                    type="text"
                    value={formData.da_name}
                    onChange={(e) => setFormData({ ...formData, da_name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                  <input
                    type="text"
                    value={formData.company_name}
                    onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">HR Name</label>
                  <input
                    type="text"
                    value={formData.hr_name}
                    onChange={(e) => setFormData({ ...formData, hr_name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">HR Contact</label>
                  <input
                    type="tel"
                    value={formData.hr_contact}
                    onChange={(e) => setFormData({ ...formData, hr_contact: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add Entry
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* HR Entries List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEntries.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <img 
              src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&dpr=1" 
              alt="No entries" 
              className="mx-auto h-12 w-12 mb-4 rounded"
            />
            <p className="text-gray-500">No HR entries found</p>
          </div>
        ) : (
          filteredEntries.map((entry) => (
            <div key={entry.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{entry.hr_name}</h3>
                  <p className="text-sm text-gray-500">Added by {entry.da_name}</p>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(entry.created_at).toLocaleDateString()}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <img 
                    src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&dpr=1" 
                    alt="Company" 
                    className="h-4 w-4 rounded"
                  />
                  <span className="text-gray-900">{entry.company_name}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <img 
                    src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&dpr=1" 
                    alt="Phone" 
                    className="h-4 w-4 rounded"
                  />
                  <span className="text-gray-900">{entry.hr_contact}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HRDatabase;