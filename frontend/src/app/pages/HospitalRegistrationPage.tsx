import { useState } from 'react';
import { Check, Upload, Plus, X, Building2, MapPin, Network, CreditCard, UserCog, FileCheck } from 'lucide-react';
import { HospitalInfoStep } from '../components/registration/HospitalInfoStep';
import { AddressDetailsStep } from '../components/registration/AddressDetailsStep';
import { BranchSetupStep } from '../components/registration/BranchSetupStep';
import { SubscriptionPlanStep } from '../components/registration/SubscriptionPlanStep';
import { SuperAdminStep } from '../components/registration/SuperAdminStep';
import { ReviewConfirmStep } from '../components/registration/ReviewConfirmStep';

export interface HospitalData {
  // Hospital Information
  hospitalName: string;
  legalName: string;
  registrationNumber: string;
  taxId: string;
  phone: string;
  email: string;
  website: string;
  logo: File | null;
  // Address Details
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  // Branch Setup
  branches: Array<{
    id: string;
    name: string;
    address: string;
    phone: string;
    email: string;
  }>;
  // Subscription Plan
  selectedPlan: 'basic' | 'professional' | 'enterprise' | '';
  billingCycle: 'monthly' | 'annual';
  // Super Admin
  adminFirstName: string;
  adminLastName: string;
  adminEmail: string;
  adminPhone: string;
  adminPassword: string;
  adminConfirmPassword: string;
}

const steps = [
  { id: 1, name: 'Hospital Information', icon: Building2 },
  { id: 2, name: 'Address Details', icon: MapPin },
  { id: 3, name: 'Branch Setup', icon: Network },
  { id: 4, name: 'Subscription Plan', icon: CreditCard },
  { id: 5, name: 'Super Admin', icon: UserCog },
  { id: 6, name: 'Review & Confirm', icon: FileCheck },
];

export function HospitalRegistrationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<HospitalData>({
    hospitalName: '',
    legalName: '',
    registrationNumber: '',
    taxId: '',
    phone: '',
    email: '',
    website: '',
    logo: null,
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    branches: [],
    selectedPlan: '',
    billingCycle: 'monthly',
    adminFirstName: '',
    adminLastName: '',
    adminEmail: '',
    adminPhone: '',
    adminPassword: '',
    adminConfirmPassword: '',
  });

  const updateFormData = (updates: Partial<HospitalData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Handle final submission
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <HospitalInfoStep data={formData} updateData={updateFormData} />;
      case 2:
        return <AddressDetailsStep data={formData} updateData={updateFormData} />;
      case 3:
        return <BranchSetupStep data={formData} updateData={updateFormData} />;
      case 4:
        return <SubscriptionPlanStep data={formData} updateData={updateFormData} />;
      case 5:
        return <SuperAdminStep data={formData} updateData={updateFormData} />;
      case 6:
        return <ReviewConfirmStep data={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl mb-4 shadow-lg shadow-blue-500/30">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Hospital Registration</h1>
          <p className="text-gray-600">Complete the form below to register your hospital</p>
        </div>

        {/* Stepper */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-blue-700 transition-all duration-500"
                style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
              ></div>
            </div>

            {/* Steps */}
            <div className="relative flex justify-between">
              {steps.map((step, index) => {
                const StepIcon = step.icon;
                const isCompleted = currentStep > step.id;
                const isCurrent = currentStep === step.id;
                const isUpcoming = currentStep < step.id;

                return (
                  <div key={step.id} className="flex flex-col items-center" style={{ width: `${100 / steps.length}%` }}>
                    <button
                      onClick={() => setCurrentStep(step.id)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 mb-2 ${
                        isCompleted
                          ? 'bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg shadow-blue-500/30'
                          : isCurrent
                          ? 'bg-white border-2 border-blue-600 shadow-lg'
                          : 'bg-gray-100 border-2 border-gray-200'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-5 h-5 text-white" />
                      ) : (
                        <StepIcon
                          className={`w-5 h-5 ${
                            isCurrent ? 'text-blue-600' : isUpcoming ? 'text-gray-400' : 'text-white'
                          }`}
                        />
                      )}
                    </button>
                    <span
                      className={`text-xs font-medium text-center hidden sm:block ${
                        isCurrent ? 'text-blue-600' : isCompleted ? 'text-gray-900' : 'text-gray-500'
                      }`}
                    >
                      {step.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile Step Name */}
          <div className="sm:hidden text-center mt-4">
            <span className="text-sm font-medium text-blue-600">{steps[currentStep - 1].name}</span>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6">
          {renderStep()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`px-6 py-3 rounded-xl font-medium transition ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
            }`}
          >
            Previous
          </button>

          <div className="text-sm text-gray-500">
            Step {currentStep} of {steps.length}
          </div>

          {currentStep < steps.length ? (
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/30 transition"
            >
              Next Step
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-green-500/30 transition"
            >
              Complete Registration
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
