import React from "react";

const steps = [
  "DNV Quote Request",
  "Facility Details",
  "Leadership Contacts",
  "Site Information",
  "Services & Certifications",
  "Review & Submit",
];

function ProgressIndicator({ activeStep }) {
  return (
    <div className="figma-progress">
      {steps.map((label, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < activeStep;
        const isActive = stepNumber === activeStep;

        return (
          <div className="figma-progress-item" key={stepNumber}>
            {index !== 0 && (
              <div
                className={`figma-progress-line ${
                  isCompleted || isActive ? "filled" : ""
                }`}
              />
            )}

            <div className="figma-progress-step">
              <div
                className={`figma-progress-circle ${
                  isCompleted || isActive ? "active" : ""
                }`}
              >
                {stepNumber}
              </div>

              <div
                className={`figma-progress-label ${
                  isCompleted || isActive ? "active" : ""
                }`}
              >
                {label}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProgressIndicator;