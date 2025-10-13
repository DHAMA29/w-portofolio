// Modern Portfolio JavaScript with Typing Animation and Page Intro Animations

// Page Introduction Animations - only once per session
const visitedSections = new Set();

// Intersection Observer for page animations
const createIntersectionObserver = () => {
  const observerOptions = {
    threshold: 0.3, // Increased threshold to ensure section is more visible
    rootMargin: "0px 0px -100px 0px", // More conservative margin
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const section = entry.target;
        const sectionId = section.id;

        // Only animate if this section hasn't been visited before
        if (!visitedSections.has(sectionId)) {
          const hiddenElements = section.querySelectorAll(".section-hidden");
          hiddenElements.forEach((element) => {
            element.classList.remove("section-hidden");
          });
          visitedSections.add(sectionId);

          // If this is the about section, trigger skill bar animations
          if (sectionId === "about") {
            setTimeout(() => {
              animateSkillBars();
            }, 800); // Wait for intro animation to complete
          }
        }
      }
    });
  }, observerOptions);

  // Observe all sections except home (it should animate immediately)
  document.querySelectorAll("section[id]:not(#home)").forEach((section) => {
    observer.observe(section);
  });

  // Animate home section immediately on page load
  const homeSection = document.getElementById("home");
  if (homeSection && !visitedSections.has("home")) {
    const hiddenElements = homeSection.querySelectorAll(".section-hidden");
    hiddenElements.forEach((element) => {
      element.classList.remove("section-hidden");
    });
    visitedSections.add("home");
  }
};

// Skill bars animation
function animateSkillBars() {
  const skillBars = document.querySelectorAll(".skill-bar");
  const percentageCounters = document.querySelectorAll(".skill-percentage");

  skillBars.forEach((bar, index) => {
    const targetWidth = bar.dataset.width || bar.style.width;
    const numericWidth = parseInt(targetWidth);
    const counter = percentageCounters[index];

    // Reset bar width
    bar.style.width = "0%";

    // Animate bar width
    setTimeout(() => {
      bar.style.width = targetWidth;
    }, index * 200);

    // Animate percentage counter
    if (counter) {
      let currentPercentage = 0;
      const increment = numericWidth / 60; // Duration of about 1 second

      const countAnimation = setInterval(() => {
        currentPercentage += increment;
        if (currentPercentage >= numericWidth) {
          currentPercentage = numericWidth;
          clearInterval(countAnimation);
        }
        counter.textContent = Math.round(currentPercentage) + "%";
      }, 16); // ~60 FPS
    }
  });
}

// Initialize page intro animations when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  createIntersectionObserver();
});

// Mobile navigation toggle
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

mobileMenuBtn &&
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

// Close mobile menu when clicking on links
mobileMenu &&
  mobileMenu.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      mobileMenu.classList.add("hidden");
    }
  });

// Fixed Typing Animation for Hero Section (no cursor)
const typingText = document.getElementById("typing-text");

if (typingText) {
  const texts = [
    "Dhama Shidqi Putra",
    "AI & Market Eunthusiast",
    "AI Problem Solver",
    "AI Prompter Engineer",
    "Technology Enthusiast",
  ];

  // Set fixed width to prevent text shifting
  const longestText = texts.reduce((a, b) => (a.length > b.length ? a : b));
  typingText.style.minWidth = `${longestText.length * 0.65}em`;
  typingText.style.display = "inline-block";
  typingText.style.textAlign = "left";

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function typeEffect() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      typingText.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      typingText.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentText.length) {
      // Pause at end
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typingSpeed = 300;
    }

    setTimeout(typeEffect, typingSpeed);
  }

  // Start typing animation
  typeEffect();
}

// Set current year
const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const fadeInObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-fade-in");
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements for animations
document
  .querySelectorAll(".skill-card, .project-card, .contact-item")
  .forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    fadeInObserver.observe(element);
  });

// Skill progress bar animation
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const progressBars = entry.target.querySelectorAll(".skill-progress");
        progressBars.forEach((bar) => {
          const width = bar.style.width;
          bar.style.width = "0%";
          setTimeout(() => {
            bar.style.width = width;
          }, 300);
        });
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll(".skill-card").forEach((card) => {
  skillObserver.observe(card);
});

