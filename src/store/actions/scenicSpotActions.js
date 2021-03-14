export const saveScenicSpot = (city, newData) => {
  return {
    type: 'SAVE_SCENIC_SPOT',
    city,
    newData,
  }
}

export const updateCityInfo = (city, hasMoreDataToFetch) => {
  return {
    type: 'UPDATE_CITY_INFO',
    city,
    hasMoreDataToFetch,
  }
}
