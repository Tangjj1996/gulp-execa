import test from 'ava'
import execa from 'execa'

const GULPFILE = `${__dirname}/helpers/test.gulpfile.js`

const DATA = [
  // { method: 'exec', command: true },
  // { method: 'task', command: true },
  // { method: 'stream', command: true },
  // { method: 'stream', command: true, streamOpts: { buffer: false } },
  // { method: 'stream', command: true, streamOpts: { result: 'save' } },
  // { method: 'exec', command: ' ' },
  // { method: 'task', command: ' ' },
  // { method: 'stream', command: ' ' },
  // { method: 'stream', command: ' ', streamOpts: { buffer: false } },
  // { method: 'stream', command: ' ', streamOpts: { result: 'save' } },
  { method: 'stream', command: 'echo test', opts: { verbose: true }, streamOpts: { result: 'save' }, buffer: false },
]

DATA.forEach(datum => {
  test('Dummy test', async t => {
    const { exitCode, stdout, stderr } = await fireTask(datum)
    // eslint-disable-next-line no-restricted-globals, no-console
    console.log(exitCode)
    // eslint-disable-next-line no-restricted-globals, no-console
    console.log(stdout)
    // eslint-disable-next-line no-restricted-globals, no-console
    console.log(stderr)
    t.pass()
  })
})

const fireTask = async function({ method, command, opts, streamOpts, buffer }) {
  const input = JSON.stringify({ command, opts, streamOpts, buffer })
  const { exitCode, stdout, stderr } = await execa(`gulp --gulpfile ${GULPFILE} ${method}Func`, { reject: false, env: { INPUT: input } })
  const stdoutA = normalizeMessage(stdout)
  const stderrA = normalizeMessage(stderr)
  return { exitCode, stdout: stdoutA, stderr: stderrA }
}

// Normalize console messages for testing
export const normalizeMessage = function(message) {
  return REPLACEMENTS.reduce(replacePart, message)
}

const replacePart = function(message, [before, after]) {
  return message.replace(before, after)
}

const REPLACEMENTS = [
  // File paths
  [/[^ (\n]+\/[^ )\n]+/gu, '/path'],
  // Stack traces
  [/ +at [^]+/gu, '    at STACK TRACE'],
  // Gulp shows file content that triggered an error
  [/[^]+Error: /gu, ''],
  // Timestamps
  [/\[\d{2}:\d{2}:\d{2}\]/gu, '[12:00:00]'],
  // Duration
  [/(\d+\.)?\d+ [μnm]s/gu, '100 ms'],
]

