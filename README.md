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
    "checkIn": "2020-11-15",
    "checkOut": "2020-11-17",
    "guestAdults": 3,
    "guestChildren": 0,
    "guestInfants": 0
  }
}
```

**Returns:** JSON

```json
{
  "checkIn": "2020-11-15",
  "checkOut": "2020-11-17",
  "guestAdults": 3,
  "guestChildren": 0,
  "guestInfants": 0,
  "prices": {
    "billing_id": 15033113,
    "reservation_id": 15033114,
    "cleaning_fee": 92,
    "base_price": 493,
    "service_fee": 35,
    "taxes": 36,
    "total": 656
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
  "listing_id": 90,
  "cleaning_fee": 86,
  "rating": "4.69",
  "reviews": 239
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
        "reservation_id": 182956,
        "user_id": 73672,
        "listing_id": 95,
        "check_in": "3523-06-08",
        "check_out": "3523-06-11T",
        "guest_adults": 4,
        "guest_children": 3,
        "guest_infants": 2
    },...
]
```

### Get reservations by user ID

- GET `/users/:userId/reservations/`

**Path Parameters:**

- `listingId` listing id
- Ex: `/api/users/95/reservations/`

**Success Status Code:** `200`

**Returns:** JSON

```json
[
    {
        "reservation_id": 285939,
        "user_id": 95,
        "listing_id": 8139,
        "check_in": "4369-05-04",
        "check_out": "4369-05-07",
        "guest_adults": 5,
        "guest_children": 4,
        "guest_infants": 2
    },...
]
```

### Get reservations by listing ID and user ID

- GET `/api/listings/:listingId/users/:userId/reservations/`

**Path Parameters:**

- `listingId` listing id
- Ex: `/listings/26671/users/55340/reservations/`

**Success Status Code:** `200`

**Returns:** JSON

```json
[
  {
    "reservation_id": 5,
    "user_id": 55340,
    "listing_id": 26671,
    "check_in": "2020-10-13",
    "check_out": "2020-10-16",
    "guest_adults": 2,
    "guest_children": 2,
    "guest_infants": 2
  }
]
```

### Change reservation by reservation ID

- PATCH `/api/reservations/:reservationId/`

**Path Parameters:**

- `reservationId` reservation id
- Ex: `/api/reservations/1/`

**Success Status Code:** `200`

**Request Body:** JSON

```json
{
  "updatedBooking": {
    "checkIn": "2020-11-15",
    "checkOut": "2020-11-17",
    "guestAdults": 1,
    "guestChildren": 0,
    "guestInfants": 0
  }
}
```

**Returns:** JSON

```json
{
  "checkIn": "2020-11-15",
  "checkOut": "2020-11-17",
  "guestAdults": 1,
  "guestChildren": 0,
  "guestInfants": 0
}
```

### Delete reservation by reservation ID

- DELETE `/api/reservations/:reservationId`

**Path Parameters:**

- `reservationId` reservation id
- Ex: `/api/reservations/1/`

**Success Status Code:** `204`

**Returns:** JSON

```json
{ "Deleted": true }
```
