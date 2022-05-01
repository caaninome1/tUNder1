const{Router}=require('express');
const router=Router();

const{lookForSuggestions,getDataUserById,userCharacteristics, suggestionsUsers}=require('../controllers/index.controller')

router.post('/lookForSuggestions',lookForSuggestions);
router.get('/queryngUserData/:id',getDataUserById);
router.post('/userCharacteristics',userCharacteristics);
router.post('/suggestionsUsers',suggestionsUsers);

module.exports=router;
