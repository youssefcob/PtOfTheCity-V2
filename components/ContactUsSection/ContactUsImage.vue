<script setup lang="ts">
let number = "(718) 648-0888";
let email = "info@ptofthecity.com";

const copy = (text: string) => {
  navigator.clipboard.writeText(text);
};
</script>

<template>
  <div
    class="image"
    :style="`background-image: url('${useImg('contactUs')}');`"
  >
    <div class="backdrop"></div>
    <div class="info-wrapper">
      <div class="visibleinfo">
        <p class="number extend-h3" @click="copy(number)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
          >
            <g clip-path="url(#clip0_813_892)">
              <path
                d="M24.2866 17.666L18.8179 15.3223C18.5843 15.2227 18.3246 15.2017 18.078 15.2625C17.8315 15.3232 17.6113 15.4625 17.4507 15.6592L15.0288 18.6182C11.2279 16.8261 8.16904 13.7672 6.37695 9.96631L9.33594 7.54443C9.53305 7.38412 9.67256 7.16395 9.73335 6.91726C9.79414 6.67057 9.7729 6.41079 9.67285 6.17725L7.3291 0.708496C7.21929 0.456742 7.02508 0.251194 6.77996 0.127294C6.53483 0.00339424 6.25416 -0.0310909 5.98633 0.0297849L0.908203 1.20166C0.649985 1.26129 0.419602 1.40668 0.254656 1.6141C0.0897096 1.82153 -5.94829e-05 2.07874 2.95713e-08 2.34375C2.95713e-08 14.8682 10.1514 25 22.6562 25C22.9213 25.0002 23.1787 24.9104 23.3862 24.7455C23.5937 24.5805 23.7392 24.3501 23.7988 24.0918L24.9707 19.0137C25.0312 18.7445 24.996 18.4627 24.8711 18.2168C24.7463 17.9708 24.5396 17.776 24.2866 17.666Z"
                fill="white"
              />
            </g>
          </svg>
          <a
            href="tel:+17186480888"
            class="text"
            style="color: white; text-decoration: none"
            >{{ number }}</a
          >
        </p>
        <p class="extend-h3" @click="copy(email)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="26"
            viewBox="0 0 25 26"
            fill="none"
          >
            <path
              d="M6.94444 20.9894C5.83333 20.9894 4.72222 20.0171 4.16667 19.6005C1.38889 17.656 0.555556 16.9616 0 16.5449V22.3783C0 23.1452 0.621962 23.7671 1.38889 23.7671H12.5C13.2669 23.7671 13.8889 23.1452 13.8889 22.3783V16.5449C13.3333 16.9616 12.5 17.656 9.72222 19.6005C9.16667 20.0171 8.05556 20.9894 6.94444 20.9894ZM12.5 12.656H1.38889C0.621962 12.656 0 13.278 0 14.0449V14.7394C1.11111 15.5727 0.972222 15.5727 5 18.4894C5.41667 18.7671 6.25 19.6005 6.94444 19.6005C7.63889 19.6005 8.47222 18.7671 8.88889 18.6283C12.9167 15.7116 12.7778 15.7116 13.8889 14.8783V14.0449C13.8889 13.278 13.2669 12.656 12.5 12.656ZM23.6111 8.48937H9.72222C8.95529 8.48937 8.33333 9.11133 8.33333 9.87825V11.2671H12.5C13.9414 11.2671 15.1298 12.3704 15.2652 13.7767L15.2778 13.7671V19.6005H23.6111C24.378 19.6005 25 18.9785 25 18.2116V9.87825C25 9.11133 24.378 8.48937 23.6111 8.48937ZM22.2222 14.0449H19.4444V11.2671H22.2222V14.0449ZM6.94444 9.87825C6.94444 8.34657 8.19054 7.10048 9.72222 7.10048H19.4444V2.93381C19.4444 2.16688 18.8225 1.54492 18.0556 1.54492H4.16667C3.39974 1.54492 2.77778 2.16688 2.77778 2.93381V11.2671H6.94444V9.87825Z"
              fill="white"
            />
          </svg>
          <span>{{ email }} </span>
        </p>
      </div>

      <div :dir="$dir()" class="invisibleinfo">
        <h1>{{ $translate("always_available") }}</h1>
        <h2>{{ $translate("working_hours_weekdays") }}</h2>
        <h2>{{ $translate("working_hours_weekends") }}</h2>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.image {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  position: relative;

  h3,
  h2,
  h1,
  span {
    color: white;
  }
  span {
    display: inline-block;
  }

  h3 {
    font-size: 1.1rem;
    text-align: center;
    cursor:
      url("https://img.icons8.com/?size=20&id=QfmxGpnj0cA8&format=png&color=2BC0D4"),
      copy;
  }

  .backdrop {
    background: rgba(44, 50, 51, 0.2);

    backdrop-filter: blur(50px);
    position: absolute;
    bottom: 0;
    height: 25%;
    // height: 100%;
    width: 100%;
    transition: all 0.5s ease-in-out;
  }

  &:hover {
    .invisibleinfo {
      height: 75%;
      transition: all 0.5s ease-in-out;

      > h2,
      h1 {
        color: white;
        transition: all 0.8s ease-in-out;
      }
    }

    .backdrop {
      height: 100%;
      transition: all 0.5s ease-in-out;
    }
  }

  .info-wrapper {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column-reverse;
  }

  .invisibleinfo,
  .visibleinfo {
    width: 100%;
    z-index: 1;
    color: white;

    svg {
      transform: translateY(5px);
      /* Adjust the value as needed */
    }
  }

  .invisibleinfo {
    height: 0%;
    padding: 5%;

    > h2,
    h1 {
      color: transparent;
      transition: all 0.5s ease-in-out;
    }

    transition: all 0.5s ease-in-out;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 7%;

    > h2 {
      font-size: 2.7rem;
    }
  }

  .visibleinfo {
    height: 25%;

    display: flex;
    padding: 0 15%;
    justify-content: space-between;
    align-items: center;
    padding-right: 20%;
  }
}
</style>
