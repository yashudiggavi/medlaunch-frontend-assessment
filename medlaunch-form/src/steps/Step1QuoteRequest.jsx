import StepShell from "../components/StepShell";
import SectionCard from "../components/SectionCard";

function Step1QuoteRequest({ formData, handleChange, setFieldValue, nextStep }) {
  const handleSameAsLegalEntity = (e) => {
    const checked = e.target.checked;
    handleChange(e);

    if (checked) {
      setFieldValue("dbaName", formData.legalEntityName);
    } else {
      setFieldValue("dbaName", "");
    }
  };

  const handleVerifyEmail = () => {
    if (!formData.primaryEmail || String(formData.primaryEmail).trim() === "") {
      alert("Please enter an email address first.");
      return;
    }

    setFieldValue("primaryEmailVerified", true);
    alert(`Verification email sent to ${formData.primaryEmail}`);
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
          />
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
              />
            </div>

            <div className="form-group">
              <label className="form-label">Cell Phone</label>
              <input
                className="text-input"
                type="text"
                name="primaryCellPhone"
                value={formData.primaryCellPhone}
                onChange={handleChange}
              />
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