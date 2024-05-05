import express from "express";

const app = express()
const port = 5500

app.use(express.json())

const getWeather = async (city) => {
   const apiKey = `99db9c79508a8f4717a84ead833267f7`
   const Url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
   const objectUrl = await fetch(Url)
   const Object = await objectUrl.json()
   // const data = JSON.stringify(Object)
   return Object.list
}

const getDate = (date) => {
   date = date.split("")
   date = date.splice(0, 10)
   date.push(" 21:00:00")
   // console.log(date);
   date = date.join("")
   console.log(date);
   return date
}

app.post("/", async (req, res) => {
   const body = req.body.queryResult
   const data = JSON.stringify(body)
   console.log(data);
   if (body.intent.displayName === "Default Welcome Intent") {
      let list = await getWeather("karachi ")
      let newDate = getDate(body?.outputContexts[0]?.parameters?.date)
      console.log(newDate);

      let weather = list.find(object => object.dt_txt === newDate)
      console.log(weather);
      if (weather === undefined) {
         res.send({
            "fulfillmentMessages": [
               {
                  "text": {
                     "text": [
                        `Sorry Weather Update Not Avalible Right Now`
                     ]
                  }
               }
            ]
         }
         )
      }
      else {
         res.send({
            "fulfillmentMessages": [
               {
                  "text": {
                     "text": [
                        `The Weather of ${body?.outputContexts[0]?.parameters?.geoCity} on ${body?.outputContexts[0]?.newDate} is ${weather.main.temp}°C`
                     ]
                  }
               }
            ]
         }
         )
      }
   }
})

app.listen(port, () => {
   console.log("Code is running in localHost " + port);
})