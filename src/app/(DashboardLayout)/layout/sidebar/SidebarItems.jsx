import React from "react";
import Menuitems from "./MenuItems";
import { usePathname } from "next/navigation";
import { Box, List, Grid,useMediaQuery } from "@mui/material";
import NavItem from "./NavItem/index";
import { uniqueId } from "lodash";
import { AiOutlineLogout } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { signOut } from "next-auth/react";
import { RiSettings3Line } from "react-icons/ri";

const Menuitems1= [
  {
    id: uniqueId(),
    title: "Settings",
    icon:  RiSettings3Line,
    href: "/profile",
    role: ["Admin"],
  },
  {
    id: uniqueId(),
    title: "Logout",
    icon: AiOutlineLogout,
    href: "/login",
  },
];
const SidebarItems = ({ toggleMobileSidebar }) => {
  const handleLogOut = () => {
    console.log("login logout Cal");
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    signOut({ callbackUrl: "/login", redirect: true });
  };
  const pathname = usePathname();
  const pathDirect = pathname;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  return (
    <Grid container  >
      <Box  sx={{
          px: 0,
        }}>
        <List sx={{ pt: 0 }} className="sidebarNav" component="div">
          {Menuitems.map((item) => {
            return (
              <NavItem
                item={item}
                key={item.id}
                pathDirect={pathDirect}
                onClick={toggleMobileSidebar}
              />
            );
          })}
        </List>
      </Box>
      <Box
        sx={{
          justifyContent: "flex-end",
          alignSelf: "flex-end",
          width: "100%",
          bottom: 0,
        
      
        }}
      >
        <List
          sx={{ pt: 0, width: "100%",overflow:"hidden", height:lgUp?"25vh":"35vh"}}
          className="sidebarNav"
          component="div"
        >
          {Menuitems1.map((item) => {
            return (
              <NavItem
                item={item}
                key={item.id}
                pathDirect={pathDirect}
                onClick={
                  item?.title === "Logout" ? handleLogOut : toggleMobileSidebar
                }
              />
            );
          })}
        </List>
      </Box>
    </Grid>
  );
};
export default SidebarItems;
