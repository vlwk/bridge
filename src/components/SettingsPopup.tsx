import React, { useState } from "react";
import { settingsPopupStyles as s } from "./styles/SettingsPopup.styles";
import { popupStyles as p } from "./styles/Popup.styles";
import { buttonStyles as b } from "./styles/Buttons.styles";

interface SettingsPopupProps {
  onClose: () => void;
  onSubmit: (data: { roomName: string; settings: Record<string, any> }) => void;
}

const SettingsPopup: React.FC<SettingsPopupProps> = ({ onClose, onSubmit }) => {
  const [tempRoomName, setTempRoomName] = useState("");
  const [settings, setSettings] = useState({});
  const canSubmit = tempRoomName.trim().length > 0;

  const handleSubmit = () => {
    if (!canSubmit) return;
    onSubmit({ roomName: tempRoomName.trim(), settings });
  };

  return (
    <div className={p.modal} onClick={onClose}>
      <div className={p.box} onClick={(e) => e.stopPropagation()}>
        <h3 className={p.title}>Create Room</h3>
        <div className={p.body}>
          <div className={s.formControl}>
            <label className={s.label}>
              <span className={s.labelText}>Room name</span>
            </label>
            <input
              type="text"
              className={s.input}
              value={tempRoomName}
              onChange={(e) => setTempRoomName(e.target.value)}
            />
          </div>
        </div>
        <div className={p.actions}>
          <button className={b.primary} onClick={onClose}>
            Cancel
          </button>
          <button
            className={b.primary}
            onClick={handleSubmit}
            disabled={!canSubmit}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPopup;
