### How long did you spend on the coding assignment? What would you add to your solution if you had more time?

I took about 4-5 hours to get this app set up properly. Here is a rough outline of the time spent:

1st hour: reviewing API documentation, writing strategy, considering security implications, think about what I should test

2nd hour: building node/express proxy to fetch cryptocurrency data, write tests and documentation as I go

3rd hour: wire up to front end, add styles, use native HTML elements for accessibility.

4th hour: write tests, refactor, tidy code, double check documentation.

#### What would you add to your solution if you had more time?

With more time: There are still loads of improvements for this app possible with more time.

1. Caching: to improve the speed and usability of the app, the service could make a single call to the CoinMarketCap API and cache it, then do a search on the result when the user inputs data. With more time, I could add memcache or another caching mechanism to get results every minute.

2. Expand the typing on the app. The more types the better. For this project I left the proxy layer alone in consideration of time, but it wouldn't be too hard to move it over to Typescript and add @types/express.

3. Do more sanitizing of the input on the backend. Checks on the front end are not enough for data sanitization. With more time, I could add a sanitization library and make sure the URI is encoded properly. For this application there are no POST requests so it is less critical, but something to consider for security.
   3a. One thing to add for security would be an autocomplete/dropdown user input that only takes valid cryptocurrency inputs.

4. Write more tests. With more time I would add more tests to the suite. Look into writing integration tests, add edge cases, text proxy layer, etc.

5. Add loading, can show a loading icon when fetching the data.

### What was the most useful feature that was added to the latest version of your language of choice? Please include a snippet of code that shows how you've used it.

The one feature of es2020/es6 that I use often is optional chaining. It allows you to access deeply nested object properties without adding a long chain of checks to see if the value before exists.

I didn't end up using it in this project, but with more time one improvement would be to convert `proxy.js` to Typescript and upgrade the Node.js version (Optional chaining is not supported in version 13 and below). It would be useful when getting the price from the CoinMarketCap response object. I could do something like
`const price = data[cryptoType]?.quote?.USD?.price` to make sure the data object is coming back as expected.

### How would you track down a performance issue in production? Have you ever had to do this?

Yes I am often tracking down performance issues in production. If the problem is on the front end, the DevTools offer a lot of information about network activity, thread tasks, and there's a performance profiler as well. It often helps to debug issues in production if there are tools such as Splunk and Dynatrace where you can dig into logs with specific responses, error codes, etc.

### What was the latest technical book you have read or tech conference you have been to? What did you learn?

I run a tech book club, and the last book we read as a group was [Desigining Data Intensive Applications](https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/). I enjoyed reading about how systems like Twitter and Facebook have to consider scale (such as the immediate flurry of tweets around a celebrity with a lot of followers, for example) on a technical level. I also benefitted from reading more about how data is read, stored, and managed when a system has issues, such as leader-based replication and what happens when a leader goes down for failover of data.

The last tech conference I went to was Open Source Conference in Portland, OR, but that was some time ago now! I attended a workshop to build an application using Flutter and went to talks to learn more about Blockchain.

### What do you think about this technical assessment?

I enjoyed building the app from scratch. There were a lot of interesting elements and the APIs were well-documented which made it very fun to work with.

### Please, describe yourself using JSON.

```json
{
  "name": "Jessica",
  "lastname": "Byrne",
  "nationality": "USA",
  "willMoveToAmsterdam": true,
  "seeks": "fulfilling career",
  "livedIn": ["England", "Nepal", "Spain", "USA"],
  "passions": ["Programming", "Psychology", "Travel"],
  "hobbies": ["Skiing", "Hiking", "Kayaking"],
  "interests": ["Behavioral Economics", "Podcasting"],
  "opinion": "Everything should have a dark theme"
}
```
