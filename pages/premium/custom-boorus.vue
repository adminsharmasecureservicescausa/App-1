<template>
  <main class='mx-auto flex min-h-screen max-w-3xl flex-col p-4 sm:p-6 lg:p-8'>
    <div>
      <!-- Booru list -->
      <div class='material-container overflow-x-scroll px-2 py-1'>
        <table
          class='w-full border-separate text-left'
          style='border-spacing: 0.25em'
        >
          <thead>
          <tr>
            <th class='text-lg font-normal text-gray-200'>Domain</th>
            <th class='text-lg font-normal text-gray-200'>Type</th>
            <th class='text-lg font-normal text-gray-200'>NSFW</th>
            <th class='text-lg font-normal text-gray-200'>Config</th>
          </tr>
          </thead>

          <tbody class='text-gray-300'>
          <template v-if='getCustomBoorus.length'>
            <tr v-for='booru in getCustomBoorus' :key='booru.domain'>
              <td @click='removeCustomBooru(booru)'>
                {{ booru.domain }}
              </td>

              <td @click='copyBooruToForm(booru)'>
                {{ booru.type }}
              </td>

              <td>{{ booru.nsfw }}</td>

              <td>{{ booru.config !== null }}</td>
            </tr>
          </template>

          <!-- No boorus -->
          <template v-else>
            <tr>
              <td class='text-center' colspan='999'>
                There are no custom boorus
              </td>
            </tr>
          </template>
          </tbody>
        </table>
      </div>

      <p class='p-2 text-center text-xs text-gray-300'>
        Click on the `domain` to remove. Click on the `type` to copy
      </p>
    </div>

    <!-- Spacer -->
    <div class='flex-auto'>&nbsp;</div>

    <!-- Booru editor -->
    <form
      class='material-container flex flex-wrap gap-4 p-4'
      @submit.prevent='addFormBooruToCustomBoorus'
    >
      <!-- Domain -->
      <label class='space-y-2'>
        <p class='text-gray-200'>Domain</p>

        <input
          v-model='formBooru.domain'
          class='border-util focus-visible:focus-util block h-8 bg-darkGray-700 p-1 text-gray-300 outline-none'
          name='domain'
          placeholder='example.com'
          required
          type='text'
        />

        <p class='text-xs text-gray-300'>
          Not the URL, the domain
          <br />
          Use `example.com` not `http://example.com/index.php`
        </p>
      </label>

      <!-- Type -->
      <label class='space-y-1'>
        <p class='text-gray-200'>Booru type</p>

        <select
          v-model='formBooru.type'
          class='border-util focus-visible:focus-util block h-8 w-max bg-darkGray-700 p-1 text-gray-300 outline-none'
          name='type'
          required
        >
          <option
            v-for='booruType in booruTypeList'
            :key='booruType.type'
            :value='booruType.type'
          >
            {{ booruType.type }}
          </option>
        </select>
      </label>

      <!-- NSFW -->
      <label class='flex flex-col space-y-1'>
        <p class='text-gray-200'>NSFW</p>

        <input
          v-model='formBooru.nsfw'
          class='focus-visible:focus-util block flex-auto self-center bg-darkGray-700 p-1 outline-none'
          name='nsfw'
          type='checkbox'
        />
      </label>

      <!-- Configuration -->
      <label class='flex-auto space-y-1'>
        <p class='text-gray-200'>
          Configuration
          <span class='text-sm italic'>(Optional)</span>
        </p>

        <textarea
          v-model='formBooru.config'
          class='border-util focus-visible:focus-util block w-full bg-darkGray-700 p-1 text-gray-300 outline-none'
          name='config'
          rows='3'
          spellcheck='false'
        />
      </label>

      <!-- <button type="button" class="text-sm text-gray-200">
        Test booru
      </button> -->

      <button
        class='focus-visible:focus-util w-full rounded-full bg-gradient-to-r from-primary-400 to-accent-400 px-2 py-1 tracking-wide'
        type='submit'
      >
        Add
      </button>
    </form>
  </main>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  import { booruTypeList } from '~/assets/lib/rule-34-shared-resources/src/util/BooruUtils.js'

  export default {
    data() {
      return {
        booruTypeList,

        formBooru: {
          domain: null,
          type: null,
          nsfw: true,
          config: null
        }
      }
    },

    head() {
      return {
        title: 'Custom Boorus',
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: 'Add more Boorus.'
          }
        ]
      }
    },

    computed: {
      ...mapGetters('user', ['getCustomBoorus'])
    },

    methods: {
      ...mapActions('user', ['customBoorusManager']),

      addFormBooruToCustomBoorus(booruObj) {
        let parsedConfig = null

        try {
          parsedConfig = JSON.parse(this.formBooru.config)
        } catch (error) {
          console.log(error)
          parsedConfig = null
        }

        this.customBoorusManager({
          operation: 'add',
          value: {
            ...this.formBooru,
            config: parsedConfig
          }
        })
      },

      removeCustomBooru(booruObj) {
        this.customBoorusManager({
          operation: 'remove',
          value: booruObj
        })
      },

      copyBooruToForm(booru) {
        // Clone as a weird fix so Vuex does not crash
        this.formBooru = {
          domain: booru.domain,
          type: booru.type,
          nsfw: booru.nsfw,
          config: JSON.stringify(booru.config)
      }
    }
  }
}
</script>
