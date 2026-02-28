import { Users, Calendar, Activity, TrendingUp, Clock, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const stats = [
  {
    label: 'Total Patients',
    value: '2,847',
    change: '+12.5%',
    trend: 'up',
    icon: Users,
    color: 'blue',
  },
  {
    label: "Today's Appointments",
    value: '24',
    change: '3 pending',
    trend: 'neutral',
    icon: Calendar,
    color: 'green',
  },
  {
    label: 'Active Cases',
    value: '156',
    change: '-5.2%',
    trend: 'down',
    icon: Activity,
    color: 'purple',
  },
  {
    label: 'Recovery Rate',
    value: '94.2%',
    change: '+2.1%',
    trend: 'up',
    icon: TrendingUp,
    color: 'orange',
  },
];

const appointmentData = [
  { month: 'Jan', appointments: 240 },
  { month: 'Feb', appointments: 280 },
  { month: 'Mar', appointments: 320 },
  { month: 'Apr', appointments: 290 },
  { month: 'May', appointments: 350 },
  { month: 'Jun', appointments: 380 },
];

const patientDistribution = [
  { name: 'Cardiology', value: 35, color: '#3B82F6' },
  { name: 'Neurology', value: 25, color: '#10B981' },
  { name: 'Orthopedics', value: 20, color: '#F59E0B' },
  { name: 'Pediatrics', value: 15, color: '#8B5CF6' },
  { name: 'Other', value: 5, color: '#6B7280' },
];

const recentAppointments = [
  { id: 1, patient: 'John Smith', time: '09:00 AM', doctor: 'Dr. Wilson', status: 'completed', type: 'Checkup' },
  { id: 2, patient: 'Emma Davis', time: '10:30 AM', doctor: 'Dr. Johnson', status: 'in-progress', type: 'Consultation' },
  { id: 3, patient: 'Michael Brown', time: '11:00 AM', doctor: 'Dr. Lee', status: 'pending', type: 'Follow-up' },
  { id: 4, patient: 'Sarah Wilson', time: '02:00 PM', doctor: 'Dr. Garcia', status: 'pending', type: 'Surgery' },
  { id: 5, patient: 'David Martinez', time: '03:30 PM', doctor: 'Dr. Patel', status: 'pending', type: 'Therapy' },
];

export function DashboardOverview() {
  return (
    <div className="p-6 space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: 'bg-blue-100 text-blue-600',
            green: 'bg-green-100 text-green-600',
            purple: 'bg-purple-100 text-purple-600',
            orange: 'bg-orange-100 text-orange-600',
          }[stat.color];

          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
                  <p className={`text-sm ${
                    stat.trend === 'up' ? 'text-green-600' : 
                    stat.trend === 'down' ? 'text-red-600' : 
                    'text-gray-600'
                  }`}>
                    {stat.change}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${colorClasses}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Appointments Trend */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900">Appointments Overview</h3>
            <p className="text-sm text-gray-500">Monthly appointment statistics</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={appointmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="appointments" fill="#3B82F6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Patient Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900">Patient Distribution</h3>
            <p className="text-sm text-gray-500">By department</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={patientDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {patientDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {patientDistribution.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-gray-700">{item.name}</span>
                </div>
                <span className="font-medium text-gray-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Appointments */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Today's Appointments</h3>
            <p className="text-sm text-gray-500">Current schedule overview</p>
          </div>
          <button className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition">
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Patient</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Time</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Doctor</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Type</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentAppointments.map((appointment) => (
                <tr key={appointment.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <span className="font-medium text-gray-900">{appointment.patient}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-1.5" />
                      <span className="text-sm">{appointment.time}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-600">{appointment.doctor}</td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-600">{appointment.type}</span>
                  </td>
                  <td className="py-4 px-4">
                    {appointment.status === 'completed' && (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        <CheckCircle className="w-3.5 h-3.5 mr-1" />
                        Completed
                      </span>
                    )}
                    {appointment.status === 'in-progress' && (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        <Activity className="w-3.5 h-3.5 mr-1" />
                        In Progress
                      </span>
                    )}
                    {appointment.status === 'pending' && (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                        <AlertCircle className="w-3.5 h-3.5 mr-1" />
                        Pending
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
