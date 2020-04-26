import uuid from "uuid";
import { InputTypes } from '../com/const';

export const SecretItem = () => ({
    id: uuid.v4(),
    label: null,
    value: null,
    type: InputTypes.PASSWORD,    
})

const Secret = (id=null) => ({
    "id": (id == null) ? uuid.v4() : "",
    "title": "",
    "items": [],
    "tags": []
})  

export default Secret;
