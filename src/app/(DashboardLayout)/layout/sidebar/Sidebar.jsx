import React from "react";
import Image from "next/image";
import { useMediaQuery, Box, Drawer, Grid } from "@mui/material";
// import Logo from "../../../../../public/Img/logoPsi.png";
import SidebarItems from "./SidebarItems";

const Sidebar = ({ isMobileSidebarOpen, onSidebarClose, isSidebarOpen }) => {
    const [sidebarVariant, setSidebarVariant] = React.useState("permanent");
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up("xl"));
    const mdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));
    const sidebarWidth = "270px";
    React.useEffect(() => {
        setSidebarVariant(lgUp ? "permanent" : "temporary");
    }, [lgUp]);
    return (
        <Box sx={{ width: sidebarWidth, flexShrink:0, zIndex: 100 }}>
            <Drawer
                anchor="left"
                open={lgUp ? isSidebarOpen : isMobileSidebarOpen}
                onClose={!lgUp ? onSidebarClose : undefined}
                variant={sidebarVariant}
                PaperProps={{
                    sx: {
                        width: sidebarWidth,
                        boxSizing: "border-box",
                        border: "0",
                        mt:"89px",
                        borderRadius:"0 10px 10px 0"
                    },
                }}
            >
                <Box
                    sx={{
                        height: "100vh",
                        overflowY:  lgUp?"auto":mdUp?"auto":"auto" ,
                        backgroundColor: '#6099EB',
                        padding: "14px",
                    }}
                >
                    {/* <Grid container justifyContent={"center"}    height={60}>
                        <Image
                            height={100}
                            style={{
                                objectFit: "contain",
                            }}
                            width={220}
                            alt="logo"
                            src={Logo}
                        />
                    </Grid> */}
                    <Box mt={1}>
                        <SidebarItems />
                    </Box>
                </Box>
            </Drawer>

        </Box>
    )
}

export default Sidebar