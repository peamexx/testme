import { userStore } from "../store/UserStore";

export default function UseAuth() {
  const createUser = userStore((state) => state.create);
  const deleteUser = userStore((state) => state.delete);

  const login = (email: string, callback: () => void) => {
    if (!email) {
      return;
    }
    
    createUser({
      email: email,
    });

    if (callback) {
      callback();
    }
  }

  const logout = (callback: () => void) => {
    deleteUser();

    if (callback) {
      callback();
    }
  }

  return { login, logout }
}