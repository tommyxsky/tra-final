# Grabbing Data
* Finding the list of stores is not easy
* Some lists are not available and I had to use yellowpages.com to search the name of the store in different states (Using the URL)

## Steps in manipulating data
* I try to get the name of the store and the address first
* Then I use this site to get the latitude and longitude
* I then swap the order so lng comes before lat
* I make the lng and lat an array like this: `[33.852656,-84.358708]`
* I then paste this template before the name of the store:

```
{
    "slug": "radioshack",
    "name": "Radioshack",
    "description":
      "General Wireless Operations, Inc. (doing business as RadioShack) is an American chain of wireless and electronics stores, founded in 1921 and since 2017 has approximately 28 remaining corporate locations, an online website, and approximately 425 independently owned franchise stores.",
    "_user": "58c039018060197ca0b52d4c",
    "photo": "",
    "tags": ["Radioshack", "Closed"],
    "created": "2017-03-08T17:04:19.860Z",
    "location": {
      "address": "
```

* I add a quotation after the address and add a comma and a new line
* I type `"coordinates": ` 
* Then I manually add the array of lng and lat and add a comma
* Enter a new line and type
* I then type "type": "Point"
* Then type two closing curly braces

```json
{
    "slug": "radioshack-90",
    "name": "Radioshack",
    "description":
      "General Wireless Operations, Inc. (doing business as RadioShack) is an American chain of wireless and electronics stores, founded in 1921 and since 2017 has approximately 28 remaining corporate locations, an online website, and approximately 425 independently owned franchise stores.",
    "_user": "58c039018060197ca0b52d4c",
    "photo": "",
    "tags": ["Radioshack", "Closed"],
    "created": "2017-03-08T17:04:19.860Z",
    "location": {
      "address": "Radioshack 5305 E Colfax Ave #A, Denver, CO",
      "coordinates": [-104.925585, 39.740548],
      "type": "Point"
    }
  },
```

* I make sure there is a comma after the second curly brace I added (except last one)
* I then select all the code and cut it to the clipboard
* I then add an open and closing bracket and paste the cut code inside
    - It is like we are creating an array of objects
* I save it and make sure Prettier doesn't show any errors
* I then add the necessary code to `load-sample-data.js`
* I put all the data I haven't finished yet inside the `todo` folder 
