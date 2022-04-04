import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';
import { useStyles } from 'features/auth/login/components/styles/dike-login-style';
import { REGISTER_PATH } from 'configs/AppConfig';
import { loginAction } from 'features/auth/login/slice';

const { INITIALIZE_MESSAGE_STATE } = loginAction;

export default function RegisterButton() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const registerBtn = () => {
    dispatch(INITIALIZE_MESSAGE_STATE());
    history.push(REGISTER_PATH);
  };

  return (
    <Button className={classes.registerBtn} onClick={registerBtn}>
      회원 가입
    </Button>
  );
}
