
let Base = require('./base');





class Command extends Base {

    name = '';
    cfg = {};
    todos = {};
    constructor(options) {
        super();
        super.init(options);
       
        
    }
    // 命令前置动作
    async setup() {

    }
    // 命令启动动作
    async launch() {

    }
    

    config(cfg) {
        this.cfg = Object.assign({}, this.cfg || {}, cfg);
    }
    run(args) {
       
        this.console.log(`执行[${this.name}]命令完成`)
    }

   



  
   
    
    
}



module.exports = Command;