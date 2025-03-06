<template>
  <div class="grid grid-cols-4 gap-4">
    <!-- Large Skeleton (Main News) -->
    <div class="col-span-2 row-span-2 bg-gray-300 animate-pulse rounded-lg h-64"></div>

    <!-- Small Skeletons (Top Right) -->
    <div class="col-span-1 row-span-1 bg-gray-300 animate-pulse rounded-lg h-32"></div>
    <div class="col-span-1 row-span-1 bg-gray-300 animate-pulse rounded-lg h-32"></div>
    <div class="col-span-1 row-span-1 bg-gray-300 animate-pulse rounded-lg h-32"></div>
    <div class="col-span-1 row-span-1 bg-gray-300 animate-pulse rounded-lg h-32"></div>

    <!-- Small Skeletons (Bottom Left) -->
    <div class="col-span-1 row-span-1 bg-gray-300 animate-pulse rounded-lg h-32"></div>
    <div class="col-span-1 row-span-1 bg-gray-300 animate-pulse rounded-lg h-32"></div>

    <!-- Large Skeleton (Bottom Right, Now Correctly Aligned) -->
    <div class="col-span-2 row-span-2 bg-gray-300 animate-pulse rounded-lg h-64"></div>

    <!-- Remaining Small Skeletons to Fill Empty Space -->
    <div class="col-span-1 row-span-1 bg-gray-300 animate-pulse rounded-lg h-32"></div>
    <div class="col-span-1 row-span-1 bg-gray-300 animate-pulse rounded-lg h-32"></div>
  </div>
</template>



<script setup>
</script>
