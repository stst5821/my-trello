<template>
<div class="list">
    <div class="listheader">
        <p class="list-title">{{ title }}</p>

        <!-- リスト内のカードの総数のデータをバインドする。 -->
        <p class="list-counter">total: {{ totalCardInList }}</p>

        <!--  クリックイベント時にremoveListメソッドをハンドルしている。 -->
        <div class="deletelist" @click="removeList">×</div>
    </div>

    <!-- カードをドラッグで動かせるようにする -->
    <!-- draggableコンポーネントはpropsの1つとして、listプロパティを受け取ります。 -->
    <!-- あっとendイベントは、ドラッグ&ドロップの操作が終わったあと、最後に発生するイベント-->
    <draggable group="cards"
        :list="cards"
        @end="$emit('change')">
        <!-- Cardコンポーネントを呼び出し、Cardコンポーネントに必要なデータを渡している。 -->
        <card v-for="(item, index) in cards"
            :body="item.body"
            :key="item.id"
            :cardIndex="index"
            :listIndex="listIndex"
        />
        <card-add :listIndex="listIndex" />
    </draggable>

</div>

</template>

<script>

import CardAdd from './CardAdd'
import Card from './Card'
import draggable from 'vuedraggable'

export default {
    components: {
        CardAdd,
        Card,
        draggable
    },
    // props = 親コンポーネントから受け取るデータを定義する。
    // 受け取ったデータは、dataプロパティと同じようにアクセスできる。
    props: {
        // データを受け取る時は、型などの条件を指定できる。
        // titleは、type = string型で受け取ること required = 必ず受け取ること が定義されている。
        title: {
            type: String,
            required: true
        },
        cards: {
            type: Array,
            required: true
        },
        listIndex: {
            type: Number,
            required: true
        }
    },
    computed: {
        // propsで受け取っているcardsのデータを利用してその総数を返せるようにする。
        totalCardInList() {
            return this.cards.length
        }
    },
    methods: {
        // HTMLのほうで定義した、removelistメソッドをmethodsプロパティに定義している。
        removeList: function() {
        if(confirm('本当にこのリストを削除しますか？')){
            this.$store.dispatch('removelist', { listIndex: this.listIndex })
        }
        },
    }
}
</script>