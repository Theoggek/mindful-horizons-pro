
import esbuild from 'esbuild'
import { readFileSync } from 'node:fs'
const cfg = JSON.parse(readFileSync(new URL('./__blink_build__.json', import.meta.url), 'utf8'))
try {
  const result = await esbuild.build({ ...cfg, logLevel: 'silent' })
  if (result.errors?.length) {
    for (const e of result.errors) {
      const loc = e.location ? `${e.location.file}:${e.location.line}:${e.location.column}` : 'unknown'
      process.stderr.write(`✘ [ERROR] ${e.text}\n    ${loc}\n${e.location?.lineText ?? ''}\n\n`)
    }
    process.exit(1)
  }
  for (const w of result.warnings ?? []) {
    const loc = w.location ? `${w.location.file}:${w.location.line}:${w.location.column}` : 'unknown'
    process.stderr.write(`▲ [WARNING] ${w.text}\n    ${loc}\n\n`)
  }
} catch (err) {
  process.stderr.write(err && typeof err === 'object' && 'errors' in err && Array.isArray(err.errors)
    ? err.errors.map(e => `✘ [ERROR] ${e.text}\n    ${e.location?.file ?? 'unknown'}:${e.location?.line ?? 0}:${e.location?.column ?? 0}\n`).join('\n')
    : (err?.message ?? String(err)))
  process.exit(1)
}
