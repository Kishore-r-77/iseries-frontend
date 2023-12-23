import { Route, Routes, useLocation } from "react-router";
import SignIn from "./auth/signin/SignIn";
import CustomNavbar from "./utilities/navbar/CustomNavbar";
import CustomFooter from "./utilities/footer/CustomFooter";
import HomePage from "./components/homepage/HomePage";
import SideBar from "./utilities/sidebar/Sidebar";
import "./App.css";

function App() {
  const { pathname } = useLocation();
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<SignIn />} />
          {/* <Route path="/signup" element={<Signup />} /> */}
        </Routes>
        {pathname !== "/" && pathname !== "/signup" && (
          <>
            <SideBar>
              <Routes>
                <Route element={<CustomNavbar />}>
                  <Route element={<CustomFooter />}>
                    <Route path="/home" element={<HomePage />} />
                  </Route>
                </Route>
              </Routes>
            </SideBar>
          </>
        )}
      </div>
    </>
  );
}

export default App;
