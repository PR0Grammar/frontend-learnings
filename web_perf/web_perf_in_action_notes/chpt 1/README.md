# [Chpt 1] - Understanding Web Performance

- Site load time can ultimately make or break the user engagement
    - 1s vs 2s can be all it takes for a user to give up

- Page speed is also factors into page ranking of popular search engines (eg. Google), determined by the crawler

## Latency and HTTP

- One of the primary measures of web perf is the __latency__ of the response from the server.
    - This means optimizations across time it takes to reach the server, how long the server takes to process the request, and amount of time it takes browser to download the request. Clearly we don't have full control of some of these things, but any improvements in this area can chip away in overall time.

- In HTTP/1, servers and browsers might be limited by __head-of-line blocking__, which occurs because the browser limits the number of erquests it will make at a single time (typically 6). When one or more of these requests are processing and others have finished, new requests for content are blocked until remaining requests are fulfilled
    - As of 2022, [HTTP/1 is still dominant](https://w3techs.com/technologies/overview/site_element).

- HTTP/2 largely solves head-of-line blocking. It's up to the servers to implement the protocol.

## Optimizing the client's website

- A client's website load time can differ not only becuase of the quality of its network connection, but also because of the characteristics of the device itself (excluding the obvious like CPU perfomance, device screen size can also factor in)

- When improving the performance of a website, the goal is simple: reduce the amount of data transferred. Regardless of underlying protocols, fewer bytes is always a plus.

### Minifying assets

- __Minification__ is the porcess by which all unnecessary characters are stripped from a text-based asset without affecting the way that asset functions.

- Many human-readable files such as CSS and JS contain whitespace and characters that are inserted.

- For things like CSS, you can use `clean-css-cli` (npm) to minify. 

- For JS, you can use something like JS min, or Uglify.

- HTML can also be minified

### Using server compression

- Similar to how you may have received compressed files in emails that you decompress yourself, we can compress files on the server that the browser can accept and decompress on behalf of the user.

- For `npm` we can use modules like `compression` to help us out (`npm i compression`).


### Optimizing images

- Depending on some set of conditions, you can optimize around the quality of image. If the user has a high DPI device, for example, a larger set of images provides a better visual experience, and for standard DPI, we can get away with some loss in quality.


