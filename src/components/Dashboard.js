import * as React from 'react';
import { extendTheme, styled } from '@mui/material/styles';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid2';
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import FeedbackIcon from '@mui/icons-material/Feedback';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Dashboard = [
    {
        kind: 'header',
        title: 'Student Portal',
    },
    {
        segment: 'Home',
        title: 'Home',
        icon: <HomeIcon />,
    },
    {
        segment: 'student',
        title: 'Student Profile',
        icon: <AccountCircleIcon />,
    },
    {
        segment: 'courses',
        title: 'Courses',
        icon: <ArticleIcon />,
    },
    {
        kind: 'divider',
    },
    {
        kind: 'header',
        title: 'Analytics',
    },
    {
        segment: 'reports',
        title: 'Reports',
        icon: <BarChartIcon />,
        children: [
            {
                segment: 'student report',
                title: 'Student Report',
                icon: <DescriptionIcon />,
            },
            {
                segment: 'student attendance',
                title: 'Student Attendance',
                icon: <DescriptionIcon />,
            },
        ],
    },
    {
        segment: 'integrations',
        title: 'Integrations',
        icon: <LayersIcon />,
    },
    {
        segment: 'setting',
        title: 'Settings',
        icon: <SettingsIcon />,
    },
    {
        segment: 'feedback',
        title: 'Feedback',
        icon: <FeedbackIcon />,
    },
    {
        segment: 'log out',
        title: 'Logout',
        icon: <LogoutIcon />,
    },
];

const demoTheme = extendTheme({
    colorSchemes: { light: true, dark: true },
    colorSchemeSelector: 'class',
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
});

function useDemoRouter(initialPath) {
    const [pathname, setPathname] = React.useState(initialPath);

    const router = React.useMemo(() => {
        return {
            pathname,
            searchParams: new URLSearchParams(),
            navigate: (path) => setPathname(String(path)),
        };
    }, [pathname]);

    return router;
}

const Skeleton = styled('div')(({ theme, height }) => ({
    backgroundColor: theme.palette.action.hover,
    borderRadius: theme.shape.borderRadius,
    height,
    content: '" "',
}));

export default function DashboardLayoutBasic(props) {
    const { window } = props;
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleLogout = () => {
        // Perform any logout logic here if necessary
        navigate('/'); // Redirect to Login page
    };

    const router = useDemoRouter('/dashboard');

    const demoWindow = window ? window() : undefined;

    return (
        <AppProvider
            navigation={Dashboard}
            router={router}
            theme={demoTheme}
            window={demoWindow}
        >
            <DashboardLayout>
                <PageContainer>
                    <Grid container spacing={1}>
                        <Grid size={5} />
                        <Grid size={12}>
                            <Skeleton height={14} />
                        </Grid>
                        <Grid size={12}>
                            <Skeleton height={14} />
                        </Grid>
                        <Grid size={4}>
                            <Skeleton height={100} />
                        </Grid>
                        <Grid size={8}>
                            <Skeleton height={100} />
                        </Grid>

                        <Grid size={12}>
                            <Skeleton height={150} />
                        </Grid>
                        <Grid size={12}>
                            <Skeleton height={14} />
                        </Grid>

                        <Grid size={3}>
                            <Skeleton height={100} />
                        </Grid>
                        <Grid size={3}>
                            <Skeleton height={100} />
                        </Grid>
                        <Grid size={3}>
                            <Skeleton height={100} />
                        </Grid>
                        <Grid size={3}>
                            <Skeleton height={100} />
                        </Grid>
                    </Grid>
                </PageContainer>
                {/* Your existing Logout button */}
                <button onClick={handleLogout}>
                    Logout
                </button>
            </DashboardLayout>
        </AppProvider>
    );
}

export { Dashboard };
