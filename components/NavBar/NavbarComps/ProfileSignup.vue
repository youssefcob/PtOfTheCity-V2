<template>
    <div class="btn-container">
            <div class="btnfont word">Sign In</div>
            <NuxtImg loading="lazy" format="webp" src="@/assets/icons/Vectoruser.svg" alt="user icon" class="user-icon"/>

    </div>
</template>

<style scoped lang="scss">

.btn-container {
    background-color: $blue;
    @include flex();
    justify-content: space-between;
    padding: 0.325rem 3.2rem;
    height:100%;
    width: 12.6875rem;
    border-radius: 18px;
    &:hover {
        cursor: pointer;
    }

    .word{
        padding:0 0.3rem
    }
}
</style>

