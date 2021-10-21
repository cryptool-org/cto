

const zeros = [...new Array(30)].map(() => "00")
const INITIAL_DATA = {
    "galois-field": ["02", "03", "01", "01", "01", "02", "03", "01", "01", "01", "02", "03", "03", "01", "01", "02"],
    "rcon": ["01", "02", "04", "08", "10", "20", "40", "80", "1b", "36", ...zeros],
}

class DataController{

    constructor(){
        this.store = {...INITIAL_DATA}
        this.subscriptions = {} 
    }


    subscribe(key, elements){
        const oldSubscriptions = key in this.subscriptions ? this.subscriptions[key] : []

        this.subscriptions = {
            ...this.subscriptions,
            [key]: [...oldSubscriptions, elements]
        }
  
        this.setSubscriberData(this.getData(key), elements)
    }

    callSubscribers(key){
        const data = this.getData(key)
        const subscribers = this.getSubscribers(key)

        subscribers.forEach(elements => {
            this.setSubscriberData(data, elements)
        })
    }


    setSubscriberData(data, elements){
        // transform to array
        elements = Array.isArray(elements) ? elements : [elements]



        elements.forEach((element, idx) => {
            const elementDisplayData = Array.isArray(data) ? data[idx] : data;
            element.updateContent(elementDisplayData)
        })
    }


    updateStore(key, value){
        // update store & call subscribers 
        this.store = {...this.store, [key]:value}
        
        this.callSubscribers(key)
    }


    updateStoreByObject(obj){
        Object.keys(obj).forEach((key) => {
            const value = obj[key]
            this.updateStore(key, value)
        })

   
    }
    

    getSubscribers(key){
        if(this.subscriptions[key] !== undefined ){
            return this.subscriptions[key]
        }
        return []
    }

    getData(key){
        if(!key in this.store) throw new Error(`key '${key}' not found in data store.`)
        return this.store[key] || 0
    }

}


export default DataController;