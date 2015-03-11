var app         = require('commander'),
    commands    = require('./commands.js'),
    updateNotifier = require('update-notifier'),
    pkg = require('./../package.json');

updateNotifier({
    pkg: pkg,
    updateCheckInterval: 1000 * 60 * 60 * 12 // at least twice a day due to current update interval
}).notify();

function list(val) {
    return val.split(',');
}

var listPackages = function () {
    var packages = require('./../data/unitypackages.json');
    var repeat = function (str, times){
        return Array(times + 1).join(str);
    };

    console.log('  Packages:\n'.yellow);
    for(var pack in packages)
    {
        if(packages.hasOwnProperty(pack))
        {
            console.log('    * '.yellow + pack,
                repeat(' ', 10 - pack.length),
                packages[pack].title,
                repeat(' ', 16 - packages[pack].title.length),
                packages[pack].description);
        }
    }
}

/**
 * Create command
 */
app.command('create <project-name> [bundle-identifier]')
    .alias('cr')
    .description('    Create a new Unity3D game project')
    .option('-p, --packages <items>', 'Installs optional unity packages too.', list)
    .action(commands.create)
    .on('--help', function () {
        console.log('  Example:\n');
        console.log('  $ unitygame cr MyNewGame -p ugb,testtools\n');
        listPackages();
    });

app
    .version(pkg.version)
    .on('--help', listPackages)
    .parse(process.argv);

// show some usage if params aren't valid
if(!app.args.length) app.help();

module.exports = app;