const MonkeyLearn = require('monkeylearn')
// API Key
const ml = new MonkeyLearn('d1eef86950e7e2b512e1a1d6630633b06020e518')


module.exports = {

    async languageClassifier(data) {
        try {
            let model_id = 'cl_Vay9jh28'
            let result
            await ml.classifiers.classify(model_id, data).then(res => {
                result = res.body[0].classifications[0].tag_name
            })
            return result
        } catch (err) {
            console.log(err)
            return ''
        }
    },
    async urgencyDetection(data) {
        try {
            let model_id = 'cl_Aiu8dfYF'
            let result
            await ml.classifiers.classify(model_id, data).then(res => {
                result = res.body[0].classifications[0].tag_name
            })
            return result
        } catch (err) {
            console.log(err)
            return ''
        }
    }
}