// Enhanced contact form handler
function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const formMsg = document.getElementById("formMsg");
  const submitBtn = form.querySelector('button[type="submit"]');

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const subject = form.subject
    ? form.subject.value.trim()
    : "Portfolio Contact";
  const message = form.message.value.trim();

  // Validation
  if (!name || !email || !message) {
    showFormMessage("Please fill in all required fields.", "error");
    return false;
  }

  if (!isValidEmail(email)) {
    showFormMessage("Please enter a valid email address.", "error");
    return false;
  }

  // Show loading state
  const originalHTML = submitBtn.innerHTML;
  submitBtn.innerHTML = `
    <svg class="w-5 h-5 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    Sending...
  `;
  submitBtn.disabled = true;

  // Build mailto link
  const mailtoSubject = encodeURIComponent(`${subject} - from ${name}`);
  const mailtoBody = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  );

  try {
    window.location.href = `mailto:dhamzk026@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

    // Show success message
    setTimeout(() => {
      showFormMessage(
        "Email client opened! Please send your message.",
        "success"
      );
      form.reset();
      submitBtn.innerHTML = originalHTML;
      submitBtn.disabled = false;
    }, 1000);
  } catch (error) {
    showFormMessage("An error occurred. Please try again.", "error");
    submitBtn.innerHTML = originalHTML;
    submitBtn.disabled = false;
  }

  return false;
}

// Helper functions
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function showFormMessage(message, type) {
  const formMsg = document.getElementById("formMsg");
  if (formMsg) {
    formMsg.textContent = message;
    formMsg.className = `text-sm ${
      type === "error" ? "text-red-400" : "text-green-400"
    }`;

    // Clear message after 5 seconds
    setTimeout(() => {
      formMsg.textContent = "";
      formMsg.className = "text-sm";
    }, 5000);
  }
}

// Navbar scroll effect with transparent to blur animation
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  const navbar = document.querySelector("nav");
  const currentScrollY = window.scrollY;

  if (currentScrollY > 100) {
    // When scrolled past banner - add blur effect
    navbar.style.background = "rgba(0, 0, 0, 0.9)";
    navbar.style.backdropFilter = "blur(20px)";
    navbar.style.borderBottom = "1px solid rgba(139, 92, 246, 0.3)";
  } else {
    // When in banner - transparent
    navbar.style.background = "rgba(0, 0, 0, 0.3)";
    navbar.style.backdropFilter = "blur(0px)";
    navbar.style.borderBottom = "1px solid rgba(255, 255, 255, 0.1)";
  }

  lastScrollY = currentScrollY;
});

// Parallax effect for hero background elements
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(".absolute");

  parallaxElements.forEach((element) => {
    if (element.classList.contains("animate-pulse")) {
      const speed = 0.5;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    }
  });
});

// Smooth page load animation
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";

  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});

// Keyboard navigation support
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !mobileMenu.classList.contains("hidden")) {
    mobileMenu.classList.add("hidden");
  }
});

// Enhanced hover effects for project cards
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-8px) scale(1.02)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)";
  });
});

// Dynamic gradient animation for background
function animateGradient() {
  const gradientElements = document.querySelectorAll(
    ".bg-gradient-to-br, .bg-gradient-to-r"
  );

  gradientElements.forEach((element) => {
    element.style.backgroundSize = "200% 200%";
    element.style.animation = "gradient-shift 8s ease-in-out infinite";
  });
}

// Skills section animations and interactions
document.addEventListener("DOMContentLoaded", () => {
  // Skills cards hover animations
  const skillCards = document.querySelectorAll(".skill-service-card");

  skillCards.forEach((card, index) => {
    // Add entrance animation with stagger
    card.style.opacity = "0";
    card.style.transform = "translateY(50px)";
    card.style.transition = "all 0.8s ease";

    setTimeout(() => {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, index * 200);

    // Add hover effects
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px) scale(1.02)";
      card.style.boxShadow = "0 20px 40px rgba(139, 92, 246, 0.3)";
    });

    card.addEventListener("mouseleave", () => {
      if (card.querySelector(".border-purple-500")) {
        // Featured card maintains elevation
        card.style.transform = "translateY(-4px) scale(1)";
      } else {
        card.style.transform = "translateY(0) scale(1)";
      }
      card.style.boxShadow = "";
    });
  });

  // Carousel functionality for skills
  let currentSkillIndex = 1; // Start with center (Web Development)
  const skillsContainer = document.querySelector("#skills .grid");
  const dots = document.querySelectorAll('#skills button[class*="w-3"]');

  function updateSkillsCarousel(index) {
    if (skillsContainer) {
      const cards = skillsContainer.querySelectorAll(".skill-service-card");
      cards.forEach((card, i) => {
        card.style.transform =
          i === index ? "translateY(-4px)" : "translateY(0)";
        const border = card.querySelector("div");
        if (i === index) {
          border.className = border.className.replace(
            "border-gray-700",
            "border-purple-500"
          );
          border.className = border.className.replace(
            "from-gray-900 to-gray-800",
            "from-purple-900/50 to-blue-900/50"
          );
        } else {
          border.className = border.className.replace(
            "border-purple-500",
            "border-gray-700"
          );
          border.className = border.className.replace(
            "from-purple-900/50 to-blue-900/50",
            "from-gray-900 to-gray-800"
          );
        }
      });
    }

    // Update dots
    dots.forEach((dot, i) => {
      if (i === index) {
        dot.className = dot.className.replace("bg-gray-600", "bg-purple-500");
      } else {
        dot.className = dot.className.replace("bg-purple-500", "bg-gray-600");
      }
    });
  }

  // Dot click handlers
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentSkillIndex = index;
      updateSkillsCarousel(index);
    });
  });

  // Arrow click handlers
  const leftArrow = document.querySelector(
    '#skills button svg[d*="M15 19l-7-7 7-7"]'
  )?.parentElement;
  const rightArrow = document.querySelector(
    '#skills button svg[d*="M9 5l7 7-7 7"]'
  )?.parentElement;

  if (leftArrow) {
    leftArrow.addEventListener("click", () => {
      currentSkillIndex = currentSkillIndex > 0 ? currentSkillIndex - 1 : 2;
      updateSkillsCarousel(currentSkillIndex);
    });
  }

  if (rightArrow) {
    rightArrow.addEventListener("click", () => {
      currentSkillIndex = currentSkillIndex < 2 ? currentSkillIndex + 1 : 0;
      updateSkillsCarousel(currentSkillIndex);
    });
  }

  // Auto-rotate skills every 5 seconds
  setInterval(() => {
    currentSkillIndex = currentSkillIndex < 2 ? currentSkillIndex + 1 : 0;
    updateSkillsCarousel(currentSkillIndex);
  }, 5000);
});

// Initialize animations when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  animateGradient();

  // Add stagger animation to grid items
  const gridItems = document.querySelectorAll(".grid > *");
  gridItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
  });
});

// Intersection Observer for counting animations
const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statCard = entry.target;
        const numberElement = statCard.querySelector(".text-3xl");
        if (numberElement) {
          const finalNumber = parseInt(numberElement.textContent);
          animateCounter(numberElement, finalNumber);
        }
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll(".stat-card").forEach((card) => {
  countObserver.observe(card);
});

function animateCounter(element, target) {
  let current = 0;
  const increment = target / 30;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target + "+";
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current) + "+";
    }
  }, 50);
}

// Page transition effects
function createPageTransition() {
  const overlay = document.createElement("div");
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    z-index: 9999;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
  `;
  document.body.appendChild(overlay);

  return overlay;
}

