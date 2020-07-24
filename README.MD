#  Webpack template for simple layouts
----------
package.json 
```json
"scripts": {"dev": "webpack-dashboard -t ...
```
![screenshot webpack-dashboard -t](screenshot.png)

----------
package.json 
```json
"scripts": {"dev": "webpack-dashboard -m -t ...
```
![screenshot webpack-dashboard -m -t](screenshot2.png)

----------
```npm run dev``` - for start work <i>(with webpack-dashboard)</i> :fire:

```npm run build``` - for start build

----------

## Dependencies

>  jQuery

>  lazyload

>  reset-css

----------

###### 💬 How to use lazy image loading 💬
- use the code below without changing "src"
- put a patch to an image to data-src=" "

html
```html
<img class='lazy' data-src='hereYouImage' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=' alt=''>
```
app.js
```javascript
  let lazyLoadInstance = new LazyLoad({elements_selector:".lazy"}); 
```


###### 💬 How to use svg sprites 💬
- put the name of the SVG file in "href" after #

```html
<svg><use xlink:href="#"></use></svg>
```
