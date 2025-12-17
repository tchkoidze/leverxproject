import { useState } from "react";
import type { BasicSearchProps } from "../../types";
import { useSearchParams } from "react-router";

// {
//   employees,
//   onFilter,
// }: {
//   employees: Employee[];
//   onFilter: (filtered: Employee[]) => void;
// }

function BasicSearch({ onSearch }: BasicSearchProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [searchValue, setSearchValue] = useState(initialQuery);

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setSearchParams(searchValue ? { q: searchValue } : {});

  //   const query = searchValue.toLowerCase().trim();

  //   const filtered = employees.filter((employee) => {
  //     const fullNativeName = [
  //       employee.first_native_name,
  //       employee.middle_native_name,
  //       employee.last_native_name,
  //     ]
  //       .filter(Boolean)
  //       .join(" ")
  //       .toLowerCase();

  //     return (
  //       employee._id.toLowerCase().includes(query) ||
  //       employee.first_name.toLowerCase().includes(query) ||
  //       employee.last_name.toLowerCase().includes(query) ||
  //       fullNativeName.includes(query)
  //     );
  //   });

  //   onFilter(filtered);
  // };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams(searchValue ? { q: searchValue } : {});
    onSearch(searchValue);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="basic-search"
      id="basic-search-form"
    >
      <div className="basic-search-wrapper">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-search-icon lucide-search"
        >
          <path d="m21 21-4.34-4.34" />
          <circle cx="11" cy="11" r="8" />
        </svg>
        <input
          type="text"
          placeholder="John Smith"
          id="basic-search-input"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      <button className="search-btn" type="submit">
        SEARCH
      </button>
    </form>
  );
}

export default BasicSearch;
