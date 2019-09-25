import {useState, useEffect} from 'react';
import API from '../utils/API';

const getUserData = userData => userData.data.results;
const getUser = () => API.get('/').then(getUserData);

const userStore = value => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [state, setState] = useState({
    synced: false,
    user: value,
  });
  const {synced, user} = state;

  async function getUserStore() {
    setState({synced: true, user: value});
  }

  async function updateUserStore(newValue) {
    setState({synced: false, user: newValue});
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    getUserStore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [user, updateUserStore, synced];
};

export default {getUser, userStore};
