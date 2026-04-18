document.addEventListener('DOMContentLoaded', () => {
  // Sticky Navbar
  const navbar = document.querySelector('.navbar');
  const heroSection = document.querySelector('.hero') || document.querySelector('.page-header');

  const checkScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', checkScroll);
  checkScroll(); // Init

  // Mobile Menu
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  
  if (mobileMenuBtn) {
    // Create mobile menu elements
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    
    // Copy links
    const navLinksList = document.querySelector('.nav-links').cloneNode(true);
    navLinksList.style.display = 'flex';
    navLinksList.style.flexDirection = 'column';
    navLinksList.style.gap = '1.5rem';
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-menu';
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    
    mobileMenu.appendChild(closeBtn);
    mobileMenu.appendChild(navLinksList);
    
    // Add WhatsApp button to mobile menu
    const waBtn = document.createElement('a');
    waBtn.href = "https://wa.me/260977784144";
    waBtn.className = "btn btn-primary";
    waBtn.style.marginTop = "auto";
    waBtn.innerHTML = '<i class="fab fa-whatsapp"></i> Chat on WhatsApp';
    mobileMenu.appendChild(waBtn);
    
    const overlay = document.createElement('div');
    overlay.className = 'mobile-overlay';
    
    document.body.appendChild(mobileMenu);
    document.body.appendChild(overlay);
    
    const toggleMenu = () => {
      mobileMenu.classList.toggle('active');
      overlay.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    };
    
    mobileMenuBtn.addEventListener('click', toggleMenu);
    closeBtn.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
  }

  // Set active nav link based on current page
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
  // Scroll Animations (Reveal)
  const reveals = document.querySelectorAll('.reveal');
  const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -50px 0px', threshold: 0.1 });

  reveals.forEach(reveal => {
    revealOnScroll.observe(reveal);
  });

  // Parallax Effect for Hero
  const heroBg = document.querySelector('.hero-bg');
  if(heroBg) {
    window.addEventListener('scroll', () => {
      let scrollVal = window.scrollY;
      heroBg.style.transform = `translateY(${scrollVal * 0.4}px)`;
    });
  }

  // Stats Counter Animation
  const statNumbers = document.querySelectorAll('.stat-number');
  if(statNumbers.length > 0) {
    let started = false;
    const startCounters = () => {
      statNumbers.forEach(stat => {
        const target = +stat.getAttribute('data-target');
        const increment = target / 40;
        let current = 0;
        
        const updateCounter = () => {
          current += increment;
          if(current < target) {
            stat.innerText = Math.ceil(current) + (stat.getAttribute('data-suffix') || '');
            setTimeout(updateCounter, 40);
          } else {
            stat.innerText = target + (stat.getAttribute('data-suffix') || '');
          }
        };
        updateCounter();
      });
    };

    const statsSection = document.querySelector('.stats-section');
    if(statsSection) {
      const statsObserver = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting && !started) {
          startCounters();
          started = true;
        }
      }, { threshold: 0.3 });
      statsObserver.observe(statsSection);
    }
  }

  // Mortgage Calculator Logic
  const calcForm = document.getElementById('mortgage-form');
  if(calcForm) {
    calcForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const amount = parseFloat(document.getElementById('loan-amount').value);
      const rate = parseFloat(document.getElementById('interest-rate').value) / 100 / 12;
      const years = parseFloat(document.getElementById('loan-years').value) * 12;
      
      if(rate === 0) {
        const monthlyPayment = amount / years;
        document.getElementById('monthly-payment').innerHTML = `ZMW ${monthlyPayment.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
        return;
      }
      
      const monthlyPayment = (amount * rate * Math.pow(1 + rate, years)) / (Math.pow(1 + rate, years) - 1);
      
      if(isFinite(monthlyPayment)) {
        document.getElementById('monthly-payment').innerHTML = `ZMW ${monthlyPayment.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
      } else {
        document.getElementById('monthly-payment').innerHTML = 'Invalid Input';
      }
    });
  }
});
