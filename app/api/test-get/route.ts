import { NextResponse } from 'next/server'
import pdf from 'pdf-parse'

export async function GET(): Promise<NextResponse> {
  console.log('????????55688')
  const response = await fetch(
    'https://sci-hub.se/10.1016/j.drugalcdep.2006.04.001',
  )
  const pdfBuffer = await response.arrayBuffer().then((buffer) => {
    // console.log('putin', buffer)
    const bufferz = pdf(buffer)
    console.log('bufferz', bufferz)

    return buffer
  })

  return NextResponse.json({ success: true, data: pdfBuffer })
}

// export async function GET(res): Promise<NextResponse> {
//   console.log('??????asdsad?')
//   const pdfResponse = await fetch(
//     'https://sci-hub.se/10.1016/j.drugalcdep.2006.04.001',
//   )

//   console.log('???????')

//   if (!pdfResponse.ok) {
//     throw new Error(`HTTP error! status: ${pdfResponse.status}`)
//   }

//   const pdfBuffer = await pdfResponse.arrayBuffer()
//   console.log('pdfBuffer', pdfBuffer)

//   const data = await pdf(Buffer.from(pdfBuffer))

//   console.log('data', data)
//   return NextResponse.json({ success: true })
// }

// export async function GET() {
//   let data = await fetch('https://api.vercel.app/blog')
//   let posts = await data.json()

//   return Response.json(posts)
// }
