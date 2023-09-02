import Form from "./Components/Form";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import OldPredictions from "./Components/OldPredictions";
import Dashboard from "./Components/Dashboard";

function App() {
  const Menu = () => {
    const location = useLocation();

    if (location.pathname === "/Login") {
      return <></>;
    } else
      return (
        <div
          style={{ backgroundColor: "#3B5998" }}
          className="app-menu navbar-menu"
        >
          <div className="navbar-brand-box">
            <button
              type="button"
              className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover"
              id="vertical-hover"
            >
              <i className="ri-record-circle-line"></i>
            </button>
          </div>
          <div id="scrollbar">
            <div className="container-fluid">
              <div id="two-column-menu"></div>
              <ul className="navbar-nav" id="navbar-nav">
                <li style={{ color: "#fff" }} className="menu-title">
                  <span data-key="t-menu">Menu</span>
                </li>
                <li className="nav-item">
                  <Link
                    style={{ color: "#fff" }}
                    to="/"
                    className="nav-link"
                    role="button"
                    aria-expanded="false"
                    aria-controls="sidebarDashboards"
                  >
                    <span data-key="t-dashboards">Page de prédictions</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    style={{ color: "#fff" }}
                    to="/OldPredictions"
                    className="nav-link"
                    role="button"
                    aria-expanded="false"
                    aria-controls="sidebarDashboards"
                  >
                    <span data-key="t-dashboards">Mes Anciennes prédictions</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    style={{ color: "#fff" }}
                    to="/Dashboard"
                    className="nav-link"
                    role="button"
                    aria-expanded="false"
                    aria-controls="sidebarDashboards"
                  >
                    <span data-key="t-dashboards">Dashboard</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="sidebar-background"></div>
        </div>
      );
  };

  const Header = () => {
    const location = useLocation();
    if (location.pathname === "/Login") {
      return <></>;
    }

    return (
      <>
        <header id="page-topbar">
          <div className="layout-width">
            <div className="navbar-header">
              <div className="d-flex">
                <div className="navbar-brand-box horizontal-logo">
                  {/* <a href="index.html" className="logo logo-dark">
                    <span className="logo-sm">
                      <img src=" /assets/images/logo-sm.png" alt="" height="22" />
                    </span>
                  </a> */}
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="dropdown ms-sm-3 header-item topbar-user">
                  <button
                    type="button"
                    className="btn"
                    id="page-header-user-dropdown"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="d-flex align-items-center">
                      <span className="text-start ms-xl-2">
                        <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">
                          {/* {currentUser?.user?.login} */}
                          Sarra
                        </span>
                        <span className="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">
                          {/* {currentUser?.user?.role} */}
                          Slimene
                        </span>
                      </span>
                    </span>
                  </button>
                  <div className="dropdown-menu dropdown-menu-end">
                    {/* {currentUser?.user?.role !== 'admin' ? (<Link to='Profile' className="dropdown-item"><i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i> <span className="align-middle">Profil</span></Link>) : (<></>)} */}
                    {/* <a onClick={Logout} className="dropdown-item">
                      <i className="mdi mdi-lock text-muted fs-16 align-middle me-1"></i>{" "}
                      <span className="align-middle">Déconnexion</span>
                    </a> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </>
    );
  };

  return (
    <>
      <div>
        <Router>
          <Header />
          <Menu />
          <Routes>
            <Route exact path="/" element={<Form />} />
            <Route exact path="/OldPredictions" element={<OldPredictions />} />
            <Route exact path="/Dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
