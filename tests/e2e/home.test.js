const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

describe('Home Page E2E Test', () => {
  let driver;

  jest.setTimeout(30000);

  beforeAll(async () => {
    const seleniumUrl = process.env.SELENIUM_REMOTE_URL || 'http://selenium:4444/wd/hub';

    const options = new chrome.Options();
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');
    options.addArguments('--window-size=1280,800');

    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .usingServer(seleniumUrl)
      .build();
  });

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  it('should display Hello DevOps', async () => {
    const appUrl = process.env.APP_URL || 'http://jenkins:3000';

    await driver.get(appUrl);

    const header = await driver.wait(
      until.elementLocated(By.css('h1')),
      10000
    );

    const text = await header.getText();
    expect(text).toBe('Hello DevOps');
  });
});