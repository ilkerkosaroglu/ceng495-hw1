import { StateCreator, create } from 'zustand';
import { PersistOptions, persist } from 'zustand/middleware';

type Categories = string[];
type ExtraProps = string[];
type StoreType = {categories:Categories, setCategories:(categories:Categories)=>void, extraProps:ExtraProps, setExtraProps:(extraProps:ExtraProps)=>void};

type PersistType = (
      config: StateCreator<StoreType>,                                            
      options: PersistOptions<StoreType>                                          
    ) => StateCreator<StoreType> 
export const useExtraProps = create<StoreType>((persist as PersistType)((set) => ({
    categories: ['Clothing'],
    setCategories: (categories) => {
        set({ categories });
    },
    extraProps: ['colour', 'size', 'spec'],
    setExtraProps: (extraProps) => {
        set({ extraProps });
    }
}),{name: 'extraProps'}));

