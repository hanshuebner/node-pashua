var pashua = require('pashua');

pashua.dialog(function (result) {
    for (var key in result) {
        console.log(key, result[key]);
    }
},
       {
           title: 'node-pashua test'
       },
       'tf1', {
           type: 'textfield',
           label: 'Example textfield 1',
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
       },
       'popup', {
           type: 'popup',
           option: [ 'hey', 'ho', "let's", "go go" ]
       },
       'cb', {
           type: 'cancelbutton'
       });
