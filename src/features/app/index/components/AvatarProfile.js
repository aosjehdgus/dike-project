/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */

/* React */
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
/* Redux & Toolkit */
import { useSelector, useDispatch } from 'react-redux';
import { loginAction, loginSelector } from 'features/auth/login/slice';
import { manageUserSelector } from 'features/app/manage-user/slice';
/* Material UI */
import {
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  IconButton,
} from '@mui/material';
/* Icons */
import Logout from '@mui/icons-material/Logout';
/* Import Components */
import EditPersonalInformation from 'features/app/manage-user/components/manage-user-table/edit-personal-information';

const stringAvatar = name => {
  return { children: `${name.split(' ')[0][1]}${name.split(' ')[0][2]}` };
};

export default function AvatarProfile() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { GET_MY_INFO, LOGOUT } = loginAction;
  const { me } = useSelector(loginSelector.all);
  const { editState } = useSelector(manageUserSelector.all);
  const { name, level } = me || '';

  const logOut = e => {
    e.preventDefault();

    dispatch(LOGOUT({ history }));
  };

  const AccountMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const menuOpen = Boolean(anchorEl);
    const handleClick = event => {
      setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
      setAnchorEl(null);
    };
    return (
      <>
        <IconButton onClick={handleClick} size="small">
          <Avatar
            {...stringAvatar(`${name}`)}
            sx={{
              width: 40,
              height: 40,
              fontSize: 15,
              backgroundColor: 'rgba(98, 92, 96, 1)',
            }}
          />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={handleMenuClose}
          PaperProps={{
            elevation: 0,
            sx: {
              width: 150,
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 40,
                height: 40,
                fontSize: 13,
                backgroundColor: 'rgba(104, 104, 172, 1)',
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem>
            <Avatar {...stringAvatar(`${name}`)} />
            {level === ('manager' || 'admin') ? '관리자' : '작업자'}
          </MenuItem>
          <Divider />
          <EditPersonalInformation />
          <MenuItem onClick={logOut}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            로그아웃
          </MenuItem>
        </Menu>
      </>
    );
  };

  useEffect(() => {
    dispatch(GET_MY_INFO());
  }, [editState]);

  return (
    <>
      <AccountMenu />
    </>
  );
}