// Initialize everything
document.addEventListener("DOMContentLoaded", () => {
  // Add loading class to body initially
  document.body.classList.add("loading");

  // Remove loading class after page loads
  window.addEventListener("load", () => {
    setTimeout(() => {
      document.body.classList.remove("loading");
    }, 500);
  });

  // Initialize Skills Carousel
  initializeSkillsCarousel();
});

// Improved Skills Selection with Smooth Animations
function initializeSkillsCarousel() {
  const prevBtn = document.getElementById("skills-prev");
  const nextBtn = document.getElementById("skills-next");
  const dots = document.querySelectorAll(".skill-dot");
  const skillCards = document.querySelectorAll(".skill-card");

  if (!prevBtn || !nextBtn || dots.length === 0 || skillCards.length === 0)
    return;

  let currentIndex = 1; // Start with Web Development featured
  let isAnimating = false;

  function updateSkills() {
    if (isAnimating) return;
    isAnimating = true;

    skillCards.forEach((card, index) => {
      const serviceCard = card.querySelector(".skill-service-card");
      const cardDiv = serviceCard.querySelector("div");

      // Remove all existing classes and reset
      card.classList.remove("featured");
      serviceCard.style.transform = "";
      serviceCard.style.zIndex = "";

      if (index === currentIndex) {
        // Featured card
        setTimeout(() => {
          card.classList.add("featured");

          // Enhanced featured styling
          serviceCard.style.transform = "scale(1.05) translateY(-8px)";
          serviceCard.style.zIndex = "10";

          // Update card styling
          cardDiv.className =
            "bg-gradient-to-br from-purple-900/70 to-blue-900/70 rounded-3xl p-8 md:p-10 text-center border-2 border-purple-500/80 shadow-2xl shadow-purple-500/30 backdrop-blur-md h-full flex flex-col justify-between transform scale-105 md:scale-110";

          // Update title
          const title = cardDiv.querySelector("h3");
          if (title) {
            title.className =
              "text-xl md:text-2xl font-bold text-white mb-3 md:mb-4";
          }

          // Update description
          const desc = cardDiv.querySelector("p");
          if (desc) {
            desc.className =
              "text-sm md:text-base text-gray-200 leading-relaxed";
          }

          // Update image container
          const imageContainer = cardDiv.querySelector(".w-36, .w-32");
          if (imageContainer) {
            imageContainer.className =
              "w-36 h-36 mx-auto bg-gradient-to-br from-purple-600/25 to-blue-600/25 rounded-3xl flex items-center justify-center mb-6 shadow-xl transition-all duration-500 group-hover:scale-105";
          }

          // Add badge if not exists
          const badgeContainer = cardDiv.querySelector(".flex-shrink-0.mb-8");
          if (
            badgeContainer &&
            !badgeContainer.querySelector(".absolute.-top-3")
          ) {
            const badge = document.createElement("div");
            badge.className =
              "absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm px-4 py-2 rounded-full shadow-lg";
            badge.innerHTML = "✨ Featured";
            badgeContainer.style.position = "relative";
            badgeContainer.appendChild(badge);
          }
        }, 50);
      } else {
        // Normal cards
        setTimeout(() => {
          serviceCard.style.transform = "scale(1) translateY(0)";
          serviceCard.style.zIndex = "1";

          // Normal styling
          cardDiv.className =
            "bg-gradient-to-br from-gray-900/90 to-gray-800/90 rounded-3xl p-6 md:p-8 text-center border border-gray-700/50 hover:border-purple-500/50 transition-all duration-500 backdrop-blur-sm h-full flex flex-col justify-between";

          // Update title
          const title = cardDiv.querySelector("h3");
          if (title) {
            title.className =
              "text-lg md:text-xl font-bold text-white mb-3 md:mb-4 group-hover:text-purple-400 transition-colors duration-300";
          }

          // Update description
          const desc = cardDiv.querySelector("p");
          if (desc) {
            desc.className =
              "text-sm md:text-base text-gray-400 leading-relaxed transition-colors duration-300 group-hover:text-gray-300";
          }

          // Update image container
          const imageContainer = cardDiv.querySelector(".w-36, .w-32");
          if (imageContainer) {
            imageContainer.className =
              "w-32 h-32 mx-auto bg-gradient-to-br from-purple-600/15 to-blue-600/15 rounded-3xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-105 shadow-lg";
          }

          // Remove badge
          const badge = cardDiv.querySelector(".absolute.-top-3");
          if (badge) {
            badge.remove();
          }
        }, 50);
      }
    });

    // Update dots
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.style.transform = "scale(1.2)";
        dot.className =
          "skill-dot w-3 h-3 bg-purple-500 rounded-full transition-all duration-300";
      } else {
        dot.style.transform = "scale(1)";
        dot.className =
          "skill-dot w-3 h-3 bg-gray-600 rounded-full hover:bg-purple-500 transition-all duration-300";
      }
    });

    // Smooth container adjustment
    const container = document.querySelector(".skills-container");
    if (container) {
      container.style.transform = "translateY(0)";
    }

    // Allow next animation
    setTimeout(() => {
      isAnimating = false;
    }, 400);
  }

  function nextSkill() {
    if (isAnimating) return;
    currentIndex = (currentIndex + 1) % 3;
    updateSkills();
  }

  function prevSkill() {
    if (isAnimating) return;
    currentIndex = (currentIndex - 1 + 3) % 3;
    updateSkills();
  }

  // Event listeners
  nextBtn.addEventListener("click", nextSkill);
  prevBtn.addEventListener("click", prevSkill);

  // Dot click handlers
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      if (isAnimating) return;
      currentIndex = index;
      updateSkills();
    });
  });

  // Card click handlers
  skillCards.forEach((card, index) => {
    card.addEventListener("click", () => {
      if (isAnimating || index === currentIndex) return;
      currentIndex = index;
      updateSkills();
    });
  });

  // Improved touch support
  let touchStartX = 0;
  let touchStartY = 0;
  const skillsSection = document.getElementById("skills");

  if (skillsSection) {
    skillsSection.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      },
      { passive: true }
    );

    skillsSection.addEventListener(
      "touchend",
      (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;

        const deltaX = touchStartX - touchEndX;
        const deltaY = touchStartY - touchEndY;

        // Only respond to horizontal swipes
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
          if (deltaX > 0) {
            nextSkill();
          } else {
            prevSkill();
          }
        }
      },
      { passive: true }
    );
  }

  // Auto-play with better timing
  let autoPlayInterval = setInterval(nextSkill, 7000);

  // Pause on any interaction
  const pauseAutoPlay = () => clearInterval(autoPlayInterval);
  const resumeAutoPlay = () => {
    clearInterval(autoPlayInterval);
    autoPlayInterval = setInterval(nextSkill, 7000);
  };

  skillsSection?.addEventListener("mouseenter", pauseAutoPlay);
  skillsSection?.addEventListener("mouseleave", resumeAutoPlay);
  skillsSection?.addEventListener("touchstart", pauseAutoPlay);

  // Initialize with slight delay
  setTimeout(() => {
    updateSkills();
  }, 200);
}
