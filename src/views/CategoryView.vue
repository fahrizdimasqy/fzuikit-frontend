<script setup>
import axios from "axios";
import { useRoute } from "vue-router";
import ItemsCard from "../components/ItemsCard.vue";
import { ref, onMounted } from "vue";
import router from "../router";
const categoryItems = ref([]);
const route = useRoute();
const category = ref({});

const goBack = () => {
  router.go(-1);
};
const getDataProducts = () => {
  axios
    .get(
      "http://localhost:8000/api/categories?id=" +
        route.params.id +
        "&show_product=1"
    )
    .then((response) => {
      let { products } = response.data.data;
      category.value = response.data.data;
      categoryItems.value = products;
    })
    .catch((error) => {
      let { response } = error;
      //console.log(response);
    });
};

onMounted: {
  getDataProducts();
}
</script>

<template>
  <div class="container px-4 mx-auto my-16 md:px-12">
    <button
      @click="goBack"
      type="button"
      class="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-arrow-left-short"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
        />
      </svg>
      <span class="sr-only">Icon description</span>
    </button>
    <h2 class="mb-4 text-xl font-medium md:mb-0 md:text-lg">
      {{ category.name }}
    </h2>
    <form class="flex items-center mt-3 mb-3">
      <label for="simple-search" class="sr-only">Search</label>
      <div class="relative w-full">
        <div
          class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          type="text"
          id="simple-search"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search"
          required
        />
      </div>
      <button
        type="submit"
        class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
        <span class="sr-only">Search</span>
      </button>
    </form>
    <h2 class="mb-4 text-xl font-medium md:mb-0 md:text-lg">All Products</h2>
    <div class="flex flex-wrap -mx-1 lg:-mx-4">
      <ItemsCard
        v-for="product in categoryItems"
        :id="product.id"
        :title="product.name"
        :imageUrl="product.thumbnails"
        :subtitle="product.subtitle"
        :key="product.id"
      />
    </div>
  </div>
</template>
