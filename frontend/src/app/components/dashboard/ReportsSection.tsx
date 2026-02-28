import { FileText, Download, Calendar, TrendingUp, Users, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const monthlyData = [
  { month: 'Jan', patients: 220, appointments: 240, revenue: 48000 },
  { month: 'Feb', patients: 250, appointments: 280, revenue: 52000 },
  { month: 'Mar', patients: 280, appointments: 320, revenue: 61000 },
  { month: 'Apr', patients: 260, appointments: 290, revenue: 55000 },
  { month: 'May', patients: 310, appointments: 350, revenue: 68000 },
  { month: 'Jun', patients: 340, appointments: 380, revenue: 74000 },
];

const departmentStats = [
  { department: 'Cardiology', patients: 456, appointments: 520, growth: 12.5 },
  { department: 'Neurology', patients: 320, appointments: 380, growth: 8.3 },
  { department: 'Orthopedics', patients: 285, appointments: 310, growth: -2.1 },
  { department: 'Pediatrics', patients: 410, appointments: 480, growth: 15.7 },
  { department: 'Dermatology', patients: 198, appointments: 220, growth: 5.4 },
];

const reports = [
  {
    id: 1,
    title: 'Monthly Patient Report - February 2026',
    type: 'Patient Analytics',
    date: '2026-02-27',
    size: '2.4 MB',
    format: 'PDF',
  },
  {
    id: 2,
    title: 'Department Performance Q1 2026',
    type: 'Performance',
    date: '2026-02-25',
    size: '1.8 MB',
    format: 'PDF',
  },
  {
    id: 3,
    title: 'Financial Summary - January 2026',
    type: 'Financial',
    date: '2026-02-20',
    size: '3.2 MB',
    format: 'XLSX',
  },
  {
    id: 4,
    title: 'Appointment Statistics - Week 8',
    type: 'Appointments',
    date: '2026-02-18',
    size: '1.2 MB',
    format: 'PDF',
  },
];

export function ReportsSection() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Reports & Analytics</h2>
          <p className="text-sm text-gray-500 mt-1">Overview of hospital performance metrics</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-sm text-green-600 font-medium">+10.5%</span>
          </div>
          <p className="text-sm text-gray-600">Total Patients</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">2,847</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Calendar className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-sm text-green-600 font-medium">+8.2%</span>
          </div>
          <p className="text-sm text-gray-600">Appointments</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">1,560</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Activity className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-sm text-red-600 font-medium">-3.1%</span>
          </div>
          <p className="text-sm text-gray-600">Active Cases</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">156</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-orange-600" />
            </div>
            <span className="text-sm text-green-600 font-medium">+12.8%</span>
          </div>
          <p className="text-sm text-gray-600">Revenue (YTD)</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">$358K</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Patient Trend */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900">Patient Trend</h3>
            <p className="text-sm text-gray-500">Monthly patient statistics</p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="patientGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Area
                type="monotone"
                dataKey="patients"
                stroke="#3B82F6"
                strokeWidth={2}
                fill="url(#patientGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Trend */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900">Revenue Analysis</h3>
            <p className="text-sm text-gray-500">Monthly revenue breakdown</p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Bar dataKey="revenue" fill="#10B981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Department Statistics */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900">Department Performance</h3>
          <p className="text-sm text-gray-500">Performance metrics by department</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Department</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">Patients</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">Appointments</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">Growth</th>
              </tr>
            </thead>
            <tbody>
              {departmentStats.map((dept, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <span className="font-medium text-gray-900">{dept.department}</span>
                  </td>
                  <td className="py-4 px-4 text-right text-gray-600">{dept.patients}</td>
                  <td className="py-4 px-4 text-right text-gray-600">{dept.appointments}</td>
                  <td className="py-4 px-4 text-right">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        dept.growth > 0
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {dept.growth > 0 ? '+' : ''}
                      {dept.growth}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Generated Reports */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900">Generated Reports</h3>
          <p className="text-sm text-gray-500">Recent downloadable reports</p>
        </div>
        <div className="space-y-3">
          {reports.map((report) => (
            <div
              key={report.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
            >
              <div className="flex items-start space-x-4 flex-1">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 mb-1">{report.title}</h4>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-1" />
                      {new Date(report.date).toLocaleDateString()}
                    </span>
                    <span>•</span>
                    <span>{report.type}</span>
                    <span>•</span>
                    <span>{report.size}</span>
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                      {report.format}
                    </span>
                  </div>
                </div>
              </div>
              <button className="ml-4 p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                <Download className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
