const steps = [
  "DNV Quote Request",
  "Facility Details",
  "Leadership Contacts",
  "Site Information",
  "Services & Certifications",
  "Review & Submit",
];

function ProgressHeader({ activeStep, stepText, title }) {
  return (
    <div className="page-top-content">
      <div className="page-title-row">
        <h1 className="page-title">{title}</h1>
        <div className="page-step-text">{stepText}</div>
      </div>

      <div className="progress-lines">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`progress-line ${index + 1 <= activeStep ? "active" : ""}`}
          />
        ))}
      </div>

      <div className="progress-labels">
        {steps.map((label, index) => (
          <div
            key={label}
            className={`progress-label ${index + 1 === activeStep ? "active" : ""}`}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProgressHeader;