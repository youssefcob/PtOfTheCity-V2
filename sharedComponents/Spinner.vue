<template>
    <div class="spinner">
        <div class="spinner__circle"></div>
        <div class="spinner__circle"></div>
        <div class="spinner__circle"></div>
    </div>
</template>

<style scoped lang="scss">

    .spinner {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
    }

    .spinner__circle {
        width: 2rem;
        height: 2rem;
        background-color: $blue;
        border-radius: 50%;
        margin: 0 5px;
        animation: spinner 0.8s infinite;
    }

    @keyframes spinner {
        0% {
            transform: scale(0);
        }
        50% {
            transform: scale(1);
        }
        100% {
            transform: scale(0);
        }
    }
</style>