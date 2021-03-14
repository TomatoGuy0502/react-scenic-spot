import React, { Component } from 'react'
import { getScenicSpot } from '../api/scenicSpot'
import ScenicSpotListItem from './ScenicSpotListItem'
import LoadingStatus from './LoadingStatus'
import NotFound from './NotFound'

const NUM_OF_FIRST_LOAD = 10
const NUM_OF_SCROLL_LOAD = 10
const cityList = [
  undefined,
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
      spots: [],
      isFetching: false,
      hasMoreDataToFetch: true,
    }
  }

  // 滑動時檢查是否到達最底，是則載入新資料
  checkScrollPosition = async (e) => {
    if (!this.state.hasMoreDataToFetch) return // 若已經沒有新資料可抓取，則不需檢查了

    const { offsetHeight, scrollTop, scrollHeight } = e.target
    if (offsetHeight + scrollTop >= scrollHeight && !this.state.isFetching) {
      this.setState({ isFetching: true })
      try {
        await this.fetchMoreData()
      } catch (error) {
        console.error(error)
      }
      this.setState({ isFetching: false })
    }
  }

  // 首次抓取資料時，先設定特定城市or全部
  fetchFirstData = async () => {
    if (this.props.match.params.city) {
      this.getData = function (skip, numOfScenicSpot) {
        return getScenicSpot(skip, numOfScenicSpot, this.props.match.params.city)
      }
    } else {
      this.getData = getScenicSpot
    }
    const scenicSpots = await this.getData(0, NUM_OF_FIRST_LOAD)
    this.setState({ spots: scenicSpots })
    if (scenicSpots.length < NUM_OF_FIRST_LOAD) {
      this.setState({ hasMoreDataToFetch: false })
    }
  }

  // 取得更多資料
  fetchMoreData = async () => {
    const scenicSpots = await this.getData(this.state.spots.length, NUM_OF_SCROLL_LOAD)
    if (scenicSpots.length) {
      this.setState({ spots: [...this.state.spots, ...scenicSpots] })
      if (scenicSpots.length < NUM_OF_SCROLL_LOAD) {
        this.setState({ hasMoreDataToFetch: false })
      }
    } else {
      this.setState({ hasMoreDataToFetch: false })
    }
  }

  async componentDidMount() {
    this.fetchFirstData()
  }

  // 檢查是否換了不同的地區
  async componentDidUpdate(prevProps) {
    const oldCity = prevProps.match.params.city
    const newCity = this.props.match.params.city

    if (oldCity !== newCity) {
      this.fetchFirstData()
      this.setState({ hasMoreDataToFetch: true })
    }
  }

  render() {
    // 確認城市名稱是正確的
    if (cityList.includes(this.props.match.params.city)) {
      const ScenicSpotList = this.state.spots.map((spot) => {
        return <ScenicSpotListItem key={spot.ID} spot={spot} />
      })

      const isLoading = this.state.isFetching || this.state.spots.length === 0

      return (
        <div className="scenicSpot">
          <ul onScroll={this.checkScrollPosition} style={{ height: '90vh', overflow: 'auto' }}>
            {ScenicSpotList}
            {this.state.hasMoreDataToFetch && <LoadingStatus isLoading={isLoading} />}
          </ul>
        </div>
      )
    } else {
      return <NotFound />
    }
  }
}

export default ScenicSpot
