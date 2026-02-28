import { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  FileText, 
  Settings, 
  Bell,
  Search,
  ChevronDown,
  Activity,
  TrendingUp,
  Clock,
  AlertCircle,
  Heart,
  LogOut,
  Menu,
  X,
  Building2,
  CreditCard,
  BarChart3,
  HelpCircle
} from 'lucide-react';
import { SaaSOverview } from '../components/dashboard/SaaSOverview';
import { PatientsSection } from '../components/dashboard/PatientsSection';
import { AppointmentsSection } from '../components/dashboard/AppointmentsSection';
import { ReportsSection } from '../components/dashboard/ReportsSection';

type Section = 'overview' | 'hospitals' | 'subscriptions' | 'analytics' | 'settings';

export function DashboardPage() {
  const [activeSection, setActiveSection] = useState<Section>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const menuItems = [
    { id: 'overview' as Section, label: 'Overview', icon: LayoutDashboard },
    { id: 'hospitals' as Section, label: 'Hospitals', icon: Building2 },
    { id: 'subscriptions' as Section, label: 'Subscriptions', icon: CreditCard },
    { id: 'analytics' as Section, label: 'Analytics', icon: BarChart3 },
    { id: 'settings' as Section, label: 'Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <SaaSOverview />;
      case 'hospitals':
        return <PatientsSection />;
      case 'subscriptions':
        return <AppointmentsSection />;
      case 'analytics':
        return <ReportsSection />;
      case 'settings':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Settings</h2>
            <p className="text-gray-600">Settings panel coming soon...</p>
          </div>
        );
      default:
        return <SaaSOverview />;
    }
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className={`${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out flex flex-col`}>
        {/* Logo */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Heart className="w-6 h-6 text-white" fill="white" />
            </div>
            <div>
              <h1 className="font-bold text-gray-900 text-lg">MediCare HMS</h1>
              <p className="text-xs text-gray-500">Admin Portal</p>
            </div>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Main Menu
          </p>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-blue-600'}`} />
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Help Section */}
        <div className="p-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 mb-4">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-white rounded-lg">
                <HelpCircle className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm mb-1">Need Help?</h4>
                <p className="text-xs text-gray-600 mb-3">Check our documentation</p>
                <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition">
                  Get Support
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-100">
          <div className="relative">
            <button 
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="w-full flex items-center space-x-3 px-3 py-3 rounded-xl hover:bg-gray-50 transition"
            >
              <img
                src="https://images.unsplash.com/photo-1755189118414-14c8dacdb082?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzIxNTE5NzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Admin User"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100"
              />
              <div className="flex-1 min-w-0 text-left">
                <p className="text-sm font-semibold text-gray-900 truncate">Sarah Johnson</p>
                <p className="text-xs text-gray-500 truncate">Super Admin</p>
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {profileDropdownOpen && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                <button className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition text-left">
                  <Settings className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-700">Account Settings</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-red-50 transition text-left border-t border-gray-100">
                  <LogOut className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-red-600 font-medium">Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 lg:px-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {menuItems.find(item => item.id === activeSection)?.label || 'Dashboard'}
              </h2>
              <p className="text-sm text-gray-500">Hospital Management System</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Search */}
            <div className="hidden md:flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 w-80 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition">
              <Search className="w-4 h-4 text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="Search hospitals, users..."
                className="bg-transparent outline-none text-sm w-full placeholder-gray-400"
              />
            </div>

            {/* Notifications */}
            <button className="relative p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl transition">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white"></span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}