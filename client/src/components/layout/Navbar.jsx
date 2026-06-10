import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MagnifyingGlassIcon, Bars3Icon, ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [activeSubTab, setActiveSubTab] = useState('Study at Lumina');
  
  const location = useLocation();

  const toggleMegaMenu = (menu) => {
    if (activeMegaMenu === menu) {
      setActiveMegaMenu(null);
    } else {
      setActiveMegaMenu(menu);
      // Reset subtab only if it's the Study menu
      if (menu === 'Study') {
        setActiveSubTab('Study at Lumina');
      } else {
        setActiveSubTab('default');
      }
    }
  };

  const closeMenu = () => setActiveMegaMenu(null);

  const mainNavItems = [
    { name: 'Study', id: 'Study' },
    { name: 'International', id: 'International' },
    { name: 'Research', id: 'Research' },
    { name: 'Business', id: 'Business' },
    { name: 'Sport', id: 'Sport' },
    { name: 'About', id: 'About' },
  ];

  const megaMenuData = {
    'Study': {
      hasSubTabs: true,
      subTabs: [
        { name: 'Study at Lumina', id: 'Study at Lumina' },
        { name: 'Open Days & Events', id: 'Open Days & Events' },
        { name: 'Accommodation', id: 'Accommodation' },
        { name: 'Fees & Money', id: 'Fees & Money' },
        { name: 'Student Life', id: 'Student Life' },
      ],
      content: {
        'Study at Lumina': [
          {
            title: 'Undergraduate Study',
            links: ['Undergraduate Study', 'Courses', 'Subjects', 'How to Apply', 'Request a Prospectus']
          },
          {
            title: 'Postgraduate Study',
            links: ['Postgraduate Study', 'Courses', 'How to Apply']
          },
          {
            title: 'Research Study',
            links: ['Research Degrees']
          },
          {
            title: 'Other Study Options',
            links: ['Widening Access', 'Summer Schools', 'Lumina Open Art School', 'Degree Apprenticeships', 'CPD & Short Courses', 'Study in English']
          },
          {
            title: 'Schools',
            links: ['School of Art & Design', 'School of Education & Social Policy', 'School of Management', 'School of Sport & Health Sciences', 'School of Technologies'],
            button: { text: 'All Courses', link: '/courses' }
          }
        ],
        'Open Days & Events': [
          {
            title: 'Events',
            links: ['Campus Tours', 'Undergraduate Open Days', 'Postgraduate Open Evenings', 'Virtual Fairs']
          },
          {
            title: 'Information',
            links: ['Travel & Directions', 'Where to Stay', 'Event FAQs', 'Contact Admissions']
          }
        ],
        'Accommodation': [
          {
            title: 'Halls of Residence',
            links: ['Main Campus', 'City Centre Campus', 'Private Halls', 'Compare Accommodation']
          },
          {
            title: 'Living Here',
            links: ['Living in the City', 'Accommodation Fees', 'How to Apply for Housing']
          }
        ],
        'Fees & Money': [
          {
            title: 'Tuition Fees',
            links: ['Undergraduate Fees', 'Postgraduate Fees', 'International Fees', 'Payment Options']
          },
          {
            title: 'Funding & Support',
            links: ['Scholarships & Bursaries', 'Student Loans', 'Managing Your Money', 'Hardship Funds']
          }
        ],
        'Student Life': [
          {
            title: 'Campus Life',
            links: ['Students Union', 'Clubs & Societies', 'Sports & Fitness', 'Campus Facilities']
          },
          {
            title: 'Support Services',
            links: ['Wellbeing Support', 'Disability Service', 'Careers Service', 'Chaplaincy']
          }
        ]
      }
    },
    'International': {
      hasSubTabs: false,
      content: {
        'default': [
          {
            title: 'Study With Us',
            links: ['Why Choose Lumina', 'Courses for International Students', 'Entry Requirements', 'How to Apply']
          },
          {
            title: 'Student Support',
            links: ['Visas & Immigration', 'Airport Welcome', 'Accommodation', 'International Fees & Scholarships']
          },
          {
            title: 'Global Partnerships',
            links: ['Partner Institutions', 'Study Abroad & Exchange', 'Erasmus+', 'Transnational Education']
          },
          {
            title: 'Your Country',
            links: ['Meet Us in Your Country', 'Country Specific Information', 'Local Representatives']
          }
        ]
      }
    },
    'Research': {
      hasSubTabs: false,
      content: {
        'default': [
          {
            title: 'Our Research',
            links: ['Research Excellence', 'Research Institutes & Centres', 'Research Impact', 'Publications']
          },
          {
            title: 'Research Degrees',
            links: ['PhD Opportunities', 'Professional Doctorates', 'MRes & MPhil', 'How to Apply']
          },
          {
            title: 'For Researchers',
            links: ['Research Support', 'Ethics & Integrity', 'Funding Opportunities', 'Researcher Development']
          }
        ]
      }
    },
    'Business': {
      hasSubTabs: false,
      content: {
        'default': [
          {
            title: 'Work With Us',
            links: ['Partnerships & Innovation', 'Knowledge Transfer Partnerships', 'Consultancy Services', 'Facilities Hire']
          },
          {
            title: 'Talent & Skills',
            links: ['Recruit Our Students', 'Degree Apprenticeships', 'Executive Education', 'CPD & Short Courses']
          },
          {
            title: 'Enterprise',
            links: ['Student Startups', 'Incubator Space', 'Business Networking', 'Enterprise Projects']
          }
        ]
      }
    },
    'Sport': {
      hasSubTabs: false,
      content: {
        'default': [
          {
            title: 'Facilities',
            links: ['Sports Centres', 'Gym Memberships', 'Pitches & Courts', 'Performance Analysis']
          },
          {
            title: 'Get Involved',
            links: ['Athletic Union', 'Intramural Sport', 'Fitness Classes', 'Coaching & Volunteering']
          },
          {
            title: 'Performance Sport',
            links: ['Focus Sports', 'Sports Scholarships', 'Strength & Conditioning', 'Sports Medicine']
          }
        ]
      }
    },
    'About': {
      hasSubTabs: false,
      content: {
        'default': [
          {
            title: 'Discover Lumina',
            links: ['Our History', 'Vision & Strategy', 'University Structure', 'Facts & Figures']
          },
          {
            title: 'Campuses',
            links: ['Main Campus', 'City Campus', 'Virtual Tours', 'Maps & Directions']
          },
          {
            title: 'Work Here',
            links: ['Job Vacancies', 'Benefits & Rewards', 'Equality & Diversity', 'Staff Wellbeing']
          },
          {
            title: 'Governance',
            links: ['Board of Governors', 'Vice-Chancellor', 'Policies & Procedures', 'Public Information']
          }
        ]
      }
    }
  };

  return (
    <div className="w-full relative z-50 font-sans">
      {/* Top Main Navigation Bar */}
      <nav className="bg-white px-4 sm:px-8 py-3 flex items-center justify-between shadow-sm">
        {/* Left: Logo */}
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-4" onClick={closeMenu}>
            <img src="/logo.png" alt="Lumina University Crest" className="h-[60px] md:h-[70px] object-contain" />
            <div className="h-12 w-px bg-gray-300 hidden md:block"></div>
            <div className="flex flex-col hidden sm:flex">
              <span className="text-[20px] font-medium leading-tight text-[#0f2638]">Lumina</span>
              <span className="text-[20px] font-medium leading-tight text-[#0f2638]">University</span>
            </div>
          </Link>
        </div>

        {/* Middle: Contiguous Nav Buttons (Hidden on mobile) */}
        <div className="hidden lg:flex">
          {mainNavItems.map((item, index) => {
            const isActive = activeMegaMenu === item.id;
            return (
              <button
                key={item.id}
                onClick={() => toggleMegaMenu(item.id)}
                className={`flex items-center gap-1 px-5 py-2.5 text-[15px] font-semibold transition-colors ${
                  isActive 
                    ? 'bg-[#0f2638] text-white' 
                    : 'bg-[#7ae0f5] text-[#0f2638] hover:bg-[#68d1e8]'
                } ${index === 0 ? 'rounded-l-md' : ''} ${index === mainNavItems.length - 1 ? 'rounded-r-md' : ''} border-r border-[#68d1e8] last:border-0`}
              >
                {item.name}
                <ChevronDownIcon className={`w-4 h-4 ml-1 transition-transform ${isActive ? 'rotate-180' : ''}`} strokeWidth={2.5} />
              </button>
            );
          })}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-6">
          <Link to="/courses" className="hidden md:block font-semibold text-[#0f2638] hover:text-[#005580] transition-colors" onClick={closeMenu}>
            Apply Now
          </Link>
          <button className="w-10 h-10 rounded-full bg-[#fbd135] flex items-center justify-center hover:bg-[#eab308] transition-colors">
            <MagnifyingGlassIcon className="w-5 h-5 text-[#0f2638]" strokeWidth={2.5} />
          </button>
          <button className="flex items-center justify-center text-[#0f2638] hover:text-[#005580] transition-colors lg:hidden">
            <Bars3Icon className="w-8 h-8" strokeWidth={2} />
          </button>
          <button className="hidden lg:flex items-center justify-center text-[#0f2638] hover:text-[#005580] transition-colors">
            <Bars3Icon className="w-7 h-7" strokeWidth={2} />
          </button>
        </div>
      </nav>

      {/* Mega Menu Overlay Layer */}
      {activeMegaMenu && megaMenuData[activeMegaMenu] && (
        <div className="absolute w-full bg-[#0f2638] text-white shadow-xl origin-top animate-fade-in-down border-t border-[#1a3850]">
          
          {/* Secondary Sub Navigation (Only show if menu has subTabs) */}
          {megaMenuData[activeMegaMenu].hasSubTabs && (
            <div className="bg-[#f0f3f5] flex items-center justify-between px-4 sm:px-8">
              <div className="flex overflow-x-auto hide-scrollbar">
                {megaMenuData[activeMegaMenu].subTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSubTab(tab.id)}
                    className={`px-6 py-3.5 text-[15px] font-bold whitespace-nowrap transition-colors ${
                      activeSubTab === tab.id
                        ? 'bg-[#0f2638] text-white'
                        : 'bg-transparent text-[#0f2638] hover:bg-[#e2e8ed]'
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </div>
              <button 
                onClick={closeMenu}
                className="flex items-center gap-1 text-[#0f2638] font-bold hover:text-red-600 transition-colors px-4 ml-4 shrink-0"
              >
                Close
                <XMarkIcon className="w-5 h-5" strokeWidth={2.5} />
              </button>
            </div>
          )}

          {/* Close button for menus WITHOUT subtabs */}
          {!megaMenuData[activeMegaMenu].hasSubTabs && (
            <div className="flex justify-end px-8 py-4 border-b border-[#1a3850]">
              <button 
                onClick={closeMenu}
                className="flex items-center gap-1 text-gray-300 font-bold hover:text-white transition-colors"
              >
                Close
                <XMarkIcon className="w-5 h-5" strokeWidth={2.5} />
              </button>
            </div>
          )}

          {/* Mega Menu Body Content */}
          <div className="px-8 py-12 max-w-[1600px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
              {megaMenuData[activeMegaMenu].content[activeSubTab]?.map((column, colIndex) => (
                <div key={colIndex}>
                  <h3 className="text-[#6ecde2] font-bold tracking-wider mb-6 text-[15px] uppercase">{column.title}</h3>
                  <ul className="space-y-4 mb-8">
                    {column.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link 
                          to="/courses" // Placeholder link for demo
                          onClick={closeMenu} 
                          className="hover:text-[#6ecde2] transition-colors text-[15px]"
                        >
                          {link}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  
                  {column.button && (
                    <Link 
                      to={column.button.link} 
                      onClick={closeMenu}
                      className="inline-flex items-center justify-center px-6 py-2.5 bg-white text-[#0f2638] font-bold text-[15px] rounded hover:bg-gray-100 transition-colors"
                    >
                      {column.button.text}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Overlay to close menu when clicking outside */}
      {activeMegaMenu && (
        <div 
          className="fixed inset-0 bg-black/20 z-[-1] h-screen" 
          onClick={closeMenu}
        />
      )}
    </div>
  );
};

export default Navbar;
