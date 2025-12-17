import type { InfoItemProps } from "../../types";

export function InfoItem({ icon, label, value }: InfoItemProps) {
  return (
    <li className="info-label-container">
      <div className="info-label-box">
        <img src={icon} alt="" className="info-icon" />
        <span className="info-label">{label}</span>
      </div>
      <span className="info-value">{value}</span>
    </li>
  );
}
