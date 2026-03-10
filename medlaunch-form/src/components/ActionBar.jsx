import SupportChat from "./SupportChat";

function ActionBar({ leftButton, middleButtons }) {
  return (
    <div className="action-bar">
      <div className="action-bar-left">{leftButton}</div>
      <div className="action-bar-middle">{middleButtons}</div>
      <div className="action-bar-right">
        <SupportChat />
      </div>
    </div>
  );
}

export default ActionBar;