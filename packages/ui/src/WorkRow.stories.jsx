import WorkRow from './WorkRow.jsx';
import { workSample, workSampleShort } from './fixtures.js';

export default {
  title: 'Work/Row (layout A — ledger)',
  component: WorkRow,
};

export const WithManyStats = { args: workSample };
export const WithTwoStats = { args: workSampleShort };
export const LongBody = {
  args: {
    ...workSampleShort,
    body:
      'Expected behaviour was captured from the reference system with test data and frozen as an executable ' +
      'oracle — inputs, actions, expected numbers, unchanged. "Does the reimplementation behave the same" ' +
      'therefore became a machine-checkable regression instead of two screens compared by eye, which is the ' +
      'difference between a demo and something a team can maintain.',
  },
};
