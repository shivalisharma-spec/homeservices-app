const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function testLogin() {

    // Force stable Chrome session
    let options = new chrome.Options();

    options.addArguments('--start-maximized');

    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    try {
        console.log("Opening app...");

        await driver.get('http://127.0.0.1:8080');

        await driver.sleep(3000);

        console.log("Filling form...");

        await driver.findElement(By.css('input[placeholder="Enter email"]'))
            .sendKeys('test@gmail.com');

        await driver.findElement(By.css('input[placeholder="Enter password"]'))
            .sendKeys('123456');

        await driver.findElement(By.xpath("//button[contains(text(),'Login')]"))
            .click();

        console.log("Login clicked");

        await driver.sleep(5000);

    } catch (err) {
        console.log("ERROR:", err.message);
    } finally {
        await driver.quit();
    }
})();