

$(document).ready(function() {

  // set local storage if it exists, create it if it does not
  let events = getEvents();

  $('#currentDay').text(moment().format('[Current Date: ] dddd, MMMM Do YYYY'));

  const container = $('.container');

  // create a time slots for every hour
  const hours = [9, 10, 11, 12, 1, 2, 3, 4, 5];
  for(let i = 0; i < hours.length; i++) {
    // create a div
    const row = $('<div>');
    const col1 = $('<div>');
    const col2 = $('<div>');
    const col3 = $('<div>');

    // add classes for styling and logic
    row.addClass('row');
    col1.addClass('col-1 text-right pt-2 time-col');
    col2.addClass('col-10 text-col');
    col3.addClass('col-1 text-center save-col');

    // set the hour associated with each save button for storage later
    row.attr('hour', hours[i]);

    // append the columns to the row
    row.append(col1);
    row.append(col2);
    row.append(col3);

    // append the row to the container
    container.append(row);

    // assign the value of hours[i] to it, if < 12 make it 'am'
    if(i < 3) col1.text(hours[i] + ' AM');
    else col1.text(hours[i] + ' PM');

    // set the text content from the events object
    col2.text(events[hours[i].toString()].text);

  }

  $('.save-col').append('<i class="fa fa-lock text-white" aria-hidden="true"></i>');


  // style the elements
  $('.row').css({
    'height' : '100px'
  });
  $('.time-col').css({
    'border-top' : '1px solid black'
  });
  $('.text-col').css({
    'border-left' : '1px solid black',
    'border-right' : '1px solid black',
    'border-top' : '1px solid black',
    'background-color' : '#00ff55'
  });
  $('.save-col').css({
    'padding-top' : '4%',
    'background-color' : '#00bfff',
    'border-radius' : '0px 12px 12px 0px'
  });

  // clicking the text-col class will allow you to enter text
  $('.text-col').click(function() {
    const target = $(this);
    console.log(target);
    console.log(target.text());
    console.log(this);
    console.log('text-col clicked');
    // capture key presses and enter the text into the div
    target.keypress(function(event) {
        // if enter, save the content for this hour block
        console.log(this);
        if(event.which === 13) {
          setEvents(target.parent().attr('hour'), target.text());
        }
        else {
          console.log(target);
          // write to the div
          target.append(String.fromCharCode(event.which));
        }
      });
  });

  // save the text from text column
  $('.save-col').click(function() {
    // get the data from the div
    const text = $(this).text();
    // get the hour
    const hour = $(this).parent().attr('hour');
    // save the data & rewrite events
    setEvents(hour, text);

  });

  // get the events for today from local storage, or create local storage if null
  function getEvents() {
    let e;
    if(localStorage.getItem(moment().format('[events-]MMMMDoYYYY')) !== null) {
      e = JSON.parse(localStorage.getItem(moment().format('[events-]MMMMDoYYYY')));
    }
    else {
      e = {
        9 : {
          text : ''
        },
        10 : {
          text : ''
        },
        11 : {
          text : ''
        },
        12 : {
          text : ''
        },
        1 : {
          text : ''
        },
        2 : {
          text : ''
        },
        3 : {
          text : ''
        },
        4 : {
          text : ''
        },
        5 : {
          text : ''
        }
      };
      localStorage.setItem(moment().format('[events-]MMMMDoYYYY'), JSON.stringify(e));
    }
    return e;
  }

  // save the event to the right time event in local storage
  function setEvents(time, content) {
    console.log(time);
    events[time.toString()] = content;
    localStorage.setItem(moment().format('[events-]MMMMDoYYYY'), JSON.stringify(events));
  }

});
