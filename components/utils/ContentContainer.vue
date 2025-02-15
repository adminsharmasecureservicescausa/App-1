<template>
  <article class="material-container">
    <!-- Sets icon bg if icon is defined -->
    <div
      class="p-3"
      :class="{ 'bg-svg': icon, [icon]: icon, [iconPosition]: icon }"
    >
      <!--
        WARNING: THIS IS THE ONLY PART OF THE WEBSITE WHERE
        UNNECESSARY USE OF `TEXT-SM` IS ALLOWED, OTHERWISE IT MAKES
        THE FONT LOOK TINY
      -->

      <!-- Title -->
      <h1 class="text-gray-200">{{ title }}</h1>

      <!-- Text -->
      <!-- Using v-text as using {{}} would add a `new line` character that `whitespace-pre-line` would interpret. -->
      <p
        v-if="text"
        class="whitespace-pre-line text-sm text-gray-300"
        v-text="text"
      />

      <!-- Image -->
      <picture v-if="img">
        <source :srcset="img + '.webp'" type="image/webp" />
        <img
          loading="lazy"
          decoding="async"
          :src="img + '.png'"
          :alt="title + ' Example'"
          class="mx-auto mt-2"
        />
      </picture>

      <!-- Links -->
      <template v-if="links.length">
        <div class="text-gray-300">
          <template v-for="(link, index) in links">
            <!-- Internal link -->
            <template v-if="link.isInternal">
              <NuxtLink :key="link.text" :to="link.href" class="link text-sm">
                {{ link.text }}
              </NuxtLink>
            </template>

            <!-- External link -->
            <template v-else>
              <a
                :key="link.text"
                :href="link.href"
                target="_blank"
                rel="noopener nofollow"
                class="link text-sm"
              >
                {{ link.text }}
              </a>
            </template>

            <!-- Separator -->
            <template v-if="index !== links.length - 1"> - </template>
          </template>
        </div>
      </template>

      <!-- Extra information -->
      <slot />
    </div>
  </article>
</template>

<script>
export default {
  props: {
    // For icons
    icon: { type: String, required: false, default: undefined },
    iconPosition: { type: String, required: false, default: 'bg-svg-right' },

    // For normal usage
    title: { type: String, required: true },
    text: { type: String, required: false, default: undefined },

    // For images
    img: { type: String, required: false, default: undefined },

    // For links
    links: { type: Array, required: false, default: () => [] }
  }
}
</script>

<style lang="postcss">
/* Center positioned */
.bg-svg {
  background-repeat: no-repeat;
  background-size: 35%;
  background-attachment: fixed;
}

/* Right positioned */
.bg-svg-center {
  background-position: center;
}

/* Right positioned */
.bg-svg-right {
  background-position: top 20vh right 5vw;
}

@screen md {
  .bg-svg {
    background-size: 25%;
    /* The percentage is made based on the md screen padding of the layout (md:w-1/3) which is 66.6% plus the percentage of the base background position */

    /* Now its a completely arbitrary digit since I dont understand how background-position wants to work  */
  }

  .bg-svg-right {
    background-position: top 20vh right 20vw;
  }
}

@screen xl {
  .bg-svg {
    background-size: 15%;
  }

  .bg-svg-right {
    background-position: top 20vh right 28vw;
  }
}

/* Types of icons */
.bg-svg-info {
  background-image: url('~assets/img/svg/info.svg');
}

.bg-svg-star {
  background-image: url('~assets/img/svg/star.svg');
}

.bg-svg-dollar {
  background-image: url('~assets/img/svg/dollar.svg');
}
</style>
