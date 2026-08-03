<template>

    <div class="header">
        <div class="title">
            <h1>Where is your pain?</h1>

            <div class="mouse-wrapper">

                <svg class="mouse" xmlns="http://www.w3.org/2000/svg" width="139" height="76" viewBox="0 0 139 76"
                    fill="none">
                    <path d="M22 13V11C22 5.47715 26.4772 1 32 1H139" stroke="#236681" stroke-width="2" />
                    <rect x="0.666748" y="13" width="43.3333" height="62.6667" rx="21.6667" fill="#236681" />
                    <rect y="35" width="1.33333" height="44" transform="rotate(-90 0 35)" fill="#EEECED" />
                    <rect x="18.6667" y="20.3335" width="6.66667" height="10" rx="3.33333" fill="#EEECED" />
                    <rect x="21.3335" y="13" width="1.33333" height="7.33333" fill="#EEECED" />
                    <rect x="21.3335" y="30.3335" width="1.33333" height="3.33333" fill="#EEECED" />
                </svg>

            </div>

        </div>
        <h2>Hover on the figure to learn more about your pain</h2>
    </div>

</template>

<style scoped lang="scss">
.header {

    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    position: relative;

    .title {
        display: flex;

        .mouse-wrapper {
            overflow: hidden;
            margin-left: 1rem;

            .mouse {
                // position: absolute;

                animation: moveLeftRight 1.5s infinite alternate;

                @keyframes moveLeftRight {
                    0% {
                        transform: translateX(0);
                    }

                    100% {
                        transform: translateX(20%);
                    }
                }
            }

        }

        h1 {
            display: flex;
            align-items: flex-end;
        }
    }





    h2 {
        color: $navy;
        line-height: 120%;
    }

    .btn {
        width: 60%;
        margin-top: 2rem;
    }
}
</style>