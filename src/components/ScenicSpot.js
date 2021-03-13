import React, { Component } from 'react'
import { getScenicSpot } from '../api/scenicSpot'
import ScenicListItem from './ScenicListItem'
import LoadingStatus from './LoadingStatus'

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
        const scenicSpots = await getScenicSpot(this.state.spots.length, 10)
        this.setState({ spots: [...this.state.spots, ...scenicSpots] })
      } catch (error) {
        console.error(error)
      }
      this.setState({ isFetching: false })
    }
  }

  async componentDidMount() {
    const scenicSpots = await getScenicSpot(0, 10)
    this.setState({ spots: scenicSpots })
  }

  render() {
    const ScenicList = this.state.spots.map((spot) => {
      return <ScenicListItem key={spot.ID} spot={spot} />
    })

    return (
      <div className="scenicSpot">
        <ul
          onScroll={this.checkScrollPosition}
          style={{ height: '90vh', overflow: 'auto' }}
        >
          {ScenicList}
          <LoadingStatus />
        </ul>
      </div>
    )
  }
}

export default ScenicSpot
