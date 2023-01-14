import { Toolbar } from "@mui/material";
import { Box } from "@mui/system"
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";

const drawerWidth = 280;

export const JournallLayout = ( {children} ) => {
  
return (
    <Box sx={{ display: "flex"}}     
    className="animate__animated animate__fadeIn animate__faster"
    >

        <Navbar drawerWidth= { drawerWidth } />

        <Sidebar drawerWidth= { drawerWidth } />

        <Box w
            component="main"
            sx={{flexGrow: 1, p: 3}}
        >
            <Toolbar />

            { children }

        </Box>
    </Box>
  )
}
