import io from "socket.io-client";
import { API_URL } from "./constant";

export const createSocketConnection = () => {
  if (location.hostname === "localhost") {
    return io(API_URL, {
      withCredentials: true,
    });
  }

  return io("/", {
    path: "/api/socket.io",
    withCredentials: true,
  });
};