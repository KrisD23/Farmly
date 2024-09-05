import { LocationStore } from "@/types/type";
import { create } from "zustand";

export const useSearchStore = create((set: any) => ({
  search: "",
  setSearch: (search: string) => set({ search }),
}));

export const useLocationStore = create<LocationStore>((set) => ({
  userLatitude: null,
  userLongitude: null,
  userAddress: null,
  // destinationLatitude: null,
  // destinationLongitude: null,
  // destinationAddress: null,
  setUserLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    set(() => ({
      userLatitude: latitude,
      userLongitude: longitude,
      userAddress: address,
    }));
  },
}));
