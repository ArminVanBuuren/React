import { createContext, useContext } from 'react';
import CommonStore from './commonStore';

export class RootStores {
  commonStore: CommonStore;

  constructor() {
    this.commonStore = new CommonStore();
  }
}

export const StoresContext = createContext(new RootStores());

export const useStores = (): RootStores => useContext(StoresContext);
