<template>
  <div class="blog-card">
    <!-- Main Image -->
    <div class="blog-image">
      <NuxtImg :src="blog.main_image" :alt="blog.main_image_alt || blog.title" />
    </div>
    
    <!-- Content Section -->
    <div class="blog-content">
      <!-- Tags -->
      <div class="tags-wrapper">
        <span 
          v-for="tag in blog.tags" 
          :key="tag.id" 
          class="tag"
        >
          #{{ tag.title }}
        </span>
      </div>
      
      <!-- Title -->
      <h2 class="blog-title">{{ blog.title }}</h2>
      
      <!-- Content Preview -->
      <p class="blog-excerpt">
        {{ blog.description}}
      </p>
      
      <!-- Author Section -->
      <div class="author-section">
        <div class="author-avatar">
          <NuxtImg :src="blog.staff.image" :alt="`${blog.staff.first_name} ${blog.staff.last_name}`" />
        </div>
        <div class="author-info">
          <span class="author-name">
            {{ blog.staff.title }} {{ blog.staff.first_name }} {{ blog.staff.last_name }}
          </span>
          <span class="author-label">Author</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { NuxtImg } from '#components';
import type { Blog } from '~/types/types';

const props = defineProps({
  blog: {
    type: Object as () => Blog,
    required: true
  }
})

</script>

<style scoped lang="scss">
.blog-card {
  background: rgba(16, 53, 53, 0.10);;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;
  height:100%;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  }
}

.blog-image {
  position: relative;
  width: 100%;
  height: 240px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
}

.blog-content {
  padding: 24px;
  display: flex;
  flex-direction: column;
}

.tags-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.tag {
  // background: rgba(52, 152, 219, 0.1);
  color: $navy;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  text-transform: lowercase;
  border: 1px solid $cta;
  
  &:hover {
    background: rgba(52, 152, 219, 0.15);
  }
}

.blog-title {
  font-size: 2rem;
  font-weight: 500;
  color: #2c3e50;
  margin: 0 0 16px 0;
  line-height: 1.3;
  
  &:hover {
    color: $navy;
  }
}

.blog-excerpt {
  font-size: 1.2rem;
  color: #5a6c7d;
  line-height: 1.6;
  margin: 0 0 24px 0;
}

.author-section {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid #ecf0f1;
  // align-self: flex-end;
}

.author-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.author-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.author-name {
  font-size: 1.3rem;
  font-weight: 600;
  color: $navy;
}

.author-label {
  font-size: 1rem;
  color: $black;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight:400
}

// Responsive adjustments
@media (max-width: 768px) {
  .blog-card {
    border-radius: 12px;
  }
  
  .blog-image {
    height: 200px;
  }
  
  .blog-content {
    padding: 20px;
  }
  
  .blog-title {
    font-size: 20px;
  }
  
  .blog-excerpt {
    font-size: 14px;
  }
  
  .author-avatar {
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 480px) {
  .blog-content {
    padding: 16px;
  }
  
  .blog-title {
    font-size: 18px;
  }
  
  .tags-wrapper {
    gap: 6px;
  }
  
  .tag {
    font-size: 11px;
    padding: 4px 10px;
  }
}
</style>