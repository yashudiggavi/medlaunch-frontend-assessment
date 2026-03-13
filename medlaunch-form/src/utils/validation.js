export const validateStep = (step, formData) => {
  const errors = {};

  const nameRegex = /^[A-Za-z\s]+$/;
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const phoneRegex = /^\(\d{3}\)\s\d{3}-\d{4}$/;
  const zipRegex = /^\d{5}$/;

  if (step === 1) {
    if (!formData.legalEntityName?.trim()) {
      errors.legalEntityName = "Legal entity name is required";
    }

    if (!formData.dbaName?.trim()) {
      errors.dbaName = "Doing business as name is required";
    }

    if (!formData.primaryFirstName?.trim()) {
      errors.primaryFirstName = "First name is required";
    } else if (!nameRegex.test(formData.primaryFirstName.trim())) {
      errors.primaryFirstName = "First name should contain only alphabets";
    }

    if (!formData.primaryLastName?.trim()) {
      errors.primaryLastName = "Last name is required";
    } else if (!nameRegex.test(formData.primaryLastName.trim())) {
      errors.primaryLastName = "Last name should contain only alphabets";
    }

    if (!formData.primaryTitle?.trim()) {
      errors.primaryTitle = "Title is required";
    }

    if (!formData.primaryWorkPhone?.trim()) {
      errors.primaryWorkPhone = "Work phone is required";
    } else if (!phoneRegex.test(formData.primaryWorkPhone)) {
      errors.primaryWorkPhone = "Work phone must be in format (123) 456-7890";
    }

    if (
      formData.primaryCellPhone &&
      !phoneRegex.test(formData.primaryCellPhone)
    ) {
      errors.primaryCellPhone = "Cell phone must be in format (123) 456-7890";
    }

    if (!formData.primaryEmail?.trim()) {
      errors.primaryEmail = "Email is required";
    } else if (!emailRegex.test(formData.primaryEmail.trim())) {
      errors.primaryEmail = "Enter a valid email address";
    }
  }

  if (step === 2) {
    if (!formData.facilityType?.trim()) {
      errors.facilityType = "Facility type is required";
    }

    if (formData.facilityType === "Other" && !formData.facilityOther?.trim()) {
      errors.facilityOther = "Please specify facility type";
    }
  }

  if (step === 3) {
    if (!formData.ceoFirstName?.trim()) {
      errors.ceoFirstName = "CEO first name is required";
    } else if (!nameRegex.test(formData.ceoFirstName.trim())) {
      errors.ceoFirstName = "CEO first name should contain only alphabets";
    }

    if (!formData.ceoLastName?.trim()) {
      errors.ceoLastName = "CEO last name is required";
    } else if (!nameRegex.test(formData.ceoLastName.trim())) {
      errors.ceoLastName = "CEO last name should contain only alphabets";
    }

    if (!formData.ceoPhone?.trim()) {
      errors.ceoPhone = "CEO phone is required";
    } else if (!phoneRegex.test(formData.ceoPhone)) {
      errors.ceoPhone = "CEO phone must be in format (123) 456-7890";
    }

    if (!formData.ceoEmail?.trim()) {
      errors.ceoEmail = "CEO email is required";
    } else if (!emailRegex.test(formData.ceoEmail.trim())) {
      errors.ceoEmail = "Enter a valid CEO email";
    }

    if (
      formData.qualityFirstName &&
      !nameRegex.test(formData.qualityFirstName.trim())
    ) {
      errors.qualityFirstName =
        "Quality first name should contain only alphabets";
    }

    if (
      formData.qualityLastName &&
      !nameRegex.test(formData.qualityLastName.trim())
    ) {
      errors.qualityLastName =
        "Quality last name should contain only alphabets";
    }

    if (formData.qualityPhone && !phoneRegex.test(formData.qualityPhone)) {
      errors.qualityPhone = "Quality phone must be in format (123) 456-7890";
    }

    if (
      formData.qualityEmail &&
      !emailRegex.test(formData.qualityEmail.trim())
    ) {
      errors.qualityEmail = "Enter a valid quality email";
    }

    if (!formData.invoicingFirstName?.trim()) {
      errors.invoicingFirstName = "Invoicing first name is required";
    } else if (!nameRegex.test(formData.invoicingFirstName.trim())) {
      errors.invoicingFirstName =
        "Invoicing first name should contain only alphabets";
    }

    if (!formData.invoicingLastName?.trim()) {
      errors.invoicingLastName = "Invoicing last name is required";
    } else if (!nameRegex.test(formData.invoicingLastName.trim())) {
      errors.invoicingLastName =
        "Invoicing last name should contain only alphabets";
    }

    if (!formData.invoicingPhone?.trim()) {
      errors.invoicingPhone = "Invoicing phone is required";
    } else if (!phoneRegex.test(formData.invoicingPhone)) {
      errors.invoicingPhone =
        "Invoicing phone must be in format (123) 456-7890";
    }

    if (!formData.invoicingEmail?.trim()) {
      errors.invoicingEmail = "Invoicing email is required";
    } else if (!emailRegex.test(formData.invoicingEmail.trim())) {
      errors.invoicingEmail = "Enter a valid invoicing email";
    }

    if (!formData.billingStreet?.trim()) {
      errors.billingStreet = "Billing street is required";
    }

    if (!formData.billingCity?.trim()) {
      errors.billingCity = "Billing city is required";
    } else if (!nameRegex.test(formData.billingCity.trim())) {
      errors.billingCity = "Billing city should contain only alphabets";
    }

    if (!formData.billingState?.trim()) {
      errors.billingState = "Billing state is required";
    }

    if (!formData.billingZip?.trim()) {
      errors.billingZip = "Billing ZIP is required";
    } else if (!zipRegex.test(formData.billingZip)) {
      errors.billingZip = "Billing ZIP must be exactly 5 digits";
    }
  }

  if (step === 4) {
    if (!formData.siteMode?.trim()) {
      errors.siteMode = "Please select site configuration";
    }

    if (formData.siteMode === "multiple") {
      if (!formData.siteInputMethod?.trim()) {
        errors.siteInputMethod = "Please choose how to add site information";
      }

      if (
        formData.siteInputMethod === "upload" &&
        (!formData.uploadedFiles || formData.uploadedFiles.length === 0)
      ) {
        errors.siteInputMethod = "Please upload at least one file";
      }
    }
  }

  if (step === 5) {
    const validOtherServices =
      formData.otherServices?.filter((item) => String(item).trim() !== "") || [];

    if (
      (!formData.services || formData.services.length === 0) &&
      validOtherServices.length === 0
    ) {
      errors.services = "Please select at least one service";
    }

    const today = new Date().toISOString().split("T")[0];

    if (formData.applicationDate && formData.applicationDate !== today) {
      errors.applicationDate = "Date of application must be today";
    }

    if (
      formData.thrombolyticDates &&
      formData.thrombolyticDates.some((date) => date > today)
    ) {
      errors.thrombolyticDates = "Future dates are not allowed";
    }

    if (
      formData.thrombectomyDates &&
      formData.thrombectomyDates.some((date) => date > today)
    ) {
      errors.thrombectomyDates = "Future dates are not allowed";
    }
  }

  return errors;
};