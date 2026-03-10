export const validateStep = (step, formData) => {
  const errors = {};

  if (step === 1) {
    if (!formData.legalEntityName.trim()) {
      errors.legalEntityName = "Legal Entity Name is required";
    }
    if (!formData.dbaName.trim()) {
      errors.dbaName = "DBA Name is required";
    }
    if (!formData.primaryFirstName.trim()) {
      errors.primaryFirstName = "First name is required";
    }
    if (!formData.primaryLastName.trim()) {
      errors.primaryLastName = "Last name is required";
    }
    if (!formData.primaryTitle.trim()) {
      errors.primaryTitle = "Title is required";
    }
    if (!formData.primaryWorkPhone.trim()) {
      errors.primaryWorkPhone = "Work phone is required";
    }
    if (!formData.primaryEmail.trim()) {
      errors.primaryEmail = "Email is required";
    }
  }

  if (step === 2) {
    if (!formData.facilityType) {
      errors.facilityType = "Please select a facility type";
    }
    if (formData.facilityType === "Other" && !formData.facilityOther.trim()) {
      errors.facilityOther = "Please specify other facility type";
    }
  }

  if (step === 3) {
    if (!formData.ceoFirstName.trim()) {
      errors.ceoFirstName = "CEO first name is required";
    }
    if (!formData.ceoLastName.trim()) {
      errors.ceoLastName = "CEO last name is required";
    }
    if (!formData.ceoPhone.trim()) {
      errors.ceoPhone = "CEO phone is required";
    }
    if (!formData.ceoEmail.trim()) {
      errors.ceoEmail = "CEO email is required";
    }

    if (!formData.invoiceFirstName.trim()) {
      errors.invoiceFirstName = "Invoice first name is required";
    }
    if (!formData.invoiceLastName.trim()) {
      errors.invoiceLastName = "Invoice last name is required";
    }
    if (!formData.invoicePhone.trim()) {
      errors.invoicePhone = "Invoice phone is required";
    }
    if (!formData.invoiceEmail.trim()) {
      errors.invoiceEmail = "Invoice email is required";
    }
    if (!formData.billingStreet.trim()) {
      errors.billingStreet = "Billing street is required";
    }
    if (!formData.billingCity.trim()) {
      errors.billingCity = "Billing city is required";
    }
    if (!formData.billingState.trim()) {
      errors.billingState = "Billing state is required";
    }
    if (!formData.billingZip.trim()) {
      errors.billingZip = "Billing ZIP is required";
    }
  }

  if (step === 4) {
    if (!formData.siteConfiguration) {
      errors.siteConfiguration = "Please select a site configuration";
    }
    if (
      formData.siteConfiguration === "Multiple Locations" &&
      !formData.siteInputMethod
    ) {
      errors.siteInputMethod = "Please select a site input method";
    }
  }

  if (step === 5) {
    if (
      formData.selectedServices.length === 0 &&
      !formData.otherService.trim()
    ) {
      errors.selectedServices =
        "Please select at least one service or enter another service";
    }
  }

  return errors;
};