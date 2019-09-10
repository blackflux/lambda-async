const expect = require('chai').expect;
const { describe } = require('node-tdd');
const lambdaAsync = require('../src/index');

describe('Testing lambda-async', () => {
  let tester;
  before(() => {
    tester = (handler) => new Promise((resolve, reject) => lambdaAsync(handler)(
      { event: 'event' },
      { context: 'context' },
      (err, resp) => {
        if (err !== null) {
          reject(err);
        } else {
          resolve(resp);
        }
      }
    ));
  });

  it('Testing success (sync)', async () => {
    const expected = {};
    const result = await tester(() => expected);
    expect(result).to.equal(expected);
  });

  it('Testing success (async)', async () => {
    const expected = {};
    const result = await tester(() => Promise.resolve(expected));
    expect(result).to.equal(expected);
  });

  it('Testing error (sync)', async ({ capture }) => {
    const expected = {};
    const result = await capture(() => tester(() => {
      throw expected;
    }));
    expect(result).to.equal(expected);
  });

  it('Testing error (async)', async ({ capture }) => {
    const expected = {};
    const result = await capture(() => tester(() => Promise.reject(expected)));
    expect(result).to.equal(expected);
  });
});
