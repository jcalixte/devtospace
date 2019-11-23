<template>
  <div class="article-query">
    <p v-if="online">
      <em>You can check articles you want to read once offline</em>
    </p>
    <p v-else>Here are all the articles you can read offline</p>
    <stack
      :column-min-width="320"
      monitor-images-loaded
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="10"
    >
      <stack-item v-for="article in articles" :key="article.id">
        <div class="article-item">
          <div class="checkbox-container">
            <input
              type="checkbox"
              :value="article.id"
              name="stored-article"
              v-model="storedArticles"
            />
          </div>
          <router-link :to="{ name: 'article', params: { id: article.id } }">
            <img
              v-if="article.cover_image"
              :src="article.cover_image"
              alt="Cover image"
            />
            <div class="article-title">{{ article.title }}</div>
          </router-link>
          <hr />
        </div>
      </stack-item>
    </stack>
  </div>
</template>

<script lang="ts">
declare const navigator: any
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { IArticleItem } from '@/models/IArticle'
import ArticleService from '@/services/ArticleService'
import infiniteScroll from 'vue-infinite-scroll'
import { Stack, StackItem } from 'vue-stack-grid'

@Component({
  directives: { infiniteScroll },
  components: { Stack, StackItem }
})
export default class ArticleQuery extends Vue {
  @Prop({ type: Boolean, default: true })
  private online!: boolean
  private articles: IArticleItem[] = []
  private storedArticles: number[] = []
  private page: number = 1
  private busy: boolean = false

  private async created() {
    this.articles = this.online
      ? await ArticleService.queryAllArticles(this.page)
      : await ArticleService.queryAllStoredArticles()
    this.storedArticles = await ArticleService.allStoredIds()
  }

  private share() {
    if ('bluetooth' in navigator) {
      navigator.bluetooth.requestDevice({
        acceptAllDevices: true
      })
    }
  }

  private async loadMore() {
    if (!this.online) {
      return
    }
    this.busy = true
    this.page = this.page + 1
    const articles = await ArticleService.queryAllArticles(this.page)
    this.articles.push(...articles)
    this.busy = false
  }

  @Watch('storedArticles')
  private async onStoredArticlesChange(storedArticles: number[]) {
    const actualStoredArticles = await ArticleService.allStoredIds()
    const newToStoreIds = storedArticles.filter(
      (id) => !actualStoredArticles.includes(id)
    )
    const oldToStoreIds = actualStoredArticles.filter(
      (id) => !storedArticles.includes(id)
    )

    newToStoreIds.forEach((id) => ArticleService.storeArticle(id, true))
    oldToStoreIds.forEach((id) => ArticleService.removeArticle(id))
  }
}
</script>

<style scoped lang="scss">
$border-radius: 10px;

.checkbox-container {
  text-align: center;
  position: absolute;
  right: $border-radius;
  top: $border-radius;
}

.article-item {
  margin: 5px;

  .article-title {
    margin: 5px;
  }
}
</style>
