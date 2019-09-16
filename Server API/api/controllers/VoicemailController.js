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

      // ***  SpeechToTextAPI  ***
            //  let result =  await SpeechToTextAPI.SpeechToText(content) 


      // *** Text Analyse   ***

          //  1 - languageClassifier   ***

              // let languageClassifier = 'english-en'

          //  2 - Detection urgency   ***

              // let urgencyDetection = 'not-urgent'
              // languageClassifier  =  await monkeylearnAPI.languageClassifier([content])
              // urgencyDetection  =  await monkeylearnAPI.urgencyDetection([content])
              // urgencyDetection = await text_mining_Service.text_analyse(content)
      


      const voicemail = await Voicemail.create({ content, phone, receiverPhone, languageClassifier : '' , 
                                                  urgencyDetection : '', userId: user.id }).fetch()


      // *** expo push notification *** //
      await expoPushNotification.sendNotiication(user.pushToken , voicemail )

      return res.ok(voicemail)
    }
    catch (err) {
      console.log(err)
      return res.ok([])
    }
  },

  /**
   * `JobController.find()`
   */
  find: async function (req, res) {
    try {
      const myIdUser = req.user
      const voicemals = await Voicemail.find({ userId : myIdUser }) 
      console.log('voicemails sent ... ' + myIdUser)
      return res.ok(voicemals)
    }
    catch (err) {
      console.log(err)
      return res.ok([])
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

