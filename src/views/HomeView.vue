<script setup>
import CategorieCard from "../components/CategorieCard.vue";
import ItemsCard from "../components/ItemsCard.vue";
import axios from "axios";
import { ref, onMounted } from "vue";

const categoriesItem = ref([]);
const products = ref([]);

const getDataCategories = () => {
  axios
    .get("http://localhost:8000/api/categories")
    .then((response) => {
      let { data } = response.data.data;
      categoriesItem.value = data;
    })
    .catch((error) => {
      let { response } = error;
      console.log(response);
    });
};

const getDataProducts = () => {
  axios
    .get("http://localhost:8000/api/products")
    .then((response) => {
      let { data } = response.data.data;
      products.value = data;
    })
    .catch((error) => {
      let { response } = error;
      console.log(response);
    });
};

onMounted: {
  getDataCategories();
  getDataProducts();
}
</script>

<template>
  <main>
    <!-- Hero -->
    <div class="relative overflow-hidden bg-white">
      <div class="mx-auto max-w-7xl">
        <div
          class="z-10 px-5 pb-8 bg-white xl:pl-20 lg:pl-16 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32"
        >
          <main
            class="mx-auto mt-10 max-w-7xl sm:mt-12 md:mt-16 lg:mt-20 xl:mt-36"
          >
            <div class="sm:text-center lg:text-left">
              <h1
                class="text-3xl font-bold leading-normal tracking-tight text-gray-900 sm:text-4xl md:text-5xl"
              >
                <span class="block lg:mb-2"
                  >Designs made by professionals &</span
                >
                <span class="block">Faster Than Before.</span>
              </h1>
              <p
                class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
              >
                <span>fzuikit is there to make it easier for developers</span>
                <span class="block lg:mb-1"
                  >and ui/ux of ready-to-use design projects.</span
                >
              </p>
              <div
                class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start"
              >
                <div class="rounded-full">
                  <a
                    href="#"
                    class="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-full hover:bg-indigo-700 md:py-2 md:text-lg md:px-10 hover:shadow"
                  >
                    Browse Now
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          class="w-full lg:w-3/4 lg:mt-20 lg:ml-5"
          src="../assets/img/undraw_design_tools_-42-tf.svg"
          alt=""
        />
      </div>
    </div>
    <!-- Categories -->
    <div class="container px-4 mx-auto my-16 md:px-12">
      <div class="flex justify-between">
        <h2 class="mb-4 text-xl font-medium md:mb-0 md:text-lg">
          Top Categories
        </h2>
        <RouterLink
          to="/categories"
          type="button"
          class="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span class="sr-only">Icon description</span>
        </RouterLink>
      </div>
      <div class="flex flex-wrap -mx-1 lg:-mx-4">
        <CategorieCard
          v-for="category in categoriesItem"
          :id="category.id"
          :title="category.name"
          :imageUrl="category.thumbnails"
          :items="category.products_count"
          :key="category.id"
        />
      </div>
    </div>
    <!-- Items -->
    <div class="container px-4 mx-auto my-16 md:px-12">
      <div class="flex justify-between">
        <h2 class="mb-4 text-xl font-medium md:mb-0 md:text-lg">New Items</h2>
        <RouterLink
          to="/products"
          type="button"
          class="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span class="sr-only">Icon description</span>
        </RouterLink>
      </div>

      <div class="flex flex-wrap -mx-1 lg:-mx-4">
        <ItemsCard
          v-for="product in products"
          :id="product.id"
          :title="product.name"
          :imageUrl="product.thumbnails"
          :subtitle="product.subtitle"
          :key="product.id"
        />
      </div>
    </div>
  </main>
</template>
