## Refs
- https://developer.mozilla.org/en-US/docs/Web/Performance/Fundamentals


## Overview

### What is web perf?

- __Web performnace__ primarily refers to the speed at which a website loads. It's not exclusively speed of website loadups, but it's a huge component.

- __User perceived performance (UPP)__ is what really matters for users. Sight, touch, hearing - these feedbacks are what users experience in response to touch, movement, speech. 1M DB transactions/sec with bad UX may not be a better than 1K transactions/sec with smooth and responsive UX.

- We should still strive to optimize code in conjunction with user-perceived performance.

## Why perf matters?

- The obvious here is $$. Slower sites ultimately affect he bottom line (milliseconds matter!).

- Page speed is also a factor for page ranking for search engines like Google.

## Key Metrics

### Responsiveness

- How fast system provides output(s) in response to user input(s). There are usually multiple stages of feedback. 

- Resposiveness is important as it gives users a sense of "something is happening." Delays in responsiveness can frustrate users (eg. Did my order go through? Is my request processing? Should I reload the page?)

### Frame Rate

- __Frame rates__ is the rate at which the system chanes pixels displayed to users.

- It's important as a "quality of service" metric. Computer displays "fool" the user's eyes. As the brain infers what it sees, it "smooths" out the data.

- Most humans cannot preceive differences in frame rate above 60Hz.


### Memory Usage

- Memory usage is not directly perceived by the user, but it closely approximates "user state." 

- The counter-intuitive practice - a well designed system shoiuld use as much resources in its disposal as possible, including memory. As long its not as the cost of UPP, a system shouldn't keep resources ideal. That doesn't mean the system should just _waste_ memory.


### Power Usuage

- Power usage is also indirectly experienced by users. With meeting UPP goals, the system should strive to use only the __minimum__ power required.

## Platform performance optimizations

### Web technologies

- All application logic is written in JS. For displaying graphics, we use HTML or CSS. There are low level imperative inferfaces like `<canvas/>` and WebGL

- HTML+CSS are great for productivity with some expense of frame rateor pixel-level control. 

- `<cavas/>` offers a pixel buffer for developers to draw on, but at the cost of productivity

### Gecko Rendering

- The Gecko JS engine supports just-in-time (JIT) compilation. This enables application logic to perform comparably to other VMs (like Java VM).

- The graphics pipeline in Gecko that underpins HTML, CSS and Canvas is optimized.
    - Eg. reduced invalidation and repainting for frequent user events like scrolling, GPU utilization for complex scenes, auto-powersaving for simple scenes

- Startup performance is also optimized by Gecko
    - Eg. parallel HTML parsing, intelligent scheduling of reflows and image decoding, clever layout algorithms.


## Application Performances

- "How can i make my app fast?"

### Startup Performance

- There are three user-perceived events, generally speaking:
    - __First Paint__ - the point at which sufficient application resources have been loaded to pain an initial frame
    - __Interactive__ - When the app is interactive (eg. tap buttons and app responds)
    - __Full Load__ - All content for page is fully available

- For each case, we want to reduce the __critical path__ by simplifying what we need to achieve the event. 

- Waiting for reponses to requests is another bottleneck for startup - apps should issue requests as early as possible in startup ("front loading"). Then when data is needed later, it should hopefuly have it available. Local-caching also helps reduce the number of requests made. Local caching/offline apps can be achieved through __Service Workers__.

### Frame Rate

- Use HTML and CSS to implement fairly static, scrolled, and inanimate. Use Canvas for highly dynamic content, like games that need strict control over rendering

- With HTML, CSS, to achieve high frame rates, use the right primitives. Use static rendering instead of CSS radial gradient. Minimize devices that need fancy content using `media queries`.

### Memory and power usage

- Don't do unneeded work or lazily load infrequently used UI resources. Use efficient data structures and ensure resources like images are optimized well

- Modern CPUs can enter lower-power states when mostly idle. Minimize the number of timers, animations, events that fire, preventing the CPU from entering low power mode.

-- When applications are sent to the background, a [`visibilitychange`](https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilitychange_event) event is fired on the document. When set to `hidden`, pages can stop making UI updates and stop any tasks that the user doesn't want to have running in the background.

