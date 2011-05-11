node-pashua
-----------

node-pashua is a simple library that makes it easy to use the Pashua
application (http://www.bluem.net/de/mac/pashua/) from Node.js
programs.

Pashua is a program to create MacOS Aqua dialogs from a simple text
based description.  In order to display a dialog, Pashua is run with
a dialog description as argument.  The dialog is shown, and the user
can make selections, fill out fields etc.  Once she is done, she
presses a submit or cancel button on the displayed dialog.  Pashua
then prints whatever the user has entered into the form to its
standard output and exits.  In order to display multiple dialogs,
Pashua must be invoked multiple times.

To use node-pashua, you need to review the Pashua documentation in
order to learn what user interface elements and attributes are
available.

node-pashua creates the text configuration file that describes a
Pashua dialog from JavaScript data structures.  Also, it parses the
result string that Pashua prints into a JavaScript object that can
easily be processed further.  When returning values, strings are
parsed into numbers when they look like integers.

Example
-------

The following program demonstrates how node-pashua can be used to
perform a simple interaction with a user using two dialog boxes:

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

Notice that specifying a callback or window attributes is optional.
The first dialog is opened with both of them specified whereas the
dialogs opened in the callback only specify text fields to display.
Also notice that the definition of the 'favorite-food' radio button
element has the 'options' attribute specified as array.

Only one function is provided:

### pashua.dialog([callback], [window-description], configuration-directive, [configuration-directive ...])

`callback` is a callback function of two arguments.  The first
argument is a string describing an error that has occured when calling
Pashua or `undefined` if no error has occured.  In the latter case,
the second argument is an object with the keys being the name of user
interface elements and the values being the values that the user has
entered (or that have been provided as the default for the element).

`window-description` is an object with window attributes.  The keys
must be the attribute name, without the "*." prefix.

`configuration-directive` can be one of the following

- Two arguments, a key and a value, specifying a full Pashua
  configuration directive including the user element name.

- An array with configuration directives.

If the value is an object, the key is interpreted as user element name
and all keys in the object will are attributes of that element.

In addition, some magical processing is done when an array is
specified as value in the attribute object to the effect shown in the
example above.
