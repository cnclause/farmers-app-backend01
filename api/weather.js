const express = require('express')
const router = express.Router()
const DarkSky = require('dark-sky')
const darksky = new DarkSky("1bc137157559751c0a8b94ed9115fbad")


router.get('/forecast', async (req, res, next) => {
    try {
    //   const { latitude, longitude } = req.body
      const forecast = await darksky
        .options({
          latitude:37.8267,
          longitude: -122.423,
          language: 'en',
          exclude:'minutely, flags, alerts',
          units: 'uk2',
        
        })
        .get()
      res.status(200).json(forecast)
    } catch (err) {
      next(err)
    }
  })

  module.exports = router