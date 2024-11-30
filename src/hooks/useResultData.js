import { useContext } from "react";
import { ResultDataContext } from "../context/ResultDataContext";

export function useResultData(){
    return useContext(ResultDataContext);
}