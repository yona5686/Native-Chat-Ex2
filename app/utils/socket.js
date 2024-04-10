import { io } from "socket.io-client";
import { Platform } from "react-native";
const socket = io(
  Platform.OS === "web"
    ? "http://localhost:3000"
    : "http://192.168.81.122:3000"
);
export default socket;
