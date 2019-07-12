---
title: visual regression tests
author: felixroos
authorURL: https://github.com/felixroos
authorImageURL: https://avatars2.githubusercontent.com/u/12023032?s=460&v=4
---

ec.components now use visual regression testing

## What

Using [puppeteer](https://pptr.dev/) with [jest-image-snapshot](https://www.npmjs.com/package/jest-image-snapshot), the components are now able to track pixel differences via automated screenshots.

The generated screenshots are then also used in the docs to always show the latest look!

The two tasks are new:

- ```test:screenshots``` takes new screenshots and compares them to the existing snapshots
- ```test:screenshots-update``` overrides snapshots with current state (without testing)

<!--truncate-->

## How

This is how its done:

```js
const puppeteer = require('puppeteer');
const { toMatchImageSnapshot } = require('jest-image-snapshot');
expect.extend({ toMatchImageSnapshot });
const fs = require('fs');
const testDir = '../website/static/img/screenshots';

async function takeAndCompareScreenshot(page, route, filePrefix) {
  let fileName = filePrefix + '/' + (route ? route : 'index').replace('/', '--');
  await page.goto(`https://127.0.0.1:1337/${route}?e=1`);
  const filePath = `${testDir}/${fileName}.png`;
  await page.screenshot({ path: filePath });
  const img = fs.readFileSync(filePath);
  expect(img).toMatchImageSnapshot({ customSnapshotsDir: './snapshots', customDiffDir: './diffs' });
}

describe('Screenshot test', function() {
  let browser, page;
  beforeAll(async () => {
    if (!fs.existsSync(testDir)) fs.mkdirSync(testDir);
    if (!fs.existsSync(`${testDir}/wide`)) fs.mkdirSync(`${testDir}/wide`);
    if (!fs.existsSync(`${testDir}/narrow`)) fs.mkdirSync(`${testDir}/narrow`);
    return true;
  });

  beforeEach(async function() {
    browser = await puppeteer.launch({
      ignoreHTTPSErrors: true,
    });
    page = await browser.newPage();
  });

  afterEach(() => browser.close());

  describe('wide screen', function() {
    beforeEach(async () => page.setViewport({ width: 800, height: 600 }));
    it('/ui/icons', async () => takeAndCompareScreenshot(page, 'ui/icons', 'wide'));
    it('/ui/list-basic', async () => takeAndCompareScreenshot(page, 'ui/list-basic', 'wide'));
    it('/ui/list-transforms', async () => takeAndCompareScreenshot(page, 'ui/list-transforms', 'wide'));
    it('/ui/list-pagination', async () => takeAndCompareScreenshot(page, 'ui/list-pagination', 'wide'));
    it('/ui/form', async () => takeAndCompareScreenshot(page, 'ui/form', 'wide'));
    it('/ui/select', async () => takeAndCompareScreenshot(page, 'ui/select', 'wide'));
    it('/ui/datetime', async () => takeAndCompareScreenshot(page, 'ui/datetime', 'wide'));
    it('/ui/login-form', async () => takeAndCompareScreenshot(page, 'ui/login-form', 'wide'));
  });

  describe('narrow screen', function() {
    beforeEach(async () => page.setViewport({ width: 375, height: 667 }));
    it('/ui/list-basic', async () => takeAndCompareScreenshot(page, 'ui/list-basic', 'narrow'));
  });
});
```

inspired by [Atomatic visual diffing with Puppeteer](https://meowni.ca/posts/2017-puppeteer-tests/).