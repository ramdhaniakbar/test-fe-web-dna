<script setup>
  import { ChevronLeft } from 'lucide-vue-next';
import { ref, onMounted } from 'vue';

  const articles = ref([]);

  const getReadListFromLocalStorage = () => {
    const storedArticles = JSON.parse(localStorage.getItem("history_articles")) || [];
    articles.value = storedArticles;
  };

  onMounted(() => {
    getReadListFromLocalStorage();
  });
</script>

<template>
  <div>
    <div class="flex space-x-4 items-center mb-6">
      <router-link to="/" class="flex justify-center items-center cursor-pointer rounded-md text-gray-500 font-medium paragraph
          hover:text-gray-700 transition duration-200">
        <ChevronLeft class="mr-1" />
        Back
      </router-link>
      <h1 class="title text-3xl">Read History</h1>
    </div>
    <ul v-if="articles.length">
      <li v-for="(article, index) in articles" :key="index">
        <a :href="article.url" target="_blank" class="flex p-4 shadow-lg space-x-2 rounded-md mb-4">
          <img :src="article.image" alt="Article Image" class="w-20 h-20 rounded-md" />
          <h2 class="paragraph">{{ article.title }}</h2>
        </a>
      </li>
    </ul>
    <p v-else>No read history available.</p>
  </div>
</template>

<style scoped></style>