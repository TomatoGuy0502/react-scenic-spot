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
    case 'SAVE_SCENIC_SPOT': {
      // 若沒有特別指定城市則為全台
      const city = action.city || 'Taiwan'
      const newSpots = {
        ...state.spots,
        [city]: [...state.spots[city], ...action.newData],
      }
      return {
        ...state,
        spots: newSpots,
      }
    }

    case 'UPDATE_CITY_INFO': {
      const city = action.city || 'Taiwan'
      const hasMoreDataToFetch = {
        ...state.hasMoreDataToFetch,
        [city]: action.hasMoreDataToFetch,
      }
      return {
        ...state,
        hasMoreDataToFetch,
      }
    }

    default:
      return state
  }
}

export default rootReducer
