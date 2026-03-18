// script.js - shared tracking-friendly interactive behaviors
// Placeholder for GTM script insertion:
// Add GTM script snippet here in <head> and body per GTM docs

const logEvent = (eventName, data = {}) => {
  console.log(`Event: ${eventName}`, data);
};

document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');
  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('hidden');
    });
  }

  const applyButtons = document.querySelectorAll('.cta-apply, .view-loan-btn, .apply-now');
  applyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      logEvent('click_apply_cta', { text: btn.innerText.trim(), class: btn.className });
    });
  });

  const eligibilityButtons = document.querySelectorAll('.cta-eligibility');
  eligibilityButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      logEvent('click_eligibility_cta', { text: btn.innerText.trim() });
    });
  });

  const calculatorForm = document.getElementById('calculatorForm');
  if (calculatorForm) {
    const amount = document.getElementById('loanAmount');
    const rate = document.getElementById('interestRate');
    const tenure = document.getElementById('loanTenure');
    const result = document.getElementById('emiResult');
    const calculateBtn = document.getElementById('calculateBtn');

    const calculateEMI = () => {
      const principal = Number(amount.value);
      const annualRate = Number(rate.value);
      const years = Number(tenure.value);
      if (!principal || !annualRate || !years) {
        result.innerText = 'Enter loan amount, interest rate, and tenure to calculate EMI.';
        return;
      }
      const monthlyRate = annualRate / 12 / 100;
      const months = years * 12;
      const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
      const emiRounded = emi.toFixed(2);
      result.innerText = `Estimated EMI: ₹${emiRounded}`;
      logEvent('calculate_emi', { loanAmount: principal, interestRate: annualRate, tenure: years, emi: emiRounded });
    };

    calculateBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      calculateEMI();
    });

    [amount, rate, tenure].forEach(el => {
      el?.addEventListener('input', () => {
        result.innerText = '';
      });
    });
  }

  const loanForm = document.getElementById('loanForm');
  if (loanForm) {
    loanForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const payload = {
        fullName: document.getElementById('fullName')?.value || '',
        email: document.getElementById('email')?.value || '',
        phone: document.getElementById('phone')?.value || '',
        employmentType: document.getElementById('employmentType')?.value || '',
        monthlyIncome: document.getElementById('monthlyIncome')?.value || '',
        loanType: document.getElementById('loanType')?.value || ''
      };
      logEvent('submit_loan_form', payload);
      window.location.href = 'thank-you.html';
    });
  }
});