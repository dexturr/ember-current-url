# Changelog

## 0.1.2

New feature:
    - Change `assert.currentUrl` to be `assert.url`


## 0.1.1

Add codemod back in to README.md (with updated API)

## 0.1.0

**BREAKING CHANGES**:

```js
assert.currentUrl('url');
```

is now:

```js
assert.currentUrl.equals('url') ;
```

New features:
- Added `includes` assertion
- Added `hasQueryParameters` assertion
- Added `doesNotInclude` assertion
- Added `doesNotHaveQueryParameters` assertion

## 0.0.3

Put code mod into `README.md`

## 0.0.2

Tech task:
- Simplify build process

## 0.0.1

New features:
- Basic currentUrl assertion