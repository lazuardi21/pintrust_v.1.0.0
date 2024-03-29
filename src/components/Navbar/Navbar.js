//STYLES
import styles from "./Navbar.module.scss";

//CONTEXT
import { useContext, useEffect } from "react";
import useState from "react-usestateref";
import NavContext from "../../Context/NavContext";

//REACT ROUTER
import { NavLink, useNavigate } from "react-router-dom";

//ICONS
import {
  MdOutlineDashboard,
  MdOutlineAnalytics,
  MdOutlinedFlag,
  MdPeopleOutline,
  MdOutlineMessage,
  MdOutlineLogout,
} from "react-icons/md";
import { IoMdLogIn } from "react-icons/io";
import { FaReact, FaTimes } from "react-icons/fa";
import { BsDashLg } from "react-icons/bs";
import { VscDashboard } from "react-icons/vsc";



const NavUrl = ({ url, icon, description }) => {
  const { nav, setNav } = useContext(NavContext);
  const checkWindowSize = () => {
    if (window.innerWidth < 1024) setNav(!nav);
  };

  return (
    <li className={styles.li_navlink}>
      <NavLink
        to={`${url}`}
        className={({ isActive }) => (isActive ? styles.active : undefined)}
        onClick={() => checkWindowSize()}
      >
        {icon}
        <span className={styles.description}>{description}</span>
      </NavLink>
    </li>
  );
};

const Navbar = () => {
  const { nav, setNav } = useContext(NavContext);
  const navigate = useNavigate()
  const [, setIsMobile, isMobileRef] = useState(false)
  // const [width, setWidth] = useState(0)

  useEffect(() => {
    console.log("Hello")
    // console.log(window.innerWidth)
    // setWidth(window.innerWidth)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize);
  }, [])

  const handleResize = () => {
    if (window.innerWidth < 1024) {
      console.log("mobile window")
      setIsMobile(true)
    }
    else if (window.innerWidth >= 1024) {
      console.log("desktop window")
      setIsMobile(false)
    }
  }


  return (
    <div
      // className={`${styles.navbar_container} ${nav ? styles.navbar_mobile_active : undefined
      className={`${styles.navbar_container} ${!isMobileRef.current ?
        !nav ? styles.navbar_mobile_active : undefined :
        nav ? styles.navbar_mobile_active : undefined
        }`}
    >
      {/* <nav className={nav ? undefined : styles.nav_small}> */}
      <nav className={
        !isMobileRef.current ?
          !nav ? undefined : styles.nav_small :
          nav ? undefined : styles.nav_small
      }
      >
        {/* LOGO */}
        <div className={styles.logo}>
          <VscDashboard
            className={styles.logo_icon}
            onClick={() => {
              navigate('/')
              window.location.reload()
            }}
          />
         
          <FaTimes
            className={styles.mobile_cancel_icon}
            onClick={() => {
              setNav(!nav);
            }}
          />
        </div>

        {/* MENU */}
        <ul className={styles.menu_container}>
          {/* FIRST CATEGORY */}
          <span className={styles.categories}>
            {/* {nav ? "Pages" : <BsDashLg />} */}
            {
              !isMobileRef.current ?
                !nav ? "Pages" : <BsDashLg /> :
                nav ? "Pages" : <BsDashLg />
            }
          </span>

          <NavUrl
            url="/"
            icon={<MdOutlineDashboard />}
            description="Dashboard"
          />
          <NavUrl
            url="analytics"
            icon={<MdOutlineAnalytics />}
            description="Analytics"
          />
          <NavUrl
            url="campaings"
            icon={<MdOutlinedFlag />}
            description="Campaings"
          />
          <NavUrl url="team" icon={<MdPeopleOutline />} description="Team" />

          <NavUrl
            url="messages"
            icon={<MdOutlineMessage />}
            description="Messages"
          />

          {/* SECOND CATEGORY */}
          <span className={`${styles.categories} ${styles.second_category}`}>
            {/* {nav ? "More" : <BsDashLg />} */}
            {
              !isMobileRef.current ?
                !nav ? "More" : <BsDashLg /> :
                nav ? "More" : <BsDashLg />

            }
          </span>

          <NavUrl
            url="other1"
            icon={<IoMdLogIn />}
            description="Authentication"
          />
          <NavUrl url="other2" icon={<FaReact />} description="ReactJs" />
        </ul>

        {/* LOGOUT BUTTON */}
        {/* <div
          className={`${styles.btn_logout}`}
          onClick={() => {
            setNav(!nav);
          }}
        >
          <MdOutlineLogout />
        </div> */}
      </nav>

      <div
        // className={nav ? styles.mobile_nav_background_active : undefined}
        className={
          !isMobileRef.current ?
            !nav ? styles.mobile_nav_background_active : undefined :
            nav ? styles.mobile_nav_background_active : undefined
        }
        onClick={() => {
          setNav(!nav);
        }}
      ></div>
    </div>
  );
};

export default Navbar;
