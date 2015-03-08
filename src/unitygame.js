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

module.exports = app;