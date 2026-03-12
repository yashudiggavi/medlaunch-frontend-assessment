import StepShell from "../components/StepShell";
import SectionCard from "../components/SectionCard";

function ContactBlock({
  title,
  sameField,
  firstNameField,
  lastNameField,
  phoneField,
  emailField,
  formData,
  handleChange,
  setFieldValue,
  errors,
  required = false,
}) {
  const copyPrimary = (checked) => {
    setFieldValue(sameField, checked);

    if (checked) {
      setFieldValue(firstNameField, formData.primaryFirstName);
      setFieldValue(lastNameField, formData.primaryLastName);
      setFieldValue(phoneField, formData.primaryWorkPhone);
      setFieldValue(emailField, formData.primaryEmail);
    }
  };

  return (
    <div className="contact-subcard">
      <div className="contact-subcard-title">{title}</div>

      <label className="checkbox-row">
        <input
          type="checkbox"
          checked={formData[sameField]}
          onChange={(e) => copyPrimary(e.target.checked)}
        />
        <span>Same as Primary Contact entered in Step 1</span>
      </label>

      <div className="two-col">
        <div className="form-group">
          <label className="form-label">
            First Name {required && <span className="required">*</span>}
          </label>
          <input
            className="text-input"
            type="text"
            name={firstNameField}
            value={formData[firstNameField]}
            onChange={handleChange}
          />
          {errors?.[firstNameField] && (
            <p className="error">{errors[firstNameField]}</p>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">
            Last Name {required && <span className="required">*</span>}
          </label>
          <input
            className="text-input"
            type="text"
            name={lastNameField}
            value={formData[lastNameField]}
            onChange={handleChange}
          />
          {errors?.[lastNameField] && (
            <p className="error">{errors[lastNameField]}</p>
          )}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">
          Phone {required && <span className="required">*</span>}
        </label>
        <input
          className="text-input"
          type="text"
          name={phoneField}
          value={formData[phoneField]}
          onChange={handleChange}
          maxLength={10}
        />
        {errors?.[phoneField] && (
          <p className="error">{errors[phoneField]}</p>
        )}
      </div>

      <div className="form-group">
        <label className="form-label">
          Email {required && <span className="required">*</span>}
        </label>
        <input
          className="text-input"
          type="email"
          name={emailField}
          value={formData[emailField]}
          onChange={handleChange}
        />
        {errors?.[emailField] && (
          <p className="error">{errors[emailField]}</p>
        )}
      </div>
    </div>
  );
}

function Step3LeadershipContacts({
  formData,
  handleChange,
  setFieldValue,
  nextStep,
  prevStep,
  errors,
}) {
  return (
    <StepShell
      title="Leadership Contacts"
      stepText="Step 3 of 6"
      activeStep={3}
      leftButton={
        <button type="button" className="btn-outline" onClick={prevStep}>
          Previous
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
        <h2 className="section-title">Contact Information</h2>

        <ContactBlock
          title="Chief Executive Officer (CEO)"
          sameField="ceoSameAsPrimary"
          firstNameField="ceoFirstName"
          lastNameField="ceoLastName"
          phoneField="ceoPhone"
          emailField="ceoEmail"
          formData={formData}
          handleChange={handleChange}
          setFieldValue={setFieldValue}
          errors={errors}
          required
        />

        <ContactBlock
          title="Director of Quality"
          sameField="qualitySameAsPrimary"
          firstNameField="qualityFirstName"
          lastNameField="qualityLastName"
          phoneField="qualityPhone"
          emailField="qualityEmail"
          formData={formData}
          handleChange={handleChange}
          setFieldValue={setFieldValue}
          errors={errors}
        />

        <ContactBlock
          title="Invoicing Contact"
          sameField="invoicingSameAsPrimary"
          firstNameField="invoicingFirstName"
          lastNameField="invoicingLastName"
          phoneField="invoicingPhone"
          emailField="invoicingEmail"
          formData={formData}
          handleChange={handleChange}
          setFieldValue={setFieldValue}
          errors={errors}
          required
        />

        <div className="contact-subcard">
          <div className="contact-subcard-title">Billing Address</div>

          <div className="form-group">
            <label className="form-label">
              Street Address <span className="required">*</span>
            </label>
            <input
              className="text-input"
              type="text"
              name="billingStreet"
              value={formData.billingStreet}
              onChange={handleChange}
            />
            {errors?.billingStreet && (
              <p className="error">{errors.billingStreet}</p>
            )}
          </div>

          <div className="three-col">
            <div className="form-group">
              <label className="form-label">
                City <span className="required">*</span>
              </label>
              <input
                className="text-input"
                type="text"
                name="billingCity"
                value={formData.billingCity}
                onChange={handleChange}
              />
              {errors?.billingCity && (
                <p className="error">{errors.billingCity}</p>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">
                State <span className="required">*</span>
              </label>
              <select
                className="select-input"
                name="billingState"
                value={formData.billingState}
                onChange={handleChange}
              >
                <option value="">Select State</option>
                <option value="CA">California</option>
                <option value="NY">New York</option>
                <option value="TX">Texas</option>
                <option value="IL">Illinois</option>
              </select>
              {errors?.billingState && (
                <p className="error">{errors.billingState}</p>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">
                ZIP Code <span className="required">*</span>
              </label>
              <input
                className="text-input"
                type="text"
                name="billingZip"
                value={formData.billingZip}
                onChange={handleChange}
              />
              {errors?.billingZip && (
                <p className="error">{errors.billingZip}</p>
              )}
            </div>
          </div>
        </div>
      </SectionCard>
    </StepShell>
  );
}
export default Step3LeadershipContacts;