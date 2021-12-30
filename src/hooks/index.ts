import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'redux/store';

import { usePopUp } from './usePopUp';
import { useDisableScroll } from './useDisableScroll'
import { useInputType } from './useInputType'
import { useQueryParams } from './useQueryParams'

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { usePopUp, useDisableScroll, useInputType, useQueryParams }