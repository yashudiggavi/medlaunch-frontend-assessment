const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[0-9]{10}$/;
const zipRegex = /^[0-9]{5}$/;

export const validateStep = (step, formData) => {
  const errors = {};

  if (step === 1) {
    if (!formData.legalEntityName?.trim()) {
      errors.legalEntityName = "Legal Entity Name is required";
    }

    if (!formData.dbaName?.trim()) {
      errors.dbaName = "DBA Name is required";
    }

    if (!formData.primaryFirstName?.trim()) {
      errors.primaryFirstName = "First name is required";
    }

    if (!formData.primaryLastName?.trim()) {
      errors.primaryLastName = "Last name is required";
    }

    if (!formData.primaryTitle?.trim()) {
      errors.primaryTitle = "Title is required";
    }

    if (!formData.primaryWorkPhone?.trim()) {
      errors.primaryWorkPhone = "Work phone is required";
    } else if (!phoneRegex.test(formData.primaryWorkPhone)) {
      errors.primaryWorkPhone = "Phone number must be 10 digits only";
    }

    if (!formData.primaryEmail?.trim()) {
      errors.primaryEmail = "Email is required";
    } else if (!emailRegex.test(formData.primaryEmail)) {
      errors.primaryEmail = "Enter a valid email address";
    } else if (!formData.primaryEmailVerified) {
      errors.primaryEmail = "Please verify your email before continuing";
    }
  }

  if (step === 2) {
    if (!formData.facilityType) {
      errors.facilityType = "Please select a facility type";
    }

    if (formData.facilityType === "Other" && !formData.facilityOther?.trim()) {
      errors.facilityOther = "Please specify other facility type";
    }
  }

  if (step === 3) {
    if (!formData.ceoFirstName?.trim()) {
      errors.ceoFirstName = "CEO first name is required";
    }

    if (!formData.ceoLastName?.trim()) {
      errors.ceoLastName = "CEO last name is required";
    }

    if (!formData.ceoPhone?.trim()) {
      errors.ceoPhone = "CEO phone is required";
    } else if (!phoneRegex.test(formData.ceoPhone)) {
      errors.ceoPhone = "Phone number must be 10 digits only";
    }

    if (!formData.ceoEmail?.trim()) {
      errors.ceoEmail = "CEO email is required";
    } else if (!emailRegex.test(formData.ceoEmail)) {
      errors.ceoEmail = "Enter a valid email address";
    }

    if (!formData.invoicingFirstName?.trim()) {
      errors.invoicingFirstName = "Invoicing first name is required";
    }

    if (!formData.invoicingLastName?.trim()) {
      errors.invoicingLastName = "Invoicing last name is required";
    }

    if (!formData.invoicingPhone?.trim()) {
      errors.invoicingPhone = "Invoicing phone is required";
    } else if (!phoneRegex.test(formData.invoicingPhone)) {
      errors.invoicingPhone = "Phone number must be 10 digits only";
    }

    if (!formData.invoicingEmail?.trim()) {
      errors.invoicingEmail = "Invoicing email is required";
    } else if (!emailRegex.test(formData.invoicingEmail)) {
      errors.invoicingEmail = "Enter a valid email address";
    }

    if (!formData.billingStreet?.trim()) {
      errors.billingStreet = "Billing street is required";
    }

    if (!formData.billingCity?.trim()) {
      errors.billingCity = "Billing city is required";
    }

    if (!formData.billingState?.trim()) {
      errors.billingState = "Billing state is required";
    }

    if (!formData.billingZip?.trim()) {
      errors.billingZip = "Billing ZIP is required";
    } else if (!zipRegex.test(formData.billingZip)) {
      errors.billingZip = "ZIP code must be 5 digits";
    }
  }

  if (step === 4) {
    if (!formData.siteMode) {
      errors.siteMode = "Please select a site option";
    }

    if (formData.siteMode === "multiple" && !formData.siteInputMethod) {
      errors.siteInputMethod = "Please select a site input method";
    }
  }

  if (step === 5) {
    const hasSelectedServices =
      Array.isArray(formData.services) && formData.services.length > 0;

    const hasOtherServices =
      Array.isArray(formData.otherServices) &&
      formData.otherServices.some((item) => String(item).trim() !== "");

    if (!hasSelectedServices && !hasOtherServices) {
      errors.services =
        "Please select at least one service or add another service";
    }
  }
  return errors;
};