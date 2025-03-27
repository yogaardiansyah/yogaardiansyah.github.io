document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.getElementById("menu-btn");
    const menuLinks = document.getElementById("menu-links");
    const mainNav = document.getElementById("main-nav");
    const sections = document.querySelectorAll("section[id]");
    const navLinks = menuLinks ? menuLinks.querySelectorAll('a[role="menuitem"]') : [];

    if (menuBtn && menuLinks) {
        menuBtn.addEventListener("click", () => {
            const isOpen = menuBtn.getAttribute("aria-expanded") === "true";
            menuBtn.setAttribute("aria-expanded", !isOpen);
            menuBtn.classList.toggle("menu-open");
            menuLinks.classList.toggle("mobile-menu-open");
        });
    }

    if (menuLinks && navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener("click", (e) => {
                if (menuLinks.classList.contains("mobile-menu-open")) {
                     menuBtn.click();
                }
            });
        });
    }

    if (mainNav) {
        const scrollThreshold = 50;
        const handleBasicScroll = () => {
            if (window.scrollY > scrollThreshold) {
                mainNav.classList.add("scrolled");
            } else {
                mainNav.classList.remove("scrolled");
            }
        };
        handleBasicScroll();
        window.addEventListener("scroll", handleBasicScroll, { passive: true });
    }

    if (navLinks.length > 0 && sections.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: "-20% 0px -70% 0px",
            threshold: 0
        };

        const observerCallback = (entries, observer) => {
            let bestVisibleLink = null;

            entries.forEach(entry => {
                const linkId = entry.target.getAttribute('id');
                const correspondingLink = document.querySelector(
                    `.nav-link-mobile[data-link-id="${linkId}"], .nav-link[data-link-id="${linkId}"]`
                );

                if (entry.isIntersecting && correspondingLink) {
                     if (!bestVisibleLink) {
                          bestVisibleLink = correspondingLink;
                     }
                }
            });

            navLinks.forEach(link => link.classList.remove('active-link'));
            if (bestVisibleLink) {
                 bestVisibleLink.classList.add('active-link');
            }
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        sections.forEach(sec => observer.observe(sec));
    }
});