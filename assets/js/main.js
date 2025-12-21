/**
 * Template Name: Arsha
 * Template URL: https://bootstrapmade.com/arsha-free-bootstrap-html-template-corporate/
 * Updated: Mar 17 2024 with Bootstrap v5.3.3
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select("#header");
    let offset = header.offsetHeight;

    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos - offset,
      behavior: "smooth",
    });
  };

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select("#header");
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add("header-scrolled");
      } else {
        selectHeader.classList.remove("header-scrolled");
      }
    };
    window.addEventListener("load", headerScrolled);
    onscroll(document, headerScrolled);
  }

  /**
   * Back to top button
   */
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Mobile nav toggle
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("#navbar").classList.toggle("navbar-mobile");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /**
   * Mobile nav dropdowns activate
   */
  on(
    "click",
    ".navbar .dropdown > a",
    function (e) {
      if (select("#navbar").classList.contains("navbar-mobile")) {
        e.preventDefault();
        this.nextElementSibling.classList.toggle("dropdown-active");
      }
    },
    true
  );

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on(
    "click",
    ".scrollto",
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();

        let navbar = select("#navbar");
        if (navbar.classList.contains("navbar-mobile")) {
          navbar.classList.remove("navbar-mobile");
          let navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }
        scrollto(this.hash);
      }
    },
    true
  );

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener("load", () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      setTimeout(() => {
        if (preloader) {
          preloader.remove();
        }
      }, 100);
    });
    // Fallback: remove preloader after 3 seconds even if load event doesn't fire
    setTimeout(() => {
      if (preloader && preloader.parentNode) {
        preloader.remove();
      }
    }, 3000);
  }

  /**
   * Initiate  glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /**
   * Skills animation
   */
  let skilsContent = select(".skills-content");
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: "80%",
      handler: function (direction) {
        let progress = select(".progress .progress-bar", true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute("aria-valuenow") + "%";
        });
      },
    });
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener("load", () => {
    let portfolioContainer = select(".portfolio-container");
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: ".portfolio-item",
      });

      let portfolioFilters = select("#portfolio-flters li", true);

      on(
        "click",
        "#portfolio-flters li",
        function (e) {
          e.preventDefault();
          portfolioFilters.forEach(function (el) {
            el.classList.remove("filter-active");
          });
          this.classList.add("filter-active");

          portfolioIsotope.arrange({
            filter: this.getAttribute("data-filter"),
          });
          portfolioIsotope.on("arrangeComplete", function () {
            AOS.refresh();
          });
        },
        true
      );
    }
  });

  /**
   * Initiate portfolio lightbox
   */
  const portfolioLightbox = GLightbox({
    selector: ".portfolio-lightbox",
  });

  /**
   * Portfolio details slider
   */
  new Swiper(".portfolio-details-slider", {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });

  /**
   * Animation on scroll
   */
  window.addEventListener("load", () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  });
})();

// Get all clickable containers
const containers = document.querySelectorAll(".clickable-container");

containers.forEach((container) => {
  container.addEventListener("click", () => {
    // Remove the 'featured' and 'relative-content' classes from all containers
    containers.forEach((c) => {
      c.classList.remove("featured", "relative-content");
    });

    // Add the 'featured' and 'relative-content' classes to the clicked container
    container.classList.add("featured", "relative-content");
  });
});

/**
 * Curriculum Tabs and Module Selection
 */
