import { IconButton, Tooltip } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import styles from "./customNavbar.module.css";
import { Outlet } from "react-router";

function CustomNavbar() {
  return (
    <div>
      <header className={styles["nav-header"]}>
        <nav className={styles["nav-list"]}>
          <h1 id={styles.logo}>Logo</h1>

          <ul>
            <li>Home</li>
            <li>Profile</li>
            <li>About</li>
            <span>
              <Tooltip title="Log Out">
                <IconButton style={{ color: "white" }}>
                  <LogoutIcon style={{ width: "30px", height: "30px" }} />
                </IconButton>
              </Tooltip>
            </span>
          </ul>
        </nav>
      </header>
      <Outlet />
    </div>
  );
}

export default CustomNavbar;
