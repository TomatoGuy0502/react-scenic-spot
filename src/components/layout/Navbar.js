import React, { Component } from 'react'
import { withRouter, matchPath } from 'react-router-dom'

const cities = [
  { value: 'default', name: '請選擇範圍' },
  { value: '', name: '全台景點 Taiwan' },
  { value: 'Taipei', name: '臺北市 Taipei' },
  { value: 'NewTaipei', name: '新北市 NewTaipei' },
  { value: 'Taoyuan', name: '桃園市 Taoyuan' },
  { value: 'Taichung', name: '臺中市 Taichung' },
  { value: 'Tainan', name: '臺南市 Tainan' },
  { value: 'Kaohsiung', name: '高雄市 Kaohsiung' },
  { value: 'Keelung', name: '基隆市 Keelung' },
  { value: 'Hsinchu', name: '新竹市 Hsinchu' },
  { value: 'HsinchuCounty', name: '新竹縣 HsinchuCounty' },
  { value: 'MiaoliCounty', name: '苗栗縣 MiaoliCounty' },
  { value: 'ChanghuaCounty', name: '彰化縣 ChanghuaCounty' },
  { value: 'NantouCounty', name: '南投縣 NantouCounty' },
  { value: 'YunlinCounty', name: '雲林縣 YunlinCounty' },
  { value: 'ChiayiCounty', name: '嘉義縣 ChiayiCounty' },
  { value: 'Chiayi', name: '嘉義市 Chiayi' },
  { value: 'PingtungCounty', name: '屏東縣 PingtungCounty' },
  { value: 'YilanCounty', name: '宜蘭縣 YilanCounty' },
  { value: 'HualienCounty', name: '花蓮縣 HualienCounty' },
  { value: 'TaitungCounty', name: '臺東縣 TaitungCounty' },
  { value: 'KinmenCounty', name: '金門縣 KinmenCounty' },
  { value: 'PenghuCounty', name: '澎湖縣 PenghuCounty' },
  { value: 'LienchiangCounty', name: '連江縣 LienchiangCounty' },
]

class Navbar extends Component {
  state = {
    selectedCity: '',
  }

  // 選擇特定城市
  handleSelectCity = (e) => {
    this.setState({ selectedCity: e.target.value })
    this.props.history.push(`/scenicSpot/${e.target.value}`)
  }

  // 選擇所有城市
  selectAllCity = (e) => {
    this.setState({ selectedCity: '' })
    this.props.history.push('/scenicSpot')
  }

  // 首次進入時，依照url更新選項
  componentDidMount() {
    const match = matchPath(window.location.pathname, {
      path: '/scenicSpot/:city?',
    })
    if (match) {
      this.setState({ selectedCity: match.params.city })
    } else {
      this.setState({ selectedCity: 'default' })
    }
  }

  render() {
    const cityOptions = cities.map((city) => {
      return (
        <option
          value={city.value}
          key={city.value}
          disabled={city.value === 'default' ? true : null}
        >
          {city.name}
        </option>
      )
    })

    return (
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <select
                className="form-select"
                id="citySelect"
                onChange={this.handleSelectCity}
                value={this.state.selectedCity}
              >
                {cityOptions}
              </select>
            </div>
            <div className="col">
              <input type="text" className="form-control" placeholder="篩選景點名稱" />
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default withRouter(Navbar)
