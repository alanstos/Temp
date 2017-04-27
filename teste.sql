select * from weather.forecast where and u='c' woeid in (SELECT woeid FROM geo.places WHERE text="{-22.912127},{-43.229746}")



https://query.yahooapis.com/v1/public/yql?q=
select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='são paulo, sp')&format=json&callback=callbackFunction
