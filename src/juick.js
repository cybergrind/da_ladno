import { set_state } from './actions'


let name = 'netneladno'

class JuickApi {
    constructor(){
        this.name = name;
        console.log('Init juick api');
        this.page = 1;
        this.messages = [];
        this.load_more();
        this._in_progress = 0;
    }

    async load_more(){
        if (this._in_progress){
            setTimeout(this.load_more.bind(this), 500)
        }
        this._in_progress = 1;
        let response = await (this.get_messages());
        this.push_messages(response);
        set_state('juick_messages', this.messages);
        this._in_progress = 0;
    }

    push_messages(messages){
        console.log('Mesasges: ', messages, this)
        this.messages = [...this.messages, ...messages];
        console.log('M: ', this);
    }

    async get_messages(){
        this.page += 1;
        let response = [];
        let url = `http://api.juick.com/messages?uname=${this.name}&page=${this.page-1}`;
        let local = localStorage.getItem(url)
        if (!local){
            let reply = await fetch(url);
            response = await reply.json();
            localStorage.setItem(url, JSON.stringify(response));
            console.log('Resp: ', response, this);
        } else {
            console.log('From local storage')
            response = JSON.parse(local);
        }
        return response
    }

    
}

let juick_api = new JuickApi()
export default juick_api
