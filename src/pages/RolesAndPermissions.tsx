import avatarPlaceholderDark from "../assets/round-user-black.svg";
import { useRoleChange } from "../hooks/useRoleChange";
import { useState } from "react";
import { useGetUsersQuery } from "../features/users/usersApi";
import { useDebounce } from "../hooks/useDebaunce";
import NothingFound from "../components/NothingFound";

function RolesAndPermissions() {
  const [searchValue, setSearchValue] = useState("");

  const debouncedSearchTerm = useDebounce(searchValue, 300);

  const {
    data: displayedEmployees,
    isLoading: loading,
    error,
  } = useGetUsersQuery(
    debouncedSearchTerm ? { name: debouncedSearchTerm } : undefined
  );

  const { handleRoleChange, isLoading } = useRoleChange();

  if (loading) return <p>Loading employees...</p>;
  if (error)
    return (
      <p>
        Error: request errored
        {/* {error} */}
      </p>
    );

  return (
    <div className="roles-permissions-page-wrapper" id="roles-permissions-page">
      <div className="roles-permissions-container">
        <h2>Roles & Permissions</h2>
        <div className="table-head">
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

          <div>Address book role</div>
          <div>Vacation role</div>
          <div>Admin</div>
        </div>

        {displayedEmployees && displayedEmployees.length > 0 ? (
          <div className="table-body">
            {displayedEmployees.map((employee) => (
              <div key={employee._id} className="table-row">
                <div className="employee-profile">
                  <div className="avatar-img-wrapper">
                    <img
                      src={employee.user_avatar || avatarPlaceholderDark}
                      alt={`{${employee.first_name}_${employee.last_name}}`}
                    />
                  </div>
                  <div>
                    <p className="fullName">{`${employee.first_name} ${employee.last_name}`}</p>
                    <p className="local-fullName">{`${employee.first_native_name} ${employee.middle_native_name} ${employee.last_native_name}`}</p>
                  </div>
                </div>
                <div className="address-roles">
                  <button
                    onClick={() => handleRoleChange(employee._id, "employee")}
                    className={`employee-select-btn ${
                      employee.role === "employee"
                        ? "active-role"
                        : "inactive-role"
                    }`}
                  >
                    EMPLOYEE
                  </button>
                  <button
                    onClick={() => handleRoleChange(employee._id, "hr")}
                    className={`hr-select-btn ${
                      employee.role === "hr" ? "active-role" : "inactive-role"
                    }`}
                  >
                    HR
                  </button>
                </div>
                <div className="vacation-roles">
                  <button
                    className={`${
                      employee.role === "employee"
                        ? "active-role"
                        : "inactive-role"
                    }`}
                  >
                    Employee
                  </button>
                  <button className="inactive-role">PO</button>
                  <button className="inactive-role">DD</button>
                </div>
                <div className="admin-role">
                  <button
                    onClick={() => handleRoleChange(employee._id, "admin")}
                    className={`${
                      employee.role === "admin"
                        ? "active-role"
                        : "inactive-role"
                    }`}
                  >
                    ADMIN
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <NothingFound />
        )}
      </div>
    </div>
  );
}

export default RolesAndPermissions;
