import client from './client'

export const getScenicSpot = async (skip, numOfScenicSpot = 30, city = '') => {
  const res = await client.get(`/Tourism/ScenicSpot/${city}`, {
    params: {
      $skip: skip,
      $top: numOfScenicSpot,
    },
  })
  return res.data
}
