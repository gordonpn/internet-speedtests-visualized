module.exports = (app) => {
    const charts = require('./controller');

    app.get('/api/hourly', charts.hourlyAverage);
    app.get('/api/daily', charts.dailyAverage);
    app.get('/api/weekly', charts.weeklyAverage);

};