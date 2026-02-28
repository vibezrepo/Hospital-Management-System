import { Check, Zap, Building2, Sparkles } from 'lucide-react';
import { HospitalData } from '../../pages/HospitalRegistrationPage';

interface Props {
  data: HospitalData;
  updateData: (updates: Partial<HospitalData>) => void;
}

const plans = [
  {
    id: 'basic',
    name: 'Basic',
    icon: Zap,
    description: 'Perfect for small clinics',
    monthlyPrice: 299,
    annualPrice: 2990,
    features: [
      'Up to 50 users',
      'Basic patient management',
      'Appointment scheduling',
      'Electronic health records',
      'Email support',
      '10GB storage',
    ],
    color: 'blue',
  },
  {
    id: 'professional',
    name: 'Professional',
    icon: Building2,
    description: 'Ideal for growing hospitals',
    monthlyPrice: 599,
    annualPrice: 5990,
    features: [
      'Up to 200 users',
      'Advanced patient management',
      'Multi-branch support',
      'Lab & pharmacy integration',
      'Priority support',
      '100GB storage',
      'Analytics & reporting',
      'Custom workflows',
    ],
    color: 'green',
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    icon: Sparkles,
    description: 'For large healthcare systems',
    monthlyPrice: 1299,
    annualPrice: 12990,
    features: [
      'Unlimited users',
      'Complete hospital suite',
      'Unlimited branches',
      'API access',
      'Dedicated support',
      'Unlimited storage',
      'Custom integrations',
      'Advanced security',
      'White-label options',
    ],
    color: 'purple',
  },
];

export function SubscriptionPlanStep({ data, updateData }: Props) {
  const selectedPlanData = plans.find((p) => p.id === data.selectedPlan);
  const price = selectedPlanData
    ? data.billingCycle === 'annual'
      ? selectedPlanData.annualPrice
      : selectedPlanData.monthlyPrice
    : 0;

  const savings = selectedPlanData
    ? selectedPlanData.monthlyPrice * 12 - selectedPlanData.annualPrice
    : 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Plan</h2>
        <p className="text-gray-600">Select the subscription plan that best fits your needs</p>
      </div>

      {/* Billing Cycle Toggle */}
      <div className="flex items-center justify-center space-x-4 bg-gray-100 rounded-xl p-2 w-fit mx-auto">
        <button
          onClick={() => updateData({ billingCycle: 'monthly' })}
          className={`px-6 py-2 rounded-lg font-medium transition ${
            data.billingCycle === 'monthly'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => updateData({ billingCycle: 'annual' })}
          className={`px-6 py-2 rounded-lg font-medium transition relative ${
            data.billingCycle === 'annual'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Annual
          <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
            Save 20%
          </span>
        </button>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const Icon = plan.icon;
          const isSelected = data.selectedPlan === plan.id;
          const price = data.billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;

          return (
            <div
              key={plan.id}
              className={`relative rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                isSelected
                  ? 'bg-gradient-to-br from-blue-600 to-blue-700 shadow-xl shadow-blue-500/30 transform scale-105'
                  : 'bg-white border-2 border-gray-200 hover:border-blue-300 hover:shadow-lg'
              }`}
              onClick={() => updateData({ selectedPlan: plan.id as 'basic' | 'professional' | 'enterprise' })}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                    MOST POPULAR
                  </span>
                </div>
              )}

              {/* Selected Indicator */}
              {isSelected && (
                <div className="absolute top-4 right-4">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              )}

              <div className="mb-4">
                <div className={`inline-flex p-3 rounded-xl mb-3 ${
                  isSelected ? 'bg-white/20' : 'bg-gray-100'
                }`}>
                  <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : `text-${plan.color}-600`}`} />
                </div>
                <h3 className={`text-2xl font-bold mb-1 ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm ${isSelected ? 'text-blue-100' : 'text-gray-600'}`}>
                  {plan.description}
                </p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className={`text-4xl font-bold ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                    ${price}
                  </span>
                  <span className={`ml-2 ${isSelected ? 'text-blue-100' : 'text-gray-600'}`}>
                    /{data.billingCycle === 'annual' ? 'year' : 'month'}
                  </span>
                </div>
                {data.billingCycle === 'annual' && (
                  <p className={`text-xs mt-1 ${isSelected ? 'text-blue-100' : 'text-gray-500'}`}>
                    ${(price / 12).toFixed(0)}/month billed annually
                  </p>
                )}
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                      isSelected ? 'text-blue-200' : 'text-green-500'
                    }`} />
                    <span className={`text-sm ${isSelected ? 'text-white' : 'text-gray-700'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-xl font-medium transition ${
                  isSelected
                    ? 'bg-white text-blue-600 hover:bg-blue-50'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {isSelected ? 'Selected' : 'Select Plan'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      {data.selectedPlan && (
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-semibold text-green-900 text-lg mb-2">Plan Summary</h4>
              <p className="text-green-700 mb-4">
                You've selected the <span className="font-bold">{selectedPlanData?.name}</span> plan
                {data.billingCycle === 'annual' && ' with annual billing'}
              </p>
              <div className="space-y-1 text-sm text-green-800">
                <p>
                  <span className="font-medium">Price:</span> ${price}
                  {data.billingCycle === 'annual' ? '/year' : '/month'}
                </p>
                {data.billingCycle === 'annual' && (
                  <p className="text-green-600 font-semibold">
                    💰 You save ${savings} per year with annual billing!
                  </p>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-900">${price}</div>
              <div className="text-sm text-green-600">
                {data.billingCycle === 'annual' ? 'per year' : 'per month'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <Sparkles className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900 text-sm mb-1">Flexible Pricing</h4>
            <p className="text-sm text-blue-700">
              All plans include a 14-day free trial. You can upgrade, downgrade, or cancel anytime. No hidden fees.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
