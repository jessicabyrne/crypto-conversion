Notes:

1. One element I got stuck on: OPENSSL_internal:WRONG_VERSION_NUMBER error when using Postman or express server to make API call. 
 Solution: Add Agent to call, could be computer proxy as it works on a different computer.

2. Note: Caching! This type of call would be easy to cache and compare against rather than making a new call for every user input. With more time, add memcache or other caching mechanism that can update every minute.

    ". If your application has a significant user base and you are concerned with staying within the call credit and API throttling limits of your subscription plan consider implementing a data caching strategy."

3. Choosing between  https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest and https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest

The first would be best for caching and then sorting based on user input. The second is best if we put off caching for now as it's a small sample app with few users and requests.