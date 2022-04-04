/* eslint-disable react/require-default-props */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */

/* React */
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
/* Redux & Toolkit */
import { useSelector } from 'react-redux';
import { loginSelector } from 'features/auth/login/slice';
/* Material UI */
import {
  Box,
  List,
  Button,
  Drawer,
  AppBar,
  Toolbar,
  Divider,
  ListItem,
  IconButton,
  Typography,
  CssBaseline,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  ListItemButton,
} from '@mui/material';
/* Icons */
import MenuIcon from '@mui/icons-material/Menu';
/* Library */
import { isNil } from 'lodash/';
/* Import Components */
import {
  APP_NAME,
  LOGIN_PATH,
  APP_PREFIX_PATH,
  CURRENT_WORK_PATH,
  MANAGE_USER_PATH,
} from 'configs/AppConfig';
import AppViews from 'features/app/index';
import DRAWER_CONFIG from 'configs/DrawerConfig';
import AvatarProfile from 'features/app/index/components/AvatarProfile';
import Header from 'features/app/index/components/Header';
import Footer from 'features/app/index/components/Footer';

const drawerWidth = 240;
const headerHeight = 64;

function SideDrawer(props) {
  const history = useHistory();
  const { me } = useSelector(loginSelector.all);
  const { level } = me || '';

  const [selectedIndex, setSelectedIndex] = useState('');

  const { location } = history;
  const { pathname } = location;
  const isLoggedIn = localStorage.getItem('IS_LOGGED_IN');

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleTitleClick = () => {
    history.push(APP_PREFIX_PATH);
    setSelectedIndex('');
  };

  const handleListItemClick = (path, index) => {
    history.push(path);
    setSelectedIndex(index);
  };

  const drawer = (
    <div>
      <Toolbar sx={{ justifyContent: 'center' }}>
        <Button
          onClick={handleTitleClick}
          sx={{
            '&:hover': {
              backgroundColor: 'white',
              transform: 'scale(1.1)',
            },
          }}
        >
          <img
            style={{ width: 'auto', height: 25 }}
            src="/img/dike-icon.png"
            alt="dike project"
          />
          <Typography
            sx={{
              textTransform: 'capitalize',
              fontWeight: 800,
              fontFamily: 'Nanum Gothic',
              fontSize: 23,
              color: '#625c60',
              letterSpacing: '0.1em',
              ml: 1,
            }}
          >
            {APP_NAME}
          </Typography>
        </Button>
      </Toolbar>
      <Divider />
      <List
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            {level === ('manager' || 'admin') ? '관리자' : '작업자'}
          </ListSubheader>
        }
      >
        {DRAWER_CONFIG.map((text, index) => {
          const { key, path, title, icon, userLevel } = text;

          return userLevel.includes(level) ? (
            <ListItem disablePadding key={key}>
              <ListItemButton
                selected={selectedIndex === index}
                onClick={() => handleListItemClick(path, index)}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(241, 237, 233, 1)',
                  },
                  '&.MuiListItemButton-root:hover': {
                    backgroundColor: 'rgba(241, 237, 233, 0.5)',
                  },
                }}
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={title} />
              </ListItemButton>
            </ListItem>
          ) : null;
        })}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  useEffect(() => {
    pathname === APP_PREFIX_PATH
      ? setSelectedIndex(0)
      : pathname === MANAGE_USER_PATH
      ? setSelectedIndex(1)
      : pathname === CURRENT_WORK_PATH
      ? setSelectedIndex(2)
      : setSelectedIndex('');
  }, []);

  useEffect(() => {
    if (isNil(isLoggedIn)) {
      history.push(LOGIN_PATH);
    }
  }, []);

  return (
    <Box sx={{ display: 'flex', height: `100vh` }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth - 40}px)` },
          backgroundColor: 'rgba(219,211, 207)',
          ml: { sm: `${drawerWidth - 40}px` },
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(219,211, 207)',
          }}
        >
          <Box sx={{ width: '100%' }}>
            <IconButton
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                mr: 2,
                display: { sm: 'none' },
                color: 'rgba(98, 92, 96, 1)',
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <AvatarProfile />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { md: drawerWidth, sm: drawerWidth - 40 },
          flexShrink: { sm: 0 },
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth - 40,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: { md: drawerWidth, sm: drawerWidth - 40 },
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          display: 'flex',
          width: {
            md: `calc(100% - ${drawerWidth}px)`,
            sm: `calc(100% - ${drawerWidth - 40}px)`,
            xs: '100%',
          },
          // height: {
          //   md: '100vh',
          //   xs: 'fit-content',
          // },
          flexDirection: 'column',
          justifyContent: 'space-between',
          flexGrow: 1,
          pt: 1,
          pb: 1,
          mt: `${headerHeight}px`,
        }}
      >
        <Box>
          <Header path={pathname} />
          <AppViews />
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}

export default SideDrawer;
