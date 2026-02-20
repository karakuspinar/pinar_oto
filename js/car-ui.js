// MARKA MODEL YIL FİLTRE SİSTEMİ

document.addEventListener("DOMContentLoaded", function(){

const brandSelect = document.getElementById("brand");
const modelSelect = document.getElementById("model");
const yearSelect  = document.getElementById("year");

if(!brandSelect) return;

// MARKALARI DOLDUR
let brands = Object.keys(window.CAR_DATA).sort();

brandSelect.innerHTML = '<option value="">Marka</option>';

brands.forEach(brand=>{
  brandSelect.innerHTML += `<option value="${brand}">${brand}</option>`;
});

// MARKA SEÇİLİNCE MODEL DOLDUR
brandSelect.addEventListener("change", function(){

  const selectedBrand = this.value;
  modelSelect.innerHTML = '<option value="">Model</option>';
  yearSelect.innerHTML = '<option value="">Yıl</option>';

  if(!selectedBrand) return;

  const models = Object.keys(window.CAR_DATA[selectedBrand]).sort();

  models.forEach(model=>{
    modelSelect.innerHTML += `<option value="${model}">${model}</option>`;
  });

});

// MODEL SEÇİLİNCE YIL DOLDUR
modelSelect.addEventListener("change", function(){

  const brand = brandSelect.value;
  const model = this.value;

  yearSelect.innerHTML = '<option value="">Yıl</option>';

  if(!brand || !model) return;

  const years = window.CAR_DATA[brand][model];

  years.forEach(year=>{
    yearSelect.innerHTML += `<option value="${year}">${year}</option>`;
  });

});

});