# Chapter 2 - Optimizing CSS

## Don't talk too much and stay DRY

### CSS Shorthands
- Use shorthand CSS - the least verbose properties and values where possible.

```CSS
p {
    font-family: "Arial";
    font-size: 0.75rem;
    font-style: italic;
}

/* VS */
p {
    font: itatlic 0.75rem "Arial";
}
```
- Obviously a small example like this doesn't appear like much, but scale this across a large web app, and it makes a difference!

### Use shallow CSS selectors

- **Shallowness** refers to the specificity of a CSS selector

- Overly specific CSS selectors are another bottleneck. In big style sheets, keeping CSS selectors brief can save space.

```CSS
div.x div.y div.z ul.genericList{
    width: 20px;
}

/*VS*/
.genericList {
    width: 20px
}

/* Obviously not applicable for one off cases, but generally should be used when possible*/
```
