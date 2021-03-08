<template>
<div>
    <header>
        my Trello
    </header>
    <main>
        <p class="info-line">All: {{ totalCardCount }} tasks</p>
        <!-- Board内にListAdd.vueを表示する。 -->
        <draggable :list="lists" @end="movingList" class="list-index">
            <!-- Listコンポーネントを呼び出し、必要なデータを渡している。 -->
            <!-- 受け渡すリストの配列データlistsをv-forディレクティブを使って展開できる。 -->
            <!-- :keyの:は、v-bindの略 -->
            <!-- 移動したカードの場所を保存するため、changeイベントをハンドルし、movingCardメソッドを発火します -->
            <list v-for="(item, index) in lists"
                :key="item.id"
                :title="item.title"
                :cards="item.cards"
                :listIndex="index"
                @change="movingCard"
            />
            <list-add />
        </draggable>
    </main>
</div>
</template>

<script>
import draggable from 'vuedraggable'
import ListAdd from './ListAdd.vue'
import List from './List'
import { mapState } from 'vuex'

// これを宣言すると、このコンポーネントを他のコンポーネントからimportして使えるようにする。
export default {
    components: {
        ListAdd,
        List,
        draggable,
    },
    computed: {
        // mapStateを使うと、index.jsのstateで定義したデータの名前と同じ名前の文字列でstateを呼び出すことができる。
        // computedのローカルのオブジェクトと一緒に定義できるようにするため、オブジェクトスプレッド演算子（...の部分）を使っている。
        // computedにはオブジェクトを渡さないといけないルールがある。
        // mapStateはこのオブジェクトスプレッド演算子を使わないと、オブジェクトを持ったオブジェクト（ネストされた状態）を返してしまい、computedはmapStateに定義された値を参照できない。
        // 少し難しい部分ですが、computedにストアのstateからのデータと、ローカルでの算出データを両方定義する場合には、このように書く必要がある。
        ...mapState([
            'lists'
        ]),
        totalCardCount() {
            return this.$store.getters.totalCardCount
        }
    },
    methods: {
        // カードを移動したあと、場所を保存する。
        movingCard: function() {
            this.$store.dispatch('updateList', { lists: this.lists })
        },
        movingList: function() {
            this.$store.dispatch('updateList', { lists: this.lists })
        }
    }
}
</script>