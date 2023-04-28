import fs from 'fs'

export default class logManager {
    #logID = 1
    constructor(){
        this.path = './dd-mm-aaaa-historico.vsk.log'
        this.logs = []
        fs.writeFileSync(this.path, JSON.stringify([]))
    }
    async #getID(){
        let oldID = await this.#logID
        let newID = oldID++
        return oldID
    }
    async getDate(){
        const today = new Date()
        let DD = today.getDate()
        let MM = today.getMonth()
        let YYYY = today.getFullYear()
        let hh = today.getHours()
        let mm = today.getMinutes()
        let ss = today.getSeconds()

        if (DD < 10){
            DD = '0'+DD
        }

        if (MM < 10){
            MM = '0'+MM
        }
        
        let fecha = `[${DD}/${MM}/${YYYY}] ${hh}:${mm}:${ss}`
        console.log(fecha)
        
    }
}




let lm = new logManager()
lm.getDate()