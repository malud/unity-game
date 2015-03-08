var fse         = require('fs-extra'),
    path        = require('path'),
    app         = require('commander'),
    commands    = require('./commands.js'),
    packageJson = fse.readJsonSync(path.join(__dirname, '../package.json'));

app.command('create <project-name> <bundle-identifier>')
    .description('    Create a new Unity3D game project')
    .action(commands.create);

app.version(packageJson.version);
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