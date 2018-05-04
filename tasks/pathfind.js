import Task from './task'
import { mineflayer, bot } from '../main'

// I don't know how to es6-ify this :(
var navigatePlugin = require('mineflayer-navigate')(mineflayer);

export default class PathFind extends Task {

    constructor() {
        super()

        navigatePlugin(bot)

        bot.navigate.on('pathFound', path =>
            console.log(`> I have found a path. I can get there in ${ path.length } moves.`))

        bot.navigate.on('cannotFind', closestPath =>
        console.log('> Unable to find a path.'))
    }

    handle(username, args) {

        // Makes sure the arguments are of the correct length.
        if(args.length == 0){
            bot.whisper(username, 'Please specify if I should start or stop.')
            return
        }

        let target = bot.players[username].entity

        // Makes sure the bot can find the target.
        if(target == undefined || target == null){
            bot.whisper(username, 'I can not find you, please come closer.')
            return
        }

        if(args[0] === 'start')
            bot.navigate.to(target.position)
        else if(args[0] === 'stop')
            bot.navigate.stop()
        else 
            bot.whisper(this.username, 'Please specify if I should start or stop.')
    }

}