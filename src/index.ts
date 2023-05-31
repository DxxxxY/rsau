export default class tsau {
    path: string
    defaultBranch: string

    localPkg: any
    upstreamPkg: any

    constructor(localPkg: any) {
        this.localPkg = localPkg

        //get repo path (owner/repo)
        this.path = /https:\/\/.*\/(.*\/.*)/.exec(localPkg.repository.url)[1]

        this.init().then(r => this.start())
    }

    init = async() => {
        //get default branch name
        this.defaultBranch = (await (await fetch(`https://api.github.com/repos/${this.path}`)).json()).default_branch

        //get upstream package.json
        this.upstreamPkg = (await (await fetch(`https://raw.githubusercontent.com/${this.path}/${this.defaultBranch}/package.json`)).json())
    }

    start = async() => {
        //if out of date
        if (this.localPkg.version < this.upstreamPkg.version) {
            //download branch zip
            console.log(`Downloading ${this.path}...`)
        }
    }

    //https://github.com/DxxxxY/tsau/archive/refs/heads/master.zip
}