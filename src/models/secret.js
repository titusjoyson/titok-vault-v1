import uuid from "uuid";
import { InputTypes } from '../com/const';

export const SecretItem = () => ({
    id: uuid.v4(),
    label: "",
    value: "",
    type: InputTypes.TEXT,    
})

const Secret = (id=null) => ({
    "id": (id == null) ? uuid.v4() : "",
    "title": "",
    "items": [],
    "tags": []
})  

export default Secret;
