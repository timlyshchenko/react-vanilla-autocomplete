## Questions
1. PureComponent implements shouldComponentUpdate method with a shallow prop and state comparison and Component does not. This can prevent unnecessary re-renders if the props and state of the component have not changed.
2. With React Context we can pass data through the component tree without having to pass props down manually at every level. Maybe shouldComponentUpdate can lead to components updating issues, as the context change might not trigger a re-render, but I haven’t seen this issue never and there will be no issues like this when we use useContext.
3. There are three ways to pass information from a component to its parent:
- Events / Callback functions: the child component passes a function to the parent component as a prop, and the parent component can call that function with the necessary information.
  Also, events can be triggered from the child component, while parent can also listen to it.
- Context: the child component can update a value in the context, and the parent component can read that value from the context.
- Refs: technically possible to use refs for passing information from child to parent, it's better to use a callback function passed from the parent to the child as a prop to pass data back up the component tree. This ensures that the data flow remains unidirectional and avoids potential issues with state management and re-renders.
4. Two ways to prevent components from re-rendering are:
   - Earlier it was possible by shouldComponentUpdate or PureComponent
   - Using React.memo to memoize a component and prevent it from re-rendering unless its props have changed.
5. A fragment is used to group a list of children without adding any DOM elements. It is useful when you want to return multiple elements from a component, but they need to be wrapped in a parent element. It might break the app if you will pass some props to it, other than `key` or maybe if a fragment is used as a top-level element in a component that should only return a single element, but i am not sure.
6. Three examples of the HOC (Higher Order Component) pattern are:
   - withLoading/withData: a component that wraps another component and fetches data for it.
   - withTheme: a component that wraps another component and provides theme information to it.
   - withAuth: a component that wraps another component and provides authentication information to it.
7. Promises, callbacks, and async/await are all used to handle asynchronous operations in JavaScript. With promises and async/await, you can use the try/catch syntax to catch exceptions, while with callbacks, you need to pass an error argument to the callback function to handle exceptions. But async await returns a promise so you can handle errors in a promise-like way in this case also.
8. Legacy setState takes two arguments: an object that represents the new state, and an optional callback function that is called after the state has been updated. It is asynchronous because React may batch multiple state updates together for performance reasons, and therefore the new state may not be immediately available after setState is called. However, useState receives only one argument, but remains asynchronous.
9. To migrate a class to a function component, you need to:
   - Remove the class declaration and extend from React.Component
   - Replace the render method with a function that returns JSX
   - Remove the constructor and move any initialization code to useState or useEffect hooks
   - Remove lifecycle methods and replace them with useEffect hooks
   - Replace this.props and this.state with props and state variables
   - Remove the render method and export the component as a function
10. Styles can be used with components in several ways:
- Inline styles: you can add a style object as a prop to a component and apply it inline using the style attribute (not recommended in most cases, cause it looks messy)
- CSS modules: you can use a preprocessor like CSS modules to generate unique class names for each component and import them in the component's file
- Styled components: you can use a library like styled-components to define styles directly
- CSS in JS: we can use CSS-like styling in JS. Styles in React Native is written like this, but you can use it in other cases too
- LESS/SASS preprocessors: a more enhanced version of CSS with many features and is compiled into CSS
- Some 3rd party library like bootstrap or tailwind
11. To render an HTML string coming from the server, you can use the **`dangerouslySetInnerHTML`**
   prop in React. This prop allows you to set the HTML of a component using an object with a **`__html`** property. However, it is highly recommended to receive HTML strings only from trusted services to avoid XSS.