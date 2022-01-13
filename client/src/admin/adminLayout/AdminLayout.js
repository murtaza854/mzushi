import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { AppBar, Drawer, DrawerHeader } from './layoutHelpers';
import Database from '../database/Database';
import { Link } from 'react-router-dom';
// import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LabelIcon from '@mui/icons-material/Label';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { BsPercent } from 'react-icons/bs';
// import PublicIcon from '@mui/icons-material/Public';
// import LocationCityIcon from '@mui/icons-material/LocationCity';
import CollectionsIcon from '@mui/icons-material/Collections';

export default function AdminLayout() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [linkDisableObject, setLinkDisableObject] = React.useState({
        'dashboard': false,
        'admin': false,
        'category': false,
        'feature': false,
        'startup': false,
        'product': false,
        'country': false,
        'state': false,
        'city': false,
    });

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const handleLinkDisable = (e, link) => {
        if (linkDisableObject[link]) {
            e.preventDefault();
            return;
        }
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Mzushi Admin
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <Link onClick={e => handleLinkDisable(e, 'admin')} style={{ color: 'black', textDecoration: 'none' }} to="/admin/admin-user">
                        <ListItem disabled={linkDisableObject.admin} button>
                            <ListItemIcon>
                                <GroupIcon />
                            </ListItemIcon>
                            <ListItemText primary="Admin Users" />
                        </ListItem>
                    </Link>
                    <Link onClick={e => handleLinkDisable(e, 'category')} style={{ color: 'black', textDecoration: 'none' }} to="/admin/category">
                        <ListItem disabled={linkDisableObject.category} button>
                            <ListItemIcon>
                                <LabelIcon />
                            </ListItemIcon>
                            <ListItemText primary="Categories" />
                        </ListItem>
                    </Link>
                    <Link onClick={e => handleLinkDisable(e, 'feature')} style={{ color: 'black', textDecoration: 'none' }} to="/admin/feature">
                        <ListItem disabled={linkDisableObject.feature} button>
                            <ListItemIcon>
                                <LabelIcon />
                            </ListItemIcon>
                            <ListItemText primary="Features" />
                        </ListItem>
                    </Link>
                </List>
                <Divider />
                <List>
                    <Link onClick={e => handleLinkDisable(e, 'startup')} style={{ color: 'black', textDecoration: 'none' }} to="/admin/startup">
                        <ListItem disabled={linkDisableObject.startup} button>
                            <ListItemIcon>
                                <ReceiptIcon />
                            </ListItemIcon>
                            <ListItemText primary="Startups" />
                        </ListItem>
                    </Link>
                    <Link onClick={e => handleLinkDisable(e, 'product')} style={{ color: 'black', textDecoration: 'none' }} to="/admin/product">
                        <ListItem disabled={linkDisableObject.product} button>
                            <ListItemIcon>
                                <ShoppingBagIcon />
                            </ListItemIcon>
                            <ListItemText primary="Products" />
                        </ListItem>
                    </Link>
                </List>
                <Divider />
                <List>
                    <Link onClick={e => handleLinkDisable(e, 'country')} style={{ color: 'black', textDecoration: 'none' }} to="/admin/country">
                        <ListItem disabled={linkDisableObject.country} button>
                            <ListItemIcon>
                                <AttachMoneyIcon />
                            </ListItemIcon>
                            <ListItemText primary="Countries" />
                        </ListItem>
                    </Link>
                    <Link onClick={e => handleLinkDisable(e, 'state')} style={{ color: 'black', textDecoration: 'none' }} to="/admin/state">
                        <ListItem disabled={linkDisableObject.state} button>
                            <ListItemIcon>
                                <BsPercent />
                            </ListItemIcon>
                            <ListItemText primary="States" />
                        </ListItem>
                    </Link>
                    <Link onClick={e => handleLinkDisable(e, 'city')} style={{ color: 'black', textDecoration: 'none' }} to="/admin/city">
                        <ListItem disabled={linkDisableObject.city} button>
                            <ListItemIcon>
                                <CollectionsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Cities" />
                        </ListItem>
                    </Link>
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <div className="margin-global-top-6" />
                <Database
                    linkDisableObject={linkDisableObject}
                    setLinkDisableObject={setLinkDisableObject}
                />
            </Box>
        </Box>
    );
}