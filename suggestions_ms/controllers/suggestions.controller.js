function suggestionsFilters(userId,genderInterest,generalLocation,minAgeInterest,maxAgeInterest){
    let location;
    let age=random(minAgeInterest,maxAgeInterest);
    try{
        switch(generalLocation){
            case 'BOGOTA':
                location='BOGOTA';
            case 'ANTIOQUIA':
                location='ANTIOQUIA';
            case 'CALI':
                location='CALI';
            default:
                location= 'BOGOTA';
        }
        let suggestions={
            Location:location,
            Age:age,
        }
        return suggestions;
    }catch(error){
        console.log('error: '+error)
        return
    }
}

function random(min,max){
    return Math.floor((Math.random()*(max-min+1))+min)
}

function finalList(userList,iteractionlist){
    const result=userList.filter(el=>!iteractionlist.includes(el));
    return result;
}

module.exports={
    suggestionsFilters:suggestionsFilters,
    finalList:finalList,
}