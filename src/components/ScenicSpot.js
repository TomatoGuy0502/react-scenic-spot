import React, { Component } from 'react'
import { getScenicSpot } from '../api/scenicSpot'
import ScenicSpotListItem from './ScenicSpotListItem'
import LoadingStatus from './LoadingStatus'
import NotFound from './NotFound'
import { connect } from 'react-redux'
import { saveScenicSpot, updateCityInfo } from '../store/actions/scenicSpotActions'

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
      isFetching: false,
      hasMoreDataToFetch: true,
    }
    this.spotListRef = React.createRef()
  }

  // 滑動時檢查是否到達最底，是則載入新資料
  checkScrollPosition = async (e) => {
    if (!this.props.hasMoreDataToFetch) return // 若已經沒有新資料可抓取，則不需檢查了

    const { offsetHeight, scrollTop, scrollHeight } = e.target
    if (offsetHeight + scrollTop >= scrollHeight && !this.state.isFetching) {
      this.setState({ isFetching: true })
      try {
        await this.fetchData()
      } catch (error) {
        console.error(error)
      }
      this.setState({ isFetching: false })
    }
  }

  fetchData = async () => {
    // 先檢查是否還有資料可以抓取
    if (this.props.hasMoreDataToFetch) {
      // 檢查是首次抓取還是已經抓過資料，調整抓取的數量
      const numOfScenicSpotToFetch =
        this.props.spots.length === 0 ? NUM_OF_FIRST_LOAD : NUM_OF_SCROLL_LOAD

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
      this.fetchData()
    }
  }

  render() {
    // 確認城市名稱是正確的
    if (cityList.includes(this.props.city)) {
      const ScenicSpotList = this.props.spots.map((spot) => {
        return <ScenicSpotListItem key={spot.ID} spot={spot} />
      })
      console.log('重新render: ', this.props.city)

      const isLoading = this.state.isFetching || this.props.spots.length === 0

      return (
        <div className="scenicSpot">
          <ul
            onScroll={this.checkScrollPosition}
            ref={this.spotListRef}
            style={{ height: '90vh', overflow: 'auto' }}
          >
            {ScenicSpotList}
            {this.props.hasMoreDataToFetch && <LoadingStatus isLoading={isLoading} />}
          </ul>
        </div>
      )
    } else {
      return <NotFound />
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const city = ownProps.match.params.city
  return {
    spots: state.spots[city],
    hasMoreDataToFetch: state.hasMoreDataToFetch[city],
    city,
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
