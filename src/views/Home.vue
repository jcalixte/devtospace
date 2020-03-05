<template>
  <div class="home">
    <article class="message is-primary" v-if="!hideMessage">
      <div class="message-header">
        <p>Welcome to DEV to SPACE !</p>
        <button
          class="delete"
          aria-label="delete"
          @click="actionToHideMessage"
        ></button>
      </div>
      <div class="message-body">
        <p>
          Your device is now part of the
          <a href="https://dev.to">dev.to</a> family! It is now a hub where you
          can download articles from the excellent
          <a href="https://dev.to">dev.to</a> website and read it or share it
          offline!
        </p>
        <p>
          This app is designed to be used on environment where it can be
          difficult to have Internet connection. Get access once and then read
          wherever you are.
        </p>
      </div>
    </article>

    <main>
      <VueOnlineOffline>
        <section slot="online">
          <button
            class="button is-info"
            v-if="!displayLocalArticles"
            @click="displayLocal"
          >
            show offline articles
          </button>
          <section v-if="displayLocalArticles">
            <h3 class="title is-3">Local articles</h3>
            <ArticleQuery :online="false" />
            <hr />
          </section>
          <h3 class="title is-3">Online articles</h3>
          <ArticleQuery slot="online" key="online" :online="true" />
        </section>
        <ArticleQuery slot="offline" key="offline" :online="false" />
      </VueOnlineOffline>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ArticleQuery from '../components/ArticleQuery.vue'
import { Getter, Action } from 'vuex-class'
import VueOnlineOffline from 'vue-online-offline'

@Component({
  components: { ArticleQuery, VueOnlineOffline }
})
export default class Home extends Vue {
  @Getter
  private hideMessage!: boolean
  @Action
  private actionToHideMessage!: any

  private displayLocalArticles: boolean = false

  private displayLocal() {
    this.displayLocalArticles = true
  }
}
</script>
