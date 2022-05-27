import { useContext } from "react";
import { ChatContext } from "../contexts/ChatContenxt";

export function useChat() {
    const value = useContext(ChatContext);

    return value;
}