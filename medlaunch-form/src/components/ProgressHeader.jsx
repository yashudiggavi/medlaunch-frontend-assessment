const steps = [
  "DNV Quote Request",
  "Facility Details",
  "Leadership Contacts",
  "Site Information",
  "Services & Certifications",
  "Review & Submit",
];

function ProgressHeader({ title, stepText, activeStep = 1 }) {
  return (
    <div className="progress-header-wrap">
      <div className="progress-header-top">
        <h1 className="progress-header-title">{title}</h1>
        <div className="progress-header-steptext">{stepText}</div>
      </div>

      <div className="progress-header">
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isActiveOrCompleted = stepNumber <= activeStep;

          return (
            <div className="progress-header-item" key={stepNumber}>
              {index !== 0 && (
                <div
                  className={`progress-header-line ${
                    isActiveOrCompleted ? "filled" : ""
                  }`}
                />
              )}

              <div className="progress-header-step">
                <div
                  className={`progress-header-circle ${
                    isActiveOrCompleted ? "active" : ""
                  }`}
                >
                  {stepNumber}
                </div>

                <div
                  className={`progress-header-label ${
                    isActiveOrCompleted ? "active" : ""
                  }`}
                >
                  {label}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProgressHeader;