module.exports = (function () {

    var fse         = require('fs-extra'),
        path        = require('path'),
        replace     = require('replace'),
        packages    = require('./packages.js');

    var _commands = ['create'];

    // using colors string prototype extensions from commander package here

    var _updateProjectSettings = function (projectName, projectPath, bundleIdentifier) {
        console.log('  -> Updating project settings ...');
        var settingsPath = projectPath;
        // sets project name in README.md & ProjectSettings
        replace({
            regex: '{{PROJECTNAME}}',
            replacement: projectName,
            paths: [settingsPath],
            recursive: true,
            silent: true
        });

        settingsPath = path.join(projectPath, 'Unity/ProjectSettings');
        replace({
            regex: 'com.Company.ProductName',
            replacement: bundleIdentifier,
            paths: [settingsPath],
            recursive: true,
            silent: true
        });
        console.log("  -> Done!".green);
    };

    var _installPackages = function (items, projectPath) {
        packages.install(items, path.join(projectPath, 'Unity/Assets/Packages'));
    };

    var createProject = function (projectName, bundleIdentifier, options) {
        var projectDir = path.join(process.cwd(), projectName);
        fse.ensureDir(projectDir);
        console.log('  -> Creating', projectName.inverse, '...');
        fse.copySync(path.join(__dirname, '../template'), projectDir);

        // fix - set final name
        // gets installed as .npmignore if named .gitignore in npm package ??
        fse.rename(path.join(projectDir, '_gitignore'), path.join(projectDir, '.gitignore'));
        console.log("  -> Done!".green);

        _updateProjectSettings(projectName, projectDir, bundleIdentifier);
        _installPackages(options.packages, projectDir);
    };

    var isCommand = function (other) {
        return _commands.indexOf(other) > -1;
    };

    return {
        create:     createProject,
        isCommand:  isCommand
    };
})();