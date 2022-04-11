
const getChatRoomName = (personA, personB)=> {

    if(personA < personB) {
        return personA +"-"+ personB;
    }
    return personB +"-"+ personA;
}


module.exports = {getChatRoomName}