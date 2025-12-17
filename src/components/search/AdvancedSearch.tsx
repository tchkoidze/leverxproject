import { useEffect, useState } from "react";
import type { AdvancedSearchProps } from "../../types";
import { useSearchParams } from "react-router";
// {
//   employees,
//   onFilter,
// }: {
//   employees: Employee[];
//   onFilter: (filtered: Employee[]) => void;
// }

function AdvancedSearch({ onSearch }: AdvancedSearchProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const getFormValuesFromParams = () => ({
    name: searchParams.get("name") || "",
    email: searchParams.get("email") || "",
    phone: searchParams.get("phone") || "",
    telegram: searchParams.get("telegram") || "",
    building: searchParams.get("building") || "",
    room: searchParams.get("room") || "",
    department: searchParams.get("department") || "",
  });

  const [formValues, setFormValues] = useState(getFormValuesFromParams);

  useEffect(() => {
    setFormValues(getFormValuesFromParams());
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormValues((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   const params: Record<string, string> = {};
  //   for (const key in formValues) {
  //     if (formValues[key as keyof typeof formValues]) {
  //       params[key] = formValues[key as keyof typeof formValues];
  //     }
  //   }
  //   setSearchParams(params);

  //   const filtered = employees.filter((emp) => {
  //     // Name search (like Basic Search)
  //     const query = formValues.name.toLowerCase().trim();
  //     const fullNativeName = [
  //       emp.first_native_name,
  //       emp.middle_native_name,
  //       emp.last_native_name,
  //     ]
  //       .filter(Boolean)
  //       .join(" ")
  //       .toLowerCase();

  //     const matchesName =
  //       !query ||
  //       emp._id.toLowerCase().includes(query) ||
  //       emp.first_name.toLowerCase().includes(query) ||
  //       emp.last_name.toLowerCase().includes(query) ||
  //       fullNativeName.includes(query);

  //     // Other fields
  //     const matchesEmail =
  //       !formValues.email ||
  //       emp.email?.toLowerCase().includes(formValues.email.toLowerCase());
  //     const matchesPhone =
  //       !formValues.phone ||
  //       emp.phone?.toLowerCase().includes(formValues.phone.toLowerCase());
  //     const matchesTelegram =
  //       !formValues.telegram ||
  //       emp.telegram?.toLowerCase().includes(formValues.telegram.toLowerCase());
  //     const matchesBuilding =
  //       !formValues.building || emp.building === formValues.building;
  //     const matchesRoom = !formValues.room || emp.room === formValues.room;
  //     const matchesDepartment =
  //       !formValues.department || emp.department === formValues.department;

  //     return (
  //       matchesName &&
  //       matchesEmail &&
  //       matchesPhone &&
  //       matchesTelegram &&
  //       matchesBuilding &&
  //       matchesRoom &&
  //       matchesDepartment
  //     );
  //   });

  //   onFilter(filtered);
  // };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params: Record<string, string> = {};
    for (const key in formValues) {
      if (formValues[key as keyof typeof formValues]) {
        params[key] = formValues[key as keyof typeof formValues];
      }
    }
    setSearchParams(params);

    onSearch(formValues);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="advanced-search"
      id="advanced-search-form"
    >
      <div className="input-box">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          placeholder="John Smith"
          className="advanced-input"
          value={formValues.name}
          onChange={handleChange}
        />
      </div>
      <div className="input-box">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          placeholder="john.smith@leverx.com"
          className="advanced-input"
          value={formValues.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <div className="input-box">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            placeholder="Phone number"
            className="advanced-input"
            value={formValues.phone}
            onChange={handleChange}
          />
        </div>
        <div className="input-box">
          <label htmlFor="skype">Telegram</label>
          <input
            type="text"
            id="telegram"
            placeholder="Username"
            className="advanced-input"
            value={formValues.telegram}
            onChange={handleChange}
          />
        </div>
      </div>
      <div>
        <div className="input-box">
          <label htmlFor="building">Building</label>

          <select
            name="building"
            id="building"
            className="advanced-input"
            value={formValues.building}
            onChange={handleChange}
          >
            <option value="">Any</option>
            <option value="Pilsudskiego 69 (Poland)">
              Pilsudskiego 69 (Poland)
            </option>
            <option value="Stawowa 50 (Poland)">Stawowa 50 (Poland)</option>
            <option value="Celler 45 (Germany)">Celler 45 (Germany)</option>
          </select>
        </div>
        <div className="input-box">
          <label htmlFor="room">Room</label>
          <input
            type="text"
            id="room"
            placeholder="0"
            className="advanced-input"
            value={formValues.room}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="input-box">
        <label htmlFor="department">Department</label>
        <select
          name="department"
          id="department"
          className="advanced-input"
          value={formValues.department}
          onChange={handleChange}
        >
          <option value="">Any</option>
          <option value="HR">HR</option>
          <option value="Web & Mobile">Web & Mobile</option>
          <option value="QA Automation">QA Automation</option>
          <option value="DevOps & Infrastructure">
            DevOps & Infrastructure
          </option>
          <option value="Project Management">Project Management</option>
          <option value="UI/UX Design">UI/UX Design</option>
          <option value="Business Analysis">Business Analysis</option>
        </select>
      </div>
      {/* <!-- <button className="search-btn">SEARCH</button> -->
              <!-- <label htmlFor="search-toggle" className="search-btn">SEARCH</label> --> */}
      <button className="search-btn" type="submit" id="adavnces-search-btn">
        SEARCH
      </button>
    </form>
  );
}

export default AdvancedSearch;
