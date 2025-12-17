import { Link, useLocation, useNavigate } from "react-router";
import type { showMobileMenuProps } from "../types";
import questionIcon from "../assets/circle-question-mark.svg";
import sendIcon from "../assets/send.svg";
import avatarPlaceholder from "../assets/circle-user-round.svg";
import closeIcon from "../assets/x.svg";
import burgerMenu from "../assets/menu.svg";
import { useLogout } from "../hooks/useLogout";
// import { useAuth } from "../context/useContext";
import { useAppSelector } from "../app/hooks";
import { selectUser } from "../features/auth/authSlice";

function Header({ isMobileMenuOpen, setMobileMenuOpen }: showMobileMenuProps) {
  //const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => setMobileMenuOpen((prev) => !prev);
  const closeMenu = () => setMobileMenuOpen(false);

  const user = useAppSelector(selectUser);
  // const { user } = useAuth();
  const location = useLocation();
  const handleLogout = useLogout();
  const navigate = useNavigate();

  return (
    <header>
      <div>
        <Link to="/" id="logo-link">
          <p className="logo">LEVERX</p>
          <p className="logo">EMPLOYEE SERVICES</p>
        </Link>
      </div>
      <nav className="center-nav-link">
        <Link
          to="/"
          className={`active header-nav-link ${
            (location.pathname === "/" ||
              location.pathname.startsWith("/users/")) &&
            "nav-link-activ"
          }`}
          id="header-address-book"
        >
          Address Book
        </Link>
        {user?.role === "admin" && (
          <Link
            to="/roles-permissions"
            className={`header-nav-link ${
              location.pathname === "/roles-permissions" && "nav-link-activ"
            }`}
            id="header-settigs"
          >
            Settings
          </Link>
        )}
      </nav>
      <div className="menu">
        {user?.role === "admin" ? (
          <button className="btn header-sent">
            <img src={sendIcon} alt="support-btn" />
          </button>
        ) : (
          <button className="btn" id="header-sup-btn">
            <img src={questionIcon} alt="support-btn" />
            <span>SUPPORT</span>
          </button>
        )}

        <button
          onClick={() => navigate(`/users/${user?.id}`)}
          className="btn profile-btn"
        >
          <div className="profile-btn-imgBox">
            <img
              src={user?.user_avatar || avatarPlaceholder}
              alt="header_avatar"
              id="header-avatar"
            />
          </div>
          <span id="header-userName">{`${user?.first_name} ${user?.last_name}`}</span>
        </button>
        <button onClick={handleLogout} className="signout logout-btn">
          ⏻
        </button>
      </div>

      {isMobileMenuOpen ? (
        <button
          onClick={closeMenu}
          className="mobile-clocemenu-btn"
          //style={{ display: isMobileMenuOpen ? "block" : "none" }}
        >
          <img src={closeIcon} alt="close_menu_icon" />
        </button>
      ) : (
        <button
          onClick={toggleMenu}
          className="mobile-menu-btn"
          //style={{ display: isMobileMenuOpen ? "none" : "block" }}
        >
          <img src={burgerMenu} alt="burger_menu_icon" />
        </button>
      )}
    </header>
  );
}

export default Header;
