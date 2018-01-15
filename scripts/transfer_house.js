
/**
 * Script File for House Transfer transaction 
 @param {org.acme.model.Transfer_House} transf - Istance of house transfer
 @transaction 
 */ 

function transfer_house(transf) 
{ 
  var cs = transf.house_to_transfer.id_property; 
  var index = transf.selling_agency.owned_houses.indexOf(cs); 
  if(index != -1) 
  { 
    transf.selling_agency.owned_houses.splice(index, 1); 
    transf.buying_agency.owned_houses.push(cs); 
    return getParticipantRegistry("org.acme.model.Estate_Agency").then(function (participantRegistry) { 
      return participantRegistry.updateAll([transf.selling_agency, transf.buying_agency]); 
    }); 
  } 
  
  else 
  { 
    throw Error("Cannot find house. The transaction will not be executed."); 
    return; 
  } 
  
 
} 
