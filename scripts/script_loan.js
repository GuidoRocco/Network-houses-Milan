
/**
 * Script File for the Loan transaction 
 @param {org.acme.model.Loan} mt - Istance of Loan 
 @transaction 
 */ 

function loan(mt) 
{ 
  var third_of_salary = mt.loan_owner.monthly_wage / 3; 
  if(third_of_salary >= mt.monthly_payment && mt.loan_owner.has_loan == false) 
  { 
    mt.loan_owner.has_loan = true; 
    mt.loan_owner.saldo += mt.sum; 
    mt.loan_owner.monthly_wage -= mt.monthly_payment; 
    return getParticipantRegistry("org.acme.model.Owner").then(function (assetRegistry) 
                                                                { 
      return assetRegistry.update(mt.loan_owner); } ); 
  } 
  
  else 
  { 
    throw Error("You don't have the prerequisites for doing this action. The transaction will not be processed."); 
    return; 
  } 
  
  
} 


  
  
    
