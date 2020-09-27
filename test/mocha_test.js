/**
 * Test for getting started with Selenium.
 */
"use strict";

const assert = require("assert");
const test = require("selenium-webdriver/testing");
const webdriver = require("selenium-webdriver");
const firefox = require('selenium-webdriver/firefox');
const By = webdriver.By;

let browser;


function goToNavLink(target) {
    browser.findElement(By.linkText(target)).then(function(element) {
        element.click();
    });
}

function matchUrl(target) {
    browser.getCurrentUrl().then(function(url) {
        assert.ok(url.endsWith("/" + target));
    });
}

function assertElementByCss(elemnt, target) {
    browser.findElement(By.css(elemnt)).then(function(element) {
        element.getText().then(function(text) {
            assert.equal(text, target);
        });
    });
}

// Does not work with WSL!! Use cygwin

// Test suite
test.describe("React-me page", function() {
    test.beforeEach(function(done) {
        this.timeout(20000);
        browser = new webdriver.Builder()
            .withCapabilities(webdriver.Capabilities.firefox())
            .setFirefoxOptions(new firefox.Options().headless())
            .forBrowser('firefox')
            .build();

        browser.get("http://localhost:3000/");
        done();
    });

    test.afterEach(function(done) {
        browser.quit();
        done();
    });

    // Test case
    test.it("Test index", function(done) {
        browser.getTitle().then(function(title) {
            assert.equal(title, "Me-sida jsramverk");
        });

        assertElementByCss("h1", "Me sida i kursen jsramverk");
        matchUrl("");

        done();
    });

    test.it("Test go to Reports", function(done) {
        goToNavLink("Reports");

        matchUrl("reports");

        done();
    });

    test.it("Test go to register", function(done) {
        goToNavLink("Admin");

        goToNavLink("Registrera användare");

        // get h2 text
        assertElementByCss("h2", "Registrera användare");

        // check that the first label is E-post
        assertElementByCss("label", "E-Post");

        matchUrl("register");

        done();
    });

    test.it("Test go to Admin and then back to Me", function(done) {
        // try use nav link
        goToNavLink("Admin");

        assertElementByCss("h2", "Logga in");

        matchUrl("login");

        goToNavLink("Me");

        // assertElementByCss("h1", "Me sida i kursen jsramverk");

        matchUrl("");

        done();
    });
});
