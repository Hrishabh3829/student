import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    CssBaseline,
    Tooltip,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArticleIcon from "@mui/icons-material/Article";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import SettingsIcon from "@mui/icons-material/Settings";
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from "@mui/icons-material/Logout";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import {Info} from "@mui/icons-material";

const DashboardItems = [
    { kind: "header", title: "Student Portal" },
    { segment: "home", title: "Home", icon: <HomeIcon fontSize="small" /> },
    { segment: "student", title: "Student Profile", icon: <AccountCircleIcon fontSize="small" /> },
    { segment: "courses", title: "Courses", icon: <ArticleIcon fontSize="small" /> },
    { kind: "divider" },
    { kind: "header", title: "Analytics" },
    {
        segment: "reports",
        title: "Reports",
        icon: <BarChartIcon fontSize="small" />,
        children: [
            { segment: "reports/student-report", title: "Student Report", icon: <DescriptionIcon fontSize="small" /> },
            { segment: "reports/student-attendance", title: "Student Attendance", icon: <DescriptionIcon fontSize="small" /> },
        ],
    },
    { segment: "integrations", title: "Integrations", icon: <LayersIcon fontSize="small" /> },
    { segment: "settings", title: "Settings", icon: <SettingsIcon fontSize="small" /> },
    { segment: "About", title: "About", icon: <Info fontSize="small" /> },
];

export default function DashboardLayout() {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false);
    const [darkMode, setDarkMode] = useState(false); // Set default to false for white theme
    const [collapsed, setCollapsed] = useState(true);

    const handleNavigation = (path) => {
        if (path === "logout") {
            navigate("/"); // Navigate to the home page on logout
        } else {
            navigate(`/${path}`); // Navigate to the given path
        }
    };

    const toggleDarkMode = () => setDarkMode(!darkMode); // Toggle between dark and light modes
    const toggleSidebar = () => setCollapsed(!collapsed); // Toggle sidebar collapsed state
    const handleReportsClick = () => {
        setExpanded(!expanded);
        setCollapsed(false); // Ensure sidebar is expanded when clicking on reports
    };

    return (
        <>
            <CssBaseline />
            <Box
                sx={{
                    height: "100vh",
                    backgroundColor: darkMode ? "#000" : "#fff", // Set background color based on theme
                    color: darkMode ? "#fff" : "#000", // Set text color based on theme
                    display: "flex",
                }}
            >
                {/* Sidebar */}
                <Box
                    sx={{
                        width: collapsed ? "60px" : "250px", // Adjust sidebar width based on collapsed state
                        backgroundColor: darkMode ? "#1a1a1a" : "#f5f5f5", // Sidebar background color based on theme
                        padding: "20px 10px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 1.5,
                        transition: "width 0.3s",
                        overflow: "hidden",
                    }}
                >
                    {/* Sidebar Toggle Button */}
                    <Button
                        onClick={toggleSidebar}
                        sx={{
                            backgroundColor: "transparent",
                            color: darkMode ? "#fff" : "#1976d2",
                            minWidth: "40px",
                            minHeight: "40px",
                            borderRadius: "50%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            "&:hover": {
                                backgroundColor: darkMode ? "#333" : "#e0e0e0",
                            },
                            marginBottom: "20px",
                        }}
                    >
                        <MenuIcon fontSize="small" />
                    </Button>

                    {DashboardItems.map((item, index) => {
                        if (item.kind === "header" || item.kind === "divider") return null;

                        if (item.segment === "reports") {
                            return (
                                <Box key={index}>
                                    <Tooltip title={!collapsed ? "" : item.title} placement="right">
                                        <Button
                                            fullWidth
                                            variant="text"
                                            startIcon={item.icon}
                                            endIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                            onClick={handleReportsClick}
                                            sx={{
                                                backgroundColor: "transparent",
                                                color: darkMode ? "#fff" : "#1976d2",
                                                justifyContent: "flex-start",
                                                alignItems: "center",
                                                "&:hover": {
                                                    backgroundColor: darkMode ? "#333" : "#e0e0e0",
                                                },
                                                padding: "8px 10px",
                                                textAlign: "left",
                                                gap: 1,
                                            }}
                                        >
                                            {!collapsed && item.title}
                                        </Button>
                                    </Tooltip>
                                    {expanded &&
                                        item.children.map((child, childIndex) => (
                                            <Tooltip key={childIndex} title={!collapsed ? "" : child.title} placement="right">
                                                <Button
                                                    fullWidth
                                                    variant="text"
                                                    startIcon={child.icon}
                                                    onClick={() => handleNavigation(child.segment)}
                                                    sx={{
                                                        backgroundColor: "transparent",
                                                        color: darkMode ? "#fff" : "#1976d2",
                                                        display: "flex",
                                                        justifyContent: "flex-start",
                                                        alignItems: "center",
                                                        marginLeft: "20px",
                                                        "&:hover": {
                                                            backgroundColor: darkMode ? "#333" : "#e0e0e0",
                                                        },
                                                        padding: "8px 10px",
                                                        gap: 1,
                                                    }}
                                                >
                                                    {!collapsed && child.title}
                                                </Button>
                                            </Tooltip>
                                        ))}
                                </Box>
                            );
                        }

                        return (
                            <Tooltip key={index} title={!collapsed ? "" : item.title} placement="right">
                                <Button
                                    fullWidth
                                    variant="text"
                                    startIcon={item.icon}
                                    onClick={() => handleNavigation(item.segment)}
                                    sx={{
                                        backgroundColor: "transparent",
                                        color: darkMode ? "#fff" : "#1976d2",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "flex-start",
                                        "&:hover": {
                                            backgroundColor: darkMode ? "#333" : "#e0e0e0",
                                        },
                                        padding: "8px 10px",
                                        gap: 1,
                                    }}
                                >
                                    {!collapsed && item.title}
                                </Button>
                            </Tooltip>
                        );
                    })}

                    {/* Logout Button */}
                    <Tooltip title={!collapsed ? "" : "Logout"} placement="right">
                        <Button
                            fullWidth
                            variant="text"
                            startIcon={<LogoutIcon />}
                            onClick={() => handleNavigation("logout")}
                            sx={{
                                backgroundColor: "transparent",
                                color: "#d32f2f",
                                marginTop: "auto",
                                "&:hover": {
                                    backgroundColor: darkMode ? "#333" : "#f5f5f5",
                                    color: "#d32f2f",
                                },
                                padding: "8px 10px",
                            }}
                        >
                            {!collapsed && "Logout"}
                        </Button>
                    </Tooltip>
                </Box>

                {/* Dark Mode Toggle */}
                <Box
                    sx={{
                        position: "absolute",
                        top: "20px",
                        right: "20px",
                        zIndex: 1,
                    }}
                >
                    <Button
                        variant="contained"
                        onClick={toggleDarkMode}
                        sx={{
                            backgroundColor: darkMode ? "#fff" : "#1976d2",
                            color: darkMode ? "#1976d2" : "#fff",
                            "&:hover": {
                                backgroundColor: "#1976d2",
                                color: "#fff",
                            },
                        }}
                    >
                        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                    </Button>
                </Box>

                {/* Main Content */}
                <Box
                    sx={{
                        flexGrow: 1,
                        padding: "20px",
                        backgroundColor: darkMode ? "#111" : "#f5f5f5",
                        color: darkMode ? "#fff" : "#000",
                        textAlign: "center",
                    }}
                >
                    <h1>Welcome to the Dashboard!</h1>
                </Box>
            </Box>
        </>
    );
}
