// SomeContext.js
// ---------------
import {createContext} from "react"
import socketioclient from "socket.io-client";
import { nodeBaseUrl } from "../config";

export const socket = socketioclient;
export const SomeContext = createContext();