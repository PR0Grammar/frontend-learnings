# [Chpt 1] - Understanding Web Performance

- Site load time can ultimately make or break the user engagement
    - 1s vs 2s can be all it takes for a user to give up

- Page speed is also factors into page ranking of popular search engines (eg. Google), determined by the crawler

- One of the primary measures of web perf is the __latency__ of the response from the server.
    - This means optimizations across time it takes to reach the server, how long the server takes to process the request, and amount of time it takes browser to download the request. Clearly we don't have full control of some of these things, but any improvements in this area can chip away in overall time.

- In HTTP/1, servers and browsers might be limited by __head-of-line blocking__, which occurs because the browser limits the number of erquests it will make at a single time (typically 6). When one or more of these requests are processing and others have finished, new requests for content are blocked until remaining requests are fulfilled
    - As of 2022, [HTTP/1 is still dominant](https://w3techs.com/technologies/overview/site_element).

- HTTP/2 largely solves head-of-line blocking. It's up to the servers to implement the protocol.

