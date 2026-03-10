import ProgressHeader from "./ProgressHeader";
import ActionBar from "./ActionBar";

function StepShell({
  title,
  stepText,
  activeStep,
  leftButton,
  middleButtons,
  children,
}) {
  return (
    <div className="app-page">
      <header className="top-header">
        <div className="top-header__brand">DNV Healthcare</div>

        <div className="top-header__user">
          <div className="user-avatar">KM</div>
          <span className="user-name">Katherine Martinez</span>
        </div>
      </header>

      <main className="page-shell">
        <ProgressHeader
          title={title}
          stepText={stepText}
          activeStep={activeStep}
        />

        {children}

        <ActionBar
          leftButton={leftButton}
          middleButtons={middleButtons}
        />
      </main>
    </div>
  );
}

export default StepShell;