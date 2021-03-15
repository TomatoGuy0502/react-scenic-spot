const initState = {
  spots: {
    Taiwan: [],
    Taipei: [],
    NewTaipei: [],
    Taoyuan: [],
    Taichung: [],
    Tainan: [],
    Kaohsiung: [],
    Keelung: [],
    Hsinchu: [],
    HsinchuCounty: [],
    MiaoliCounty: [],
    ChanghuaCounty: [],
    NantouCounty: [],
    YunlinCounty: [],
    ChiayiCounty: [],
    Chiayi: [],
    PingtungCounty: [],
    YilanCounty: [],
    HualienCounty: [],
    TaitungCounty: [],
    KinmenCounty: [],
    PenghuCounty: [],
    LienchiangCounty: [],
  },
  isFetching: false,
  hasMoreDataToFetch: {
    Taiwan: true,
    Taipei: true,
    NewTaipei: true,
    Taoyuan: true,
    Taichung: true,
    Tainan: true,
    Kaohsiung: true,
    Keelung: true,
    Hsinchu: true,
    HsinchuCounty: true,
    MiaoliCounty: true,
    ChanghuaCounty: true,
    NantouCounty: true,
    YunlinCounty: true,
    ChiayiCounty: true,
    Chiayi: true,
    PingtungCounty: true,
    YilanCounty: true,
    HualienCounty: true,
    TaitungCounty: true,
    KinmenCounty: true,
    PenghuCounty: true,
    LienchiangCounty: true,
  },
}

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    // 把各個城市的景點存起來
    case 'SAVE_SCENIC_SPOT': {
      const { city, newData } = action

      const newSpots = {
        ...state.spots,
        [city]: [...state.spots[city], ...newData],
      }
      return {
        ...state,
        spots: newSpots,
      }
    }

    // 更新城市是否還有更多資料可以抓取
    case 'UPDATE_CITY_INFO': {
      const { city, hasMoreDataToFetch } = action

      const newHasMoreDataToFetch = {
        ...state.hasMoreDataToFetch,
        [city]: hasMoreDataToFetch,
      }
      return {
        ...state,
        newHasMoreDataToFetch,
      }
    }

    default:
      return state
  }
}

export default rootReducer
