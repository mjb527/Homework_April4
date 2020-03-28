

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

    // color the row now, rest of styles later
    let now = parseInt(moment().format('h'));
    let color;

    if(hours[i] > now) color = '#00ff55';       // future
    else if(hours[i] == now) color = '#006699'; // now
    else color = '#ff1a1a';                     // past

    col2.css('background-color', color);

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
    'border-top' : '1px solid grey',
    'background-color' : '#d6e0f5'
  });
  $('.text-col').css({
    'border-left' : '1px solid grey',
    'border-right' : '1px solid grey',
    'border-top' : '1px solid grey'
  });
  $('.save-col').css({
    'padding-top' : '4%',
    'background-color' : '#00bfff',
    'border-radius' : '0px 12px 12px 0px'
  });

  $('.text-col').click(function() {
      $('.text-col').removeClass('typehere');
      $(this).addClass('typehere');
  });

  $(document).keypress(function() {
    console.log('hola');
    // prevent spacebar from scrolling the page
    if(event.which === 32) event.preventDefault();

    // allow removal of last character
    if(event.charCode === 8) {
      // event.preventDefault();
      console.log('hey');
      let text = $('.typehere').text();
      console.log(text);
      $('.typehere').text() = text.substring(0, text.length -2);
    }

    // save on enter
    if(event.which === 13)
      setEvents($('.typehere').parent().attr('hour'), $('.typehere').text());
    $('.typehere').append(String.fromCharCode(event.which));
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
    console.log(time);
    events[time.toString()] = content;
    localStorage.setItem(moment().format('[events-]MMMMDoYYYY'), JSON.stringify(events));
  }

});
