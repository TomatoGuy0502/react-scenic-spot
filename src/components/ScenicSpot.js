import React, { Component } from 'react'
import { getScenicSpot } from '../api/scenicSpot'
import ScenicSpotListItem from './ScenicSpotListItem'
import LoadingStatus from './LoadingStatus'

const NUM_OF_FIRST_LOAD = 10
const NUM_OF_SCROLL_LOAD = 10

class ScenicSpot extends Component {
  constructor(props) {
    super(props)

    this.state = {
      spots: [],
      isFetching: false,
    }
  }

  // 滑動時檢查是否到達最底，是則載入新資料
  checkScrollPosition = async (e) => {
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
  }

  // 取得更多資料
  fetchMoreData = async () => {
    const scenicSpots = await this.getData(this.state.spots.length, NUM_OF_SCROLL_LOAD)
    this.setState({ spots: [...this.state.spots, ...scenicSpots] })
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
    }
  }

  render() {
    const ScenicSpotList = this.state.spots.map((spot) => {
      return <ScenicSpotListItem key={spot.ID} spot={spot} />
    })

    return (
      <div className="scenicSpot">
        <ul onScroll={this.checkScrollPosition} style={{ height: '90vh', overflow: 'auto' }}>
          {ScenicSpotList}
          <LoadingStatus />
        </ul>
      </div>
    )
  }
}

export default ScenicSpot
