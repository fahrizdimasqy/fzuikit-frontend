import { defineStore } from "pinia";
import axios from "axios";
export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    user: false,
  }),
  getters: {
    isLogin: (state) => state.user !== false,
    getUser: (state) => state.user,
  },
  actions: {
    fetchUser() {
      axios
        .get("http://localhost:8000/api/user", {
          headers: {
            Authorization:
              localStorage.getItem("token_type") +
              " " +
              localStorage.getItem("access_token"),
          },
        })
        .then((response) => {
          let { data } = response.data;
          this.user = data;
          console.log(data);
        })
        .catch(() => {
          this.user = false;
        });
    },
  },
});
