var chalk = require('chalk');


module.exports = (options) => {
    if(!options.verbose) {
        return {
            green: (msg) => {},
            blue: (msg) => {},
            yellow: (msg) => {},
            red: (msg) => {}
        }
    }
    return {
        green: (msg) => console.log(chalk.green(msg)),
        blue: (msg) => console.log(chalk.blue(msg)),
        yellow: (msg) => console.log(chalk.yellow(msg)),
        red: (msg) => console.log(chalk.red(msg))
    }
}