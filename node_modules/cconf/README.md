# CConf - A Cascading Configuration Loader for Node

CConf support cascading configuration loading, namespaces. By default, CConf can load JSON configuration files. You can provide your own loader if you prefer writing your configuration files in other format like YAML, XML etc.

## Getting Started

```shell
$ npm install --save cconf
```

## Overview
### Example

You can put your configuration files in a folder like this:

```
conf/
    |
    |- global.json
    |- env/
        |- dev.json
        |- test.json
        |- production.json
```

* You can put configurations which do no vary from different environments in the file "global.json".
* Each deploy environment can have it's own configuration. For example, "env/dev.json" is for development environment.

Now you can load your configuration files like this:

```js
var cconf = require('cconf');
var env = process.env.NODE_ENV ? process.env.NODE_ENV : 'dev';

//load global conf
cconf.file('conf/global.json');
//load env conf
cconf.file('conf/env/' + env + '.json');

//use config item named 'app_name'
console.log(cconf.get('app_name'));
```

Every time we invoke function "cconf.file", we load a new config file into a config pool.

And we can use "cconf.get" to access config item in the config pool.

But what if both config files contains the same configuration item. The answer is, the config value in last loaded file overwrites the one previously loaded. This merge strategy just like that writing style rules in CSS. And that's why we call it "Cascading Configuration Loader".

## API
1. cconf.file('path/to/config/file')

    Load a new config file

2. cconf.get('config_key')

    Get a config item in the config pool.

3. cconf.set('config_key', config_value)

    Set a config item in the config pool.

4. cconf.merge(obj)

    Merge a group of config items supplied by param obj into the current config pool.

5. cconf.export()

    Export the current config pool.

6. cconf.use(namespace)

    Switch namespace.