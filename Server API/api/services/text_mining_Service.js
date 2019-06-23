let { PythonShell } = require('python-shell')
const { spawn } = require('child_process')
const path = require('path')

const execSync = require('child_process').execSync;

module.exports = {
    async text_analyse(text) {
        try {
            let path_ = path.join(__dirname, './textMining/DT2.py')
            let text_ =   `${text}` 
            var result = execSync( `python ${path_} "${text_}" `).toString()

            return result.charAt(0)
        } catch (err) {
            console.log(err);
        }
    }
}