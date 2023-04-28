import fs from 'fs'

export default class logManager {
    #logID = 6
    constructor() {
        this.path = './dd-mm-aaaa-historico.vsk.log'
        this.logs = []
        // fs.writeFileSync(this.path, JSON.stringify([]))
    }

    async getLogs(){
        let file = JSON.parse(await fs.promises.readFile(this.path))        
        return (file)
    }

    async getLog(id){
        let file = JSON.parse(await fs.promises.readFile(this.path))
        let log = file.find((log)=> log.id === id)
        // if(!log){
        //     return
        // }
        return (log)

    }

    async addLog(service, type, info){
        let newLog = {
            service,
            type,
            info
        }
        newLog.date = this.#getDate()
        newLog.id = this.#getID()
        this.logs.push(newLog)
        fs.writeFileSync(this.path, JSON.stringify(this.logs))
    }

    async editLog(id, fix){
        let file = JSON.parse(await fs.promises.readFile(this.path))
        let log = file.find((log)=> log.id === id)
        if(!log){
            console.log(`No existe elemento con id :${id}`)
            return(`No existe log con id :${id}`)
        }else if (log.type !== "ERROR") {
            console.log("El Log no es un un ERROR")
            return("El Log no es un un ERROR")
        }
        log.fixed = fix
        fs.writeFileSync(this.path, JSON.stringify(file))
    }

    #getID() {
        let oldID = this.#logID
        this.#logID = oldID+1
        return oldID
    }
    #getDate() {
        const today = new Date()
        let DD = today.getDate()
        let MM = today.getMonth() + 1
        let YYYY = today.getFullYear()
        let hh = today.getHours()
        let mm = today.getMinutes()
        let ss = today.getSeconds()

        if (DD < 10) {
            DD = '0' + DD
        }
        if (MM < 10) {
            MM = '0' + MM
        }

        let fecha = `[${DD}/${MM}/${YYYY}] ${hh}:${mm}:${ss}`
        return fecha
    }
}
