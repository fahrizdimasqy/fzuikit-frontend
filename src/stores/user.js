// Composition API
import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", () => {
  //state
  const user = ref(false);

  //geters
  const isLoggedIn = computed(() => user.value != false);
  const getUser = computed(() => user);

  //action
  function fetchUser() {
    axios
      .get("http://localhost:8000/api/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        let { data } = response.data;
        this.user = data;
      })
      .catch((response) => {
        let { error } = response;
        console.log(error);
        this.user = false;
      });
  }

  //module
  return { user, isLoggedIn, getUser, fetchUser };
});

// options
// import { defineStore } from "pinia";
// import axios from "axios";
// export const useUserStore = defineStore({
//   id: "user",
//   state: () => ({
//     user: false,
//   }),
//   getters: {
//     isLoggedIn: (state) => state.user !== false,
//     getUser: (state) => state.user,
//   },
//   actions: {
//     fetchUser() {
//       axios
//         .get("http://localhost:8000/api/user", {
//           headers: {
//             Authorization:
//               localStorage.getItem("token_type") +
//               " " +
//               localStorage.getItem("access_token"),
//           },
//         })
//         .then((response) => {
//           let { data } = response;
//           this.user = data;
//           console.log(data);
//         })
//         .catch(() => {
//           this.user = false;
//         });
//     },
//   },
// });
