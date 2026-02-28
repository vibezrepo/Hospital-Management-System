import { useState } from 'react';
import { Upload, X, Building2, CheckCircle, AlertCircle } from 'lucide-react';
import { HospitalData } from '../../pages/HospitalRegistrationPage';

interface Props {
  data: HospitalData;
  updateData: (updates: Partial<HospitalData>) => void;
}

export function HospitalInfoStep({ data, updateData }: Props) {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateData({ logo: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    updateData({ logo: null });
    setLogoPreview(null);
  };

  const validateField = (field: string, value: string) => {
    let error = '';
    
    if (!value.trim()) {
      error = 'This field is required';
    } else if (field === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = 'Please enter a valid email address';
    } else if (field === 'phone' && !/^\+?[\d\s\-()]+$/.test(value)) {
      error = 'Please enter a valid phone number';
    } else if (field === 'website' && value && !/^https?:\/\/.+/.test(value)) {
      error = 'Please enter a valid URL (starting with http:// or https://)';
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Hospital Information</h2>
        <p className="text-gray-600">Enter basic information about your hospital</p>
      </div>

      {/* Logo Upload */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">Hospital Logo</label>
        <div className="flex items-start space-x-4">
          {logoPreview ? (
            <div className="relative">
              <img
                src={logoPreview}
                alt="Hospital Logo"
                className="w-32 h-32 object-cover rounded-xl border-2 border-gray-200"
              />
              <button
                onClick={removeLogo}
                className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition shadow-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <label className="w-32 h-32 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition group">
              <Upload className="w-8 h-8 text-gray-400 group-hover:text-blue-600 mb-2" />
              <span className="text-xs text-gray-500 group-hover:text-blue-600">Upload Logo</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
            </label>
          )}
          <div className="flex-1">
            <p className="text-sm text-gray-600 mb-1">Upload your hospital's logo</p>
            <p className="text-xs text-gray-500">Recommended: Square image, at least 200x200px</p>
            <p className="text-xs text-gray-500">Formats: JPG, PNG, SVG (Max 2MB)</p>
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Hospital Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Hospital Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={data.hospitalName}
              onChange={(e) => updateData({ hospitalName: e.target.value })}
              onBlur={(e) => validateField('hospitalName', e.target.value)}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition ${
                errors.hospitalName
                  ? 'border-red-300 focus:border-red-500'
                  : data.hospitalName
                  ? 'border-green-300 focus:border-green-500'
                  : 'border-gray-200 focus:border-blue-500'
              }`}
              placeholder="e.g., City General Hospital"
            />
            {data.hospitalName && !errors.hospitalName && (
              <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
            )}
            {errors.hospitalName && (
              <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
            )}
          </div>
          {errors.hospitalName && (
            <p className="mt-1 text-xs text-red-600">{errors.hospitalName}</p>
          )}
        </div>

        {/* Legal Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Legal Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={data.legalName}
            onChange={(e) => updateData({ legalName: e.target.value })}
            onBlur={(e) => validateField('legalName', e.target.value)}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition ${
              errors.legalName
                ? 'border-red-300 focus:border-red-500'
                : data.legalName
                ? 'border-green-300 focus:border-green-500'
                : 'border-gray-200 focus:border-blue-500'
            }`}
            placeholder="Official registered name"
          />
          {errors.legalName && (
            <p className="mt-1 text-xs text-red-600">{errors.legalName}</p>
          )}
        </div>

        {/* Registration Number */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Registration Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={data.registrationNumber}
            onChange={(e) => updateData({ registrationNumber: e.target.value })}
            onBlur={(e) => validateField('registrationNumber', e.target.value)}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition ${
              errors.registrationNumber
                ? 'border-red-300 focus:border-red-500'
                : data.registrationNumber
                ? 'border-green-300 focus:border-green-500'
                : 'border-gray-200 focus:border-blue-500'
            }`}
            placeholder="Hospital registration number"
          />
          {errors.registrationNumber && (
            <p className="mt-1 text-xs text-red-600">{errors.registrationNumber}</p>
          )}
        </div>

        {/* Tax ID */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Tax ID / EIN <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={data.taxId}
            onChange={(e) => updateData({ taxId: e.target.value })}
            onBlur={(e) => validateField('taxId', e.target.value)}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition ${
              errors.taxId
                ? 'border-red-300 focus:border-red-500'
                : data.taxId
                ? 'border-green-300 focus:border-green-500'
                : 'border-gray-200 focus:border-blue-500'
            }`}
            placeholder="XX-XXXXXXX"
          />
          {errors.taxId && (
            <p className="mt-1 text-xs text-red-600">{errors.taxId}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => updateData({ phone: e.target.value })}
            onBlur={(e) => validateField('phone', e.target.value)}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition ${
              errors.phone
                ? 'border-red-300 focus:border-red-500'
                : data.phone
                ? 'border-green-300 focus:border-green-500'
                : 'border-gray-200 focus:border-blue-500'
            }`}
            placeholder="+1 (555) 000-0000"
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => updateData({ email: e.target.value })}
            onBlur={(e) => validateField('email', e.target.value)}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition ${
              errors.email
                ? 'border-red-300 focus:border-red-500'
                : data.email
                ? 'border-green-300 focus:border-green-500'
                : 'border-gray-200 focus:border-blue-500'
            }`}
            placeholder="contact@hospital.com"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Website */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Website
          </label>
          <input
            type="url"
            value={data.website}
            onChange={(e) => updateData({ website: e.target.value })}
            onBlur={(e) => e.target.value && validateField('website', e.target.value)}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition ${
              errors.website
                ? 'border-red-300 focus:border-red-500'
                : data.website
                ? 'border-green-300 focus:border-green-500'
                : 'border-gray-200 focus:border-blue-500'
            }`}
            placeholder="https://www.hospital.com"
          />
          {errors.website && (
            <p className="mt-1 text-xs text-red-600">{errors.website}</p>
          )}
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <Building2 className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900 text-sm mb-1">Important Information</h4>
            <p className="text-sm text-blue-700">
              Please ensure all information is accurate as it will be used for official documentation and billing purposes.
              Fields marked with <span className="text-red-600">*</span> are required.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
