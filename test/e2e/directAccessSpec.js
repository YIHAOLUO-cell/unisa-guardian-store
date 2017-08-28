'use strict'

const config = require('config')
let blueprint
for (let i = 0; i < config.get('products').length; i++) {
  const product = config.get('products')[ i ]
  if (product.fileForRetrieveBlueprintChallenge) {
    blueprint = product.fileForRetrieveBlueprintChallenge
    break
  }
}

describe('/', () => {
  describe('challenge "easterEgg2"', () => {
    it('should be able to access "secret" url for easter egg', () => {
      browser.driver.get(browser.baseUrl + '/the/devs/are/so/funny/they/hid/an/easter/egg/within/the/easter/egg')
    })

    protractor.expect.challengeSolved({challenge: 'Easter Egg Tier 2'})
  })

  describe('challenge "premiumPaywall"', () => {
    it('should be able to access "super secret" url for premium content', () => {
      browser.driver.get(browser.baseUrl + '/this/page/is/hidden/behind/an/incredibly/high/paywall/that/could/only/be/unlocked/by/sending/1btc/to/us')
    })

    protractor.expect.challengeSolved({challenge: 'Premium Paywall'})
  })

  describe('challenge "geocitiesTheme"', () => {
    it('should be possible to change the CSS theme to geo-bootstrap', () => {
      browser.ignoreSynchronization = true
      browser.executeScript('document.getElementById("theme").setAttribute("href", "css/geo-bootstrap/swatch/bootstrap.css");')
      browser.driver.sleep(2000)

      browser.get('/#/search')
      browser.driver.sleep(1000)
      browser.ignoreSynchronization = false
    })

    protractor.expect.challengeSolved({challenge: 'Eye Candy'})
  })

  describe('challenge "extraLanguage"', () => {
    it('should be able to access the Klingon translation file', () => {
      browser.driver.get(browser.baseUrl + '/i18n/tlh.json')
    })

    protractor.expect.challengeSolved({challenge: 'Extra Language'})
  })

  describe('challenge "retrieveBlueprint"', () => {
    it('should be able to access the blueprint file', () => {
      browser.driver.get(browser.baseUrl + '/public/images/products/' + blueprint || 'JuiceShop.stl') // TODO remove this workaround default before v5.0 release
    })

    protractor.expect.challengeSolved({challenge: 'Retrieve Blueprint'})
  })
})
