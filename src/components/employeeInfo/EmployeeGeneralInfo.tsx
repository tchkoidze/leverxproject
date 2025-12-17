import type { Employee } from "../../types";
import { InfoItem } from "./InfoItem";
import caseIcon from "../../assets/case.svg";
import homeIcon from "../../assets/building.svg";
import door from "../../assets/door.svg";
import hashIcon from "../../assets//hash.svg";
import calendarIcon from "../../assets/calendar-dots.svg";
import managerIcon from "../../assets/user-round.svg";

export function EmployeeGeneralInfo({ employee }: { employee: Employee }) {
  const generalInfo = [
    {
      icon: caseIcon,
      label: "Department",
      value: employee.department ?? "",
    },
    {
      icon: homeIcon,
      label: "Building",
      value: employee.building ?? "",
    },
    {
      icon: door,
      label: "Room",
      value: employee.room ?? "",
    },
    {
      icon: hashIcon,
      label: "Desk number",
      value: String(employee.desk_number ?? ""),
    },
    {
      icon: calendarIcon,
      label: "Date of Birth",
      value:
        employee.date_birth?.year &&
        employee.date_birth?.month &&
        employee.date_birth?.day
          ? `${employee.date_birth.year}-${String(
              employee.date_birth.month
            ).padStart(2, "0")}-${String(employee.date_birth.day).padStart(
              2,
              "0"
            )}`
          : "",
    },
    {
      icon: managerIcon,
      label: "Manager",
      value: `${employee.manager.first_name} ${employee.manager.last_name}`,
    },
  ];

  return (
    <div className="info-container">
      <h3>General Info</h3>
      <ul className="info-box">
        {generalInfo.map((item) => (
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
