import Footer from '@/app/components/footer';
import Header from '@/app/components/header';
import Budget from '@/app/components/postjob/budget';
import DateTime from '@/app/components/postjob/datetime';
import Location from '@/app/components/postjob/location';
import PersonalInfo from '@/app/components/postjob/personalinfo';
import { useState } from 'react';

export default function PostaJob() {

  const [currentStep, setCurrentStep] = useState(1);
  const steps = [
    { number: 1, label: 'Title and Description' },
    { number: 2, label: 'Date and Time' },
    { number: 3, label: 'Location' },
    { number: 4, label: 'Budget' },
  ];


  const goToNextStep = () => setCurrentStep((prev) => prev + 1);

  const nextStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfo onNext={goToNextStep} />;
      case 2:
        return <DateTime onNext={goToNextStep} />
      case 3:
        return <Location onNext={goToNextStep} />
      case 4:
        return <Budget onNext={goToNextStep} />
      default:
        return <PersonalInfo onNext={goToNextStep} />;
    }
  };
  return (
    <div className=' bg-blue-50'>
      <Header />
      <div className="flex gap-6 container py-12 px-8 max-w-screen-xl mx-auto">
        <aside className="w-72 min-h-fit border rounded-2xl shadow-lg bg-white text-black p-6">
          <h2 className="text-xl font-bold mb-4">Post a job</h2>
          <ul>
            {steps.map((step) => (
              <li key={step.number} className="mb-4">
                <div className={`flex items-center space-x-2 ${currentStep === step.number ? 'text-[#01ABF0] font-bold' : 'text-gray-600'}`}>
                  <div className={`w-6 h-6 flex items-center justify-center rounded-full border ${currentStep === step.number ? 'border-[#01ABF0]' : 'border-gray-400'}`}>
                    {step.number}
                  </div>
                  <span>{step.label}</span>
                </div>
              </li>
            ))}
          </ul>
        </aside>
        <main className="flex-1 bg-white shadow-md rounded-lg p-8 ml-6">
          {nextStep()}
        </main>
      </div>
      <Footer />
    </div>

  );
}