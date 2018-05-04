import mineflayer from 'mineflayer'
import PathFind from './tasks/pathfind';
import Say from './tasks/say';

export let bot = mineflayer.createBot({
    username: '',
    password: '',
    host: '',
    port: 25565,
    verbose: true
})

// Creates the task map.
let tasks = undefined;

bot.on('spawn', () => {

    // Registers the chat pattern for TGN so we can handle commands easier.
    bot.chatAddPattern(/^\W*(\w+)\s»\s\$(.*)$/, 'command')

    // All of the tasks the bot can do.
    tasks = {
        'pathfind': new PathFind(),
        'say': new Say()
    }

})

bot.on('command', (username, message) => {

    // Makes sure only the allowed user can use the bot.
    if(username !== 'vlakreeh')
        return

    let args = message.split(/\s+/)

    if(args == 0)
        return

    let task = tasks[args[0].toLowerCase()]

    if(task == undefined){
        bot.chat(`${args[0]} is not a valid task.`)
        return
    }

    args.shift()

    // Lets the task handle how to control the bot.
    task.handle(username, args)
})