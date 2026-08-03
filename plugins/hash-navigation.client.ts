export default defineNuxtPlugin(() => {
  if (!process.client) return;

  const router = useRouter();
  const route = useRoute();

  // Function to scroll to element smoothly
  const scrollToElement = (hash: string) => {
    const targetId = hash.substring(1);
    const element = document.getElementById(targetId);
    
    if (element) {
      // Calculate offset for fixed header
      const headerHeight = 100; // Adjust this value based on your header height
      const elementTop = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementTop,
        behavior: 'smooth'
      });
    } else {
      // console.warn(`Element with id "${targetId}" not found`);
    }
  };

  // Handle hash navigation
  const handleHashNavigation = (to: any) => {
    if (to.hash) {
      // Wait for the page to be fully rendered
      setTimeout(() => {
        scrollToElement(to.hash);
      }, 300);
    }
  };

  // Handle clicks on hash links
  const handleHashLinkClick = (event: Event) => {
    const target = event.target as HTMLElement;
    const link = target.closest('a[href*="#"]') as HTMLAnchorElement;
    
    if (link && link.href.includes('#')) {
      event.preventDefault();
      
      const url = new URL(link.href);
      const hash = url.hash;
      const pathname = url.pathname;
      const currentPath = window.location.pathname;
      
      // If it's a cross-page link
      if (pathname !== currentPath) {
        // Navigate to the page with hash
        router.push({ path: pathname, hash: hash });
      } else {
        // Same page - just scroll
        scrollToElement(hash);
      }
    }
  };

  // Set up event listeners
  document.addEventListener('click', handleHashLinkClick, true);
  
  // Handle route changes
  router.afterEach(handleHashNavigation);
  
  // Handle initial hash on page load
  if (route.hash) {
    setTimeout(() => {
      scrollToElement(route.hash);
    }, 500);
  }
}); 