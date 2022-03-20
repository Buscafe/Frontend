import { useContext } from "react";
import { ChurchesContext } from "../contexts/ChurchesContext";

export function useChurches() {
    const value = useContext(ChurchesContext);

    return value;
}