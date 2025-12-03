<template>
    <div class="card shadow-sm">
        <div class="card-body p-4">
            <h4 class="card-title mb-3 text-center">Create an account</h4>
            <p class="text-muted text-center small mb-4">Please fill in the form to register</p>

            <form id="registerForm" class="needs-validation" v-on:submit="handleSubmit">
                <div class="row g-3">
                    <div class="col-12">
                        <label for="email" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="email" name="email" required placeholder="example@email.com" v-model="email">
                        <div class="invalid-feedback">Please provide a valid email address.</div>
                    </div>

                    <div class="col-12">
                        <label for="password" class="form-label">Password</label>
                        <div class="input-group">
                            <input type="password" class="form-control" id="password" name="password" minlength="8" required placeholder="At least 8 characters" v-model="password">
                        </div>
                        <div class="form-text">Minimum 8 characters.</div>
                        <div class="invalid-feedback">Please choose a password (minimum 8 characters).</div>
                    </div>

                    <div class="col-12">
                        <label for="cpassword" class="form-label">Confirm Password</label>
                        <div class="input-group">
                            <input type="password" class="form-control" id="cpassword" name="cpassword" minlength="8" required placeholder="At least 8 characters" v-model="cpassword">
                        </div>
                        <div class="form-text">Minimum 8 characters.</div>
                        <div class="invalid-feedback">Please choose a password (minimum 8 characters).</div>
                    </div>

                    <div class="col-12 d-grid">
						<button type="submit" class="btn btn-primary btn-block" v-if="isEnabled" :disabled="loading">
                            <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            {{ loading ? 'Saving...' : 'Register' }}
                        </button>
						<button type="submit" class="btn btn-danger btn-block" v-else disabled>Register</button>
                    </div>

                </div>

            </form>

            <div class="container text-center mt-2">
                <span>Already have an account? Click <router-link to="/login" class="text-primary text-decoration-none fw-semibold">here</router-link> to login.</span>
            </div>
        </div>
    </div>
</template>

<style>
    body { background: #f8f9fa; }
    .card { max-width: 540px; margin: 48px auto; }
</style>

<script setup>

    import { watch, ref, onBeforeMount } from "vue";
	import { useRouter } from 'vue-router';
	import { useGlobalStore } from '../stores/global.js'
    import { Notyf } from 'notyf';
    import api from "../api.js";

    const email = ref("");
    const password = ref("");
    const cpassword = ref("");
    const isEnabled = ref(false);
    const loading = ref(false);

	const router = useRouter();
	const { user } = useGlobalStore();
    const notyf = new Notyf();

    watch([email, password, cpassword], (currentValue, oldValue) => {
        console.log(currentValue[1]);
        console.log(currentValue[2])
        if (currentValue.every(input => input != "") && currentValue[1] === currentValue[2]) {
            isEnabled.value = true;
        } else {
            isEnabled.value = false;
        }
    })

    async function handleSubmit(e) {
        
        e.preventDefault();

        loading.value = true
        
        try {
            let res = await api.post("/users/register", {
                email: email.value,
                password: password.value                
            });

            if (res.status === 201) {
                notyf.success("Registration Successful");

                email.value = "";
                password.value = "";

                router.push({path: "/login"});
            }
        } catch (error) {
            console.log(error)
            if ([400,401,404].includes(error.response.status)) {
                notyf.error(error.response.data.error);
            } else {
                notyf.error("Registration failed. Please contact administrator");
            }            
        } finally {
            loading.value = false;
        }
    }

    onBeforeMount(() => {
        if (user.email) {
            router.push({path: "/"});
        }
    })

</script>