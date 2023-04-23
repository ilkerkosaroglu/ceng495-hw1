import { StateCreator, create } from 'zustand';
import { PersistOptions, persist } from 'zustand/middleware';
import { User } from '.';

const getUserInfo = () => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
        return JSON.parse(userInfo) as User;
    }
    return null;
};

const setUserInfo = (userInfo: User|null) => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
};

type StoreType = {user:User|null, setUser:(user:User|null)=>void};
type PersistType = (
      config: StateCreator<StoreType>,                                            
      options: PersistOptions<StoreType>                                          
    ) => StateCreator<StoreType> 
export const useUserStore = create<StoreType>((persist as PersistType)((set) => ({
    user: getUserInfo(),
    setUser: (user) => {
        set({ user });
        setUserInfo(user);
    }
}),{name: 'usrInfo'}));

