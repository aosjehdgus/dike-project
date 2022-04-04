/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { currentWorkAction } from 'features/app/current-work/slice';

import CurrentWorkForm from 'features/app/current-work/components/current-work-content/CurrentWorkForm';

export default function CurrentWorkContent() {
  const dispatch = useDispatch();
  const { GET_TODO_TASK } = currentWorkAction;

  useEffect(() => {
    dispatch(GET_TODO_TASK());
  }, []);

  return <CurrentWorkForm />;
}
