<script setup>
import axios from "axios";
import { onMounted, computed } from "vue";
import { RouterLink } from "vue-router";
import { useUserStore } from "../../stores/user";
import Logo from "./Logo.vue";

//memanggil store
const userStore = useUserStore();
let user = userStore.getUser;
let isLoggedIn = computed(() => userStore.isLoggedIn);
// /let getUser = computed(() => userStore.getUser);

const logout = () => {
  let config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  };
  axios
    .post("http://localhost:8000/api/logout", {}, config)
    .then(() => {
      // let { data } = response.data;
      localStorage.setItem("access_token", null);
      localStorage.setItem("token_type", null);
      userStore.fetchUser();
      router.push("/");
    })
    .catch((response) => {
      let { error } = error.response;
      console.log(error);
    });
};

onMounted: {
  userStore.fetchUser();
}
</script>
<template>
  <nav
    class="
      bg-white
      border-gray-200
      px-2
      sm:px-4
      py-2.5
      rounded
      dark:bg-gray-800
    "
  >
    <div
      class="container flex flex-wrap items-center justify-between mx-auto my-2"
    >
      <Logo />

      <div class="flex items-center md:order-2" v-if="isLoggedIn">
        <button
          @click="logout"
          class="
            bg-gray-800
            rounded-full
            focus:ring-4 focus:ring-gray-300
            dark:focus:ring-gray-600
            mr-3
          "
        >
          Logout
        </button>
        <div class="mr-2 text-sm font-regular">Halo, {{ user.name }}</div>
        <button
          type="button"
          class="
            flex
            mr-3
            text-sm
            bg-gray-800
            rounded-full
            md:mr-0
            focus:ring-4 focus:ring-gray-300
            dark:focus:ring-gray-600
          "
          id="user-menu-button"
          aria-expanded="false"
          data-dropdown-toggle="dropdown"
        >
          <span class="sr-only">Open user menu</span>
          <img
            class="w-8 h-8 rounded-full"
            :src="user.profile_photo_url"
            alt="user photo"
          />
        </button>

        <div
          class="
            z-50
            hidden
            my-4
            text-base
            list-none
            bg-white
            divide-y divide-gray-100
            rounded
            shadow
            dark:bg-gray-700 dark:divide-gray-600
          "
          id="dropdown"
        >
          <div class="px-4 py-3">
            <span class="block text-sm text-gray-900 dark:text-white">{{
              user.name
            }}</span>
            <span
              class="
                block
                text-sm text-gray-500
                truncate
                font-regular
                dark:text-gray-400
              "
              >{{ user.email }}</span
            >
          </div>
          <ul class="py-1" aria-labelledby="dropdown">
            <li>
              <a
                href="#"
                class="
                  block
                  px-4
                  py-2
                  text-sm text-gray-700
                  hover:bg-gray-100
                  dark:hover:bg-gray-600
                  dark:text-gray-200
                  dark:hover:text-white
                "
                >Subscriptions</a
              >
            </li>
            <li>
              <a
                href="#"
                class="
                  block
                  px-4
                  py-2
                  text-sm text-gray-700
                  hover:bg-gray-100
                  dark:hover:bg-gray-600
                  dark:text-gray-200
                  dark:hover:text-white
                "
                >Settings</a
              >
            </li>
            <li>
              <a
                href="#"
                class="
                  block
                  px-4
                  py-2
                  text-sm text-gray-700
                  hover:bg-gray-100
                  dark:hover:bg-gray-600
                  dark:text-gray-200
                  dark:hover:text-white
                "
                >Sign out</a
              >
            </li>
          </ul>
        </div>
        <button
          data-collapse-toggle="mobile-menu-2"
          type="button"
          class="
            inline-flex
            items-center
            p-2
            ml-1
            text-sm text-gray-500
            rounded-lg
            md:hidden
            hover:bg-gray-100
            focus:outline-none focus:ring-2 focus:ring-gray-200
            dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600
          "
          aria-controls="mobile-menu-2"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            />
          </svg>
          <svg
            class="hidden w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>

      <!--- Guest -->

      <div class="md:order-2" v-else>
        <RouterLink
          to="/login"
          class="
            px-8
            py-3
            mt-2
            mr-2
            text-base
            font-medium
            text-black
            bg-gray-200
            border border-transparent
            rounded-full
            hover:bg-gray-300
            md:py-2 md:text-sm md:px-8
            hover:shadow
          "
        >
          Sign In
        </RouterLink>
        <RouterLink
          to="/register"
          class="
            px-8
            py-3
            text-base
            font-medium
            text-white
            border border-transparent
            rounded-full
            bg-navy
            hover:bg-navy
            md:py-2 md:text-sm md:px-8
            hover:shadow
          "
        >
          Sign Up
        </RouterLink>
      </div>
      <div
        class="
          items-center
          justify-between
          hidden
          w-full
          md:flex md:w-auto md:order-1
        "
        id="mobile-menu-2"
      >
        <ul
          class="
            flex flex-col
            mt-4
            md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-regular
          "
        >
          <li>
            <RouterLink
              to="/"
              class="
                block
                py-2
                pl-3
                pr-4
                text-gray-700
                border-b border-gray-100
                hover:bg-gray-50
                md:hover:bg-transparent md:border-0 md:hover:text-
                indigo-600
                md:p-0
                dark:text-gray-400
                md:dark:hover:text-white
                dark:
                hover:bg-gray-700
                dark:hover:text-white
                md:dark:hover:bg-transparent
                dark:border-gray-700
              "
              aria-current="page"
              >Home</RouterLink
            >
          </li>
          <li>
            <RouterLink
              to="/categories"
              class="
                block
                py-2
                pl-3
                pr-4
                text-gray-700
                border-b border-gray-100
                hover:bg-gray-50
                md:hover:bg-transparent
                md:border-0
                md:hover:text-indigo-600
                md:p-0
                dark:text-gray-400
                md:dark:hover:text-white
                dark:hover:bg-gray-700 dark:hover:text-white
                md:dark:hover:bg-transparent
                dark:border-gray-700
              "
              >Categories</RouterLink
            >
          </li>
          <li>
            <RouterLink
              to="/"
              class="
                block
                py-2
                pl-3
                pr-4
                text-gray-700
                border-b border-gray-100
                hover:bg-gray-50
                md:hover:bg-transparent
                md:border-0
                md:hover:text-indigo-600
                md:p-0
                dark:text-gray-400
                md:dark:hover:text-white
                dark:hover:bg-gray-700 dark:hover:text-white
                md:dark:hover:bg-transparent
                dark:border-gray-700
              "
              >Pricing</RouterLink
            >
          </li>
          <li>
            <RouterLink
              to="/"
              class="
                block
                py-2
                pl-3
                pr-4
                text-gray-700
                border-b border-gray-100
                hover:bg-gray-50
                md:hover:bg-transparent
                md:border-0
                md:hover:text-indigo-600
                md:p-0
                dark:text-gray-400
                md:dark:hover:text-white
                dark:hover:bg-gray-700 dark:hover:text-white
                md:dark:hover:bg-transparent
                dark:border-gray-700
              "
              >Study Case</RouterLink
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
