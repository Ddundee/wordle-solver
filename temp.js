const { By, Builder } = require("selenium-webdriver");
const iohook = require('');

const func = async () => {
    let driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://www.selenium.dev/selenium/web/web-form.html');
    let title = await driver.getTitle();
    let textBox = await driver.findElement(By.name('my-text'));
    // let submitButton = await driver.findElement(By.className('btn-outline-primary'));
    await textBox.sendKeys('Selenium');
    // await submitButton.click();

    let value = await driver.findElement(By.name('my-text')).getText();
    console.log(value)
}
iohook.on("keypress", event => {
    console.log(event);
    // {keychar: 'f', keycode: 19, rawcode: 15, type: 'keypress'}
});
iohook.start();
