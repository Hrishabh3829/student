import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    CssBaseline,
    Tooltip,
    Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArticleIcon from "@mui/icons-material/Article";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import InfoIcon from "@mui/icons-material/Info";
import LogoutIcon from "@mui/icons-material/Logout";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from "recharts";

// Student Data in Increasing Order
const studentData = [
    { name: "Hrishabh", attendance: 75, marks: 80 },
    { name: "Gaurav", attendance: 82, marks: 85 },
    { name: "Sumit", attendance: 85, marks: 90 },
    { name: "Ananta", attendance: 88, marks: 95 },
    { name: "Mitesh", attendance: 90, marks: 92 },
];

// Your dashboard items data
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
    { segment: "About", title: "About", icon: <InfoIcon fontSize="small" /> },
];

export default function DashboardLayout() {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [collapsed, setCollapsed] = useState(true);

    const handleNavigation = (path) => {
        if (path === "logout") {
            navigate("/"); // Navigate to the home page on logout
        } else {
            navigate(`/${path}`); // Navigate to the given path
        }
    };

    const toggleDarkMode = () => setDarkMode(!darkMode);
    const toggleSidebar = () => setCollapsed(!collapsed);
    const handleReportsClick = () => {
        setExpanded(!expanded);
        setCollapsed(false);
    };

    return (
        <>
            <CssBaseline />
            <Box sx={{ height: "100vh", display: "flex", position: "relative" }}>
                {/* Sidebar */}
                <Box
                    sx={{
                        width: collapsed ? "60px" : "250px",
                        backgroundColor: darkMode ? "#1f1f1f" : "#fff",
                        padding: "20px 10px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 1.5,
                        transition: "width 0.3s",
                        overflow: "hidden",
                        boxShadow: !darkMode ? "0px 0px 8px rgba(0, 0, 0, 0.1)" : "none",
                    }}
                >
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
                            "&:hover": { backgroundColor: "#e0e0e0" },
                            marginBottom: "20px",
                        }}
                    >
                        <MenuIcon fontSize="small" />
                    </Button>

                    {/* Render Sidebar Items */}
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
                                                "&:hover": { backgroundColor: "#f5f5f5" },
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
                                                        "&:hover": { backgroundColor: "#f5f5f5" },
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
                                        "&:hover": { backgroundColor: "#f5f5f5" },
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
                        textAlign: "center",
                        marginLeft: collapsed ? "60px" : "250px", // Adjust content margin to avoid overlap
                    }}
                >
                    {/* Histogram (BarChart) */}
                    <Typography variant="h6" sx={{ marginBottom: 3 }}>
                        Student Attendance Histogram
                    </Typography>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={studentData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <RechartsTooltip />
                            <Legend />
                            <Bar dataKey="attendance" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>

                    {/* Line Chart */}
                    <Typography variant="h6" sx={{ marginBottom: 3, marginTop: 4 }}>
                        Student Marks Line Chart
                    </Typography>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={studentData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <RechartsTooltip />
                            <Legend />
                            <Line type="monotone" dataKey="marks" stroke="#8884d8" />
                        </LineChart>
                    </ResponsiveContainer>
                </Box>
            </Box>
        </>
    );
}
