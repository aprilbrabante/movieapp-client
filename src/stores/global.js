import { defineStore } from 'pinia';
import { reactive } from 'vue';
import api from '../api';

export const useGlobalStore = defineStore('global', () => {

	let user = reactive({
		token: localStorage.getItem('token'),
		email: null,
		isAdmin: null,	
		isLoading: false
	})

	async function getUserDetails(token) {
		if(!token){
			user.token = null;
			user.email = null;
			user.isAdmin = null;
			return;
		}

		user.isLoading = true;

		let { data } = await api.get('/users/details')
		// let { data } = await axios.get(
		// 'https://4ozujtx5x7.execute-api.us-west-2.amazonaws.com/production/users/details',
		// {
		// 	headers: { Authorization: `Bearer ${token}` }
		// }
		// );

		console.log(data);

		user.email = data.user.email;
		user.isAdmin = data.user.isAdmin;

		user.token = token;
		user.isLoading = false;

		console.log('inside global.js >> getUserDetails >>>>>',user);
	}

	return {
		user,
		getUserDetails
	}
})