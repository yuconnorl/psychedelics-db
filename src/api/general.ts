// export const getAllRecords = async (limit = 100) => {
//   const map = {}
//   const req = await fetch(`${process.env.PAYLOAD_CMS_URL}?limit=${limit}`)
//   const data = await req.json()

//   data?.docs.forEach(record => {
//     if (map[record.category]) {
//       map[record.category].push(record)
//     } else {
//       map[record.category] = [record]
//     }
//   })

//   return map
// }

export const getAllRecords = async (limit = 100) => {
  const req = await fetch(`${process.env.PAYLOAD_CMS_URL}?limit=${limit}`)
  const data = await req.json()

  return data?.docs
}