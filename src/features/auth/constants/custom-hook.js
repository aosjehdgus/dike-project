/* eslint-disable import/prefer-default-export */
import { useState, useCallback, useRef } from 'react';

/* Custom Hook */
export const useCounter = (initialValue, ms) => {
  const [count, setCount] = useState(initialValue);

  const intervalRef = useRef(null);

  const stop = useCallback(() => {
    if (intervalRef.current === null) {
      return;
    }
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  });

  const start = useCallback(() => {
    if (intervalRef.current !== null) {
      return;
    }

    intervalRef.current = setInterval(() => {
      setCount(c => {
        // console.log('c:', c);

        if (c - 1 === 0) {
          stop();
        }
        return c - 1;
      });
    }, [ms]);
  }, []);

  const reset = useCallback(() => {
    setCount(0);
  }, []);

  const reSend = useCallback(() => {
    setCount(initialValue);
    if (intervalRef.current !== null) {
      return;
    }
    intervalRef.current = setInterval(() => {
      setCount(c => {
        if (c - 1 === 0) {
          stop();
        }
        return c - 1;
      });
    }, [ms]);
  }, []);

  return { count, start, stop, reset, reSend };
};

// export const AuthTimer = () => {
//   const [time, setTime] = useState(179);
//   const { verification } = useSelector(() => state.auth);
//   const { expireAt } = verification.OTP;
//   useEffect(() => {
//     if (time > 0) {
//       const Counter = setInterval(() => {
//         const gap = Math.floor(
//           (new Date(expireAt).getTime() - new Date().getTime()) / 1000,
//         );
//         setTime(gap);
//       }, 1000);
//       return () => clearInterval(Counter);
//     }
//   }, [expireAt, time]);
//   const timeFormat = () => {
//     const m = Math.floor(time / 60).toString();
//     let s = (time % 60).toString();
//     if (s.length === 1) s = `0${s}`;
//     return `${m}:${s}`;
//   };
//   return (
//     <>
//       <p
//         style={{
//           textAlign: 'right',
//           fontSize: '14px',
//           color: '#ff5252',
//           position: 'absolute',
//           right: '92px',
//           bottom: '14px',
//           letterSpacing: '-0.4px',
//         }}
//       >
//         {timeFormat(time)}
//       </p>
//     </>
//   );
// };
