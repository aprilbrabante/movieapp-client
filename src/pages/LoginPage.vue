<template>
    <div class="container-fluid">
        <h1 class="my-5 pt-3 text-orange text-center">Login Page</h1> 
        <div class="row d-flex justify-content-center">
            <div class="col-md-5 border border rounded-3 mx-auto p-5 bg-white">
                <form v-on:submit="handleSubmit">
                    <div class="mb-3">
                        <label for="emailInput" class="form-label ">Email Address</label>
                        <input type="email" class="form-control" id="emailInput" placeholder="Enter your email" v-model="email" />
                    </div>
                    <div class="mb-3">
                        <label for="passwordInput" class="form-label ">Password</label>
                        <input type="password" class="form-control" id="passwordInput" placeholder="Enter your password" v-model="password" />
                    </div>
                    <div class="d-grid mt-5">
                        <button type="submit" class="btn btn-primary btn-block"  v-if="isEnabled">Login</button>
                        <button type="submit" class="btn btn-danger btn-block" disabled v-else>Login</button>
                    </div>
                </form>
                <div class="container text-center mt-3 ">
                            <span>Don't have an account yet? Click <router-link to="/register" class="text-primary text-decoration-none fw-semibold">here</router-link> to register.</span>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>

    import { watch, ref, onBeforeMount } from 'vue';
    import { useGlobalStore } from '../stores/global.js';
    import { Notyf } from 'notyf';
    import { useRouter } from 'vue-router'
    import api from '../api.js';

    const { getUserDetails } = useGlobalStore()
    const { user } = useGlobalStore();

    const router = useRouter();

    const email = ref("");
    const password = ref("");
    const isEnabled = ref(false);

    const notyf = new Notyf();

    // onBeforeMount(() => {
    //     if(user.token) {
    //         router.push({path: '/products'})
    //     }
    // });

    watch([email, password], (currentValue, oldValue) => {
        if (currentValue.every(input => input !== "")) {
            isEnabled.value = true;
        } else {
            isEnabled.value = false;
        }
    });

    async function handleSubmit(e) {

        e.preventDefault();
        
        try {

            let res = await api.post("/users/login", {
                email: email.value,
                password: password.value                
            });

            if (res.status === 200) {
                notyf.success("Login succesful");

                localStorage.setItem("token", res.data.access);
                await getUserDetails(res.data.access);

                email.value = "";
                password.value = "";

                const user1 = await useGlobalStore().user;
                localStorage.setItem("isAdmin", user1.isAdmin);
                user1.isAdmin ? router.push({name: 'Admin'}) : router.push({name: 'Movies'})
                
            }
            
        } catch (error) {

            console.log(error.response);

            if ([400,401,404].includes(error.response.status)) {
                notyf.error(error.response.data.error);
            } else {
                notyf.error("Login failed. Please contact administrator");
            }
            
        }
    }

</script>