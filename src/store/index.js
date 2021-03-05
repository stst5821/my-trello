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
    addlist(state, payload) {
    state.lists.push({ title: payload.title, cards:[] })
  },
  },
  actions: {
    // payloadはオブジェクト型で受け取ると、複数のプロパティを受け取ることができるため、推奨されてい
    addlist(context, payload) {
      context.commit('addlist', payload)
    },
  },
  getters: {

  }
})

// localStorageにはJSON形式の文字列型でデータが保存されているので、取得するときにはJSON.parse(取得するデータ)でオブジェクトに変換する必要がある。
store.subscribe((mutation, state) => {
  // データの状態を更新後にlocalStorageへデータの状態を保存している。
  localStorage.setItem('trello-lists', JSON.stringify(state.lists))
})

// main.jsでインポートできるようにexport defaultしている。
export default store