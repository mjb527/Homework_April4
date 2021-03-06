

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
    col1.addClass('col-1 text-left time-col');
    col2.addClass('col-10 text-col');
    col3.addClass('col-1 text-center  save-col');

    // set the hour associated with each save button for storage later
    row.attr('hour', hours[i]);

    // make the div editable
    col2.attr('contenteditable', 'true');

    // append the columns to the row
    row.append(col1);
    row.append(col2);
    row.append(col3);

    // append the row to the container
    container.append(row);

    // assign the value of hours[i] to it, if < 12 make it 'am'
    const div = $('<div>');
    div.addClass('mx-auto my-auto')
    if(i < 3) div.text(hours[i] + ' AM');
    else div.text(hours[i] + ' PM');
    col1.append(div);

    // set the text content from the events object
    col2.text(events[hours[i].toString()].text);

  }

  $('.save-col').append('<i class="fa fa-lock text-white" aria-hidden="true"></i>');

  // style the elements
  $('.row').css({
    'height' : '100px'
  });
  $('.time-col').css({
    'border-top' : '1px solid grey',
    'background-color' : '#d6e0f5',
    'border-radius' : '12px 0 0 12px'
  });
  $('.text-col').css({
    'border-left' : '1px solid grey',
    'border-right' : '1px solid grey',
    'border-top' : '1px solid grey'
  });
  $('.save-col').css({
    'background-color' : '#00bfff',
    'border-radius' : '0px 12px 12px 0px',
    'padding-top' : '3.5%'
  });
  // run once at the start of the script
  colorTheHour();
  // run every minute from there on
  const interval = setInterval(colorTheHour, 1000 * 60);

  $('.text-col').click(function() {
      $('.text-col').removeClass('typehere');
      $(this).addClass('typehere');
  });

  $(document).keypress(function() {
    // save on enter
    if(event.which === 13) setEvents($('.typehere').parent().attr('hour'), $('.typehere').text());

  });

  // save the text from text column
  $('.save-col').click(function() {
    // get the data from the div
    const text = $(this).prev().text();
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
    events[time.toString()].text = content;
    localStorage.setItem(moment().format('[events-]MMMMDoYYYY'), JSON.stringify(events));
  }

  function colorTheHour() {
    columns = $('.text-col');
    for(let i = 0; i < columns.length; i++) {
      const column = columns[i];
      // color the row now, rest of styles later
      let parentHour = parseInt($(column).parent().attr('hour'));
      let now = parseInt(moment().format('H'));
      let formattedHour;
      // if the hour of the row is less than 9, it is afternoon, adjust for 24 hour clock
      if(parentHour < 9) formattedHour = parentHour + 12;
      else formattedHour = parentHour;
      let color;

      if(formattedHour > now) color = '#00ff55';       // future
      else if(formattedHour == now) color = '#006699'; // now
      else color = '#ff1a1a';                          // past

      $(column).css('background-color', color);
    }
  }

});
