import { NextResponse } from 'next/server'

async function fetchJSON(url: string) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${res.statusText}`)
  return res.json()
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const subjectParam = url.searchParams.get('subject')

    const fallbackSubjects = [
      'fiction',
      'science_fiction',
      'fantasy',
      'mystery',
      'romance',
      'history',
      'art',
      'biography',
      'children',
      'young_adult',
      'poetry',
    ]

    const subject = subjectParam || fallbackSubjects[Math.floor(Math.random() * fallbackSubjects.length)]
    const base = `https://openlibrary.org/subjects/${encodeURIComponent(subject)}.json`

    // First request to learn how many works exist for the subject
    const info = await fetchJSON(`${base}?limit=1&offset=0`)
    const workCount = info.work_count ?? (info.works ? info.works.length : 0)

    if (!workCount || workCount <= 0) {
      return NextResponse.json({ error: 'No works found for subject' }, { status: 404 })
    }

    // Pick a random offset and fetch a single work
    const rand = Math.floor(Math.random() * workCount)
    const pick = await fetchJSON(`${base}?limit=1&offset=${rand}`)
    const work = (pick.works && pick.works[0]) || null

    if (!work) return NextResponse.json({ error: 'No work returned' }, { status: 404 })

    const cover = work.cover_id ? `https://covers.openlibrary.org/b/id/${work.cover_id}-L.jpg` : null
    const authors = (work.authors || []).map((a: any) => a.name)

    return NextResponse.json({
      subject,
      work: {
        title: work.title,
        key: work.key,
        authors,
        cover,
        edition_count: work.edition_count,
        seed_offset: rand,
      },
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Unknown error' }, { status: 500 })
  }
}
