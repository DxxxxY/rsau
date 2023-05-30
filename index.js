const zlib = require("zlib")

module.exports = async(localPkg) => {
    //get upstream package.json
    const upstreamPkg = (await (await fetch(await constructPackageURL(localPkg.repository.url))).json())

    //if out of date
    if (localPkg.version < upstreamPkg.version) {
        //download and overwrite everything
        zlib
    }
}

const constructPackageURL = async(url) => {
    //get repo path (owner/repo)
    const path = /https:\/\/.*\/(.*\/.*)/.exec(url)[1]

    console.log(path)

    //get default branch name
    const branch = (await (await fetch(`https://api.github.com/repos/${path}`)).json()).default_branch

    return `https://raw.githubusercontent.com/${path}/${branch}/package.json`
}