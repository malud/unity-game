module.exports = (function () {

    var fse     = require('fs-extra');
    var path    = require('path');
    var replace = require('replace');

    var _commands = ['create'];

    // using colors string prototype extensions from commander package here

    var _updateProjectSettings = function (projectName, projectPath, bundleIdentifier) {
        console.log('  -> Updating project settings ...');
        var settingsPath = path.join(projectPath, 'Unity/ProjectSettings');
        replace({
            regex: 'productName: unity',
            replacement: 'productName: ' + projectName,
            paths: [settingsPath],
            recursive: true,
            silent: true
        });
        replace({
            regex: 'com.Company.ProductName',
            replacement: bundleIdentifier,
            paths: [settingsPath],
            recursive: true,
            silent: true
        });
        console.log("  -> Done!".green);
    };

    var createProject = function (projectName, bundleIdentifier) {
        var projectDir = path.join(process.cwd(), projectName);
        fse.ensureDir(projectDir);
        console.log('  -> Creating', projectName.inverse, '...');
        fse.copy(path.join(__dirname, '../template'), projectDir, function (err) {
            if(err)
            {
                console.error(err.red);
            }

            // fix - set final name
            // gets installed as .npmignore if named .gitignore in npm package ??
            fse.rename(path.join(projectDir, '_gitignore'), path.join(projectDir, '.gitignore'));

            console.log("  -> Done!".green);

            _updateProjectSettings(projectName, projectDir, bundleIdentifier);
        });
    };

    var isCommand = function (other) {
        return _commands.indexOf(other) > -1;
    };

    return {
        create:     createProject,
        isCommand:  isCommand
    };
})();