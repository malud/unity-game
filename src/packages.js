module.exports = (function () {

    var download = require('download'),
        spinner = require('cli-spinner').Spinner;

    // TODO outsource this list...
    var _packages = {
        ugb:    'https://bitbucket.org/kaiwegner/ugb-source/get/master.zip',
        ubs:    'https://bitbucket.org/malud/ubs-source/get/master.zip'
    };

    var install = function (items, destPath) {
        var dl = new download({ extract: true, strip: 1 });
        items.forEach(function(item, index, array) {
            var url = _packages[item];
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

                spi.stop(true);
                console.log('  -> Installed package', item.inverse, 'successfully'.green);
            });
        });
    };

    return {
        install:    install
    };
})();