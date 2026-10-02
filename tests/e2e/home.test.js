const { Builder, By, until } = require('selenium-webdriver');

describe('home page', () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder()
      .usingServer(process.env.SELENIUM_REMOTE_URL || 'http://127.0.0.1:7900/')
      .forBrowser('chrome')
      .build();
  });

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  test('Hello DevOps', async () => {
    await driver.get(process.env.APP_URL || 'http://127.0.0.1:3000');
    const header = await driver.wait(until.elementLocated(By.css('h1')), 10000);

    await driver.wait(until.elementIsVisible(header), 10000);
    await expect(header.getText()).resolves.toBe('Hello DevOps');
  });
});
