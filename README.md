# osagai-time 🕰🌎
Formats the timestamp as a localized string in the user's browser.

## Install

### Package managers

#### npm

```
npm install osagai-time
```

#### yarn

```
yarn add osagai-time
```

### CDN

#### Javascript Module

```javascript
import 'https://unpkg.com/osagai-time@0.1.0/dist/osagai-time.mjs'
```

#### Script tag
```html
<script src="https://unpkg.com/osagai-time@0.1.0/dist/osagai-time.umd.js"></script>

```

## Usage

```html
<local-time
  datetime="2019-01-01T16:30:00-08:00"
  month="short"
  day="numeric"
  year="numeric"
  hour="numeric"
  minute="numeric"
>
  January 2, 2019 4:30PM PDT
</local-time>
```

**Result**: `2 Jan 2019 01:30`


## See Also

The implementation is just a translation of custom elements from [github/time-elements](https://github.com/github/time-elements)
into Osagai components. Thanks to @github for open-sourcing [amazing custom elements](https://github.com/search?q=topic%3Acustom-elements+org%3Agithub+fork%3Atrue)
allowing that work.
