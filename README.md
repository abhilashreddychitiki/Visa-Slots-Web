# Visa Slots Web

A web dashboard for tracking U.S. visa appointment slot availability across Indian consulates and VAC locations.

## What You Can Do

- View live slot availability for each city and appointment location.
- Quickly spot the earliest available appointment date.
- See total reported slots for each location.
- Open a location detail view for the earliest known date and any available date breakdown returned by the API.
- Compare high-availability locations from the sidebar.
- Check recently updated locations at a glance.
- Start a booking estimate flow from an available slot.
- View alert options for WhatsApp, Telegram, and email notifications.
- Compare available plans on the pricing page.

## Main Screens

### Dashboard

The dashboard shows availability cards for consulate and VAC locations. Each card displays the location name, current availability status, earliest known date, total reported slots, and last update time.

### Slot Details

Clicking a city opens a detail modal. When the API provides date-level data, the modal shows each available date and its corresponding slot count. When only the earliest date and total count are available, the modal clearly separates the total reported slots from the known earliest date.

### Alerts

The alerts page shows notification options for users who want to be notified when appointments open.

### Pricing

The pricing page compares free, alert-based, and assisted booking plans.

## Tech Stack

- React
- TypeScript
- Vite
- TanStack Query
- Zustand
- Lucide icons
