## Resources
- https://www.stevesouders.com/blog/2009/05/18/flushing-the-document-early/
- https://www.willhastings.me/posts/speeding-up-page-load-with-early-flush


## Intro

- There are assets that the client may want with differnt priorities. Some may be needed right away, others may wait

- Important assets you'd want the browser to start downloading right away

- If your server generates HTML, it can a significant amount of time to send down ALL the HTML, thus delaying the resource fetching

- With early flushing, you can get the browser to start downloading important assets
even before your server has finished generating ALL of the HTML. 


## How it works

- It involves sending dwon the HTML of a page in seperate chunks instead of all together

- This is possible because HTTP has a feature called chunked transfer encoding.

- Chunked transfer encoding: normal HTTP reponse requires Content-Length header for the response, and send down the response in one go. Chunked transferr encoding is when you're server no longer needs to provide that header and can send parts of the response as they're ready. Client can parse response before entire response is ready

- In early flush for HTML, we send down the <head/> section of the HTML as soon as the server receives the browser's request. When your browser sees resources in the head that it should fetch right away (CSS, JS, etc), it will begin to fetch them right away.


## other things

- You can tell the browser, with the defer attribute for scripts, to download immediately, but WAIT until HTML is parsed before executing.

## Examples

- [Link to express js example](https://github.com/akshay-kr/early-flush-strategy-example/blob/master/routes/index.js)

- in essense: set the right headers of chuncked transfer encoding, setup the HTML to only include head (full/partial head, and a bit of the body for "loading" state maybe), then write that piece of HTML. Continue to "tier" the chunks away, and end the connection once you're done.

```javascript
router.get('/with-early-flush', function (req, res) {
    res.setHeader('Transfer-Encoding', 'chunked');
    res.setHeader('Content-Encoding', 'none');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<!DOCTYPE html>
               <html>
                    ${ htmlHead }
                    <body>
                        <div class="loader">Loading...</div>
                        <link rel="stylesheet" onload="onJsLoad('CSS')" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">`);

    setTimeout(() => {
        res.end(`<script>
                        document.querySelector(".loader").style.display = "none";     
                  </script>
                  <br>
                  <br>
                  <center><h2>Page Rendered</h2></center>
                  </body>
                  </html>`);
    }, 7000);
});
```

## Caveats/Cons

- Once you start early flush, you can't do things like change your mind and redirect the user to another page.