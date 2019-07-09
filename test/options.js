import test from 'ava'
import testEach from 'test-each'

import { snapshotTest } from './helpers/snapshot.js'
import { METHODS } from './helpers/methods.js'

testEach(
  METHODS,
  [
    { opts: false },
    { opts: { cwd: false } },
    { opts: { env: false } },
    { opts: { argv0: false } },
    { opts: { stdio: false } },
    { opts: { detached: '' } },
    { opts: { uid: false } },
    { opts: { gid: false } },
    { opts: { shell: 0 } },
    { opts: { windowsVerbatimArguments: '' } },
    { opts: { windowsHide: '' } },
    { opts: { encoding: false } },
    { opts: { extendEnv: '' } },
    { opts: { stripFinalNewline: '' } },
    { opts: { preferLocal: '' } },
    { opts: { localDir: false } },
    { opts: { input: false } },
    { opts: { reject: '' } },
    { opts: { cleanup: '' } },
    { opts: { timeout: false } },
    { opts: { buffer: '' } },
    { opts: { maxBuffer: false } },
    { opts: { killSignal: false } },
    { opts: { stdin: false } },
    { opts: { stdout: false } },
    { opts: { stderr: false } },
    { opts: { invalid: false } },
    { opts: { result: 'invalid' } },
    { opts: { from: 'invalid' } },
  ],
  ({ title }, methodProps, data) =>
    test(`Invalid options | ${title}`, t =>
      snapshotTest({ t, methodProps, data })),
)

testEach(
  METHODS,
  [{ opts: { env: {} } }, { opts: { env: { test: true } } }],
  ({ title }, methodProps, data) =>
    test(`Valid options | ${title}`, t =>
      snapshotTest({ t, methodProps, data })),
)

testEach(METHODS, [{}, { opts: {} }], ({ title }, methodProps, data) =>
  test(`No options | ${title}`, t => snapshotTest({ t, methodProps, data })),
)

testEach(
  METHODS,
  [
    { command: 'gulp --version', opts: { env: { PATH: '' } } },
    {
      command: 'gulp --version',
      opts: { env: { PATH: '' }, preferLocal: false },
    },
  ],
  ({ title }, methodProps, data) =>
    test(`Default options | ${title}`, t =>
      snapshotTest({ t, methodProps, data })),
)
