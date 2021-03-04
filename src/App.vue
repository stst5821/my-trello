<template>
  <div id="app">
    <!-- boardコンポーネントを呼び出す -->
    <board />
  </div>
</template>

<script>
// インポート文を追加。相対パスで書く。
import Board from './components/Board.vue'

export default {
  name: 'App',
  components: {
    // テンプレートでコンポーネントとして呼び出すため、componentsプロパティに名前を登録する。
    Board,
  }
}
</script>

<style>
</style>
