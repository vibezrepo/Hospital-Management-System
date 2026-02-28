import { useState } from 'react';
import { Search, Filter, Plus, MoreVertical, Phone, Mail, MapPin, Calendar } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

const patients = [
  {
    id: 1,
    name: 'John Smith',
    age: 45,
    gender: 'Male',
    condition: 'Hypertension',
    lastVisit: '2026-02-20',
    phone: '+1 (555) 123-4567',
    email: 'john.smith@email.com',
    address: '123 Main St, New York, NY',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1633488781325-d36e6818d0c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXRpZW50JTIwbWVkaWNhbCUyMGNhcmV8ZW58MXx8fHwxNzcyMTk4MjM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 2,
    name: 'Emma Davis',
    age: 32,
    gender: 'Female',
    condition: 'Diabetes Type 2',
    lastVisit: '2026-02-25',
    phone: '+1 (555) 234-5678',
    email: 'emma.davis@email.com',
    address: '456 Oak Ave, Brooklyn, NY',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1758575514487-0390fcacc339?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMG51cnNlJTIwdW5pZm9ybXxlbnwxfHx8fDE3NzIxOTgyMzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 3,
    name: 'Michael Brown',
    age: 58,
    gender: 'Male',
    condition: 'Arthritis',
    lastVisit: '2026-02-18',
    phone: '+1 (555) 345-6789',
    email: 'michael.brown@email.com',
    address: '789 Pine Rd, Manhattan, NY',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1765896387377-e293914d1e69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGRlcmx5JTIwcGF0aWVudCUyMHNtaWxpbmd8ZW58MXx8fHwxNzcyMTk4MjM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    age: 41,
    gender: 'Female',
    condition: 'Asthma',
    lastVisit: '2026-02-22',
    phone: '+1 (555) 456-7890',
    email: 'sarah.wilson@email.com',
    address: '321 Elm St, Queens, NY',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1755189118414-14c8dacdb082?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzIxNTE5NzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 5,
    name: 'David Martinez',
    age: 67,
    gender: 'Male',
    condition: 'Heart Disease',
    lastVisit: '2026-02-15',
    phone: '+1 (555) 567-8901',
    email: 'david.martinez@email.com',
    address: '654 Maple Dr, Bronx, NY',
    status: 'Monitoring',
    image: 'https://images.unsplash.com/photo-1633488781325-d36e6818d0c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXRpZW50JTIwbWVkaWNhbCUyMGNhcmV8ZW58MXx8fHwxNzcyMTk4MjM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
];

export function PatientsSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(patients[0]);
  const [showDetails, setShowDetails] = useState(false);

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patients List */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header & Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Patients</h2>
              <p className="text-sm text-gray-500 mt-1">Manage patient records</p>
            </div>
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <Plus className="w-4 h-4 mr-2" />
              Add Patient
            </button>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <button className="inline-flex items-center px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
          </div>

          {/* Patients Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPatients.map((patient) => (
              <div
                key={patient.id}
                onClick={() => {
                  setSelectedPatient(patient);
                  setShowDetails(true);
                }}
                className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <ImageWithFallback
                      src={patient.image}
                      alt={patient.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{patient.name}</h3>
                      <p className="text-sm text-gray-500">
                        {patient.age} years • {patient.gender}
                      </p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium mr-2">Condition:</span>
                    <span>{patient.condition}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-1.5" />
                    Last visit: {new Date(patient.lastVisit).toLocaleDateString()}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <span
                    className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                      patient.status === 'Active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-orange-100 text-orange-700'
                    }`}
                  >
                    {patient.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Patient Details Sidebar */}
        <div className={`${showDetails ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-6">
            <div className="text-center mb-6">
              <ImageWithFallback
                src={selectedPatient.image}
                alt={selectedPatient.name}
                className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
              />
              <h3 className="text-xl font-bold text-gray-900">{selectedPatient.name}</h3>
              <p className="text-sm text-gray-500">
                {selectedPatient.age} years • {selectedPatient.gender}
              </p>
              <div className="mt-3">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    selectedPatient.status === 'Active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-orange-100 text-orange-700'
                  }`}
                >
                  {selectedPatient.status}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Contact Information</h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 text-sm">
                    <Phone className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-gray-500">Phone</p>
                      <p className="text-gray-900">{selectedPatient.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 text-sm">
                    <Mail className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-gray-500">Email</p>
                      <p className="text-gray-900">{selectedPatient.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 text-sm">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-gray-500">Address</p>
                      <p className="text-gray-900">{selectedPatient.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Medical Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Primary Condition</span>
                    <span className="text-gray-900 font-medium">{selectedPatient.condition}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Last Visit</span>
                    <span className="text-gray-900 font-medium">
                      {new Date(selectedPatient.lastVisit).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 space-y-2">
                <button className="w-full px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  Schedule Appointment
                </button>
                <button className="w-full px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
                  View Medical Records
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
