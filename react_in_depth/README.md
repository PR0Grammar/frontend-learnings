# React In Depth

### Resourecs
- [Main React Docs](https://reactjs.org/docs/code-splitting.html)
- [In Depth Dev](https://indepth.dev/react)


## Virtual DOM

- The virtual DOM (VDOM) is a programming concept where an "virtual" representation of a UI is kept in memory and synced with the "real" DOM (for React - ReactDOM)

- VDOM enables the declartive API of React - you tell React what state you want the UI to be in and the VDOM ensures the DOM matches that state. This abstracts out the attribute manipulation, event handling and manual DOM updating.

- VDOM is usually assosicated with React elements in the React world since they are the objects representing the UI. React also uses internal objects called "fibers" to hold metadata about the component tree - which can be considered also part of the VDOM


### Why VDOM?

- Aside from the benefit of working with a representation the UI using React specific paradigms, operating directly on the DOM is something that shouldn't be done more often than required as its a _slow_ process. Manipulating the VDOM are much faster because nothing is gets drawn onscreen. The VDOM can take ownership of determining what content has actually changed, then perform in modifications to the real DOM in one go.


### FiberTree and FiberNodes