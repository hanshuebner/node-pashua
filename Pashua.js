//

var fs = require('fs');
var util = require('util');
var child_process = require('child_process');

function pashua(callback /* , options */)
{
    var script = [];
    function addAttribute(key, value) {
        if (typeof value == 'object') {
            for (var subkey in value) {
                script.push(key + '.' + subkey, value[subkey]);
            }
        } else {
            script.push(key);
            script.push(value);
        }
    }

    function addArray(array) {
        for (var i = 0; i < array.length; i += 2) {
            addAttribute(array[i], array[i + 1]);
        }
    }

    function addHash(hash) {
        for (var key in hash) {
            addAttribute(key, hash[key]);
        }
    }

    // collect options, flattening the arguments of the function (may
    // be individual keys and values, arrays or objects)
    for (var i = 1; i < arguments.length; i++) {
        var arg = arguments[i];
        if (typeof arg == 'object') {
            if (arg.length != undefined) {
                addArray(arg);
            } else {
                addHash(arg)
            }
        } else {
            addAttribute(arg, arguments[i + 1]);
            i++;
        }
    }

    var filename = "/tmp/node-pashua." + process.pid;
    var fd = fs.openSync(filename, "w");
    // write options to file
    for (var i = 0; i < script.length; i += 2) {
        var key = script[i];
        var value = script[i + 1];
        fs.writeSync(fd, key + " = " + value.toString().replace(/\n/g, "[return]") + "\n");
    }
    fs.closeSync(fd);

    function findPashua() {
        return '/Applications/Pashua.app/Contents/MacOS/Pashua';
    }

    function processReply(text) {
        var retval = {};
        text.replace(/([^=]+)=(.*)\n/g, function (match, key, value) {
            console.log('key', key);
            retval[key] = value.replace(/\[return\]/g, "\n");
        });
        return retval
    }

    child_process.exec(findPashua() + ' ' + filename,
                       function (error, stdout, stderr) {
                           if (error) {
                               fs.unlink(filename);
                               console.log('error executing Pashua:', error);
                           } else if (stderr) {
                               console.log('Pashua reported error:', stderr, 'configuration kept in', filename);
                           } else {
                               fs.unlink(filename);
                               callback(processReply(stdout));
                           }
                       });
}

exports.pashua = pashua;

pashua(function (result) {
    for (var key in result) {
        console.log(key, result[key]);
    }
},
       'tf1', {
           type: 'textfield',
           label: 'Example\ntextfield 1',
           'default': 'default content',
           width: 310
       },
       'tf2', {
           type: 'textfield',
           label: 'Example textfield 2',
           'default': 'default content',
           width: 310
       },
       'tb', {
           type: 'textbox'
       },
       'browser', {
           type: 'openbrowser'
       });
