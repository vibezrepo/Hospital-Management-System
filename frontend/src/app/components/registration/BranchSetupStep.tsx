import { useState } from 'react';
import { Plus, X, Building2, MapPin, Phone, Mail, Network } from 'lucide-react';
import { HospitalData } from '../../pages/HospitalRegistrationPage';

interface Props {
  data: HospitalData;
  updateData: (updates: Partial<HospitalData>) => void;
}

export function BranchSetupStep({ data, updateData }: Props) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newBranch, setNewBranch] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
  });

  const addBranch = () => {
    if (newBranch.name && newBranch.address) {
      const branch = {
        id: Date.now().toString(),
        ...newBranch,
      };
      updateData({ branches: [...data.branches, branch] });
      setNewBranch({ name: '', address: '', phone: '', email: '' });
      setShowAddForm(false);
    }
  };

  const removeBranch = (id: string) => {
    updateData({ branches: data.branches.filter((b) => b.id !== id) });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Branch Setup</h2>
        <p className="text-gray-600">Add branches or affiliated locations (optional)</p>
      </div>

      {/* Existing Branches */}
      {data.branches.length > 0 && (
        <div className="space-y-3">
          {data.branches.map((branch) => (
            <div
              key={branch.id}
              className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-5"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Building2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-3">{branch.name}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-start space-x-2">
                        <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                        <span className="text-gray-700">{branch.address}</span>
                      </div>
                      {branch.phone && (
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700">{branch.phone}</span>
                        </div>
                      )}
                      {branch.email && (
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700">{branch.email}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeBranch(branch.id)}
                  className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Branch Form */}
      {showAddForm ? (
        <div className="bg-white border-2 border-blue-300 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Add New Branch</h3>
            <button
              onClick={() => setShowAddForm(false)}
              className="p-1 text-gray-400 hover:text-gray-600 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Branch Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={newBranch.name}
                onChange={(e) => setNewBranch({ ...newBranch, name: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition"
                placeholder="e.g., Downtown Branch"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={newBranch.address}
                onChange={(e) => setNewBranch({ ...newBranch, address: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition"
                placeholder="Full address"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={newBranch.phone}
                  onChange={(e) => setNewBranch({ ...newBranch, phone: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={newBranch.email}
                  onChange={(e) => setNewBranch({ ...newBranch, email: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition"
                  placeholder="branch@hospital.com"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={addBranch}
                disabled={!newBranch.name || !newBranch.address}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Branch
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowAddForm(true)}
          className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition flex items-center justify-center space-x-2 group"
        >
          <Plus className="w-5 h-5 group-hover:scale-110 transition" />
          <span className="font-medium">Add Branch Location</span>
        </button>
      )}

      {/* Info Boxes */}
      <div className="space-y-3">
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <Network className="w-5 h-5 text-purple-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-purple-900 text-sm mb-1">Multi-Location Setup</h4>
              <p className="text-sm text-purple-700">
                If your hospital operates multiple branches or affiliated locations, you can add them here. This is optional and can be configured later.
              </p>
            </div>
          </div>
        </div>

        {data.branches.length === 0 && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
            <Building2 className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">No branches added yet</p>
            <p className="text-xs text-gray-500 mt-1">Click the button above to add your first branch</p>
          </div>
        )}
      </div>
    </div>
  );
}
