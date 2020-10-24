# Jelly-Fish: SDC

> This is the back-end design of the calendar component for a home rental application.

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

### Add reservation by listing ID

- POST `/api/listings/:listingId/reservations/`

**Path Parameters:**

- `listingId` listing id
- Ex: `/api/listings/97/reservations/`

**Success Status Code:** `201`

**Request Body:** JSON

```json
{
  "newBooking": {
    "checkIn": "2020-11-15T13:00:00.000Z",
    "checkOut": "2020-11-17T13:00:00.000Z",
    "guestAdults": 1,
    "guestChildren": 0,
    "guestInfants": 0
  }
}
```

**Returns:** JSON

```json
{
  "reservation_id": 1,
  "checkIn": "2020-11-15T13:00:00.000Z",
  "checkOut": "2020-11-17T13:00:00.000Z",
  "guests": {
    "adults": 1,
    "children": 0,
    "infants": 0
  },
  "user_id": 1,
  "username": "catastrausphic",
  "email": "catherinestraus@berkeley.edu",
  "fees": {
    "cleaningFee": 98,
    "basePrice": 782,
    "serviceFee": 12,
    "taxes": 9,
    "total": 901
  }
}
```

### Get listing by listing ID

- GET `/api/listings/:listingId/`

**Path Parameters:**

- `listingId` listing id
- Ex: `/api/listings/90/`

**Success Status Code:** `200`

**Returns:** JSON

```json
{
    "days": [
        [
            {
                "day_id": 1,
                "date": "2020-10-01T13:00:00.000Z",
                "booked": false,
                "price": 323,
                "minimumNights": 1
            },...
        ]...
    ],
    "listing_id": 90,
    "cleaningFee": 85,
    "rating": 3.86,
    "reviews": 952,
    "reservations": [],
}
```

### Get reservations by listing ID

- GET `/api/listings/:listingId/reservations/`

**Path Parameters:**

- `listingId` listing id
- Ex: `/api/listings/95/reservations/`

**Success Status Code:** `200`

**Returns:** JSON

```json
[
  {
    "guests": {
      "adults": 1,
      "children": 0,
      "infants": 0
    },
    "fees": {
      "cleaningFee": 98,
      "basePrice": 782,
      "serviceFee": 12,
      "taxes": 9,
      "total": 901
    },
    "reservation_id": 1,
    "checkIn": "2020-11-15T13:00:00.000Z",
    "checkOut": "2020-11-17T13:00:00.000Z",
    "user_id": 1,
    "username": "catastrausphic",
    "email": "catherinestraus@berkeley.edu"
  },...
]
```

### Change reservation by listing ID and reservation ID

- PATCH `/api/listings/:listingId/reservations/:reservationId/`

**Path Parameters:**

- `listingId` listing id
- `reservationId` reservation id
- Ex: `/api/listings/95/reservations/1/`

**Success Status Code:** `200`

**Request Body:** JSON

- Note: accepts JSON with any of the following keys.

```json
{
  "updatedBooking": {
    "checkIn": "2020-11-15T13:00:00.000Z",
    "checkOut": "2020-11-17T13:00:00.000Z",
    "guests": { "adults": 3, "children": 0, "infants": 0 },
    "username": "catastrausphic",
    "email": "catherinestraus@berkeley.edu"
  }
}
```

**Returns:** JSON

```json
{
  "reservation_id": 1,
  "checkIn": "2020-11-15T13:00:00.000Z",
  "checkOut": "2020-11-17T13:00:00.000Z",
  "guests": {
    "adults": 3,
    "children": 0,
    "infants": 0
  },
  "user_id": 1,
  "username": "catastrausphic",
  "email": "catherinestraus@berkeley.edu",
  "fees": {
    "cleaningFee": 98,
    "basePrice": 782,
    "serviceFee": 12,
    "taxes": 9,
    "total": 901
  }
}
```

### Delete reservation by listing ID and reservation ID

- DELETE `/api/listings/:listingId/reservations/:reservationId`

**Path Parameters:**

- `listingId` listing id
- `reservationId` reservation id
- Ex: `/api/listings/95/reservations/1/`

**Success Status Code:** `204`

**Returns:** JSON

```json
{
  "success": true,
  "updatedCount": 1
}
```
