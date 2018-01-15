
/**
 * Script File for the remove House transaction
 @param {org.acme.model.Remove_House} rm - Instance of house removal 
 @transaction 
 */ 

function remove_house(rm) 
{ 
  var cs = rm.house_to_remove.id_property; 
  var index = rm.agency.owned_houses.indexOf(cs); 
  if(index != -1) {
    
     rm.agency.owned_houses.splice(index, 1); 
     return getParticipantRegistry("org.acme.model.Estate_Agency").then(function (participantRegistry) { 
        return participantRegistry.update(rm.agency); } 
                                                                           ); 
  } 
  else 
  { 
    throw Error("Cannot find house. The transaction will not be executed"); 
  } 
} 
