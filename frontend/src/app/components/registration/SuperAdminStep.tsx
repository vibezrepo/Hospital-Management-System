import { useState } from 'react';
import { User, Mail, Phone, Lock, Eye, EyeOff, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { HospitalData } from '../../pages/HospitalRegistrationPage';

interface Props {
  data: HospitalData;
  updateData: (updates: Partial<HospitalData>) => void;
}

export function SuperAdminStep({ data, updateData }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const passwordRequirements = [
    { label: 'At least 8 characters', test: (pwd: string) => pwd.length >= 8 },
    { label: 'One uppercase letter', test: (pwd: string) => /[A-Z]/.test(pwd) },
    { label: 'One lowercase letter', test: (pwd: string) => /[a-z]/.test(pwd) },
    { label: 'One number', test: (pwd: string) => /\d/.test(pwd) },
    { label: 'One special character', test: (pwd: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd) },
  ];

  const validateEmail = (email: string) => {
    if (!email) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Invalid email format';
    return '';
  };

  const validatePhone = (phone: string) => {
    if (!phone) return 'Phone number is required';
    if (!/^\+?[\d\s\-()]+$/.test(phone)) return 'Invalid phone number';
    return '';
  };

  const validatePassword = (password: string) => {
    if (!password) return 'Password is required';
    const allPassed = passwordRequirements.every((req) => req.test(password));
    if (!allPassed) return 'Password does not meet requirements';
    return '';
  };

  const validateConfirmPassword = (confirmPassword: string, password: string) => {
    if (!confirmPassword) return 'Please confirm your password';
    if (confirmPassword !== password) return 'Passwords do not match';
    return '';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Super Admin Setup</h2>
        <p className="text-gray-600">Create the main administrator account for your hospital</p>
      </div>

      {/* Admin Info Banner */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-5">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-white rounded-xl shadow-sm">
            <Shield className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Super Administrator</h3>
            <p className="text-sm text-gray-700">
              This account will have full access to all system features and settings. You can add more administrators later.
            </p>
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            First Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={data.adminFirstName}
              onChange={(e) => updateData({ adminFirstName: e.target.value })}
              className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition"
              placeholder="John"
            />
          </div>
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Last Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={data.adminLastName}
              onChange={(e) => updateData({ adminLastName: e.target.value })}
              className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition"
              placeholder="Doe"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              value={data.adminEmail}
              onChange={(e) => {
                updateData({ adminEmail: e.target.value });
                setErrors((prev) => ({ ...prev, adminEmail: '' }));
              }}
              onBlur={(e) => {
                const error = validateEmail(e.target.value);
                setErrors((prev) => ({ ...prev, adminEmail: error }));
              }}
              className={`w-full pl-11 pr-10 py-3 border-2 rounded-xl focus:outline-none transition ${
                errors.adminEmail
                  ? 'border-red-300 focus:border-red-500'
                  : data.adminEmail && !errors.adminEmail
                  ? 'border-green-300 focus:border-green-500'
                  : 'border-gray-200 focus:border-blue-500'
              }`}
              placeholder="admin@hospital.com"
            />
            {data.adminEmail && !errors.adminEmail && (
              <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
            )}
            {errors.adminEmail && (
              <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
            )}
          </div>
          {errors.adminEmail && (
            <p className="mt-1 text-xs text-red-600">{errors.adminEmail}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="tel"
              value={data.adminPhone}
              onChange={(e) => {
                updateData({ adminPhone: e.target.value });
                setErrors((prev) => ({ ...prev, adminPhone: '' }));
              }}
              onBlur={(e) => {
                const error = validatePhone(e.target.value);
                setErrors((prev) => ({ ...prev, adminPhone: error }));
              }}
              className={`w-full pl-11 pr-10 py-3 border-2 rounded-xl focus:outline-none transition ${
                errors.adminPhone
                  ? 'border-red-300 focus:border-red-500'
                  : data.adminPhone && !errors.adminPhone
                  ? 'border-green-300 focus:border-green-500'
                  : 'border-gray-200 focus:border-blue-500'
              }`}
              placeholder="+1 (555) 000-0000"
            />
            {data.adminPhone && !errors.adminPhone && (
              <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
            )}
            {errors.adminPhone && (
              <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
            )}
          </div>
          {errors.adminPhone && (
            <p className="mt-1 text-xs text-red-600">{errors.adminPhone}</p>
          )}
        </div>

        {/* Password */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={data.adminPassword}
              onChange={(e) => {
                updateData({ adminPassword: e.target.value });
                setErrors((prev) => ({ ...prev, adminPassword: '' }));
              }}
              onBlur={(e) => {
                const error = validatePassword(e.target.value);
                setErrors((prev) => ({ ...prev, adminPassword: error }));
              }}
              className={`w-full pl-11 pr-12 py-3 border-2 rounded-xl focus:outline-none transition ${
                errors.adminPassword
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-gray-200 focus:border-blue-500'
              }`}
              placeholder="Create a strong password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.adminPassword && (
            <p className="mt-1 text-xs text-red-600">{errors.adminPassword}</p>
          )}
        </div>

        {/* Password Requirements */}
        {data.adminPassword && (
          <div className="md:col-span-2">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <p className="text-sm font-semibold text-gray-700 mb-3">Password Requirements:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {passwordRequirements.map((req, index) => {
                  const passed = req.test(data.adminPassword);
                  return (
                    <div key={index} className="flex items-center space-x-2">
                      {passed ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-gray-400" />
                      )}
                      <span className={`text-sm ${passed ? 'text-green-700' : 'text-gray-600'}`}>
                        {req.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Confirm Password */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={data.adminConfirmPassword}
              onChange={(e) => {
                updateData({ adminConfirmPassword: e.target.value });
                setErrors((prev) => ({ ...prev, adminConfirmPassword: '' }));
              }}
              onBlur={(e) => {
                const error = validateConfirmPassword(e.target.value, data.adminPassword);
                setErrors((prev) => ({ ...prev, adminConfirmPassword: error }));
              }}
              className={`w-full pl-11 pr-12 py-3 border-2 rounded-xl focus:outline-none transition ${
                errors.adminConfirmPassword
                  ? 'border-red-300 focus:border-red-500'
                  : data.adminConfirmPassword && !errors.adminConfirmPassword && data.adminPassword === data.adminConfirmPassword
                  ? 'border-green-300 focus:border-green-500'
                  : 'border-gray-200 focus:border-blue-500'
              }`}
              placeholder="Re-enter your password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.adminConfirmPassword && (
            <p className="mt-1 text-xs text-red-600">{errors.adminConfirmPassword}</p>
          )}
          {data.adminConfirmPassword && !errors.adminConfirmPassword && data.adminPassword === data.adminConfirmPassword && (
            <p className="mt-1 text-xs text-green-600 flex items-center space-x-1">
              <CheckCircle className="w-4 h-4" />
              <span>Passwords match</span>
            </p>
          )}
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <Shield className="w-5 h-5 text-amber-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-amber-900 text-sm mb-1">Security Notice</h4>
            <p className="text-sm text-amber-700">
              Keep your password secure and do not share it with anyone. We recommend using a password manager to generate and store strong passwords.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
