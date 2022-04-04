/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/display-name */
/* eslint-disable consistent-return */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */

/* React */
import { useEffect, useState } from 'react';
/* Redux & Toolkit */
import { useSelector, useDispatch } from 'react-redux';
import {
  manageUserAction,
  manageUserSelector,
} from 'features/app/manage-user/slice';
/* Material UI */
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import {
  Box,
  // Paper,
  // Popper,
  // Button,
  // Divider,
  // IconButton,
  Typography,
  LinearProgress,
} from '@mui/material';
/* Icons */
// import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
/* Library */
import _ from 'lodash';
/* Import Comonents */
import EditUser from 'features/app/manage-user/components/manage-user-table/edit-user';

export default function ManageUserTable() {
  const { userWorkStatus, loading, editState, deleteState } = useSelector(
    manageUserSelector.all,
  );
  const dispatch = useDispatch();
  const { DELETE_USER, GET_USER_WORK_STATUS } = manageUserAction;
  const [modifyUser, setModifyUser] = useState('');
  // const [anchorEl, setAnchorEl] = useState(null);
  // const open = Boolean(anchorEl);

  const sortedList = _.map(userWorkStatus, (data, index) => {
    const { id, name, userId, status } = data || {};
    const { done, notDone, total, progress } = status || {};

    return {
      index: index + 1,
      id,
      name,
      userId,
      done,
      notDone,
      total,
      progress: `${progress.toFixed(1)}`,
    };
  });

  const rows = sortedList.filter(Boolean);
  const modifyUserInfo = _.find(rows, { id: modifyUser[0] });

  function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress color="info" variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography
            variant="body2"
            sx={{ fontSize: '12px', color: 'rgba(0,0,0,0.87)' }}
          >{`${props.value} %`}</Typography>
        </Box>
      </Box>
    );
  }

  // const handleClick = e => {
  //   setAnchorEl(e.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  // const handleDeleteUser = () => {
  //   setAnchorEl(null);
  //   dispatch(DELETE_USER({ id: modifyUser }));
  // };

  const columns = [
    { field: 'id', hide: true },
    {
      field: 'name',
      headerName: '이름',
    },
    {
      field: 'done',
      headerName: '완료 작업',
      width: 90,
    },
    {
      field: 'notDone',
      headerName: '남은 작업',
      width: 90,
    },
    {
      field: 'total',
      headerName: '총 작업',
      width: 90,
    },
    {
      field: 'progress',
      headerName: '진행률',
      width: 100,
      renderCell: params => (
        <Box sx={{ width: '100%' }}>
          <LinearProgressWithLabel
            variant="determinate"
            value={Number(params.value)}
          />
        </Box>
      ),
    },
    {
      field: 'manage',
      headerName: '수정',
      width: 70,
      renderCell: () => (
        <>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <EditUser userInfo={modifyUserInfo} />
            {/* 사용자 삭제 기능이 필요한지 고민해볼 것 */}
            {/* <IconButton size="small" onClick={handleClick}>
              <DeleteTwoToneIcon fontSize="small" />
            </IconButton> */}
          </Box>
          {/* <Popper open={open} anchorEl={anchorEl} placement="top-end">
            <Paper
              variant="outlined"
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <Box>
                <Typography
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    padding: '25px 25px 25px 10px',
                    fontSize: '14px',
                  }}
                >
                  정말 삭제하시겠습니까?
                </Typography>
                <Divider />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    height: '100%',
                  }}
                >
                  <Button onClick={handleDeleteUser}>확인</Button>
                  <Button onClick={handleClose}>취소</Button>
                </Box>
              </Box>
            </Paper>
          </Popper> */}
        </>
      ),
    },
  ];

  useEffect(() => {
    dispatch(GET_USER_WORK_STATUS());
  }, [editState, deleteState]);

  return (
    <Box sx={{ height: '500px', width: { md: '100%', xs: '100%' } }}>
      <Box sx={{ display: 'flex', height: '100%' }}>
        <Box
          sx={{
            flexGrow: 1,
            animation: 'fadein 1s',
            '@keyframes fadein': {
              from: {
                opacity: 0,
                transform: 'translateY(20px)',
              },
              to: {
                opacity: 1,
              },
            },
          }}
        >
          <DataGrid
            rows={rows}
            getRowId={row => row.id}
            columns={columns}
            onSelectionModelChange={id => {
              setModifyUser(id);
            }}
            loading={loading}
            components={{
              Toolbar: GridToolbar,
            }}
            sx={{
              '&.MuiDataGrid-root': {
                pl: 1,
                fontSize: 12,
                border: 0,
              },
              '& .MuiDataGrid-columnHeaders': {
                borderRadius: 3,
                border: '1px solid rgba(241,237,233,1)',
              },
              '& .MuiDataGrid-columnHeaderTitle': {
                color: 'rgba(0,0,0, 0.7)',
                fontSize: 13,
                fontWeight: 700,
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
