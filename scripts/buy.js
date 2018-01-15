
/**
 * Script File for the Buy transaction
 * @param {org.acme.model.Buy} bt - Buying proposal
 * @transaction
 */ 

function buy(bt) 
{
  if(bt.new_owner.saldo >= bt.property.price) 
  {
     var house_price = bt.price; 
     bt.owner.saldo += house_price; 
     bt.new_owner.saldo -= house_price; 
     bt.property.owner = bt.new_owner;
     getAssetRegistry("org.acme.model.Property").then(function (assetRegistry) { 
       return assetRegistry.update(bt.property); }); 
     return getParticipantRegistry("org.acme.model.Owner").then(function (participantRegistry) {  
                                              return participantRegistry.updateAll([bt.owner, bt.new_owner]); }); 
           
} 
  
else 
{ 
  throw Error("You don't have the prerequisites for doing this action. The transaction will not be processed."); 
  return; 
 } 
}

