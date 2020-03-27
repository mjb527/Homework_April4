

$(document).ready(function() {

  // set local storage if it exists, create it if it does not
  let events;
  if(localStorage.getItem(moment().format('[events-]MMMMDoYYYY')) !== null) {
    events = JSON.parse(localStorage.getItem(moment().format('[events-]MMMMDoYYYY')));
  }
  else {
    events = {
      9 : {},
      10 : {},
      11 : {},
      12 : {},
      1 : {},
      2 : {},
      3 : {},
      4 : {},
      5 : {}
    };
    localStorage.setItem(moment().format('[events-]MMMMDoYYYY'), JSON.stringify(events));
  }

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

    // append the columns to the row
    row.append(col1);
    row.append(col2);
    row.append(col3);

    // append the row to the container
    container.append(row);

    // assign the value of hours[i] to it, if < 12 make it 'am'
    if(i < 3) col1.text(hours[i] + ' AM');
    else col1.text(hours[i] + ' PM');

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
  $('.text-col').click(allowTyping);

  function allowTyping() {

    const target = $(this);

    const saveButton = target.next('.save-col');
    saveButton.on('click', save);

    // capture key presses and enter the text into the div
    target.keypress(function(event) {
      // enter pressed
      if(event.which === 13) {
        save();
      }
      else {
        // write to the div
        div.append(String.fromCharCode(event.which));
      }
    });

    // wait for the save-col click in the adjoining div, save to local storage on click

    // stop capturing the typing on the save click

    // maybe?
    // return false;


  }

  function save() {
    console.log('saved');
  }


});
