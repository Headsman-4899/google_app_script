function doGet(e) {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('Простое приложение для учета расходов')
    .setSandboxMode(HtmlService.SandboxMode.IFRAME);
}

function addExpense(date, category, amount) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.appendRow([date, category, amount]);
  Logger.log("Добавлен расход: " + date + ", " + category + ", " + amount); // Добавьте эту строку
}


function getStatistics() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var stats = {
    total: 0,
    max: {date: '', amount: 0},
    min: {date: '', amount: Infinity}
  };
  data.shift(); // Пропускаем заголовок
  data.forEach(function(row) {
    var date = row[0].toLocaleDateString(); // Преобразование даты в строку для удобства
    var amount = parseFloat(row[2]); // Убедитесь, что сумма преобразуется в число
    stats.total += amount;
    if (amount > stats.max.amount) {
      stats.max.amount = amount;
      stats.max.date = date;
    }
    if (amount < stats.min.amount) {
      stats.min.amount = amount;
      stats.min.date = date;
    }
  });
  return stats;
}
