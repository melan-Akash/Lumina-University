import { Link } from 'react-router-dom';

const Footer = () => {
  const footerLinks = [
    {
      title: 'STUDY WITH US',
      links: [
        { name: 'Courses', url: '/courses' },
        { name: 'How to Apply', url: '/contact' },
        { name: 'Fees & Finance', url: '/courses' },
        { name: 'Open Days & Events', url: '/contact' }
      ]
    },
    {
      title: 'ACADEMIC SCHOOLS',
      links: [
        { name: 'School of Art & Design', url: '/courses' },
        { name: 'School of Education & Social Policy', url: '/courses' },
        { name: 'School of Management', url: '/courses' },
        { name: 'School of Sport & Health Sciences', url: '/courses' },
        { name: 'School of Technologies', url: '/courses' }
      ]
    },
    {
      title: 'LUMINA UNIVERSITY',
      links: [
        { name: 'About Us', url: '/about' },
        { name: 'Equality & Diversity', url: '/about' },
        { name: 'News', url: '/about' },
        { name: 'Job Vacancies', url: '/about' }
      ]
    },
    {
      title: 'QUICK LINKS',
      links: [
        { name: 'Students - LuminaCentral', url: '#' },
        { name: 'Staff - InSite', url: '/admin/login' },
        { name: 'Moodle', url: '#' },
        { name: 'Research Explorer', url: '#' },
        { name: 'Library Services', url: '#' }
      ]
    }
  ];

  return (
    <footer className="bg-[#0f2638] text-white font-sans border-t border-[#1a3850]">
      <div className="max-w-[1600px] mx-auto px-8 py-16">
        
        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          {/* Columns 1-4 */}
          {footerLinks.map((col, index) => (
            <div key={index}>
              <h3 className="text-[#eeb8b8] font-bold text-[14px] uppercase tracking-wider mb-8">{col.title}</h3>
              <ul className="flex flex-col">
                {col.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      to={link.url} 
                      className="block text-white font-bold text-[15px] hover:text-[#eeb8b8] transition-colors py-4 border-b border-[#1a3850]"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Column 5: Contact */}
          <div>
            <h3 className="text-[#eeb8b8] font-bold text-[14px] uppercase tracking-wider mb-8">CONTACT</h3>
            <div className="space-y-6">
              <Link to="/contact" className="block text-white font-bold text-[15px] hover:text-[#eeb8b8] transition-colors border-b border-[#1a3850] pb-4">
                Staff Directory
              </Link>
              
              <div>
                <h4 className="text-white font-bold text-[15px] mb-2">Address</h4>
                <p className="text-white text-[14px] leading-relaxed">
                  Lumina University,<br />
                  University Campus, Western<br />
                  Avenue, London, LN1 2YB
                </p>
              </div>

              {/* Social Icons Placeholder */}
              <div className="flex gap-4 pt-4">
                {/* Simple SVGs for Socials */}
                <a href="#" className="text-white hover:text-[#eeb8b8] transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-[#eeb8b8] transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-[#eeb8b8] transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>

              {/* Contact Button */}
              <Link 
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-[#fbd135] text-[#0f2638] font-bold text-[15px] rounded hover:bg-[#eab308] transition-colors mt-6"
              >
                Contact Us
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#1a3850] pt-8 mt-12 flex flex-col md:flex-row justify-between items-end md:items-center">
          
          <div className="mb-6 md:mb-0">
            {/* Logo and Accreditation Badges */}
            <div className="flex items-center gap-6 mb-8">
              <img src="/logo.png" alt="Lumina University Logo" className="h-20 object-contain" />
              
              <div className="w-16 h-16 border-2 border-white rounded-md flex items-center justify-center">
                <span className="font-bold text-[10px] text-center text-white">QAA<br/>Assured</span>
              </div>
              <div className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center">
                <span className="font-bold text-[10px] text-center text-white">Top 10<br/>Uni</span>
              </div>
            </div>

            <div>
              <p className="text-white text-[13px] font-bold mb-1">
                &copy; Lumina University
              </p>
              <p className="text-gray-300 text-[13px]">
                Registered Charity: 1140762
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 text-[13px] font-bold text-white">
            <Link to="#" className="hover:text-[#eeb8b8] transition-colors">Accessibility</Link>
            <Link to="#" className="hover:text-[#eeb8b8] transition-colors">Privacy Statement</Link>
            <Link to="#" className="hover:text-[#eeb8b8] transition-colors">Modern Slavery Statement</Link>
          </div>
          
        </div>

      </div>
    </footer>
  );
};

export default Footer;
