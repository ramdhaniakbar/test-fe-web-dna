<script setup>
import { ref, watch } from 'vue';
import moment from 'moment';
import { useQuery } from '@tanstack/vue-query'
import axios from 'axios'
import { History } from 'lucide-vue-next';
import SkeletonLoader from '../components/SkeletonLoader.vue';
import { RouterLink } from 'vue-router';

const searchQuery = ref('');

const formatTime = (date) => {
  return moment(date).format('ddd, D MMMM HH.mm');
};

const getNews = async () => {
  console.log('search data ', searchQuery.value)
  const url = searchQuery.value
    ? `${import.meta.env.VITE_API_URL}/everything?q=${searchQuery.value}&apiKey=${import.meta.env.VITE_API_KEY}`
    : `${import.meta.env.VITE_API_URL}/top-headlines?country=us&apiKey=${import.meta.env.VITE_API_KEY}`;
  console.log("Fetching:", url);
  const response = await axios.get(url);
  return response.data;
};

// query
const { data, isLoading, error, refetch, isFetching } = useQuery({
  queryKey: ['news', searchQuery.value],
  queryFn: getNews,
  enabled: true,
})

const saveReadListToLocalStorage = (article) => {
  const data = {
    image: article.urlToImage,
    title: article.title,
    url: article.url,
  }
  let getArticles = JSON.parse(localStorage.getItem("history_articles")) || [];
  getArticles.push(data);
  localStorage.setItem("history_articles", JSON.stringify(getArticles))
  console.log('data ', data)
}

watch(searchQuery, () => {
  refetch()
});
</script>

<template>
  <div class="p-4 max-w-screen-lg mx-auto">
    <div class="flex w-full items-stretch gap-2 mb-6">
      <input v-model="searchQuery" placeholder="Cari berita..." class="border p-2 w-full rounded-md" />
      <router-link to="/read-history" class="flex justify-center items-center cursor-pointer bg-gray-100 px-4 rounded-md text-gray-500 font-medium paragraph
         hover:bg-gray-200 hover:text-gray-700 transition duration-200">
        <History class="mr-1" />
        History
      </router-link>
    </div>

    <p v-if="isLoading || isFetching">
      <div class="col-span-2 row-span-5">
        <SkeletonLoader />
      </div>
    </p>
    <p v-else-if="error">Error: {{ error.message }}</p>

    <div v-else-if="data?.articles?.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Artikel Utama -->
      <div class="md:col-span-2 lg:col-span-2 row-span-5 space-y-4">
        <div v-if="data.articles[0]" class="space-y-2">
          <a v-if="data?.articles?.[0]" :href="data.articles[0].url" rel="noopener noreferrer" target="_blank"
            @click="saveReadListToLocalStorage(data.articles[0])">
            <img :src="data.articles[0].urlToImage" class="rounded-xl w-full h-60 object-cover">
          </a>
          <div class="flex text-xs text-gray-400 space-x-2 mt-2">
            <span>{{ data.articles[0].author ?? 'Unknown' }}</span>
            <span>&#x2022;</span>
            <span>{{ formatTime(data.articles[0].publishedAt) }}</span>
          </div>
          <div class="flex flex-col space-y-2">
            <a :href="data.articles[0].url" rel="noopener noreferrer" target="_blank" @click="saveReadListToLocalStorage(data.articles[0])">
              <h1 class="text-2xl font-bold title">{{ data.articles[0].title }}</h1>
            </a>
            <p class="text-sm text-gray-600 paragraph">{{ data.articles[0].description }}</p>
            <span class="text-sm text-red-400 font-semibold">{{ data.articles[0].source.name }}</span>
          </div>
        </div>
      </div>

      <!-- Artikel Kecil -->
      <template v-for="(article, index) in data.articles.slice(1, 5)" :key="index">
        <div class="col-span-1 space-y-2 mb-6">
          <a :href="article.url" rel="noopener noreferrer" target="_blank" @click="saveReadListToLocalStorage(article)">
            <img :src="article.urlToImage" class="rounded-xl w-full h-32 object-cover">
          </a>
          <div class="flex text-xs text-gray-400 space-x-2 mt-2">
            <span>{{ article.author ?? 'Unknown' }}</span>
            <span>&#x2022;</span>
            <span>{{ formatTime(article.publishedAt) }}</span>
          </div>
          <div class="space-y-1.5">
            <a :href="article.url" rel="noopener noreferrer" target="_blank" @click="saveReadListToLocalStorage(article)">
              <h1 class="text-lg font-bold title">{{ article.title }}</h1>
            </a>
            <p class="text-sm text-gray-600 paragraph">{{ article.description }}</p>
            <span class="text-sm text-red-400 font-semibold">{{ article.source.name }}</span>
          </div>
        </div>
      </template>

      <!-- Artikel Besar Kedua -->
      <div class="md:col-span-2 lg:col-span-2 row-span-5 space-y-4">
        <div v-if="data.articles[5]" class="space-y-2">
          <a :href="data.articles[5].url" rel="noopener noreferrer" target="_blank" @click="saveReadListToLocalStorage(data.articles[5])">
            <img :src="data.articles[5].urlToImage" class="rounded-xl w-full h-60 object-cover">
          </a>
          <div class="flex text-xs text-gray-400 space-x-2 mt-2">
            <span>{{ data.articles[5].author ?? 'Unknown' }}</span>
            <span>&#x2022;</span>
            <span>{{ formatTime(data.articles[5].publishedAt) }}</span>
          </div>
          <a :href="data.articles[5].url" rel="noopener noreferrer" target="_blank" @click="saveReadListToLocalStorage(data.articles[5])">
            <h1 class="text-xl font-bold">{{ data.articles[5].title }}</h1>
          </a>
          <p class="text-sm text-gray-600 paragraph">{{ data.articles[5].description }}</p>
          <span class="text-sm text-red-400 font-semibold">{{ data.articles[5].source.name }}</span>
        </div>
      </div>

      <!-- Artikel Bawah -->
      <template v-for="(article, index) in data.articles.slice(6, 10)" :key="index">
        <div class="col-span-1 space-y-2 mb-6">
          <a :href="article.url" rel="noopener noreferrer" target="_blank" @click="saveReadListToLocalStorage(article)">
            <img :src="article.urlToImage" class="rounded-xl w-full h-32 object-cover">
          </a>
          <div class="flex text-xs text-gray-400 space-x-2 mt-2">
            <span>{{ article.author ?? 'Unknown' }}</span>
            <span>&#x2022;</span>
            <span>{{ formatTime(article.publishedAt) }}</span>
          </div>
          <div class="space-y-1.5">
            <a :href="article.url" rel="noopener noreferrer" target="_blank" @click="saveReadListToLocalStorage(article)">
              <h1 class="text-lg font-bold title">{{ article.title }}</h1>
            </a>
            <p class="text-sm text-gray-600 paragraph">{{ article.description }}</p>
            <span class="text-sm text-red-400 font-semibold">{{ article.source.name }}</span>
          </div>
        </div>
      </template>
    </div>
    <p v-else-if="!isLoading && !error">No articles found.</p>
  </div>
</template>


<style scoped></style>
