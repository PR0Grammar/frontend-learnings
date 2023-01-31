## Sources
- https://medium.com/@saravanaeswari22/microtasks-and-macro-tasks-in-event-loop-7b408b2949e0
- https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide

# Tasks and Microtasks



## Tasks

- A **task** ("macrotask") is any JS code which is scheduled to be run by the standard mechanisms such as initially starting to run a porgram, an event callback being run, or an interval or timeout being fired. These all get scheduled on the **task queue**.

- Tasks are added to the task queue when/for:
    - A new JS program or subprogramis executed directly
    - An event fires, adding the event's callback function to the task queue
    - setTimeout and setInterval callbacks

- The event loop driving the code handles these tasks in order, FCFS. The oldest runnable task in the task queue will be executed during a single iteration of the event loop. After that, microtasks are executed until the microtask queue is empty, at which point the
browser may choose to update rendering (then the browser moves on to the next iteration of the event loop, etc)

## Microtasks

- A **microtask** is a short function which is executed after the function or program which created it exits and **only if** the JS execution stack is empty, but before returning control to the event loop being used by the *user agent*
    - NOTE: Most developers won't use microtasks much, if at all.

- Examples of microtask utilization:
    - Promises
    - Mutation Observer API

- In order to queue your own microtask, you can call `queueMicrotask()` from the `Window` or `Worker` interfaces.

```JS
queueMicrotask(() => {
  /* code to run in the microtask here */
});
```

- How are they different from macrotasks?:
    1. Each time a macrotask exits, the event loop checks to see if the task is returning control to other JS code. If not, it runs all of the microtasks in the microtasks queue. The microtasks queue therefore can be processed multiple times per iteration of the event loop
    2. If a microtask adds more microtasks to the queue calling `queueMicrotask()`, those newly added microtasks execute **before the next task is run**. That's because the event loop will flush the entire microtask queue before moving on.


### When to use microtasks

