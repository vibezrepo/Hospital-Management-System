import { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Plus, Filter, Search, Video, MapPin, User } from 'lucide-react';

const appointments = [
  {
    id: 1,
    patient: 'John Smith',
    date: '2026-02-27',
    time: '09:00 AM',
    duration: '30 min',
    doctor: 'Dr. Sarah Wilson',
    type: 'In-person',
    department: 'Cardiology',
    status: 'Confirmed',
    reason: 'Annual Checkup',
  },
  {
    id: 2,
    patient: 'Emma Davis',
    date: '2026-02-27',
    time: '10:30 AM',
    duration: '45 min',
    doctor: 'Dr. Michael Chen',
    type: 'Video Call',
    department: 'Endocrinology',
    status: 'Confirmed',
    reason: 'Diabetes Follow-up',
  },
  {
    id: 3,
    patient: 'Michael Brown',
    date: '2026-02-27',
    time: '11:00 AM',
    duration: '30 min',
    doctor: 'Dr. Emily Garcia',
    type: 'In-person',
    department: 'Orthopedics',
    status: 'Pending',
    reason: 'Knee Pain Assessment',
  },
  {
    id: 4,
    patient: 'Sarah Wilson',
    date: '2026-02-27',
    time: '02:00 PM',
    duration: '60 min',
    doctor: 'Dr. James Lee',
    type: 'In-person',
    department: 'Surgery',
    status: 'Confirmed',
    reason: 'Pre-Surgery Consultation',
  },
  {
    id: 5,
    patient: 'David Martinez',
    date: '2026-02-28',
    time: '09:30 AM',
    duration: '30 min',
    doctor: 'Dr. Sarah Wilson',
    type: 'Video Call',
    department: 'Cardiology',
    status: 'Confirmed',
    reason: 'Heart Condition Follow-up',
  },
  {
    id: 6,
    patient: 'Lisa Anderson',
    date: '2026-02-28',
    time: '11:00 AM',
    duration: '45 min',
    doctor: 'Dr. Robert Patel',
    type: 'In-person',
    department: 'Neurology',
    status: 'Pending',
    reason: 'Migraine Treatment',
  },
  {
    id: 7,
    patient: 'Robert Taylor',
    date: '2026-02-28',
    time: '02:30 PM',
    duration: '30 min',
    doctor: 'Dr. Jennifer Kim',
    type: 'In-person',
    department: 'Pediatrics',
    status: 'Confirmed',
    reason: 'Vaccination',
  },
  {
    id: 8,
    patient: 'Amanda White',
    date: '2026-03-01',
    time: '10:00 AM',
    duration: '45 min',
    doctor: 'Dr. Michael Chen',
    type: 'Video Call',
    department: 'Dermatology',
    status: 'Confirmed',
    reason: 'Skin Condition Review',
  },
];

export function AppointmentsSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'Confirmed' | 'Pending'>('all');

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'all' || appointment.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Group by date
  const groupedByDate = filteredAppointments.reduce((acc, appointment) => {
    const date = appointment.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(appointment);
    return acc;
  }, {} as Record<string, typeof appointments>);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Appointments</h2>
          <p className="text-sm text-gray-500 mt-1">Manage scheduled appointments</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          <Plus className="w-4 h-4 mr-2" />
          New Appointment
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Today's Appointments</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {appointments.filter((a) => a.date === '2026-02-27').length}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <CalendarIcon className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Confirmed</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {appointments.filter((a) => a.status === 'Confirmed').length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {appointments.filter((a) => a.status === 'Pending').length}
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search appointments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2.5 rounded-lg transition ${
                filterStatus === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterStatus('Confirmed')}
              className={`px-4 py-2.5 rounded-lg transition ${
                filterStatus === 'Confirmed'
                  ? 'bg-green-600 text-white'
                  : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Confirmed
            </button>
            <button
              onClick={() => setFilterStatus('Pending')}
              className={`px-4 py-2.5 rounded-lg transition ${
                filterStatus === 'Pending'
                  ? 'bg-orange-600 text-white'
                  : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Pending
            </button>
          </div>
        </div>
      </div>

      {/* Appointments List */}
      <div className="space-y-6">
        {Object.entries(groupedByDate).map(([date, dateAppointments]) => (
          <div key={date}>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{formatDate(date)}</h3>
            <div className="space-y-3">
              {dateAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Left Section */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-semibold text-gray-900">{appointment.patient}</h4>
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                appointment.status === 'Confirmed'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-orange-100 text-orange-700'
                              }`}
                            >
                              {appointment.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{appointment.reason}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1.5 text-gray-400" />
                          <span>
                            {appointment.time} ({appointment.duration})
                          </span>
                        </div>
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1.5 text-gray-400" />
                          <span>{appointment.doctor}</span>
                        </div>
                        <div className="flex items-center">
                          {appointment.type === 'Video Call' ? (
                            <Video className="w-4 h-4 mr-1.5 text-gray-400" />
                          ) : (
                            <MapPin className="w-4 h-4 mr-1.5 text-gray-400" />
                          )}
                          <span>{appointment.type}</span>
                        </div>
                        <div className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs font-medium">
                          {appointment.department}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex lg:flex-col gap-2">
                      <button className="flex-1 lg:flex-initial px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm">
                        View Details
                      </button>
                      <button className="flex-1 lg:flex-initial px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition text-sm">
                        Reschedule
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