document.addEventListener('DOMContentLoaded', () => {
  try {
    const curriculumTabs = document.querySelectorAll('.curriculum-tab');
    const moduleItems = document.querySelectorAll('.module-item');
    const moduleDetails = document.querySelectorAll('.module-detail');
    const downloadBtn = document.getElementById('downloadSyllabusBtn');
    let currentTrack = 'foundation'; // Default track

    // If curriculum section doesn't exist, exit early
    if (curriculumTabs.length === 0) {
      return;
    }

  // Tab switching
  curriculumTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const track = tab.getAttribute('data-track');
      currentTrack = track;
      
      curriculumTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
            // Show/hide modules sidebar based on track
            const curriculumContent = document.querySelector('.curriculum-content');
            const modulesSidebar = document.querySelector('.curriculum-modules');
            
            if (track === 'foundation') {
              if (curriculumContent) curriculumContent.classList.remove('advanced-track-active');
              if (modulesSidebar) modulesSidebar.style.display = 'block';
              moduleItems.forEach(item => {
                if (item.classList.contains('foundation-track')) {
                  item.style.display = 'block';
                } else if (item.classList.contains('advanced-track')) {
                  item.style.display = 'none';
                }
              });
            } else if (track === 'advanced') {
              // Hide the entire sidebar for advanced track and make content full width
              if (curriculumContent) curriculumContent.classList.add('advanced-track-active');
              if (modulesSidebar) modulesSidebar.style.display = 'none';
            }
            
            // Show/hide module details based on track
            moduleDetails.forEach(detail => {
              if (track === 'foundation') {
                if (detail.classList.contains('foundation-track')) {
                  detail.style.display = 'none';
                } else if (detail.classList.contains('advanced-track')) {
                  detail.style.display = 'none';
                }
              } else if (track === 'advanced') {
                if (detail.classList.contains('advanced-track')) {
                  // Show coming soon preview
                  if (detail.getAttribute('data-detail') === 'coming-soon') {
                    detail.style.display = 'block';
                    detail.classList.add('active');
                  } else {
                    detail.style.display = 'none';
                  }
                } else if (detail.classList.contains('foundation-track')) {
                  detail.style.display = 'none';
                }
              }
            });
            
            // Activate first module of selected track
            if (track === 'foundation') {
              const firstModule = document.querySelector('.module-item.foundation-track');
              if (firstModule) {
                const moduleId = firstModule.getAttribute('data-module');
                moduleItems.forEach(m => {
                  if (m.classList.contains('foundation-track')) {
                    m.classList.remove('active');
                  }
                });
                firstModule.classList.add('active');
                
                moduleDetails.forEach(d => {
                  d.classList.remove('active');
                  if (d.getAttribute('data-detail') === moduleId && d.classList.contains('foundation-track')) {
                    d.classList.add('active');
                    d.style.display = 'block';
                  }
                });
              }
            } else if (track === 'advanced') {
              // Show coming soon preview
              const comingSoon = document.querySelector('.module-detail[data-detail="coming-soon"]');
              if (comingSoon) {
                moduleDetails.forEach(d => d.classList.remove('active'));
                comingSoon.classList.add('active');
                comingSoon.style.display = 'block';
              }
            }
    });
  });

  // Module selection
  moduleItems.forEach(item => {
    item.addEventListener('click', () => {
      if (item.style.display === 'none') return;
      
      const moduleId = item.getAttribute('data-module');
      
      // Update active module
      moduleItems.forEach(m => {
        if (m.style.display !== 'none') {
          m.classList.remove('active');
        }
      });
      item.classList.add('active');
      
      // Update active detail
      moduleDetails.forEach(d => {
        d.classList.remove('active');
        d.style.display = 'none';
        if (d.getAttribute('data-detail') === moduleId) {
          d.classList.add('active');
          d.style.display = 'block';
        }
      });
    });
  });

        // Download Syllabus functionality
        if (downloadBtn) {
          downloadBtn.addEventListener('click', () => {
            const pdfPath = currentTrack === 'foundation' 
              ? 'resources/core-track-syllabus.pdf'
              : 'resources/advanced-track-syllabus.pdf';
            
            const link = document.createElement('a');
            link.href = pdfPath;
            link.download = currentTrack === 'foundation' 
              ? 'Core_Track_Syllabus.pdf'
              : 'Advanced_Track_Syllabus.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          });
        }
  } catch (error) {
    console.error('Error initializing curriculum:', error);
  }
});

/**
 * Portfolio Projects Filter
 */
document.addEventListener('DOMContentLoaded', () => {
  try {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterTabs.length === 0) {
      return;
    }

    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const filter = tab.getAttribute('data-filter');
        
        // Update active tab
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Show/hide projects
        projectCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'beginner') {
            if (category === 'beginner') {
              card.style.display = 'block';
            } else {
              card.style.display = 'none';
            }
          } else if (filter === 'advanced') {
            if (category === 'advanced') {
              card.style.display = 'block';
            } else {
              card.style.display = 'none';
            }
          }
        });
      });
    });
  } catch (error) {
    console.error('Error initializing portfolio projects filter:', error);
  }
});