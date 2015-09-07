
let name = 'netneladno'

class JuickApi {
    constructor(){
        this.name = name;
        console.log('Init juick api');
        this.messages = [];
        this.init()
    }

    async init(){
        let r = await (this.get_messages());
        console.log('RRR: ', r);
        this.messages = r
    }

    async get_messages(){
        let reply = await fetch(`http://api.juick.com/messages?uname=${this.name}`);
        let response = await reply.json();
        console.log('Resp: ', response);
        return response;
    }

    
}

let juick_api = new JuickApi()
export default juick_api
