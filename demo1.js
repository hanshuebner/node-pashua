var pashua = require('pashua');

pashua.dialog(
    function (error, result) {
        if ( result.cancel ) {
            pashua.dialog('text', { type: 'text',
                                    text: 'You canceled' });
        } else {
            pashua.dialog('text', { type: 'text',
                                    text: 'Hello ' + result.name + ', nice to meet you!\n\nI like ' + result['favorite-food'] + ', too' });
        }
    },
    {
        title: 'node-pashua test'
    },
    'name', {
        type: 'textfield',
        label: 'Please enter your name'
    },
    'favorite-food', {
        type: 'radiobutton',
        label: 'Tell me your favorite food',
        option: [ 'Pizza', 'Königsberger Klopse', 'Vogon sheep ragou' ]
    },
    'cancel', {
        type: 'cancelbutton'
    }
);

