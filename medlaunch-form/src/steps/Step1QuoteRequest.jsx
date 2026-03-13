import { useEffect } from "react";
import StepShell from "../components/StepShell";
import SectionCard from "../components/SectionCard";

function Step1QuoteRequest({
  formData,
  handleChange,
  nextStep,
  errors,
  setFieldValue,
}) {
  useEffect(() => {
    if (formData.sameAsLegalEntity) {
      setFieldValue("dbaName", formData.legalEntityName);
    }
  }, [formData.legalEntityName, formData.sameAsLegalEntity, setFieldValue]);

  const handleSameAsLegalEntity = (e) => {
    const checked = e.target.checked;
    setFieldValue("sameAsLegalEntity", checked);

    if (checked) {
      setFieldValue("dbaName", formData.legalEntityName);
    }
  };

  const handleVerifyEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.primaryEmail || formData.primaryEmail.trim() === "") {
      alert("Please enter an email address first.");
      return;
    }

    if (!emailRegex.test(formData.primaryEmail.trim())) {
      alert("Please enter a valid email address first.");
      return;
    }

    setFieldValue("primaryEmailVerified", true);
    alert(`Verification simulated for ${formData.primaryEmail}`);
  };

  return (
    <StepShell
      title="New DNV Quote Request"
      stepText="Step 1 of 6"
      activeStep={1}
      leftButton={
        <button type="button" className="btn-outline">
          Exit
        </button>
      }
      middleButtons={
        <>
          <button type="button" className="btn-primary">
            Save
          </button>
          <button type="button" className="btn-primary" onClick={nextStep}>
            Continue
          </button>
        </>
      }
    >
      <SectionCard>
        <h2 className="section-title">Identify Healthcare Organization</h2>

        <div className="form-group">
          <label className="form-label">
            Legal Entity Name <span className="required">*</span>
          </label>
          <input
            className="text-input"
            type="text"
            name="legalEntityName"
            value={formData.legalEntityName}
            onChange={handleChange}
          />
          {errors.legalEntityName && (
            <p className="error">{errors.legalEntityName}</p>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">
            Doing Business As (d/b/a) Name <span className="required">*</span>
          </label>
          <input
            className="text-input"
            type="text"
            name="dbaName"
            value={formData.dbaName}
            onChange={handleChange}
            disabled={formData.sameAsLegalEntity}
          />
          {errors.dbaName && <p className="error">{errors.dbaName}</p>}
        </div>

        <label className="checkbox-row">
          <input
            type="checkbox"
            name="sameAsLegalEntity"
            checked={formData.sameAsLegalEntity}
            onChange={handleSameAsLegalEntity}
          />
          <span>Same as Legal Entity Name</span>
        </label>

        <div className="section-divider-space">
          <h2 className="section-title">Primary Contact Information</h2>
          <p className="section-subtext">
            Primary contact receives all DNV Healthcare official communications
          </p>

          <div className="two-col">
            <div className="form-group">
              <label className="form-label">
                First Name <span className="required">*</span>
              </label>
              <input
                className="text-input"
                type="text"
                name="primaryFirstName"
                value={formData.primaryFirstName}
                onChange={handleChange}
              />
              {errors.primaryFirstName && (
                <p className="error">{errors.primaryFirstName}</p>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">
                Last Name <span className="required">*</span>
              </label>
              <input
                className="text-input"
                type="text"
                name="primaryLastName"
                value={formData.primaryLastName}
                onChange={handleChange}
              />
              {errors.primaryLastName && (
                <p className="error">{errors.primaryLastName}</p>
              )}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Title <span className="required">*</span>
            </label>
            <input
              className="text-input"
              type="text"
              name="primaryTitle"
              value={formData.primaryTitle}
              onChange={handleChange}
            />
            {errors.primaryTitle && (
              <p className="error">{errors.primaryTitle}</p>
            )}
          </div>

          <div className="two-col">
            <div className="form-group">
              <label className="form-label">
                Work Phone <span className="required">*</span>
              </label>
              <input
                className="text-input"
                type="text"
                name="primaryWorkPhone"
                value={formData.primaryWorkPhone}
                onChange={handleChange}
                maxLength={14}
              />
              {errors.primaryWorkPhone && (
                <p className="error">{errors.primaryWorkPhone}</p>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Cell Phone</label>
              <input
                className="text-input"
                type="text"
                name="primaryCellPhone"
                value={formData.primaryCellPhone}
                onChange={handleChange}
                maxLength={14}
              />
              {errors.primaryCellPhone && (
                <p className="error">{errors.primaryCellPhone}</p>
              )}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Email <span className="required">*</span>
            </label>
            <input
              className="text-input"
              type="email"
              name="primaryEmail"
              value={formData.primaryEmail}
              onChange={handleChange}
            />
            {errors.primaryEmail && (
              <p className="error">{errors.primaryEmail}</p>
            )}
          </div>

          <div className="verify-row">
            <button
              type="button"
              className="btn-outline"
              onClick={handleVerifyEmail}
            >
              Send Verification Email
            </button>

            <span
              className="status-chip"
              style={
                formData.primaryEmailVerified
                  ? {
                      background: "#cfeccf",
                      color: "#226622",
                    }
                  : {}
              }
            >
              {formData.primaryEmailVerified ? "Verified" : "Not verified"}
            </span>
          </div>
        </div>
      </SectionCard>
    </StepShell>
  );
}

export default Step1QuoteRequest;