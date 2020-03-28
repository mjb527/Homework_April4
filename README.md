# 05 Third-Party APIs: Work Day Scheduler

Create a simple calendar application that allows the user to save events for each hour of the day. This app will run in the browser and feature dynamically updated HTML and CSS powered by jQuery.

You'll need to use the [Moment.js](https://momentjs.com/) library to work with date and time. Be sure to read the documentation carefully and concentrate on using Moment.js in the browser.

## User Story

```
AS AN employee with a busy schedule
I WANT to add important events to a daily planner
SO THAT I can manage my time effectively
```

## Acceptance Criteria

```
GIVEN I am using a daily planner to create a schedule
WHEN I open the planner
THEN the current day is displayed at the top of the calendar
WHEN I scroll down
THEN I am presented with timeblocks for standard business hours
WHEN I view the timeblocks for that day
THEN each timeblock is color coded to indicate whether it is in the past, present, or future
WHEN I click into a timeblock
THEN I can enter an event
WHEN I click the save button for that timeblock
THEN the text for that event is saved in local storage
WHEN I refresh the page
THEN the saved events persist


## What's under the hood?

Each row has an associated hour, which will control the color of the row. Every minute, the script checks to see if the color needs to be updated by comparing the current hour and the hour of the row.

I utilized the `contenteditable` attribute of a div to allow users to treat the div as an input. When they click Enter or click the save button on the right, it will save the entry to localStorage.

LocalStorage is generated every day as events-MonthDayYear so long as it doesn't exist. If it does, it is loaded and saved to a variable. The events will be saved as nested JSON, with each hour having its own event.
