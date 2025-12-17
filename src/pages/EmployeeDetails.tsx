import { Link, useParams } from "react-router";
import { EmployeeContactInfo } from "../components/employeeInfo/EmployeeContactInfo";
import { EmployeeGeneralInfo } from "../components/employeeInfo/EmployeeGeneralInfo";
import { EmployeeTravelInfo } from "../components/employeeInfo/EmployeeTravelnfo";
import arrowBack from "../assets/chevron-left.svg";
import homeIcon from "../assets/home.svg";
import copyIcon from "../assets/copy.svg";
import penIcon from "../assets/pen.svg";
import avatarPlaceholderDark from "../assets/round-user-black.svg";
import notFoundIcon from "../assets/notFound.svg";
import { useState } from "react";
import EditEmployeeInfo from "../components/EditEmployeeInfo";
import { useAppSelector } from "../app/hooks";
import { selectUser } from "../features/auth/authSlice";
import { useGetUserByIdQuery } from "../features/users/usersApi";

function EmployeeDetails() {
  const [showEditForm, setShowEditForm] = useState(false);
  const [copied, setCopied] = useState(false);

  const { id } = useParams();
  console.log("id", id);
  const user = useAppSelector(selectUser);
  const {
    data: employee,
    isLoading: loading,
    error,
  } = useGetUserByIdQuery(id!);

  if (loading) return <p>Loading employee...</p>;

  if (error || !employee)
    return (
      <div id="user-details-notfound-page">
        <img src={notFoundIcon} alt="not_found_image" />
        <h2>404 Page not found</h2>
        <p>
          Sorry, we can't find that page! It might be an old link or maybe it
          was moved
        </p>
        <Link to="/" className="back-homePage-btn">
          GO TO THE HOME PAGE
        </Link>
      </div>
    );

  const showEditBtn =
    user?.role === "admin" ||
    (user?.role === "hr" && employee.manager.id === user?.id);
  const toggleEditform = () => {
    setShowEditForm((prev) => !prev);
  };

  const copyCurrentLink = async () => {
    await navigator.clipboard.writeText(window.location.href);

    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="employee-info-card-container" id="employee-details-page">
        {/* <!-- left --> */}
        <div>
          <div className="avatar-top-container">
            <Link to="/" className="btn-base btn-back" type="button">
              <img src={arrowBack} alt="arrow-left" />
            </Link>
            <div>
              <div className="avatar-wrapper">
                <img
                  src={employee.user_avatar || avatarPlaceholderDark}
                  alt="avatar"
                  id="employee-page-avatar"
                />
                {/* <!-- className="avatar" --> */}
                <div className="remote-work">
                  <img src={homeIcon} alt="remote_work" />
                </div>
              </div>
              <div
                className=""
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                  marginTop: 15,
                }}
              >
                <p id="employee-name">{`${employee.first_name} ${employee.last_name}`}</p>
                <p id="employee-fullName">
                  {`${employee.first_native_name} ${employee.middle_native_name} ${employee.last_native_name}`}
                </p>
                <button
                  onClick={copyCurrentLink}
                  className="btn-base"
                  id="copy-link"
                  type="button"
                >
                  <img
                    src={copyIcon}
                    alt="copy_link"
                    style={{ width: "16px", height: "16px" }}
                  />
                  <span>{copied ? "Copied!" : "Copy link"}</span>
                </button>
                {showEditBtn && (
                  <button
                    onClick={toggleEditform}
                    className="btn-base"
                    id="edit"
                    type="button"
                  >
                    <img
                      src={penIcon}
                      alt="edit"
                      style={{ width: "16px", height: "16px" }}
                    />
                    EDIT
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* <!-- right --> */}
        {showEditForm ? (
          <EditEmployeeInfo
            setShowEditForm={setShowEditForm}
            employee={employee}
          />
        ) : (
          <section className="employee-details-section">
            <EmployeeGeneralInfo employee={employee} />
            <EmployeeContactInfo employee={employee} />
            <EmployeeTravelInfo employee={employee} />
          </section>
        )}
      </div>
    </>
  );
}

export default EmployeeDetails;
