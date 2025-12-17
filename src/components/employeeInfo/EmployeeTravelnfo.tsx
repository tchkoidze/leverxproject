import type { Employee } from "../../types";
import { InfoItem } from "./InfoItem";
import earthIcon from "../../assets/earth.svg";
import vIcon from "../../assets/v-letter.svg";
import calendarIcon from "../../assets/calendar-dots.svg";

export function EmployeeTravelInfo({ employee }: { employee: Employee }) {
  const visas = employee.visa ?? [];

  const now = Date.now();

  function formatDate(d: Date): string {
    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  function msToDate(ms: number | string | undefined): Date {
    if (!ms) return new Date(0);
    return typeof ms === "number" ? new Date(ms) : new Date(ms);
  }

  return (
    <div className="info-container">
      <h3>Travel Info</h3>
      <ul className="info-box">
        <InfoItem
          icon={earthIcon}
          label="Citizenship"
          value={employee.citizenship ?? ""}
        />

        {visas.length > 0 &&
          visas.map((visa, idx) => {
            const start = formatDate(msToDate(visa.start_date));
            const end = formatDate(msToDate(visa.end_date));
            const expired = now > (visa.end_date ?? 0) ? " (expired)" : "";

            return (
              <div key={idx}>
                <InfoItem
                  icon={vIcon}
                  label={`Visa ${idx + 1}`}
                  value={`${visa.type} (${visa.issuing_country})`}
                />

                <InfoItem
                  icon={calendarIcon}
                  label={`Visa ${idx + 1} validity${expired}`}
                  value={`${start} - ${end}`}
                />
              </div>
            );
          })}
      </ul>
    </div>
  );
}
