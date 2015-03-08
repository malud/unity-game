var fse         = require('fs-extra'),
    path        = require('path'),
    app         = require('commander'),
    commands    = require('./commands.js'),
    updateNotifier = require('update-notifier'),
    pkg = require('./../package.json');

updateNotifier({pkg: pkg}).notify();

function list(val) {
    return val.split(',');
}

app.command('create <project-name> <bundle-identifier>')
    .option('-p, --packages <items>', 'Installs optional unity packages too.', list)
    .description('    Create a new Unity3D game project')
    .action(commands.create);

app.version(pkg.version);
app.parse(process.argv);

// show some usage if params aren't valid
if(process.argv.length <= 2)
{
    app.help();
} else if(process.argv.length > 2)
{
    if (!(app.options.indexOf(process.argv[2]) > -1))
    {
        if(!commands.isCommand(process.argv[2]))
        {
            app.help();
        }
    }
}

module.exports = app;