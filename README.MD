#  Webpack template for simple layouts
----------
package.json 
```json
"scripts": {"dev": "webpack-dashboard -c -t ...
```
![screenshot webpack-dashboard -c -m -t](screenshot.png)

----------
package.json 
```json
"scripts": {"dev": "webpack-dashboard -c -m -t ...
```
![screenshot webpack-dashboard -c -t](screenshot2.png)

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
<img class='lazyload' data-src='hereYouImage' src='data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=' alt=''>
```
app.js
```javascript
  lazyload();
```


###### 💬 How to use svg sprites 💬
- put the name of the SVG file in "href" after #

```html
<svg><use xlink:href="#"></use></svg>
```
