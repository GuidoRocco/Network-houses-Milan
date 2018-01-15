
/**
 * Script File for the Sell to Agency transaction  
 @param {org.acme.model.Sell_to_Agency} sl - Istance of sale to estate agency 
 @transaction 
 */ 

function sell_to_agency(sl) 
{ 
  var cs = sl.property_to_sell.id_property; 
  sl.owner.saldo += sl.price; 
  sl.property_to_sell.owner = sl.new_owner; 
  sl.agency.owned_houses.push(cs); 
  getAssetRegistry("org.acme.model.Property").then(function (assetRegistry) { 
    return assetRegistry.update(sl.property_to_sell); }); 
  getParticipantRegistry("org.acme.model.Owner").then(function (participantRegistry) { 
    return participantRegistry.update(sl.owner); }); 
  return getParticipantRegistry("org.acme.model.Estate_Agency").then(function (participantRegistry) { 
    return participantRegistry.update(sl.agency); }); 
} 

