export const saveScenicSpot = (city = 'Taiwan', newData = []) => {
  return {
    type: 'SAVE_SCENIC_SPOT',
    city,
    newData,
  }
}

export const updateCityInfo = (city = 'Taiwan', hasMoreDataToFetch) => {
  return {
    type: 'UPDATE_CITY_INFO',
    city,
    hasMoreDataToFetch,
  }
}
