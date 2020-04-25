import uuid from "uuid";

const Secret = () => ({
    "id": uuid.v4(),
    "title": "",
    "items": [],
    "tags": []
})

export default Secret;