// Check if it is the time to send a notification
function checkReminder() {

  // get the spreadsheet object
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

  // set the first sheet as active
  SpreadsheetApp.setActiveSheet(spreadsheet.getSheets()[0]);

  // fetch this sheet
  var sheet = spreadsheet.getActiveSheet();

  // figure out what the last row is
  var lastRow = sheet.getLastRow();

  // the rows are indexed starting at 1, and the first row  is the table header, so start with row 2
  var startRow = 2;

  // grab column 3 (the 'days left' column) Set the index number from Settings
  var range = sheet.getRange(2, DAYS_LEFT_COLUMN, lastRow - startRow + 1, 1); // getRange(row_start, col_start, row_end, col_end)
  var numRows = range.getNumRows();
  var days_left_values = range.getValues(); // [ [10], [21], [3],... ]

  // grab column 1 (the 'task_name' column) Set the index number from Settings
  var range = sheet.getRange(2, TASK_NAME_COLUMN, lastRow - startRow + 1, 1); // getRange(row_start, col_start, row_end, col_end)
  var numRows = range.getNumRows();
  var task_name_values = range.getValues(); // [ [task1], [task2], [task3],... ]

  var warning_count = 0;
  var msg = "";

  // Loop over the days left values for each Task
  for (var i = 0; i <= numRows - 1; i++) {

    var days_left = days_left_values[i][0];
    var task_name = task_name_values[i][0];

    // If it's exactly 30,15,3 do something with the data.
    // Change Reminder dates from Settings file.
    if(days_left == REMINDER_ON_30 || days_left == REMINDER_ON_15 || days_left == REMINDER_ON_3 ) {
      

      // Logger.log(task_name, days_left);

      msg = msg + task_name + " is due in " + days_left + " days.\n";

      warning_count++;
    }
  }

  // Send email if there are any reminders
  if(warning_count) {
    MailApp.sendEmail(RECIPIENT_EMAIL ,EMAIL_SUBJECT, msg);
  }

};