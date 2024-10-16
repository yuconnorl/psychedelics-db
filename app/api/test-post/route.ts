import { NextResponse } from 'next/server'

export async function POST(): Promise<NextResponse> {
  const resp = await fetch('https://sci-hub.se/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'request=10.1016/j.drugalcdep.2006.04.001',
  })

  console.log(resp)
  return NextResponse.json({ success: true })
}
