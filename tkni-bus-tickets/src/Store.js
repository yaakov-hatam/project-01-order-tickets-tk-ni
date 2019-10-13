import firebase from 'firebase';
import { createStore } from 'redux';


const model = {
    drives: []
}

export const ACTIONS = {
    "ADD": "ADD",
    "REMOVE": "REMOVE",
    "CHECKOUT": "CHECKOUT",
    "EMPTY": "EMPTY"
}

const reducer = (m = model, action) => {
    const options = {
        ADD: (m) => {
            m.drives.push(action.drive);
            console.log('added', action.drive, 'to cart');
            return m;
        },
        REMOVE: (m) => {
            for(let i = 0; i < m.drives.length; i++){
                if(m.drives[i].id == action.drive.id){
                    m.drives.splice(i,1);
                }
            }
            return m;
        },
        CHECKOUT: (m) => {
            m.drives.forEach(d=>{
                let id = d.id.substr(6,d.id.length);
                fetch('https://bus-tickets-2f58d.firebaseio.com/all_drives/'+ id +'.json')
                .then(data=>data.json())
                .then(data=>{data.seats_taken+=1; return data})
                .then(data=>{
                    firebase.database().ref('all_drives/' + id).set({...data},(err)=>console.log(err));
                });
            })
            return m;
        },
        EMPTY: (m)=>{
            m.drives = [];
            return m;
        }
    }
    return (options[action.type] || ((m) => m))(m);
}

export const container = createStore(reducer, model);