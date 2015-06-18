# ngKit sticky polyfill

Sticky element becomes fixed once the viewport is scrolled beyond
the top boundary of its parent; then once the viewport is scrolled
beyond the bottom boundary of its parent the sticky element becomes
released again.

This component relies on some stylesheets, both for the sticky element
and for its parent.

```html
<div class="has-sticky">
  <aside class="sidenav sticky"
    ui-sticky>
  </aside>
  <main>
  </main>
</div>
```

See `sticky.css` for example stylesheet.

You can additionally set yOffset (e.g. `ui-sticky="48"`),
this is handy if you have another fixed element (like fixed header).

## License

ISC / Boris Okunskiy
