# Jelly-Fish: SDC

> This is the back-end design of the calender component for a home rental application.

## Related Projects

- https://github.com/Jellyfish-130/gallery-service
- https://github.com/Jellyfish-130/calendar-service
- https://github.com/Jellyfish-130/review-service
- https://github.com/Jellyfish-130/more-places-service

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Some usage instructions.

To get the review component, run http://localhost:3002/.

## Requirements

- Node 10.5.0
- npm 6.14.8
- MongoDB 4.2.8

## Development

From within the root directory:

To install dependencies

```sh
npm install
```

To run dev environment/webpack

```sh
npm run build-dev
```

To run server

```sh
npm start-dev
```

To run MongoDB

```sh
mkdir data
mongod --dbpath data
```

To seed database

```sh
npm run seed
```

To run tests

```sh
npm run test
```

### Installing Dependencies

From within the root directory:

```sh
npm install
```

## API Endpoints

### Seed listings

- POST `/api/listings`

**Description:** `Add 100 day arrays, each with 182 objects, and each day array is followed up with a blank reservation array.`

**Success Status Code:** `201`

**Returns:** JSON

```json
[
  {
    "days": [
      [
        {
          "_id": "5f87877a925bba0f2706b108",
          "date": "2021-03-31T14:00:00.000Z",
          "booked": true,
          "price": 180,
          "minimumNights": 1
        },...
      ]
    ],
    "_id": "5f87877a925bba0f2706b052",
    "listing_id": 1,
    "cleaningFee": 70,
    "weekendPricing": true,
    "lowestPrice": 180,
    "rating": 3.94,
    "reviews": 745,
    "reservations": [],
    "__v": 0
  }
]
```

### Get all listings

- GET `/api/listings`

**Description:** `Gets all listings, but unlike with the POST data, a day array is followed up with a reservation array that includes guests, fees, checkIn and checkOut based on selected dates to stay.`

**Success Status Code:** `200`

**Returns:** JSON

```json
[
  {
    "days": [
      [
        {
          "_id": "5f89fa9aa716c1d7b8f5e59e",
          "date": "2021-03-31T14:00:00.000Z",
          "booked": true,
          "price": 355,
          "minimumNights": 1
        },...
      ]
    ],
    "_id": "5f89fa9aa716c1d7b8f5e4e8",
    "listing_id": 33,
    "cleaningFee": 72,
    "weekendPricing": true,
    "lowestPrice": 355,
    "rating": 3.66,
    "reviews": 1088,
    "reservations": [
      {
        "guests": {
            "adults": 1,
            "children": 0,
            "infants": 0
        },
        "fees": {
            "cleaningFee": 72,
            "basePrice": 1065,
            "serviceFee": 16,
            "taxes": 12,
            "total": 1165
        },
        "_id": "5f89faf0a716c1d7b8f616f0",
        "checkIn": "2020-10-18T13:00:00.000Z",
        "checkOut": "2020-10-21T13:00:00.000Z"
      }
    ],
  "__v": 0
}
```

### Get listing by ID

- GET `/api/listings/:listingId`

**Path Parameters:**

- `listingId` date id
- Ex: `/api/listings/91`

**Description:** `Gets listings by ID, which are from 1 -100, inclusive.`

**Success Status Code:** `200`

**Returns:** JSON

```json
[
  {
    "days": [
      {
        "_id": "5f89fa9aa716c1d7b8f5e59e",
        "date": "2021-03-31T14:00:00.000Z",
        "booked": true,
        "price": 355,
        "minimumNights": 1
      },...
    ],
    "_id": "5f89fa9aa716c1d7b8f5e4e8",
    "listing_id": 33,
    "cleaningFee": 72,
    "weekendPricing": true,
    "lowestPrice": 355,
    "rating": 3.66,
    "reviews": 1088,
    "reservations": [
      {
        "guests": {
            "adults": 1,
            "children": 0,
            "infants": 0
        },
        "fees": {
            "cleaningFee": 72,
            "basePrice": 1065,
            "serviceFee": 16,
            "taxes": 12,
            "total": 1165
        },
        "_id": "5f89faf0a716c1d7b8f616f0",
        "checkIn": "2020-10-18T13:00:00.000Z",
        "checkOut": "2020-10-21T13:00:00.000Z"
      }
    ],
  "__v": 0
}
```

### Add booking to listing by ID

- POST `/api/listings/:listingId/reservation/`
- PATCH `/api/listings/:listingId/reservation/:reservationId`

**Path Parameters:**

- `listingId` date id
- Ex: `/api/listings/91/reservation`

**Description:** `Add reservation information by listing ID, which are from 1 -100, inclusive.`

**Success Status Code:** `204`

**Request Body:** JSON

```json
{
  "newBooking": {
    "checkIn": "2020-11-15T13:00:00.000Z",
    "checkOut": "2020-11-17T13:00:00.000Z",
    "guests": { "adults": 1, "children": 0, "infants": 0 },
    username
    user email
      }
  ]
}
```

**Returns:** JSON

```json
{
  "success": true,
  "updatedCount": 1
}
```

### Delete all listings

- DELETE `/api/listings`

**Description:** `Delete all listings from calender.`

**Success Status Code:** `204`

**Returns:** JSON

```json
{
  "success": true,
  "deletedCount": 100
}
```
