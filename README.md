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

- POST `/api/booking/listings`

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
        }
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

- GET `/api/booking/listings`

**Success Status Code:** `200`

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
        }
      ]
    ],
    "_id": "5f87877a925bba0f2706b052",
    "listing_id": 1,
    "cleaningFee": 70,
    "weekendPricing": true,
    "lowestPrice": 180,
    "rating": 3.94,
    "reviews": 745,
    "reservations": [
      {
        "guests": {
          "adults": 1,
          "children": 0,
          "infants": 0
        },
        "fees": {
          "cleaningFee": 70,
          "basePrice": 592,
          "serviceFee": 9,
          "taxes": 7,
          "total": 695
        },
        "_id": "5f88f915a716c1d7b8f5cb2d",
        "checkIn": "2020-10-19T13:00:00.000Z",
        "checkOut": "2020-10-21T13:00:00.000Z"
      }
    ],
    "__v": 0
  }
]
```

### Get listing by ID

- GET `/api/booking/listings/:listingId`

**Path Parameters:**

- `listingId` date id
- Ex: `/api/booking/listings/91`

**Success Status Code:** `200`

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
        }
      ]
    ],
    "_id": "5f87877a925bba0f2706b052",
    "listing_id": 1,
    "cleaningFee": 70,
    "weekendPricing": true,
    "lowestPrice": 180,
    "rating": 3.94,
    "reviews": 745,
    "reservations": [
      {
        "guests": {
          "adults": 1,
          "children": 0,
          "infants": 0
        },
        "fees": {
          "cleaningFee": 70,
          "basePrice": 592,
          "serviceFee": 9,
          "taxes": 7,
          "total": 695
        },
        "_id": "5f88f915a716c1d7b8f5cb2d",
        "checkIn": "2020-10-19T13:00:00.000Z",
        "checkOut": "2020-10-21T13:00:00.000Z"
      }
    ],
    "__v": 0
  }
]
```

### Add booking to listing by ID

- PATCH `/api/booking/listings/:listingId/reservation/`

**Path Parameters:**

- `listingId` date id
- Ex: `/api/booking/listings/91/reservation`

**Success Status Code:** `204`

**Body:** JSON

```json
{
  "newBooking": {
    "checkIn": "2020-11-15T13:00:00.000Z",
    "checkOut": "2020-11-17T13:00:00.000Z",
    "guests": { "adults": 1, "children": 0, "infants": 0 },
    "fees": {
      "cleaningFee": 82,
      "basePrice": 704,
      "serviceFee": 11,
      "taxes": 8,
      "total": 805
    }
  },
  "days": [
    [
      {
        "_id": "5f87b7d17259813bc29ea552",
        "date": "2020-10-01T13:00:00.000Z",
        "booked": true,
        "price": 352,
        "minimumNights": 1
      }
    ]
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

- DELETE `/api/booking/listings`

**Success Status Code:** `204`

**Returns:** JSON

```json
{
  "success": true,
  "deletedCount": 100
}
```
