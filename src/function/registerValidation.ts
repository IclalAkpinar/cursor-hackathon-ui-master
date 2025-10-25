export const validatePhoneNumber = (rule: any, value: string, callback: (message?: string) => void) => 
{
    if (!value) { callback(); return; }
    
    const regexOnlyNumbers = /^\d+$/;
    const regexStartsWith05 = /^5/;
    const regexExactLength = /^.{10}$/;
  
    if (!regexOnlyNumbers.test(value)) { callback('Telefon numarası yalnızca rakamlardan oluşmalıdır!'); } 
    else if (!regexStartsWith05.test(value)) { callback('Telefon numarası 5 ile başlamalıdır!'); } 
    else if (!regexExactLength.test(value)) { callback('Telefon numarası 10 haneli olmalıdır!'); } 
    else { callback(); }
};    

export const validateIdentityNumber = (rule: any, value: string, callback: (message?: string) => void) => 
{
    if (!value) { callback(); return; }
    
    const regexOnlyNumbers = /^\d+$/;
    const regexExactLength = /^.{11}$/;
  
    if (!regexOnlyNumbers.test(value)) { callback('TC kimlik numarası yalnızca rakamlardan oluşmalıdır!'); } 
    else if (!regexExactLength.test(value)) { callback('TC kimlik numarası 11 haneli olmalıdır!'); }  
    else { callback(); }
};