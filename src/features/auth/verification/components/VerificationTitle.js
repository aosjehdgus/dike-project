import { useStyles } from 'features/auth/verification/components/styles/dike-verification-style';

export default function VerificationTitle() {
  const classes = useStyles();

  return (
    <>
      <h3 className={classes.verificationTitle}> Dike 서비스 인증 절차</h3>
    </>
  );
}
