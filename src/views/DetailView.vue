<script setup>
import { onMounted, ref, computed } from "vue";
import axios from "axios";
import { RouterLink, useRoute } from "vue-router";
import router from "../router";

const defaultImage = ref();
const imageGalleries = ref({});
const product = ref(false);
const route = useRoute();

const goBack = () => {
  router.go(-1);
};

const loaded = () => {
  axios
    .get("http://localhost:8000/api/products?id=" + route.params.id)
    .then((response) => {
      let { data } = response.data;
      // defaultImage.value = data.thumbnails;
      //imageGalleries.value = data.galleries;
      console.log(data);
      product.value = data;
    })
    .catch((error) => {
      let { response } = error;
      console.log(response);
    });
};

const features = computed(() => {
  return product.value.features.split(",");
});

onMounted: {
  loaded();
}
</script>
<template>
  <div class="container p-2 mx-auto my-10 max-w-7xl">
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
    <div class="flex flex-row flex-wrap py-4">
      <main role="main" class="w-full px-4 pt-1 sm:w-2/3 md:w-2/3">
        <h1
          class="mb-2 text-3xl font-bold leading-normal tracking-tight text-gray-900 sm:text-4xl md:text-4xl"
        >
          RoboCrypto UI Kit
        </h1>
        <p class="text-gray-500">{{ product.subtitle }}</p>
        <section id="gallery">
          <img
            :src="product.thumbnails"
            alt=""
            class="w-full mt-6 rounded-2xl"
          />
          <div class="grid grid-cols-4 gap-4 mt-4">
            <template v-for="gallery in product.galleries" :key="gallery.id">
              <div
                @click="product.thumbnails = gallery.url"
                class="overflow-hidden cursor-pointer rounded-2xl"
                :class="{
                  'ring-2 ring-indigo-500': product.thumbnails == gallery.url,
                }"
              >
                <img :src="gallery.url" class="w-full" alt="" />
              </div>
            </template>
          </div>
        </section>
        <section class="" id="orders">
          <h1 class="mt-8 mb-3 text-lg font-semibold">About</h1>
          <div class="text-gray-500" v-html="product.description"></div>
        </section>
      </main>
      <aside class="w-full px-4 sm:w-1/3 md:w-1/3">
        <div class="sticky top-0 w-full pt-4 md:mt-24">
          <div class="p-6 border rounded-2xl">
            <div class="mb-4" v-if="product.is_figma == 1">
              <div class="flex mb-2">
                <div>
                  <img src="@/assets/img/icon-figma.png" alt="" class="w-16" />
                </div>
                <div class="block mt-1 ml-4">
                  <h3 class="font-semibold text-md">Figma</h3>
                  <p class="text-gray-400 text-md">Project Included</p>
                </div>
              </div>
            </div>
            <div class="mb-4" v-if="product.is_sketch == 1">
              <div class="flex mb-2">
                .de
                <div>
                  <img src="@/assets/img/icon-sketch.png" alt="" class="w-16" />
                </div>
                <div class="block mt-1 ml-4">
                  <h3 class="font-semibold text-md">Sketch</h3>
                  <p class="text-gray-400 text-md">Project Included</p>
                </div>
              </div>
            </div>
            <div>
              <h1 class="mt-5 mb-3 font-semibold text-md">Great Features</h1>
              <!-- jika data ada panggil data featre jika tidak panggil default product yaitu false -->
              <ul class="mb-6 text-gray-500" v-if="product">
                <li
                  class="mb-2"
                  v-for="feature in features"
                  :key="feature.index"
                >
                  {{ feature }}
                  <img
                    src="@/assets/img/icon-check.png"
                    class="float-right w-5 mt-1"
                    alt=""
                  />
                </li>
              </ul>
            </div>
            <RouterLink
              to="/pricing"
              class="inline-flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-full hover:bg-indigo-700 md:py-2 md:text-md md:px-10 hover:shadow"
            >
              Download Now
            </RouterLink>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>
