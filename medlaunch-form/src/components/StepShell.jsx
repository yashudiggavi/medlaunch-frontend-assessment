import SupportChat from "./SupportChat";

function StepShell({
  title,
  stepText,
  activeStep,
  leftButton,
  middleButtons,
  children,
}) {
  const steps = [
    "DNV Quote Request",
    "Facility Details",
    "Leadership Contacts",
    "Site Information",
    "Services & Certifications",
    "Review & Submit",
  ];

  return (
    <div className="app-page">
      {/* Top Header */}
      <div className="top-header">
        <div className="top-header__brand"></div>

        <div className="top-header__user">
          <div className="user-avatar">YD</div>
          Yashaswini Diggavi
        </div>
      </div>

      <div className="page-shell">
        {/* Page Title + Step */}
        <div className="page-top-content">
          <div className="page-title-row">
            <h1 className="page-title">{title}</h1>
            <div className="page-step-text">{stepText}</div>
          </div>

          {/* Progress Bar */}
          <div className="progress-lines">
            {steps.map((step, index) => (
              <div
                key={step}
                className={`progress-line ${
                  index + 1 <= activeStep ? "active" : ""
                }`}
              />
            ))}
          </div>

          {/* Progress Labels */}
          <div className="progress-labels">
            {steps.map((step, index) => (
              <div
                key={step}
                className={`progress-label ${
                  index + 1 <= activeStep ? "active" : ""
                }`}
              >
                {step}
              </div>
            ))}
          </div>
        </div>

        {/* Page Content */}
        {children}

        {/* Action Buttons */}
        <div className="action-bar">
          <div className="action-bar-left">{leftButton}</div>

          <div className="action-bar-middle">{middleButtons}</div>

          <div className="action-bar-right"></div>
        </div>
      </div>

      {/* Support Chat */}
      <SupportChat />
    </div>
  );
}

export default StepShell;