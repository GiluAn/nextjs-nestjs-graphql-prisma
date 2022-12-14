import { useReducer, useCallback } from 'react';

type DefaultValues = {
  [key: string]: string;
};

type UseFormAction = {
  name: string;
  value: string;
};

type GenericState<T> = {
  data: T;
};
function reducer<T>(state: GenericState<T>, action: UseFormAction | null) {
  if (!action) {
    const initialState: any = {};
    Object.keys(state).forEach((key) => {
      initialState[key] = '';
    });
    return initialState;
  }
  return {
    ...state,
    [action.name]: action.value,
  };
}

export default function useFrom<T>(defaultValues: T) {
  const [state, dispatch] = useReducer(reducer, defaultValues);
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      name: e.target.name,
      value: e.target.value,
    });
  }, []);
  const onReset = useCallback(() => {
    dispatch(null);
  }, []);
  return [state, onChange, onReset, dispatch] as [
    T,
    typeof onChange,
    typeof onReset,
    typeof dispatch
  ];
}
