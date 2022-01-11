import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'redux/store';

import { useModal } from './useModal';
import { useDisableScroll } from './useDisableScroll'
import { useInputType } from './useInputType'
import { useQueryParams } from './useQueryParams'
import { useDebounce } from './useDebounce';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { useModal, useDisableScroll, useInputType, useQueryParams, useDebounce }