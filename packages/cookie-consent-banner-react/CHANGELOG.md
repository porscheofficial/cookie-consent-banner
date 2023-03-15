# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [3.1.2](https://github.com/porscheofficial/cookie-consent-banner/compare/v3.1.1...v3.1.2) (2023-03-15)


### Bug Fixes

* correctly identify empty cookie value | fix [#12](https://github.com/porscheofficial/cookie-consent-banner/issues/12) ([c3c3a66](https://github.com/porscheofficial/cookie-consent-banner/commit/c3c3a661fea8f865fe48088ccb127af80a85b446)) – thanks @diesieben07!

### [3.1.1](https://github.com/porscheofficial/cookie-consent-banner/compare/v3.0.1...v3.1.1) (2023-02-23)

- upgrade dependencies

### [3.0.1](https://github.com/porscheofficial/cookie-consent-banner/compare/v3.0.0...v3.0.1) (2022-09-06)

### Bug Fixes

- better support vite (fixes [#9](https://github.com/porscheofficial/cookie-consent-banner/issues/9)) ([a784314](https://github.com/porscheofficial/cookie-consent-banner/commit/a7843149dc27c769b589771246f177148fa2f626))

## [3.0.0](https://github.com/porscheofficial/cookie-consent-banner/compare/v2.1.3...v3.0.0) (2022-07-18)

### ⚠ BREAKING CHANGES

- 🧨 Cookie Banner wont be shown immediately to prevent impact on LCP

### Features

- 🎸 add convenience function triggerCookieConsentBanner ([bc5b7f0](https://github.com/porscheofficial/cookie-consent-banner/commit/bc5b7f06f0df7f537b9c7180bd0e82e03dfb74b9))
- 🎸 slideup banner after init to prevent issues with LCP ([460f833](https://github.com/porscheofficial/cookie-consent-banner/commit/460f833b76f2ce1b116301cbbb226cf9f318ff42)), closes [#7](https://github.com/porscheofficial/cookie-consent-banner/issues/7)

### [2.1.3](https://github.com/porscheofficial/cookie-consent-banner/compare/v2.1.2...v2.1.3) (2022-01-21)

### Bug Fixes

- 🐛 add cursor:pointer to button ([1ba9475](https://github.com/porscheofficial/cookie-consent-banner/commit/1ba94752c7bb59e455722df512816534acf91cb9))

### [2.1.2](https://github.com/porscheofficial/cookie-consent-banner/compare/v2.1.1...v2.1.2) (2022-01-19)

### Bug Fixes

- 🐛 include src on distributed packages ([fce65ac](https://github.com/porscheofficial/cookie-consent-banner/commit/fce65ac9d20d1665bafdc982dfd905ecabd8d9ae))

### [2.1.1](https://github.com/porscheofficial/cookie-consent-banner/compare/v2.1.0...v2.1.1) (2022-01-17)

### Bug Fixes

- 🐛 correctly handle click on essentialsOnly ([c1c3963](https://github.com/porscheofficial/cookie-consent-banner/commit/c1c3963dfda3a9c138e6c4db859e65875fdfa17f)), closes [#3](https://github.com/porscheofficial/cookie-consent-banner/issues/3)

## [2.1.0](https://github.com/porscheofficial/cookie-consent-banner/compare/v2.0.1...v2.1.0) (2021-12-15)

### Features

- 🎸 forward a, p and label styles to slot ([47d86c5](https://github.com/porscheofficial/cookie-consent-banner/commit/47d86c540cfb1649b03cadb780ac295cf4ac4045))

### Bug Fixes

- 🐛 revert to stencil 2.11 ([183eef7](https://github.com/porscheofficial/cookie-consent-banner/commit/183eef76b38bfdf8ecff55a43e0366c9bd807eaa))

### [2.0.1](https://github.com/porscheofficial/cookie-consent-banner/compare/v2.0.0...v2.0.1) (2021-12-15)

### Bug Fixes

- 🐛 revert stencil upgrade ([f2490f0](https://github.com/porscheofficial/cookie-consent-banner/commit/f2490f0bd8e183bce50477981cda8de178eb4d4c))

## [2.0.0](https://github.com/porscheofficial/cookie-consent-banner/compare/v1.1.1...v2.0.0) (2021-12-15)

### ⚠ BREAKING CHANGES

- 🧨 `btnLabelAllAndContinue` is now `btnLabelPersistSelectionAndContinue`

### Features

- 🎸 add label `btnLabelPersistSelectionAndContinue` ([c663a16](https://github.com/porscheofficial/cookie-consent-banner/commit/c663a16e08417e06b9561472979b3980d0224e99))

### Bug Fixes

- 🐛 fix type of custom event ([7cdaee1](https://github.com/porscheofficial/cookie-consent-banner/commit/7cdaee12628cd755ada707eb2a44bdc2f2b6d916))

### [1.1.1](https://github.com/porscheofficial/cookie-consent-banner/compare/v1.1.0...v1.1.1) (2021-10-01)

## [1.1.0](https://github.com/porscheofficial/cookie-consent-banner/compare/v1.0.0...v1.1.0) (2021-10-01)

### Features

- 🎸 update NOTICE.md ([ac0de58](https://github.com/porscheofficial/cookie-consent-banner/commit/ac0de58631006e4d0fdf2d5fb15252bebf2d6fa1))
