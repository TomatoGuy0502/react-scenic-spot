import React from 'react'

function LoadingStatus({ isLoading }) {
  const loadingStatus = isLoading ? '載入中' : '下滑至底載入更多資料'

  return <li className="list-group-item text-center">{loadingStatus}</li>
}

export default LoadingStatus
