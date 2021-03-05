<template>
<div>
    <header>
        my Trello
    </header>
    <main>
        <p class="info-line">All: 0 tasks</p>
        <!-- Board内にListAdd.vueを表示する。 -->
        <list-add />
    </main>
</div>
</template>

<script>
import ListAdd from './ListAdd.vue'

// これを宣言すると、このコンポーネントを他のコンポーネントからimportして使えるようにする。
export default {
    components: {
        ListAdd
    },
}
</script>