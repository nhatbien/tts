
import Vuex from 'vuex';
import { auth } from './auth.module';
import { toggleSidebar } from './sidebar.module';
export const store =  new Vuex.Store({
  modules: {
    auth,
    toggleSidebar
    
  }
});