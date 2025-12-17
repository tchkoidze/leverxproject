import { useNavigate, useSearchParams } from "react-router";
import avatarPlaceholderDark from "../assets/round-user-black.svg";
import type { UsersQueryParams } from "../types";
import { useState } from "react";
import BasicSearch from "../components/search/BasicSearch";
import AdvancedSearch from "../components/search/AdvancedSearch";
import { useGetUsersQuery } from "../features/users/usersApi";
import circleIcon from "../assets/circle.svg";
import uerRoundIcon from "../assets/user-round.svg";
import caseIcone from "../assets/case.svg";
import doorIcon from "../assets/door.svg";
import NothingFound from "../components/NothingFound";

function Employees() {
  const [filters, setFilters] = useState<UsersQueryParams | undefined>(
    undefined
  );
  const [openSearchPanel, setOpenSearchPanel] = useState(false);
  const [activeTab, setActiveTab] = useState<"basic" | "advanced">("basic");

  const {
    data: displayedEmployees,
    isLoading: loading,
    error,
  } = useGetUsersQuery(filters);
  console.log(displayedEmployees);

  const handleBasicSearch = (name: string) => {
    setFilters(name ? { name } : undefined);
  };

  const handleAdvancedSearch = (values: UsersQueryParams) => {
    const cleaned: UsersQueryParams = {};
    Object.entries(values).forEach(([key, value]) => {
      if (value) (cleaned as any)[key] = value;
    });

    setFilters(Object.keys(cleaned).length ? cleaned : undefined);
  };

  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();

  if (loading) return <p>Loading employees...</p>;
  if (error) return <p>Error: Request Failed </p>; //{error}
  return (
    <div className="users-page-container" id="employees-page">
      {/* <!-- side search bar --> */}
      <aside className="side-search-box">
        {/* -- Open search panel btn -- */}
        <div className="open-search-panel-box">
          <button
            onClick={() => setOpenSearchPanel((prev) => !prev)}
            id="open-search-panel-btn"
          >
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
            <span>Open search panel</span>
          </button>
        </div>
        {/* search components */}
        <div
          className={`side-search-panel ${
            openSearchPanel ? "show-search-panel" : ""
          }`}
        >
          <div className="search-tabs">
            <button
              onClick={() => (setSearchParams({}), setActiveTab("basic"))}
              // htmlFor="basic-tab"
              className={`search-tab ${
                activeTab === "basic" ? "active-tab" : ""
              }`}
            >
              Basic Search
            </button>
            <button
              onClick={() => (setSearchParams({}), setActiveTab("advanced"))}
              // htmlFor="advanced-tab"
              className={`search-tab ${
                activeTab === "advanced" ? "active-tab" : ""
              }`}
            >
              Advanced Search
            </button>
          </div>

          {/* -- basic /  advanced  search -- */}
          {activeTab === "basic" ? (
            <BasicSearch onSearch={handleBasicSearch} />
          ) : activeTab === "advanced" ? (
            <AdvancedSearch onSearch={handleAdvancedSearch} />
          ) : (
            ""
          )}
        </div>
      </aside>

      {/* -- hidden checkbox to control visibility -- */}
      {/* <input type="checkbox" id="search-toggle" hidden defaultChecked={true} /> */}

      {/* <!-- right side (amployees list section)--> */}
      <section className="employee-area">
        <input
          type="radio"
          name="layout"
          id="grid-view"
          // checked
          hidden
          defaultChecked={true}
        />
        <input type="radio" name="layout" id="list-view" hidden />

        <div className="layout-conrollers-box">
          <p>
            <span className="count">{displayedEmployees?.length}</span>{" "}
            employees displayed
          </p>

          <div className="layout-btns">
            <label htmlFor="grid-view">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="7" height="7" x="3" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="14" rx="1" />
                <rect width="7" height="7" x="3" y="14" rx="1" />
              </svg>
            </label>

            <label htmlFor="list-view">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 5h16" />
                <path d="M4 12h16" />
                <path d="M4 19h16" />
              </svg>
            </label>
          </div>
        </div>

        {displayedEmployees && displayedEmployees?.length > 0 ? (
          <div id="employees-container" className="employee-grid-list">
            <div className="grid-card">
              <div>
                <img src={circleIcon} alt="circle" />
                <span>Photo</span>
              </div>
              <div>
                <img src={uerRoundIcon} alt="user_icon" />
                <span>Name</span>
              </div>

              <div>
                <img src={caseIcone} alt="work" />
                <span>Department</span>
              </div>
              <div>
                <img src={doorIcon} alt="door" />
                <span>Room</span>
              </div>
            </div>

            {/* {employees &&
            employees.map((employee) => ( */}
            {displayedEmployees.map((employee) => (
              <div
                onClick={() => navigate(`/users/${employee._id}`)}
                key={employee._id}
                className="employee-card"
              >
                <img
                  src={employee.user_avatar || avatarPlaceholderDark}
                  alt="employee_avatar"
                  className="avatar"
                />

                <h3 className="emp-name">{`${employee.first_name} ${employee.last_name}`}</h3>

                <div className="splitter"></div>

                <div className="info">
                  <p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ionicon"
                      viewBox="0 0 512 512"
                      width="18"
                      height="18"
                    >
                      <rect
                        x="32"
                        y="128"
                        width="448"
                        height="320"
                        rx="48"
                        ry="48"
                        fill="none"
                        stroke="#5595ff"
                        strokeLinejoin="round"
                        strokeWidth="32"
                      />
                      <path
                        d="M144 128V96a32 32 0 0132-32h160a32 32 0 0132 32v32M480 240H32M320 240v24a8 8 0 01-8 8H200a8 8 0 01-8-8v-24"
                        fill="none"
                        stroke="#5595ff"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="32"
                      />
                    </svg>

                    <span className="emp-department">
                      {employee.department}
                    </span>
                  </p>

                  <p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 256 256"
                      fill="none"
                      stroke="#5595ff"
                      strokeWidth="16"
                      strokeLinejoin="round"
                    >
                      <rect
                        x="48"
                        y="40"
                        width="160"
                        height="176"
                        rx="16"
                        ry="16"
                      />
                      <circle
                        cx="168"
                        cy="132"
                        r="12"
                        fill="#5595ff"
                        stroke="none"
                      />
                    </svg>

                    <span className="emp-room">{employee.room}</span>
                  </p>
                </div>

                <p className="employee-info emp-department-info">
                  {employee.department}
                </p>
                <p className="employee-info emp-room-info">{employee.room}</p>
              </div>
            ))}
          </div>
        ) : (
          <NothingFound />
        )}
      </section>
    </div>
  );
}

export default Employees;
