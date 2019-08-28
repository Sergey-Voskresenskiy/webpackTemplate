#  Webpack template for simple layouts

```npm run dev``` - for start work (with webpack-dashboard :fire:)

```npm run build``` - for start build

----------

## Dependencies

>  jquery

>  lazyload

>  reset-css

----------

######💬 How to use lazy image loading 💬
- use the code below without changing "src"
- put a patch to an image to data-src=" "
````
<img class='lazyload' data-src='hereYouImage' src='data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=' alt=''>
````


######💬 How to use svg sprites 💬
- put the name of the SVG file in "href" after #

````
<svg><use xlink:href="#"></use></svg>
````
