import type { Employee } from "../../types";
import { InfoItem } from "./InfoItem";
import mobileIcon from "../../assets/mobile.svg";
import atmarckIcon from "../../assets/at-sign.svg";
import telegramIcon from "../../assets/telegram.svg";
import cIcon from "../../assets/c-letter.svg";

export function EmployeeContactInfo({ employee }: { employee: Employee }) {
  const contactInfo = [
    {
      icon: mobileIcon,
      label: "Mobile phone",
      value: employee.phone ?? "-",
    },
    {
      icon: atmarckIcon,
      label: "Email",
      value: employee.email ?? "-",
    },
    {
      icon: telegramIcon,
      label: "Telegram",
      value: employee.telegram ?? "-",
    },
    {
      icon: cIcon,
      label: "C-number",
      value: employee.cnumber ?? "-",
    },
  ];

  return (
    <div className="info-container">
      <h3>Contacts</h3>
      <ul className="info-box">
        {contactInfo.map((item) => (
          <InfoItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            value={item.value}
          />
        ))}
      </ul>
    </div>
  );
}
