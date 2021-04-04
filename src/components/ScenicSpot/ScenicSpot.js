import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getScenicSpot } from '../../api/scenicSpot'
import ScenicSpotListItem from './ScenicSpotListItem'
import LoadingStatus from './LoadingStatus'
import { saveScenicSpot, updateCityInfo } from '../../store/actions/scenicSpotActions'
import { debounce } from '../../helpers/function'

const NUM_OF_FIRST_LOAD = 30
const NUM_OF_SCROLL_LOAD = 30
const cityList = [
  undefined, // 全台
  'Taipei',
  'NewTaipei',
  'Taoyuan',
  'Taichung',
  'Tainan',
  'Kaohsiung',
  'Keelung',
  'Hsinchu',
  'HsinchuCounty',
  'MiaoliCounty',
  'ChanghuaCounty',
  'NantouCounty',
  'YunlinCounty',
  'ChiayiCounty',
  'Chiayi',
  'PingtungCounty',
  'YilanCounty',
  'HualienCounty',
  'TaitungCounty',
  'KinmenCounty',
  'PenghuCounty',
  'LienchiangCounty',
]

class ScenicSpot extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isFetching: false,
      loadingError: null,
    }
    this.spotListRef = React.createRef()
  }

  // 滾動時檢查是否到達最底，是則載入新資料
  checkScrollPosition = async (e) => {
    // 若 已經沒有新資料可抓取 或 正在搜尋，則不需檢查了
    if (!this.props.hasMoreDataToFetch || this.props.searchTerm) return

    const { offsetHeight, scrollTop, scrollHeight } = e.target
    if (scrollTop !== 0 && offsetHeight + scrollTop === scrollHeight && !this.state.isFetching) {
      this.setState({ isFetching: true, loadingError: null })
      try {
        await this.fetchData()
      } catch (error) {
        this.setState({ loadingError: '出現錯誤，請重新嘗試' })
      }
      this.setState({ isFetching: false })
    }
  }

  fetchData = async () => {
    // 先檢查是否還有資料可以抓取
    if (!this.props.hasMoreDataToFetch) return

    // 檢查是首次抓取還是已經抓過資料，調整抓取的數量
    const numOfScenicSpotToFetch = this.props.spots.length ? NUM_OF_SCROLL_LOAD : NUM_OF_FIRST_LOAD

    const scenicSpots = await getScenicSpot(
      this.props.spots.length,
      numOfScenicSpotToFetch,
      this.props.city
    )
    this.props.saveScenicSpot(this.props.city, scenicSpots)

    // 若抓到的資料比想要的資料少，代表沒有更多資料可以抓了
    if (scenicSpots.length < NUM_OF_SCROLL_LOAD) {
      this.props.updateCityInfo(this.props.city, false)
    }
  }

  async componentDidMount() {
    this.fetchData()
  }

  // 檢查是否換了不同的地區
  async componentDidUpdate(prevProps) {
    const oldCity = prevProps.city
    const newCity = this.props.city

    if (oldCity !== newCity) {
      this.spotListRef.current.scrollTop = 0
      // 有資料就先不要再抓了，滑到底再來抓
      if (this.props.spots.length === 0) {
        this.fetchData()
      }
    }
  }

  render() {
    // 確認城市名稱是正確的
    if (!cityList.includes(this.props.city)) {
      return <Redirect to="/scenicSpot" />
    }

    const ScenicSpotList = this.props.spots
      .filter((spot) => {
        return spot.Name.match(this.props.searchTerm)
      })
      .map((spot) => {
        return <ScenicSpotListItem key={spot.ID} spot={spot} />
      })

    const isLoading = this.state.isFetching || this.props.spots.length === 0
    // 當有更多資料要抓取，且沒有在搜尋時才顯示loading status
    const showLoadingStatus = this.props.hasMoreDataToFetch && !this.props.searchTerm
    return (
      <div className="scenicSpot container overflow-auto">
        <ul
          className="list-group overflow-auto h-100 py-3"
          onScroll={debounce(this.checkScrollPosition)}
          ref={this.spotListRef}
        >
          {ScenicSpotList}
          {showLoadingStatus && (
            <LoadingStatus isLoading={isLoading} loadingError={this.state.loadingError} />
          )}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const city = ownProps.match.params.city
  const hasMoreDataToFetch =
    city !== undefined ? state.hasMoreDataToFetch[city] : state.hasMoreDataToFetch['Taiwan']
  return {
    spots: state.spots[city] || state.spots['Taiwan'],
    hasMoreDataToFetch,
    city,
    searchTerm: ownProps.searchTerm,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveScenicSpot: (city, newData) => {
      dispatch(saveScenicSpot(city, newData))
    },
    updateCityInfo: (city, hasMoreDataToFetch) => {
      dispatch(updateCityInfo(city, hasMoreDataToFetch))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScenicSpot)
