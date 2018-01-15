
/**
 * Script File for the Add House transaction
 @param {org.acme.model.Add_House} ad - House adding instance
 @transaction 
 */ 

function add_house(ad) 
{ 
    var cs = ad.house_to_add.id_property; 
    if(ad.agency.owned_houses.indexOf(cs) == -1) 
    { 
       ad.agency.owned_houses.push(cs); 
       return getParticipantRegistry("org.acme.model.Estate_Agency").then(function (participantRegistry) { 
          return participantRegistry.update(ad.agency); } 
                                                                           ); 
    } 
    
    else 
    { 
      throw Error("House already present in the registry of the agency. Transaction will not be executed"); 
    } 
  

  
} 

                                                                        
