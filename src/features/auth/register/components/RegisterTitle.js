import { useStyles } from 'features/auth/register/components/styles/dike-register-content-style';

export default function RegisterTitle() {
  const classes = useStyles();

  return (
    <>
      <h3 className={classes.registerTitle}>Dike 회원 가입</h3>
    </>
  );
}
