import { makeAutoObservable, runInAction } from 'mobx';
import myAxios from '../myAxios';

class AuthStore {
  data = null;
  status = 'loading';

  constructor() {
    makeAutoObservable(this);
  }

  async fetchLogin(params) {
    try {
      this.setStatusLoading();
      const { data } = await myAxios.post('/auth/login', params);
      runInAction(() => {
        this.setStatusLoaded();
        this.data = data;
      });
      return data;
    } catch (error) {
      runInAction(() => {
        this.setStatusError();
      });
      console.error(error);
      throw error;
    }
  }

  async fetchRegistration(params) {
    try {
      this.setStatusLoading();
      const { data } = await myAxios.post('/auth/registration', params);
      runInAction(() => {
        this.setStatusLoaded();
        this.data = data;
      });
      return data;
    } catch (error) {
      runInAction(() => {
        this.setStatusError();
      });
      console.error(error);
      throw error;
    }
  }

  async fetchLoginMe() {
    try {
      this.setStatusLoading();
      const { data } = await myAxios.get('/auth/me');
      runInAction(() => {
        this.setStatusLoaded();
        this.data = data;
      });
      return data;
    } catch (error) {
      runInAction(() => {
        this.setStatusError();
      });
      console.error(error);
      throw error;
    }
  }

  logout() {
    this.data = null;
  }

  setStatusLoading() {
    this.status = 'loading';
    this.data = null;
  }

  setStatusLoaded() {
    this.status = 'loaded';
  }

  setStatusError() {
    this.status = 'error';
    this.data = null;
  }

  get isAuth() {
    return Boolean(this.data);
  }
}

const authStore = new AuthStore();
export default authStore;
