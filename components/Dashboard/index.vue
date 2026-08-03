<script lang="ts" setup>
import Paginator from '../blogs/filters/paginator.vue';

interface Message {
  id: number;
  title: string;
  body: string;
  cta_enabled: boolean;
  cta_text: string | null;
  cta_link: string | null;
  created_at: string;
}

interface PaginationResponse {
  current_page: number;
  data: Message[];
  last_page: number;
  total: number;
  per_page: number;
}


const { apiFetch } = useApi();
const toast = useToast();
const messages = ref<Message[]>([]);
const pagination = ref<PaginationResponse | null>(null);
const isLoading = ref(false);

const fetchMessages = async (page: number = 1) => {
  isLoading.value = true;

  try {
    const response = await apiFetch(`inbox/patient/messages?page=${page}`, {
      method: 'GET',
    }) as PaginationResponse;

    messages.value = response.data;
    pagination.value = response;

  } catch (error: any) {
    console.error('Failed to fetch messages:', error);
    toast.error({ message: 'Failed to load messages' });
  } finally {
    isLoading.value = false;
  }
};

const formatTime = (date: string) => {
  const now = new Date();
  const messageDate = new Date(date);
  const diffMs = now.getTime() - messageDate.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}min`;
  if (diffHours < 24) return `${diffHours}h`;
  if (diffDays < 7) return `${diffDays}d`;
  return messageDate.toLocaleDateString();
};


const handleCTAClick = (link: string|null) => {
  if (!link) return;
  try {
    const url = new URL(link, window.location.origin)
    
    // Check if same origin (internal)
    if (url.origin === window.location.origin) {
      navigateTo(url.pathname + url.search + url.hash)
    } else {
      // External link
      window.open(link, '_blank')
    }
  } catch {
    // Relative URL - treat as internal
    navigateTo(link)
  }
}

onMounted(() => {
  fetchMessages();
});
</script>
<template>
  <div class="container">
    <div class="header">
      <button class="btn cta"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="23" viewBox="0 0 12 23"
          fill="none">
          <path d="M10.3333 0.75L0.749919 11.375L10.3333 22" stroke="#103535" stroke-width="1.5" stroke-linecap="round"
            stroke-linejoin="round" />
        </svg></button>
      <h1>Inbox</h1>
    </div>
    <div v-if="isLoading">Loading messages...</div>

    <div v-else-if="messages.length === 0">
      <p>No messages yet</p>
    </div>

    <template v-else>
      <div class="messages-container">
        <div v-for="message in messages" :key="message.id" class="message-card">
          <div class="message-header">
            <h3>{{ message.title }}</h3>
            <span class="time">{{ formatTime(message.created_at) }}</span>
          </div>

          <p class="message-body">{{ message.body }}</p>

          <div class="message-footer">
            <button v-if="message.cta_enabled" @click="handleCTAClick(message.cta_link)" class="cta-btn">
              {{ message.cta_text }}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3L11 8L6 13" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Paginator outside scrollable container -->
      <Paginator v-if="pagination" :current_page="pagination.current_page" :last_page="pagination.last_page"
        @page-changed="fetchMessages" />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding-top: calc($navbarHeight - 2rem);
  max-height: 90vh;
  display: flex;
  flex-direction: column;

  min-width: 70%;
  max-width: 90%;

  h1 {
    flex-shrink: 0;
  }

  .header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;

    h1 {
      color: white;
      font-size: 3rem;
      font-weight: 400;
    }

    .btn {
      width: 4rem;
      height: 4rem;
      aspect-ratio: 1/1;
    }
  }
}

.messages-container {
  overflow-y: auto;
  flex: 1;
  padding-right: 0.5rem;
  margin-bottom: 2rem;

  // Custom scrollbar styling
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #555;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #f1f1f19f;
    border-radius: 4px;

    &:hover {
      background: #f1f1f1;
    }
  }
}

.message-card {
  background: #f5f5f5;
  padding: 1.5rem;
  margin-bottom: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0;
    color: #1a1a1a;
  }

  .time {
    font-size: 0.875rem;
    color: #1a1a1a;
    font-weight: 500;
  }
}

.message-body {
  color: #4a4a4a;
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
  font-size: 0.95rem;
}

.message-footer {
  display: flex;
  justify-content: flex-end;
}

.cta-btn {
  background: #4fd1c5;
  color: #000;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;

  &:hover {
    background: #38b2ac;
    transform: translateX(2px);
  }

  svg {
    transition: transform 0.2s;
  }

  &:hover svg {
    transform: translateX(2px);
  }
}
</style>