import { MapPin, Globe } from 'lucide-react';
import { HospitalData } from '../../pages/HospitalRegistrationPage';

interface Props {
  data: HospitalData;
  updateData: (updates: Partial<HospitalData>) => void;
}

const countries = [
  'United States', 'Canada', 'United Kingdom', 'Australia', 'India', 'Germany', 'France', 'Japan', 'Other'
];

const usStates = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
  'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
  'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
  'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
  'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

export function AddressDetailsStep({ data, updateData }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Address Details</h2>
        <p className="text-gray-600">Provide the primary address of your hospital</p>
      </div>

      <div className="space-y-6">
        {/* Address Line 1 */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Address Line 1 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={data.addressLine1}
            onChange={(e) => updateData({ addressLine1: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition"
            placeholder="Street address, P.O. box"
          />
        </div>

        {/* Address Line 2 */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Address Line 2
          </label>
          <input
            type="text"
            value={data.addressLine2}
            onChange={(e) => updateData({ addressLine2: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition"
            placeholder="Apartment, suite, unit, building, floor, etc."
          />
        </div>

        {/* City, State, ZIP */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={data.city}
              onChange={(e) => updateData({ city: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition"
              placeholder="City"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              State / Province <span className="text-red-500">*</span>
            </label>
            <select
              value={data.state}
              onChange={(e) => updateData({ state: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition bg-white"
            >
              <option value="">Select State</option>
              {usStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              ZIP / Postal Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={data.zipCode}
              onChange={(e) => updateData({ zipCode: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition"
              placeholder="12345"
            />
          </div>
        </div>

        {/* Country */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Country <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={data.country}
              onChange={(e) => updateData({ country: e.target.value })}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition bg-white appearance-none"
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Map Preview Placeholder */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300 rounded-xl p-8">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-sm text-gray-600 mb-2">Address Verification</p>
            <p className="text-xs text-gray-500">
              Your address will be verified after submission
            </p>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <MapPin className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-green-900 text-sm mb-1">Address Guidelines</h4>
              <p className="text-sm text-green-700">
                Please provide the main address where your hospital is located. This address will be used for official correspondence and verification purposes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
