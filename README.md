# Ultimate Boilerplate for Hugo

A set of packages for Hugo Static Site generator. Includes technologies such as
service worker, tailwindcss, poi bundler, analytics integration, etc.

## Customization

### Service Worker

#### Customizing External Resource

You can add some **external** scripts (which is always `network-first` style).

Go to `poi.config.js`

```js
module.exports = options => ({
  presets: [
    require('poi-preset-offline')({
      pwa: './resources/pwa.js',
      pluginOptions: {
        AppCache: false,
        // Customize this array with url that return any resource
        externals: [
          'https://source.unsplash.com/random/1200x630'
        ]
      }
    })
  ],
  // Other Code
})
```

### Analytics

#### Customizing Google Analytics ID

There are 2 places that you need to edit the Google Analytics ID

1. `index.html` file

```html
<!-- Just edit the UA-XXXXXXXX-X to your id -->

<!-- ...Previous Code -->

<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-XXXXXXXX-X"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-XXXXXXXX-X');
</script>

<!-- ... Next Code -->
```

2. `poi.config.js` file

If you need to precache the file. Update the id.

```js
module.exports = options => ({
  presets: [
    require('poi-preset-offline')({
      pwa: './resources/pwa.js',
      pluginOptions: {
        AppCache: false,
        // Update the id below
        externals: [
          'https://www.google-analytics.com/analytics.js?id=UA-XXXXXXXX-X'
        ]
      }
    })
  ],
  // Other Code
})
```

### CSS

#### Critical CSS

Since there's no built in `HTMLWebpackPlugin` like on Hugo,
you have to manually update the critical css files on each layout files. To make it easy, think about the **Application Shell Styles** instead of **Above the fold styles**

in `index.html`

```html
<style>
  /* Critical CSS */
</style>
<link rel="preload" href="/css/client.css" as="style" onload="this.rel = 'stylesheet'">
```
