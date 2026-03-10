import StepShell from "../components/StepShell";
import SectionCard from "../components/SectionCard";

const facilityOptions = [
  "Short-Term Acute Care",
  "Long-Term Acute Care",
  "Critical Access",
  "Children's",
  "Free-Standing Psychiatric",
  "Other",
];

function Step2FacilityDetails({ formData, setFieldValue, nextStep, prevStep }) {
  return (
    <StepShell
      title="Facility Details"
      stepText="Step 2 of 6"
      activeStep={2}
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
        <h2 className="section-title">Facility and Organization Type</h2>

        <div className="form-group">
          <label className="form-label">
            Facility Type <span className="required">*</span>
          </label>

          <div className="radio-list">
            {facilityOptions.map((option) => (
              <label key={option} className="radio-row">
                <input
                  type="radio"
                  name="facilityType"
                  checked={formData.facilityType === option}
                  onChange={() => setFieldValue("facilityType", option)}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>
      </SectionCard>
    </StepShell>
  );
}

export default Step2FacilityDetails;