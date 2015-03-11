module.exports = (function () {

    var download    = require('download'),
        path        = require('path'),
        fse         = require('fs-extra'),
        packages    = require('./../data/unitypackages.json'),
        spinner     = require('cli-spinner').Spinner;

    /**
     * Move TestTools out of the assets folder and cleanup some files
     * @private
     */
    var _patchTestTools = function (destPath) {
        var uttPath = path.join(destPath, 'Assets/UnityTestTools');
        if(!fse.existsSync(uttPath))
        {
            console.error('  -> Patching UnityTestTools failed.'.red);
        } else {
            fse.move(uttPath, path.join(destPath, 'UnityTestTools'), function (err) {
                if(err) throw(err);
                fse.removeSync(path.join(destPath, 'Assets/UnityTestTools.meta'));
                fse.removeSync(path.join(destPath, 'Assets'));
                fse.removeSync(path.join(destPath, 'acknowledgements.markdown'));
                fse.removeSync(path.join(destPath, 'LICENSE'));
                fse.removeSync(path.join(destPath, 'readme.markdown'));
            });
        }
    };

    var install = function (items, destPath) {
        var dl = new download({ extract: true, strip: 1 });
        items.forEach(function(item, index, array) {
            var url = packages[item].url;
            if(!url)
            {
                console.error('Unkown package information:'.red, item);
                return;
            }

            dl.get(url).dest(destPath);

            var spi = new spinner('Downloading package...' + item.inverse);
            spi.setSpinnerString(10);
            spi.start();

            dl.run(function (err, files) {
                if(err)
                {
                    throw err;
                }

                if(item === 'testtools') _patchTestTools(destPath);

                spi.stop(true);
                console.log('  -> Installed package', item.inverse, 'successfully'.green);
            });
        });
    };

    return {
        install:    install
    };
})();