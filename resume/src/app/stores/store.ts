import { createContext, useContext } from 'react';
import CommonStore from './commonStore';
import CvStore from '@stores/cv/cvStore';
import initApiClient from '@api/initApiClient';

const instance = initApiClient();

export class RootStores {
  commonStore: CommonStore;
  cvStore: CvStore;

  constructor() {
    this.commonStore = new CommonStore();
    this.cvStore = new CvStore(this.commonStore, instance);
  }
}

export const StoresContext = createContext(new RootStores());

export const useStores = (): RootStores => useContext(StoresContext);
