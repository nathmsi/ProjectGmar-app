/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const Joi = require('joi')

module.exports = {


  /**
   * `UserController.signup()`
   */
  signup: async function (req, res) {
    try {
      const { phone } = req.allParams()

     const user = await User.findOne({ phone })
      if (user) {
        return res.badRequest({ err : 'user already  exist' })
      }
      const results = await User.create({ phone })
      return res.ok({ ok : results })
    }
    catch (err) {
      return res.badRequest({ results: err })
    }
  },

  /**
   * `UserController.login()`
   */
  login: async function (req, res) {
    try {
      const { phone } = req.allParams()
      const user = await User.findOne({ phone })
      if (!user) {
        return res.badRequest({ err : 'user does not exist' })
      } 
      const token = JWTService.issuer({ user: user.id }, '365d')
      console.log('login phone number : ' + user.phone)
      return res.ok({ token })
    }
    catch (err) {
      return res.badRequest({ err })
    }
  },

  pushToken : async function (req, res) {
    try {
      const { pushToken } = req.allParams()
      const phone = req.phone

      const user = await User.findOne({ phone })
      if (!user) {
        return res.badRequest({ err: 'user does not exist' })
      }

      await User.updateOne({ phone }).set({pushToken});
      console.log('pushtoken : ' + pushToken )
      return res.ok({ results : 'ok' })
    }
    catch (err) {
      if (err.name === 'ValidationError') {
        return res.badRequest({ err: 'ValidationError' })
      }
      return res.badRequest({ err })
    }
  }

};

