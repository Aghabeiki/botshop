/**
 * Created by roten on 9/29/17.
 */

module.exports = class CommandAbstract {

    get action() {
        return this._action;
    }

    get patterns() {
        return this._patterns;
    }

    get body() {
        return this._body;
    }

    constructor(...args) {
        if (args.length == 2) {
            // action and body for commands
            this._action = args[0];
            this._patterns = null;
            this._body = args[1];

        }
        else if (args.length == 3) {
            // action pattern body for hears
            this._action = args[0];
            this._patterns = args[1];
            this._body = args[2];
        }

    }

}