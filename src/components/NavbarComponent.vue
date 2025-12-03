<template>
    <nav class="navbar navbar-expand-lg sticky-top navbar-dark bg-dark shadow-sm">
        <div class="container">
            <router-link :to="{name: 'Home'}" class="navbar-brand">HOME</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav ms-auto">
                    <router-link class="nav-link" :to="{ name: 'Admin'}" v-if="user.token && user.isAdmin">Admin</router-link>
                    <router-link class="nav-link" :to="{ name: 'Movies'}" v-if="!user.token || (user.token && !user.isAdmin)">Movies</router-link>
                    <router-link class="nav-link" :to="{ name: 'Login'}" v-if="!user.token">Login</router-link>
                    <router-link class="nav-link" :to="{ name: 'Register'}" v-if="!user.token">Register</router-link>
                    <router-link class="nav-link" :to="{ name: 'Logout'}" v-if="user.token">Logout</router-link>
                    
                    <!-- <router-link class="nav-link" :to="{ name: 'Login'}" v-if="!user.token">Login</router-link>
                    <router-link class="nav-link" :to="{ name: 'Register'}" v-if="!user.token">Register</router-link>
                    <router-link class="nav-link" :to="{ name: 'Workouts'}" v-if="user.token">My Workouts</router-link>
                    <router-link class="nav-link" :to="{ name: 'Logout'}" v-if="user.token">Logout</router-link> -->
                    <!-- <router-link class="nav-link" :to="{ name: 'Admin'}" v-if="user.token && user.isAdmin">Admin</router-link>
                    <router-link class="nav-link" :to="{ name: 'Products'}" v-if="!user.token || (user.token && !user.isAdmin)">Products</router-link>
                    <router-link class="nav-link" :to="{ name: 'Cart'}" v-if="user.token && !user.isAdmin">My Cart</router-link>
                    <router-link class="nav-link" :to="{ name: 'Orders'}" v-if="user.token && !user.isAdmin">My Orders</router-link>
                    <li class="nav-item dropdown" v-if="user.token">
                        <a class="nav-link dropdown-toggle" href="#" id="profileDropdown"
                            role="button" data-bs-toggle="dropdown">
                        My Profile
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end bg-warning">
                        <li><router-link class="dropdown-item" :to="{ name: 'UserDetails' }">View Profile</router-link></li>
                        <li><router-link class="dropdown-item" :to="{ name: 'ResetPassword' }">Change Password</router-link></li>
                        </ul>
                    </li>
                    <router-link class="nav-link" :to="{ name: 'Register'}" v-if="!user.token">Register</router-link>
                    <router-link class="nav-link" :to="{ name: 'Login'}" v-if="!user.token">Login</router-link>
                    <router-link class="nav-link" :to="{ name: 'Logout'}" v-else>Logout</router-link> -->
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
  import { useGlobalStore } from '../stores/global.js';
  const { user, getUserDetails } = useGlobalStore();

  getUserDetails(user.token);
</script>