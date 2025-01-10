// MASCARA PARA O IMPUT


$(document).ready(function () {
    // Função para aplicar máscaras
    $('.mascara-cpf').mask('999.999.999-99');
    $('.mascara-cel').mask('(99)99999-9999');
    $('#telefone').mask('(99)99999-9999');
    $('.mascara-tel').mask('(99)9999-9999');
    $('.mascara-ip').mask('999.99.999.99');
    $('.mascara-data-mes-ano').mask('99/9999');
    $('.mascara-data').mask('99/99/9999', { placeholder: "dd/mm/YYYY" });
    $('.mascara-data2').mask('99/9999', { placeholder: "mm/YYYY" });
    $('.mascara-cep').mask('99999-999');
  });