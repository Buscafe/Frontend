export function formatSmartPhone (phone) {
    phone = phone.replace(/\D/g,"");             // não deixa ser digitado nenhuma letra
    phone = phone.replace(/^(\d{2})(\d)/g,"($1) $2"); // Coloca parênteses em phoneolta dos dois primeiros dígitos
    phone = phone.replace(/(\d)(\d{4})$/,"$1-$2");    // Coloca hífen entre o quarto e o quinto dígitos
    return phone;
}