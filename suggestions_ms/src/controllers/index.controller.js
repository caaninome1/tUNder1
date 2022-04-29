const dataUser=require('./suggestions.controller')
var userid;
var iteractionlist= [];

const lookForSuggestions=async(req,res)=>{
    const {userId,iteractionList}=req.body;
    userid=userId;
    iteractionlist=iteractionList;
    console.log('Lista de interacciones del usuario '+userId+' es: '+iteractionList);
    res.send('Finding suggestions...');
}

const getDataUserById=async(req,res)=>{
    console.log('El usuario que se esta consultando es: '+userid);
    const id=req.params.id;
    res.send('Queryng user data...');
}

const userCharacteristics=(req,res)=>{
    const{userId,genderInterest,generalLocation,minAgeInterest,maxAgeInterest}=req.body;
    const data=dataUser.suggestionsFilters(userId,genderInterest,generalLocation,minAgeInterest,maxAgeInterest);
    //res.send('Sending user characteristics');
    console.log(data);
    console.log('Sending user characteristics');
    res.send(data);
}

const suggestionsUsers=(req,res)=>{
    const{userList}=req.body;
    const finalList = dataUser.finalList(userList,iteractionlist);
    console.log(iteractionlist);
    console.log(userList);
    console.log(finalList);
    console.log('Suggested users');
    res.send(finalList);
}


module.exports={
    lookForSuggestions,
    getDataUserById,
    userCharacteristics,
    suggestionsUsers,
}