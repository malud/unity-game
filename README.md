# Unitygame
A npm cli package to rapidly create a Unity3D boilerplate project you can start with.

## Installation
    npm install -g unitygame

## Usage
    unitygame create MyUnity3DGame com.npm.app

which creates a folder structure like [this one] (https://github.com/malud/unity-game/tree/master/template)

### Create with optional unity packages
    unitygame create MyUnity3DGame com.gamewithpackages.app -p ugb,ubs

This creates the unity project and also installs the following packages to Assets/Packages.

* [UGB - UnityGameBase] (https://bitbucket.org/kaiwegner/unity-game-base)
* [UBS - UnityBuildSystem] (https://bitbucket.org/kaiwegner/unity-build-system)
