<template>
  <div
    v-intersect="{
          handler: InfiniteLoadHandler,
          options: {
            threshold: [0, 0.25, 0.5, 0.75, 1.0],
          },
        }"
    class="py-12 mx-auto"
    @click="InfiniteLoadHandler"
  >
    <p class="text-center text-gray-300 animate-pulse">
      Stay here to load more posts...
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

// Third party
import { Intersect } from 'vuetify/lib/directives/intersect'

// Components
import KeyboardNavigationMixin from '~/components/pages/posts/navigation/page/KeyboardNavigationMixin.js'

export default {
  directives: {
    Intersect
  },

  mixins: [KeyboardNavigationMixin],

  props: {
    currentPage: {
      type: Number,
      required: true
    },

    minimumPage: {
      type: Number,
      required: true
    }
  },

  computed: {
    ...mapGetters('user', ['getUserSettings'])
  },

  methods: {
    getNextPage() {
      this.setPage(this.currentPage + 1)
    },

    getPrevPage() {
      this.setPage(this.currentPage - 1)
    },

    isBelowMinimumPage(page) {
      return page < this.minimumPage
    },

    setPage(page) {
      if (this.isBelowMinimumPage(page)) {
        console.debug(`Page "${ page }" is below minimum page`)
        return
      }

      this.$emit('setPage', page)
    },

    InfiniteLoadHandler(entries, observer) {
      const elementAttribute = 'data-is-visible'
      const timeoutDelay = 1500

      if (!entries || !entries.length) {
        return
      }

      entries.forEach((entry) => {
        // console.debug(entry.intersectionRatio)

        if (!entry.isIntersecting || entry.intersectionRatio < 1) {
          if (entry.target.getAttribute(elementAttribute)) {
            // console.debug('Removed attribute from element.')
            entry.target.removeAttribute(elementAttribute)
          }

          // console.debug('Element is not visible.')
          return
        }

        entry.target.setAttribute(elementAttribute, true)

        setTimeout(async () => {
          const isVisible = entry.target.getAttribute(elementAttribute)

          if (!isVisible) {
            // console.debug('Timeout: Element does not have attribute.')
            return
          }

          console.debug('Loading more posts...')

          await this.getNextPage()
        }, timeoutDelay)
      })
    }
  }
}
</script>
