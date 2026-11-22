import type { Register, SessionContextUsage, SessionRateLimit } from 'claude-code'

const k = (n: number) => (n >= 1000 ? `${Math.round(n / 100) / 10}k`.replace('.0k', 'k') : `${n}`)

const fmt = (context: SessionContextUsage, limits: SessionRateLimit[]): string | undefined => {
  const parts: string[] = []
  parts.push(`Context ${k(context.tokens ?? 0)}/${k(context.window)} (${context.percent ?? 0}%)`)
  const s = limits.find(l => l.kind === 'five_hour')
  const w = limits.find(l => l.kind === 'seven_day')
  if (s) {
    let t = `5h ${s.percentUsed}%`
    if (s.resetsAt) {
      const d = new Date(s.resetsAt)
      const hh = String(d.getHours()).padStart(2, '0')
      const mm = String(d.getMinutes()).padStart(2, '0')
      t += ` reset at ${hh}:${mm}`
    }
    parts.push(t)
  }
  if (w) parts.push(`week ${w.percentUsed}%`)
  return parts.join(' · ')
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    try {
      const u = await $.session.usage()
      $.ui.status(fmt(u.context, u.rateLimits))
    } catch {}
    return next(e)
  })

  on('session.measure', ($, e, next) => {
    $.ui.status(fmt(e.context, e.rateLimits))
    return next(e)
  })
}
