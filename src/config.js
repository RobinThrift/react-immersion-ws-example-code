import {AsyncStorage} from 'react-native';
import {isObject, merge} from 'lodash';

function resolveObjectPath(obj, path) {
    if (path.indexOf('.') !== -1) {
        let parts = path.split('.'),
            last  = obj[parts[0]],
            err   = false;

        for (let i = 1; i < parts.length - 1; i++) {
            if (isObject(last)) {
                last = last[parts[i]];
            } else {
                err = true;
                break;
            }
        }

        if (!err) {
            return {last, key: parts.pop()};
        } else {
            throw new Error(`Cannot find config value at ${path}`);
        }
    } else {
        return {last: obj, key: path};
    }
}

export class Config {
    constructor(values, storageName = 'ConfigDefaultInstance') {
        this._values = values;
        this._storageName = storageName;
    }

    get(path) {
        let {last, key} = resolveObjectPath(this._values, path);
        return last[key];
    }

    async set(path, value, save = false) {
        let {last, key} = resolveObjectPath(this._values, path);
        last[key] = value;
        if (save) {
            await this.save();
        }
    }

    async save() {
        await AsyncStorage.setItem(this._storageName, JSON.stringify(this._values));
    }

    async load() {
        let storedValues = await AsyncStorage.getItem(this._storageName);
        this._values = merge({}, this._values, JSON.parse(storedValues));
    }
}

Config.__defaultInstance = null;
Config.getDefaultInstance = (values) => {
    if (!Config.__defaultInstance) {
        Config.__defaultInstance = new Config(values);
    }
    return Config.__defaultInstance;
}

Config.loadDefaultInstance = async (values) => {
    let inst = Config.getDefaultInstance(values);
    await inst.load();
    return inst;
}
