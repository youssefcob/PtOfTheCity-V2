<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const props = defineProps({
    current_page: {
        type: Number,
        required: true
    },
    last_page: {
        type: Number,
        required: true
    }
})

const emit = defineEmits<{
    'page-changed': [page: number]
}>()

const goToInput = ref<number>(props.current_page)

// Watch for current_page changes to update input
watch(() => props.current_page, (newPage) => {
    goToInput.value = newPage
})

const pageNumbers = computed(() => {
    const pages: (number | 'ellipsis')[] = []
    const current = props.current_page
    const last = props.last_page

    if (last <= 7) {
        // Show all pages if 7 or fewer
        for (let i = 1; i <= last; i++) {
            pages.push(i)
        }
    } else {
        // Always show first page
        pages.push(1)
        
        // Determine if we need ellipsis after first page
        const startRange = Math.max(2, current - 2)
        const endRange = Math.min(last - 1, current + 2)
        
        // Add ellipsis after first page if needed
        if (startRange > 2) {
            pages.push('ellipsis')
        }
        
        // Add pages around current page
        for (let i = startRange; i <= endRange; i++) {
            if (i !== 1 && i !== last) {
                pages.push(i)
            }
        }
        
        // Add ellipsis before last page if needed
        if (endRange < last - 1) {
            pages.push('ellipsis')
        }
        
        // Always show last page
        pages.push(last)
    }
    
    return pages
})

const route = useRoute()
const buildPageUrl = (page: number) => {
    const query = { ...route.query, page: page.toString() }

    return { query }
}
const handlePageClick = (page: number) => {
    if (page !== props.current_page && page >= 1 && page <= props.last_page) {
        navigateTo(buildPageUrl( page))
    }
}

const handleNextPage = () => {
    if (props.current_page < props.last_page) {
        navigateTo(buildPageUrl( props.current_page + 1))
    }
}

const handlePrevPage = () => {
    if (props.current_page > 1) {
        navigateTo(buildPageUrl( props.current_page - 1))
    }
}

const handleGoToPage = () => {
    const page = goToInput.value
    if (page >= 1 && page <= props.last_page) {
        navigateTo(buildPageUrl( page))
    }
}

const handleGoToKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
        handleGoToPage()
    }
}
</script>

<template>
    <div class="pagination-container">
        <!-- Mobile compact view -->
        <div class="mobile-pagination">
            <!-- Previous arrow -->
            <a 
                href="#" 
                class="pagination-item nav-arrow"
                :class="{ disabled: current_page === 1 }"
                @click.prevent="handlePrevPage"
            >
                &lt;
            </a>

            <!-- Current page info -->
            <div class="page-info">
                <span class="current-page">{{ current_page }}</span>
                <span class="page-separator">of</span>
                <span class="total-pages">{{ last_page }}</span>
            </div>

            <!-- Next arrow -->
            <a 
                href="#" 
                class="pagination-item nav-arrow"
                :class="{ disabled: current_page === last_page }"
                @click.prevent="handleNextPage"
            >
                &gt;
            </a>

            <!-- Go to page input -->
            <div class="goto-section">
                <input 
                    v-model.number="goToInput" 
                    type="number" 
                    :min="1" 
                    :max="last_page"
                    @keypress="handleGoToKeyPress"
                    @blur="handleGoToPage"
                    class="goto-input"
                    placeholder="Go"
                >
            </div>
        </div>

        <!-- Desktop full view -->
        <div class="desktop-pagination">
            <!-- Previous arrow -->
            <a 
                href="#" 
                class="pagination-item nav-arrow"
                :class="{ disabled: current_page === 1 }"
                @click.prevent="handlePrevPage"
            >
                &lt;
            </a>

            <!-- Page numbers -->
            <template v-for="(page, index) in pageNumbers" :key="index">
                <span 
                    v-if="page === 'ellipsis'" 
                    class="pagination-item ellipsis"
                >
                    ...
                </span>
                <a 
                    v-else
                    href="#" 
                    class="pagination-item"
                    :class="{ active: page === current_page }"
                    @click.prevent="handlePageClick(page)"
                >
                    {{ page }}
                </a>
            </template>

            <!-- Next arrow -->
            <a 
                href="#" 
                class="pagination-item nav-arrow"
                :class="{ disabled: current_page === last_page }"
                @click.prevent="handleNextPage"
            >
                &gt;
            </a>
        </div>
    </div>
</template>

<style scoped lang="scss">
.pagination-container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    border-radius: 8px;
}

// Mobile view - show compact pagination
.mobile-pagination {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    justify-content: space-between;
    
    @media (min-width: 768px) {
        display: none;
    }
}

// Desktop view - show full pagination
.desktop-pagination {
    display: none;
    align-items: center;
    gap: 8px;
    
    @media (min-width: 768px) {
        display: flex;
    }
}

.pagination-item {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 32px;
    height: 32px;
    padding: 0 8px;
    border: 1px solid #e0e0e0;
    background: white;
    color: #333;
    text-decoration: none;
    border-radius: 4px;
    font-size: 14px;
    transition: all 0.2s ease;
    cursor: pointer;
    user-select: none;
    
    // Mobile adjustments
    @media (max-width: 767px) {
        min-width: 40px;
        height: 40px;
        font-size: 16px;
        touch-action: manipulation; // Better touch handling
    }
}

.pagination-item:hover {
    background-color: #f0f0f0;
    border-color: #ccc;
}

.pagination-item.active {
    background-color: $cta;
    color: $black;
    border-color: $cta;
}

.pagination-item.active:hover {
    background-color: $cta;
    border-color: $cta;
}

.pagination-item.ellipsis {
    border: none;
    background: transparent;
    cursor: default;
    color: #666;
}

.pagination-item.ellipsis:hover {
    background: transparent;
    border: none;
}

.pagination-item.nav-arrow {
    font-weight: bold;
}

.pagination-item.disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
}

// Mobile page info styling
.page-info {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    font-weight: 500;
    color: #333;
    
    .current-page {
        // color: $cta;
        font-weight: 600;
    }
    
    .page-separator {
        color: #666;
        font-size: 14px;
    }
    
    .total-pages {
        color: #666;
    }
}

// Go to section (mobile)
.goto-section {
    display: flex;
    align-items: center;
}

.goto-input {
    width: 50px;
    height: 40px;
    padding: 8px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    font-size: 14px;
    text-align: center;
    
    @media (max-width: 767px) {
        width: 45px;
        font-size: 16px;
        touch-action: manipulation;
    }
    
    &:focus {
        outline: none;
        border-color: $cta;
    }
    
    &::placeholder {
        color: #999;
        font-size: 12px;
    }
}

// Hide input number arrows on mobile
.goto-input::-webkit-outer-spin-button,
.goto-input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.goto-input[type=number] {
    -moz-appearance: textfield;
}
</style>