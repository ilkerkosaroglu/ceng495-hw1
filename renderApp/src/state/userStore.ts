import { create } from 'zustand'
import { User } from '.';

const getUserInfo = () => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
        return JSON.parse(userInfo);
    }
    return null;
};

const setUserInfo = (userInfo: User|null) => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
};

export const useUserStore = create<{user:User|null, setUser:(user:User|null)=>void}>((set) => ({
    user: getUserInfo(),
    setUser: (user) => {
        set({ user });
        setUserInfo(user);
    },
}));

