var fse     = require('fs-extra');
var path    = require('path');
var app     = require('commander');
var packageJson = fse.readJsonSync(path.join(__dirname, '../package.json'));

var _createProject = function (projectName, packageName) {
    var projectDir = path.join(process.cwd(), projectName);
    fse.ensureDir(projectDir);
    console.log('  -> Creating', projectName, '...');
    fse.copy(path.join(__dirname, '../template'), projectDir, function (err) {
        if(err)
        {
            console.error(err);
        }

        // fix - set final name
        // gets installed as .npmignore if named .gitignore in npm package ??
        fse.rename(path.join(projectDir, '_gitignore'), path.join(projectDir, '.gitignore'));

        console.log("  -> Done!");
    });

};

app.command('create <project-name> <package-name>')
    .description('    Create a new Unity3D game project')
    .action(_createProject);

app.version(packageJson.version);
app.parse(process.argv);

module.exports = app;