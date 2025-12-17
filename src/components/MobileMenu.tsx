import { Link } from "react-router";
import avatarPlaceholderDark from "../assets/round-user-black.svg";
import questionIcon from "../assets/circle-question-mark.svg";
import { useLogout } from "../hooks/useLogout";
import type { showMobileMenuProps } from "../types";
// import { useAuth } from "../context/useContext";
import { useAppSelector } from "../app/hooks";
import { selectUser } from "../features/auth/authSlice";

function MobileMenu({
  isMobileMenuOpen,
  setMobileMenuOpen,
}: showMobileMenuProps) {
  const handleLogout = useLogout();
  const user = useAppSelector(selectUser);
  // const { user } = useAuth();
  return (
    <div className={`mobile-menu-container ${isMobileMenuOpen ? "open" : ""}`}>
      <div className="mobile-menu-box1">
        <div>
          <div className="wrapper1">
            <div className="wrap3">
              <div className="mobile-menu-avatar-box">
                <img
                  src={user?.user_avatar || avatarPlaceholderDark}
                  alt="avatar"
                  id="mobile-menu-avatar"
                />
              </div>
            </div>

            <div>
              <p>{`${user?.first_name} ${user?.last_name}`}</p>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="signout mobile-logout-btn"
              >
                Sign out
              </button>
            </div>
          </div>
          {/* <!-- <div className="addres-book-box">Address Book</div>
            <div className="addres-book-box">Settigs</div> --> */}
          <nav className="mobile-nav">
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>
              Address Book
            </Link>
            <Link
              to="/roles-permissions"
              onClick={() => setMobileMenuOpen(false)}
              id="mobile-settings"
            >
              Settigs
            </Link>
          </nav>
        </div>

        <div className="wrapper4">
          {user?.role === "admin" ? (
            <button className="btn">SEND REQUEST</button>
          ) : (
            <button className="btn">
              <img src={questionIcon} alt="support-btn" />
              <span>SUPPORT</span>
            </button>
          )}
        </div>
      </div>
      <div className="mobile-menu-box2"></div>
    </div>
  );
}

export default MobileMenu;
