import { useState } from "react";
import "./App.css";
import initialFormData from "./data/initialFormData";

import Step1QuoteRequest from "./steps/Step1QuoteRequest";
import Step2FacilityDetails from "./steps/Step2FacilityDetails";
import Step3LeadershipContacts from "./steps/Step3LeadershipContacts";
import Step4SiteInformation from "./steps/Step4SiteInformation";
import Step5ServicesCertifications from "./steps/Step5ServicesCertifications";
import Step6ReviewSubmit from "./steps/Step6ReviewSubmit";

function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 6));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const setFieldValue = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <>
      {step === 1 && (
        <Step1QuoteRequest
          formData={formData}
          handleChange={handleChange}
          setFieldValue={setFieldValue}
          nextStep={nextStep}
        />
      )}

      {step === 2 && (
        <Step2FacilityDetails
          formData={formData}
          setFieldValue={setFieldValue}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}

      {step === 3 && (
        <Step3LeadershipContacts
          formData={formData}
          handleChange={handleChange}
          setFieldValue={setFieldValue}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}

      {step === 4 && (
        <Step4SiteInformation
          formData={formData}
          setFieldValue={setFieldValue}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}

      {step === 5 && (
        <Step5ServicesCertifications
          formData={formData}
          setFieldValue={setFieldValue}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}

      {step === 6 && (
        <Step6ReviewSubmit
          formData={formData}
          setFieldValue={setFieldValue}
          prevStep={prevStep}
        />
      )}
    </>
  );
}

export default App;