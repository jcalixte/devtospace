<template>
  <div class="home">
    <VueOnlineOffline>
      <ArticleQuery slot="online" :online="true" />
      <ArticleQuery slot="offline" :online="false" />
    </VueOnlineOffline>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ArticleQuery from '../components/ArticleQuery.vue'
import VueOnlineOffline from 'vue-online-offline'

@Component({
  components: { ArticleQuery, VueOnlineOffline }
})
export default class Home extends Vue {}
</script>
