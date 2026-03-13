import { useState } from "react";
import "./App.css";
import initialFormData from "./data/initialFormData";
import { validateStep } from "./utils/validation";

import Step1QuoteRequest from "./steps/Step1QuoteRequest";
import Step2FacilityDetails from "./steps/Step2FacilityDetails";
import Step3LeadershipContacts from "./steps/Step3LeadershipContacts";
import Step4SiteInformation from "./steps/Step4SiteInformation";
import Step5ServicesCertifications from "./steps/Step5ServicesCertifications";
import Step6ReviewSubmit from "./steps/Step6ReviewSubmit";

const formatPhoneInput = (value) => {
  const digits = value.replace(/\D/g, "").slice(0, 10);

  if (digits.length === 0) return "";
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  }

  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
};

function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const setFieldValue = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    let updatedValue = type === "checkbox" ? checked : value;

    const phoneFields = [
      "primaryWorkPhone",
      "primaryCellPhone",
      "ceoPhone",
      "qualityPhone",
      "invoicingPhone",
    ];

    const alphaOnlyFields = [
      "primaryFirstName",
      "primaryLastName",
      "ceoFirstName",
      "ceoLastName",
      "qualityFirstName",
      "qualityLastName",
      "invoicingFirstName",
      "invoicingLastName",
      "billingCity",
    ];

    const emailFields = [
      "primaryEmail",
      "ceoEmail",
      "qualityEmail",
      "invoicingEmail",
    ];

    if (phoneFields.includes(name)) {
      updatedValue = formatPhoneInput(value);
    }

    if (name === "billingZip") {
      updatedValue = value.replace(/\D/g, "").slice(0, 5);
    }

    if (alphaOnlyFields.includes(name)) {
      updatedValue = value.replace(/[^A-Za-z\s]/g, "");
    }

    if (emailFields.includes(name)) {
      updatedValue = value.trim().toLowerCase();
    }

    if (name === "primaryEmail") {
      setFormData((prev) => ({
        ...prev,
        [name]: updatedValue,
        primaryEmailVerified: false,
      }));

      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const nextStep = () => {
    const stepErrors = validateStep(step, formData);

    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    setErrors({});
    setStep((prev) => Math.min(prev + 1, 6));
  };

  const prevStep = () => {
    setErrors({});
    setStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <>
      {step === 1 && (
        <Step1QuoteRequest
          formData={formData}
          handleChange={handleChange}
          nextStep={nextStep}
          errors={errors}
          setFieldValue={setFieldValue}
        />
      )}

      {step === 2 && (
        <Step2FacilityDetails
          formData={formData}
          setFieldValue={setFieldValue}
          nextStep={nextStep}
          prevStep={prevStep}
          errors={errors}
        />
      )}

      {step === 3 && (
        <Step3LeadershipContacts
          formData={formData}
          handleChange={handleChange}
          setFieldValue={setFieldValue}
          nextStep={nextStep}
          prevStep={prevStep}
          errors={errors}
        />
      )}

      {step === 4 && (
        <Step4SiteInformation
          formData={formData}
          setFieldValue={setFieldValue}
          nextStep={nextStep}
          prevStep={prevStep}
          errors={errors}
        />
      )}

      {step === 5 && (
        <Step5ServicesCertifications
          formData={formData}
          setFieldValue={setFieldValue}
          nextStep={nextStep}
          prevStep={prevStep}
          errors={errors}
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