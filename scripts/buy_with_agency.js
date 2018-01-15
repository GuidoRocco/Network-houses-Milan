
/**
 * Script file for the Buy transaction with estate agency 
 * @param {org.acme.model.Buy_with_Agency} bta - Buying instance with estate agency 
 * @transaction
 */ 

function buy_with_agency(bta) 
{ 
  var id_cs = bta.property_to_buy.id_property; 
  var index = bta.agency.owned_houses.indexOf(id_cs); 
  var commission = (bta.property_to_buy.price * 5) / 100; 
  var total_cost = bta.property_to_buy.price + commission; 
  if(index != -1 && bta.new_owner.saldo >= total_cost) 
  { 
    bta.agency.owned_houses.splice(index, 1); 
    bta.new_owner.saldo -= total_cost; 
    bta.property_to_buy.owner = bta.new_owner; 
    getAssetRegistry("org.acme.model.Property").then(function (assetRegistry) { 
      return assetRegistry.update(bta.property_to_buy); }); 
    getParticipantRegistry("org.acme.model.Estate_Agency").then(function (participantRegistry) { 
      return participantRegistry.update(bta.agency); }); 
    return getParticipantRegistry("org.acme.model.Owner").then(function (participantRegistry) { 
      return participantRegistry.update(bta.new_owner); }); 
  } 
  else 
  { 
    throw Error("You don't have the prerequisites for doing this action. The transaction will not be processed."); 
    return; 
  } 
  
} 
