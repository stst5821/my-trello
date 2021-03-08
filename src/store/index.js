import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// localStorageに保存したリストを取得する。
const savedLists = localStorage.getItem('trello-lists')

// ストアインスタンスを取得
const store = new Vuex.Store({
  state: {
    // localStorageに保存されたリストがあれば取得。なければデフォルトのリスト配列を設置。
    lists: savedLists ? JSON.parse(savedLists): [
      {
        title: 'Backlog',
        cards: [
          { body: 'English' },
          { body: 'Mathematics' },
        ]
      },
      {
        title: 'Todo',
        cards: [
          { body: 'Science' }
        ]
      },
      {
        title: 'Doing',
        cards: []
      }
    ],
  },
  mutations: {
    // リストを追加する
    addlist(state, payload) {
    state.lists.push({ title: payload.title, cards:[] })
    },
    // リストを削除する
    removelist(state, payload) {
      state.lists.splice(payload.listIndex, 1)
    },
    // リストにカードを追加する
    addCardToList(state, payload) {
      state.lists[payload.listIndex].cards.push({ body: payload.body })
    },
    // カードを削除する
    removeCardFromList(state, payload) {
      state.lists[payload.listIndex].cards.splice(payload.cardIndex, 1)
    },
    // 移動したカードの情報を記録する
    updateList(state, payload) {
      state.lists = payload.lists
    }
  },
  actions: {
    // payloadはオブジェクト型で受け取ると、複数のプロパティを受け取ることができるため、推奨されている
    addlist(context, payload) {
      context.commit('addlist', payload)
    },
    removelist(context, payload) {
      context.commit('removelist', payload)
    },
    // mutationsのaddCardToListメソッドは、stateのデータへ追加する。
    addCardToList(context, payload) {
      context.commit('addCardToList', payload)
    },
    removeCardFromList(context, payload) {
      context.commit('removeCardFromList', payload)
    },
    // 移動したカードの情報を記録する
    updateList(context, payload) {
      context.commit('updateList', payload)
    }
  },
  // gettersは第一引数にstate、第二引数に他のgettersを受け取ることができる。
  // 今回はstateだけ受け取り、全体のカードの総数を返すように実装
  getters: {
    totalCardCount(state) {
      let count = 0
      state.lists.map(content => count += content.cards.length)
      return count
    }
  }
})

// localStorageにはJSON形式の文字列型でデータが保存されているので、取得するときにはJSON.parse(取得するデータ)でオブジェクトに変換する必要がある。
store.subscribe((mutation, state) => {
  // データの状態を更新後にlocalStorageへデータの状態を保存している。
  localStorage.setItem('trello-lists', JSON.stringify(state.lists))
})

// main.jsでインポートできるようにexport defaultしている。
export default store