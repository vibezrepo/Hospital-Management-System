import { 
  Building2, 
  CreditCard, 
  DollarSign, 
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const saasMetrics = [
  {
    label: 'Total Hospitals',
    value: '342',
    change: '+12.5%',
    trend: 'up',
    icon: Building2,
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
    changeColor: 'text-green-600',
    description: 'vs last month',
  },
  {
    label: 'Active Subscriptions',
    value: '298',
    change: '+8.3%',
    trend: 'up',
    icon: CreditCard,
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600',
    changeColor: 'text-green-600',
    description: 'vs last month',
  },
  {
    label: 'Monthly Revenue',
    value: '$142,850',
    change: '+15.2%',
    trend: 'up',
    icon: DollarSign,
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600',
    changeColor: 'text-green-600',
    description: 'vs last month',
  },
  {
    label: 'Expired Accounts',
    value: '44',
    change: '-5.2%',
    trend: 'down',
    icon: AlertTriangle,
    bgColor: 'bg-orange-50',
    iconColor: 'text-orange-600',
    changeColor: 'text-red-600',
    description: 'vs last month',
  },
];

const revenueData = [
  { month: 'Jan', revenue: 98500, subscriptions: 245 },
  { month: 'Feb', revenue: 112000, subscriptions: 268 },
  { month: 'Mar', revenue: 125000, subscriptions: 282 },
  { month: 'Apr', revenue: 118000, subscriptions: 275 },
  { month: 'May', revenue: 135000, subscriptions: 290 },
  { month: 'Jun', revenue: 142850, subscriptions: 298 },
];

const subscriptionData = [
  { plan: 'Basic', count: 82, revenue: 24600, color: '#3B82F6' },
  { plan: 'Professional', count: 145, revenue: 72500, color: '#10B981' },
  { plan: 'Enterprise', count: 71, revenue: 45750, color: '#8B5CF6' },
];

const recentHospitals = [
  { id: 1, name: 'St. Mary Medical Center', plan: 'Enterprise', status: 'Active', joined: '2026-02-25', users: 145 },
  { id: 2, name: 'City General Hospital', plan: 'Professional', status: 'Active', joined: '2026-02-24', users: 89 },
  { id: 3, name: 'Riverside Healthcare', plan: 'Basic', status: 'Trial', joined: '2026-02-23', users: 34 },
  { id: 4, name: 'Oakwood Medical Group', plan: 'Professional', status: 'Active', joined: '2026-02-22', users: 67 },
  { id: 5, name: 'Summit Health System', plan: 'Enterprise', status: 'Active', joined: '2026-02-20', users: 203 },
];

const expiringAccounts = [
  { id: 1, name: 'Valley View Hospital', plan: 'Professional', expiryDate: '2026-03-05', status: 'Expiring Soon' },
  { id: 2, name: 'Coastal Medical Center', plan: 'Basic', expiryDate: '2026-03-08', status: 'Expiring Soon' },
  { id: 3, name: 'Mountain Ridge Clinic', plan: 'Professional', expiryDate: '2026-03-12', status: 'Expiring Soon' },
];

export function SaaSOverview() {
  return (
    <div className="p-6 lg:p-8 space-y-8 bg-gray-50">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Welcome back, Admin</h1>
          <p className="text-gray-600 mt-1">Here's what's happening with your platform today.</p>
        </div>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {saasMetrics.map((metric, index) => {
          const Icon = metric.icon;
          const TrendIcon = metric.trend === 'up' ? ArrowUpRight : ArrowDownRight;
          
          return (
            <div 
              key={index} 
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${metric.bgColor}`}>
                  <Icon className={`w-6 h-6 ${metric.iconColor}`} />
                </div>
                <div className={`flex items-center space-x-1 px-2 py-1 rounded-lg ${
                  metric.trend === 'up' ? 'bg-green-50' : 'bg-red-50'
                }`}>
                  <TrendIcon className={`w-4 h-4 ${metric.changeColor}`} />
                  <span className={`text-sm font-semibold ${metric.changeColor}`}>
                    {metric.change}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
                <p className="text-3xl font-bold text-gray-900 mb-1">{metric.value}</p>
                <p className="text-xs text-gray-500">{metric.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Revenue Overview</h3>
              <p className="text-sm text-gray-500">Monthly recurring revenue trend</p>
            </div>
            <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Last 6 months</option>
              <option>Last 12 months</option>
              <option>All time</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis 
                dataKey="month" 
                stroke="#9CA3AF" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#9CA3AF" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#3B82F6"
                strokeWidth={3}
                fill="url(#revenueGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Subscription Breakdown */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900">Subscription Plans</h3>
            <p className="text-sm text-gray-500">Active subscriptions by plan</p>
          </div>
          
          <div className="space-y-4">
            {subscriptionData.map((item, index) => {
              const total = subscriptionData.reduce((sum, s) => sum + s.count, 0);
              const percentage = ((item.count / total) * 100).toFixed(1);
              
              return (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm font-medium text-gray-900">{item.plan}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">{item.count}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 mb-1">
                    <div 
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${percentage}%`,
                        backgroundColor: item.color 
                      }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">{percentage}% of total</span>
                    <span className="text-gray-900 font-medium">${item.revenue.toLocaleString()}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Total MRR</span>
              <span className="text-xl font-bold text-gray-900">
                ${subscriptionData.reduce((sum, s) => sum + s.revenue, 0).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Hospitals */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Recent Hospitals</h3>
              <p className="text-sm text-gray-500">Newest additions to platform</p>
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View All
            </button>
          </div>
          
          <div className="space-y-3">
            {recentHospitals.map((hospital) => (
              <div 
                key={hospital.id}
                className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3 flex-1">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{hospital.name}</p>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <span>{hospital.users} users</span>
                      <span>•</span>
                      <span>{new Date(hospital.joined).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
                    hospital.status === 'Active' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {hospital.status}
                  </span>
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium">
                    {hospital.plan}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expiring Accounts */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Expiring Soon</h3>
              <p className="text-sm text-gray-500">Accounts requiring attention</p>
            </div>
            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium">
              {expiringAccounts.length} accounts
            </span>
          </div>
          
          <div className="space-y-3">
            {expiringAccounts.map((account) => {
              const daysUntilExpiry = Math.ceil(
                (new Date(account.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
              );
              
              return (
                <div 
                  key={account.id}
                  className="p-4 rounded-xl border border-orange-100 bg-orange-50/50"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{account.name}</p>
                      <p className="text-xs text-gray-500 mt-1">{account.plan} Plan</p>
                    </div>
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-600">
                      Expires: <span className="font-medium text-gray-900">
                        {new Date(account.expiryDate).toLocaleDateString()}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-orange-700">
                      {daysUntilExpiry} days left
                    </span>
                  </div>
                  <button className="mt-3 w-full px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                    Send Renewal Reminder
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <button className="w-full text-center text-sm text-gray-600 hover:text-gray-900 font-medium">
              View All Expiring Accounts →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
