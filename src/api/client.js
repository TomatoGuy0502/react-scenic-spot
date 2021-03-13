import axios from 'axios'
import jsSHA from 'jssha'

const getAuthorizationHeader = () => {
  const AppID = '6719c6e7e3564c948c45a978bc4a9fc2'
  const AppKey = 'tOl73VQNaCJmrbt_FvSSQnBM7JM'

  const GMTString = new Date().toGMTString()
  const ShaObj = new jsSHA('SHA-1', 'TEXT')
  ShaObj.setHMACKey(AppKey, 'TEXT')
  ShaObj.update('x-date: ' + GMTString)
  const HMAC = ShaObj.getHMAC('B64')
  const Authorization = `hmac username="${AppID}", algorithm="hmac-sha1", headers="x-date", signature="${HMAC}"`

  return { Authorization: Authorization, 'X-Date': GMTString }
}

const client = axios.create({
  baseURL: 'https://ptx.transportdata.tw/MOTC/v2',
  params: {
    format: 'JSON',
  },
})

client.interceptors.request.use(
  function (config) {
    config.headers = { ...config.headers, ...getAuthorizationHeader() }
    return config
  },
  null,
  { synchronous: true }
)

export default client
