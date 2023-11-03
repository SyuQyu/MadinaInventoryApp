import { create } from 'zustand';

type FilterState = {
    brand: boolean;
    type: boolean;
    brandSelected: number[];
    typeSelected: number[];
    selectedBrand: (id: number) => void;
    selectedType: (id: number) => void;
    setBrand: (stateSended: boolean) => void;
    setType: (stateSended: boolean) => void;
    clearFilter: () => void;
    clearData: () => void;
    removeSelectedBrand: (id: number) => void;
    removeSelectedType: (id: number) => void;
};

const useFilter = create<FilterState>((set, get) => ({
    brand: false,
    type: false,
    brandSelected: [],
    typeSelected: [],
    setBrand: (stateSended) => {
        console.log(stateSended);
        set({ brand: stateSended });
    },
    setType: (stateSended) => {
        console.log(stateSended);
        set({ type: stateSended });
    },
    clearFilter: () => {
        set({ brand: false, type: false });
    },
    clearData: () => {
        set({ brandSelected: [], typeSelected: [] });
    },
    selectedBrand: (id) => {
        console.log(id, get().brandSelected)
        set((state) => ({ brandSelected: [...state.brandSelected, id] }));
    },
    removeSelectedBrand: (id) => {
        console.log(id, get().brandSelected)
        set((state) => ({ brandSelected: state.brandSelected.filter((dataId) => dataId !== id) }));
    },
    selectedType: (id) => {
        console.log(id, get().typeSelected)
        set((state) => ({ typeSelected: [...state.typeSelected, id] }));
    },
    removeSelectedType: (id) => {
        console.log(id, get().typeSelected)
        set((state) => ({ typeSelected: state.typeSelected.filter((dataId) => dataId !== id) }));
    },
}));

export default useFilter;
