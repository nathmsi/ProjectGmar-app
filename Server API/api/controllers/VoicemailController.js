/**
 * VoicemailController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {


  /**
    * `JobController.create()`
    */
  create: async function (req, res) {
    try {
      let { phone, content, receiverPhone } = req.allParams()
      if (!phone) {
        return res.badRequest({ err: 'phone is required field' })
      }
      if (!content) {
        return res.badRequest({ err: 'content is required field' })
      }
      if (!receiverPhone) {
        return res.badRequest({ err: 'receiverPhone is required field' })
      }

      const user = await User.findOne({ phone: receiverPhone })

      if (!user) {
        return res.badRequest({ err: 'phone not matched with any users' })
      }

      let languageClassifier = 'english-en'
      let urgencyDetection = ''
      // languageClassifier  =  await monkeylearnAPI.languageClassifier([content])
      // urgencyDetection  =  await monkeylearnAPI.urgencyDetection([content])

      //urgencyDetection = await text_mining_Service.text_analyse(content)
      

      const voicemail = await Voicemail.create({ content, phone, receiverPhone, languageClassifier : languageClassifier, 
                                                  urgencyDetection : urgencyDetection, userId: user.id }).fetch()

      await expoPushNotification.sendNotiication(user.pushToken , voicemail )

      return res.ok(voicemail)
    }
    catch (err) {
      return res.serverError(err)
    }
  },

  /**
   * `JobController.find()`
   */
  find: async function (req, res) {
    try {
      const myIdUser = req.user
      const voicemals = await Voicemail.find({ userId: myIdUser })
      return res.ok(voicemals)
      console.log('voicemails sent ... '+ receiverPhone)
    }
    catch (err) {
      return res.badRequest({err})
    }
  },

  /**
   * `VoicemailController.update()`
   */
  update: async function (req, res) {
    return res.json({
      todo: 'update() is not implemented yet!'
    });
  }

};

