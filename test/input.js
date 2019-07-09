import test from 'ava'
import { each } from 'test-each'

import { snapshotTest } from './helpers/snapshot.js'
import { METHODS } from './helpers/methods.js'

each(
  METHODS,
  [{ command: true }, { command: ' ' }],
  ({ title }, methodProps, data) =>
    test(`Invalid command | ${title}`, t =>
      snapshotTest({ t, methodProps, data })),
)

each(
  METHODS,
  [{ opts: { uid: 0.5 } }, { command: 'invalid', read: false }],
  ({ title }, methodProps, data) =>
    test(`Errored command | ${title}`, t =>
      snapshotTest({ t, methodProps, data })),
)
