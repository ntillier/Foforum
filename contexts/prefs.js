import { createSlice, configureStore } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import get from 'util/fetch';

const prefsSlice = createSlice({
  name: 'prefs',
  initialState: {
    prefs: {
      isMenuOpened: false,
    },
    react: [
      '1f929',
      '1f44d',
      '2764',
      '1f923',
      '1f480',
      '1f4af',
      '1f389',
      '1f44f'
    ],
    sidebar: {
      categories: [],
      tags: []
    },
    global: {
      storting: 0,
      categories: [],
      tags: []
    }
  },
  reducers: {
    toogleMenu: (state) => {
      state.prefs.isMenuOpened = !state.prefs.isMenuOpened;
    },
    closeMenu: (state) => {
      state.prefs.isMenuOpened = false;
    },
    setSorting: (state, { payload }) => {
      state.global.sorting = payload || 0;
    },
    setSidebarCategories: (state, { payload }) => {
      state.sidebar.categories = payload;
    },
    setSidebarTags: (state, { payload }) => {
      state.sidebar.tags = payload;
    },
    setTags: (state, { payload }) => {
      state.global.tags = payload;
    },
    setCategories: (state, { payload }) => {
      state.global.categories = payload;
    }
  }
})

const actions = prefsSlice.actions

export const prefsStore = configureStore({
  reducer: prefsSlice.reducer
});

// getters
export function usePrefs() {
  return useSelector((state) => state.prefs);
}

export function useReactions() {
  return useSelector((state) => state.react);
}

export function useSidebarTags () {
  return useSelector((state) => state.sidebar.tags);
}

export function useSidebarCategories () {
  return useSelector((state) => state.sidebar.categories);
}

export function useTags () {
  return useSelector((state) => state.global.tags);
}

export function useCategories () {
  return useSelector((state) => state.global.categories);
}

export function useSorting () {
  return useSelector((state) => state.global.storting);
}

// setters
export function toogleMenu() {
  prefsStore.dispatch(actions.toogleMenu());
}
export function closeMenu() {
  prefsStore.dispatch(actions.closeMenu());
}
export function setSorting (index) {
  prefsStore.dispatch(actions.setSorting(index));
}
export function initPreferences () {
  get('getPreferences', `query { getPreferences { categories { id label } tags { id label } sidebar { categories { id label color } tags { id label } } } }`)
    .then(({ categories, tags, sidebar }) => {
      prefsStore.dispatch(actions.setCategories(categories));
      prefsStore.dispatch(actions.setTags(tags));
      prefsStore.dispatch(actions.setSidebarCategories(sidebar.categories));
      prefsStore.dispatch(actions.setSidebarTags(sidebar.tags));
    })
    .catch((err) => {
      console.log('An error occured:', err);
    });
}