import { useDispatch, useSelector } from "react-redux";

// Thin wrappers around react-redux's hooks. Components should import these
// instead of useDispatch/useSelector directly — this is the one place that
// knows about react-redux, so swapping state libraries later only touches
// this file. See https://redux-toolkit.js.org/usage/nextjs
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
