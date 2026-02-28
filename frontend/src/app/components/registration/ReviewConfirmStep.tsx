import { Building2, MapPin, Network, CreditCard, UserCog, CheckCircle, Edit2 } from 'lucide-react';
import { HospitalData } from '../../pages/HospitalRegistrationPage';

interface Props {
  data: HospitalData;
}

export function ReviewConfirmStep({ data }: Props) {
  const planNames = {
    basic: 'Basic',
    professional: 'Professional',
    enterprise: 'Enterprise',
  };

  const planPrices = {
    basic: { monthly: 299, annual: 2990 },
    professional: { monthly: 599, annual: 5990 },
    enterprise: { monthly: 1299, annual: 12990 },
  };

  const selectedPlanPrice = data.selectedPlan
    ? planPrices[data.selectedPlan][data.billingCycle]
    : 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Review & Confirm</h2>
        <p className="text-gray-600">Please review all information before submitting</p>
      </div>

      {/* Hospital Information */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Hospital Information</h3>
          </div>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1">
            <Edit2 className="w-4 h-4" />
            <span>Edit</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600 mb-1">Hospital Name</p>
            <p className="font-semibold text-gray-900">{data.hospitalName || 'Not provided'}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">Legal Name</p>
            <p className="font-semibold text-gray-900">{data.legalName || 'Not provided'}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">Registration Number</p>
            <p className="font-semibold text-gray-900">{data.registrationNumber || 'Not provided'}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">Tax ID</p>
            <p className="font-semibold text-gray-900">{data.taxId || 'Not provided'}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">Phone</p>
            <p className="font-semibold text-gray-900">{data.phone || 'Not provided'}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">Email</p>
            <p className="font-semibold text-gray-900">{data.email || 'Not provided'}</p>
          </div>
          {data.website && (
            <div className="md:col-span-2">
              <p className="text-gray-600 mb-1">Website</p>
              <p className="font-semibold text-blue-600">{data.website}</p>
            </div>
          )}
        </div>
      </div>

      {/* Address Details */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <MapPin className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Address Details</h3>
          </div>
          <button className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center space-x-1">
            <Edit2 className="w-4 h-4" />
            <span>Edit</span>
          </button>
        </div>

        <div className="text-sm">
          <p className="font-semibold text-gray-900 mb-2">
            {data.addressLine1 || 'Address not provided'}
          </p>
          {data.addressLine2 && <p className="text-gray-700 mb-2">{data.addressLine2}</p>}
          <p className="text-gray-700">
            {[data.city, data.state, data.zipCode].filter(Boolean).join(', ')}
          </p>
          {data.country && <p className="text-gray-700 mt-1">{data.country}</p>}
        </div>
      </div>

      {/* Branch Setup */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <Network className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Branches</h3>
          </div>
          <button className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center space-x-1">
            <Edit2 className="w-4 h-4" />
            <span>Edit</span>
          </button>
        </div>

        {data.branches.length > 0 ? (
          <div className="space-y-3">
            {data.branches.map((branch) => (
              <div key={branch.id} className="bg-white rounded-lg p-4 border border-purple-100">
                <p className="font-semibold text-gray-900 mb-2">{branch.name}</p>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>{branch.address}</p>
                  {branch.phone && <p>Phone: {branch.phone}</p>}
                  {branch.email && <p>Email: {branch.email}</p>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-sm">No branches added</p>
        )}
      </div>

      {/* Subscription Plan */}
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <CreditCard className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Subscription Plan</h3>
          </div>
          <button className="text-orange-600 hover:text-orange-700 text-sm font-medium flex items-center space-x-1">
            <Edit2 className="w-4 h-4" />
            <span>Edit</span>
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-gray-900 mb-1">
              {data.selectedPlan ? planNames[data.selectedPlan] : 'No plan selected'}
            </p>
            <p className="text-gray-600 text-sm">
              {data.billingCycle === 'annual' ? 'Annual Billing' : 'Monthly Billing'}
            </p>
          </div>
          {data.selectedPlan && (
            <div className="text-right">
              <p className="text-3xl font-bold text-gray-900">
                ${selectedPlanPrice}
              </p>
              <p className="text-sm text-gray-600">
                {data.billingCycle === 'annual' ? 'per year' : 'per month'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Super Admin */}
      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200 rounded-xl p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <UserCog className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Super Administrator</h3>
          </div>
          <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center space-x-1">
            <Edit2 className="w-4 h-4" />
            <span>Edit</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600 mb-1">Full Name</p>
            <p className="font-semibold text-gray-900">
              {[data.adminFirstName, data.adminLastName].filter(Boolean).join(' ') || 'Not provided'}
            </p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">Email</p>
            <p className="font-semibold text-gray-900">{data.adminEmail || 'Not provided'}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">Phone</p>
            <p className="font-semibold text-gray-900">{data.adminPhone || 'Not provided'}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">Password</p>
            <p className="font-semibold text-gray-900">
              {data.adminPassword ? '••••••••' : 'Not set'}
            </p>
          </div>
        </div>
      </div>

      {/* Terms & Conditions */}
      <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="terms"
            className="w-5 h-5 mt-0.5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="terms" className="text-sm text-gray-700">
            I confirm that all the information provided is accurate and I agree to the{' '}
            <button className="text-blue-600 hover:underline font-medium">
              Terms of Service
            </button>
            ,{' '}
            <button className="text-blue-600 hover:underline font-medium">
              Privacy Policy
            </button>
            , and{' '}
            <button className="text-blue-600 hover:underline font-medium">
              HIPAA Compliance Agreement
            </button>
            .
          </label>
        </div>
      </div>

      {/* Success Preview */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-white/20 rounded-xl">
            <CheckCircle className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Ready to Complete Registration</h3>
            <p className="text-green-50 text-sm">
              Click the "Complete Registration" button below to finalize your hospital registration.
              You'll receive a confirmation email with login instructions and next steps.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
