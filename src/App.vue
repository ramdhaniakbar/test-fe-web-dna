<script setup>
import { ref, watch } from 'vue';
import moment from 'moment';
import { useQuery } from '@tanstack/vue-query'
import axios from 'axios'

const searchQuery = ref('');

const formatTime = (date) => {
  return moment(date).format('ddd, D MMMM HH.mm');
};

const getNews = async ({ queryKey }) => {
  const [_key, search] = queryKey; 
  const url = search
    ? `${import.meta.env.VITE_API_URL}/everything?q=${search}&apiKey=${import.meta.env.VITE_API_KEY}`
    : `${import.meta.env.VITE_API_URL}/top-headlines?country=us&apiKey=${import.meta.env.VITE_API_KEY}`;

  const response = await axios.get(url);
  return response.data;
};

// query
const { data, isLoading, error  } = useQuery({
  queryKey: ['news'],
  queryFn: getNews
})

console.log('response ', data);

</script>

<template>
  <div class="p-4 max-w-screen-lg mx-auto">
    <p v-if="isLoading">Loading...</p>
    <p v-else-if="error">Error: {{ error.message }}</p>

    <div v-else class="grid grid-cols-4 gap-x-4">
      <div class="col-span-2 row-span-5 space-y-4">
        <!-- First Large Block - Artikel Utama -->
        <div v-if="data.articles[0]" class="space-y-2">
          <img :src="data.articles[0].urlToImage" class="rounded-xl w-full h-60 object-cover">
          <div class="flex text-sm text-gray-400 space-x-2">
            <span>{{ data.articles[0].author ?? 'Unknown' }}</span>
            <span>&#x2022;</span>
            <span>{{ formatTime(data.articles[0].publishedAt) }}</span>
          </div>
          <div class="flex flex-col space-y-2">
            <h1 class="text-2xl font-bold title">{{ data.articles[0].title }}</h1>
            <p class="text-sm text-gray-600 paragraph">{{ data.articles[0].description }}</p>
            <span class="text-sm text-red-400 font-semibold">{{ data.articles[0].source.name }}</span>
          </div>
        </div>
      </div>

      <!-- Next 4 Articles (2 Top Rows, 2 Bottom Rows) -->
      <template v-for="(article, index) in data.articles.slice(1, 5)" :key="index">
        <div class="col-span-1 row-span-2 space-y-2 mb-6">
          <img :src="article.urlToImage" class="rounded-xl w-full h-32 object-cover">
          <div class="flex text-sm text-gray-400 space-x-2">
            <span>{{ article.author ?? 'Unknown' }}</span>
            <span>&#x2022;</span>
            <span>{{ formatTime(article.publishedAt) }}</span>
          </div>
          <div class="space-y-1.5">
            <h1 class="text-lg font-bold title">{{ article.title }}</h1>
            <p class="text-sm text-gray-600 paragraph">{{ article.description }}</p>
            <span class="text-sm text-red-400 font-semibold">{{ article.source.name }}</span>
          </div>
        </div>
      </template>

      <!-- Right Side Large Block (Artikel ke-5) -->
      <div class="col-span-2 row-span-5 space-y-4 col-start-3">
        <div v-if="data.articles[5]" class="space-y-2">
          <img :src="data.articles[5].urlToImage" class="rounded-xl w-full h-60 object-cover">
          <div class="flex text-sm text-gray-400 space-x-2">
            <span>{{ data.articles[5].author ?? 'Unknown' }}</span>
            <span>&#x2022;</span>
            <span>{{ formatTime(data.articles[5].publishedAt) }}</span>
          </div>
          <h1 class="text-xl font-bold">{{ data.articles[5].title }}</h1>
          <p class="text-sm text-gray-600 paragraph">{{ data.articles[5].description }}</p>
          <span class="text-sm text-red-400 font-semibold">{{ data.articles[5].source.name }}</span>
        </div>
      </div>

      <!-- Bottom 4 Articles (under right block) -->
      <template v-for="(article, index) in data.articles.slice(6, 10)" :key="index">
        <div class="col-span-1 row-span-2 space-y-2 mb-6">
          <img :src="article.urlToImage" class="rounded-xl w-full h-32 object-cover">
          <div class="flex text-sm text-gray-400 space-x-2">
            <span>{{ article.author ?? 'Unknown' }}</span>
            <span>&#x2022;</span>
            <span>{{ formatTime(article.publishedAt) }}</span>
          </div>
          <div class="space-y-1.5">
            <h1 class="text-lg font-bold title">{{ article.title }}</h1>
            <p class="text-sm text-gray-600 paragraph">{{ article.description }}</p>
            <span class="text-sm text-red-400 font-semibold">{{ article.source.name }}</span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
</style>
