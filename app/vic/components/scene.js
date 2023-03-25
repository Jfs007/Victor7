import Component from "../../core/component";

/**
 *  scene = 'sth'
 *  
 * 
 *  进入页面，产生场景值
 *  
 * 
 * 
 * 
 * 
 * 
 */



class Scene extends Component {
    _name = 'scene';
    alias = '$s';

    value = '';
    

    get navigator() {
        let { Navigator } = vic.__components;
        return Navigator || {}
    }


    

    constructor() {
        super();
    }
    setup(vic) {
        super.setup(vic);
    }
    remove() {
        
    }
    // update




}

export default Scene;