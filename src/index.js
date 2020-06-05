
const NAME = Symbol('NAME');
const OPTIONS = Symbol('OPTIONS');


export default class Enum {

    constructor(name) {
        this[NAME] = name;
    }

    static _option(name, parameters = null) {

        let options = this[OPTIONS];
        let option;

        if (options === undefined) {
            options = {};
            this[OPTIONS] = options;
        }
        else {
            option = options[name];
        }

        if (!option) {
            option = new this(name);
            options[name] = option;
        }

        if (parameters) {
            Object.assign(option, parameters);
        }

        return option;
    }

    static *options() {
        for (let key of Object.getOwnPropertyNames(this)) {
            const value = this[key];
            if (value instanceof this) {
                yield value;
            }
        }
    }

    toString() {
        return this[NAME];
    }

    get name() {
        return this[NAME];
    }

    static getEntryByValue(value) {
        for (let option of this.options()) {
            if (option.value == value) {
                return option;
            }
        }
        return null;
    }
}
