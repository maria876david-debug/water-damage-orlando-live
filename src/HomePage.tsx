import React, { useState } from 'react';

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#F5F6EF] text-[#182620] font-['Public_Sans',sans-serif] antialiased selection:bg-[#E8A33D] selection:text-[#16302A]">
      {/* 1. Active Risk Notice strip */}
      <aside 
        aria-label="Active Seasonal Advisory"
        className="w-full bg-[#FBEEDD] border-b border-[#E8CBA0] text-[#182620] px-4 py-2 text-xs font-['IBM_Plex_Mono',monospace] sticky top-0 z-50 transition-all"
      >
        <div className="max-w-[1180px] mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E8A33D] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#B3502E]"></span>
            </span>
            <span className="font-semibold text-[#B3502E] uppercase tracking-wider">Active Risk Notice:</span>
            <span>Central Florida sub-tropical humidity &amp; 24–48h mold growth threshold active.</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden md:inline text-[#4C594E]">24/7 Field Techs Standing By:</span>
            <a 
              href="tel:+14075579924" 
              className="font-bold text-[#16302A] hover:text-[#B3502E] underline underline-offset-2 transition-colors inline-flex items-center gap-1"
            >
              (407) 557-9924
            </a>
          </div>
        </div>
      </aside>

      {/* 2. Sticky Header */}
      <header className="sticky top-[37px] z-40 bg-[#F5F6EF]/95 backdrop-blur-md border-b border-[#DBDFD1]">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-[#16302A] flex items-center justify-center text-[#E8A33D] font-['Big_Shoulders_Display',sans-serif] text-2xl font-black transition-transform group-hover:scale-105">
              OR
            </div>
            <div>
              <span className="font-['Big_Shoulders_Display',sans-serif] text-2xl font-extrabold uppercase tracking-tight text-[#16302A] block leading-none">
                Orlando Rapid Restoration
              </span>
              <span className="font-['IBM_Plex_Mono',monospace] text-[10px] uppercase tracking-wider text-[#4C594E] block mt-0.5">
                Emergency Dispatch &bull; Orange County, FL
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-[#1D3F37]">
            <a href="#services" className="hover:text-[#E8A33D] transition-colors">Services</a>
            <a href="#process" className="hover:text-[#E8A33D] transition-colors">Our Process</a>
            <a href="#insurance-health" className="hover:text-[#E8A33D] transition-colors">Insurance &amp; Health</a>
            <a href="#service-areas" className="hover:text-[#E8A33D] transition-colors">Service Areas</a>
            <a href="#find-us" className="hover:text-[#E8A33D] transition-colors">Find Us</a>
            <a href="#faq" className="hover:text-[#E8A33D] transition-colors">FAQ</a>
          </nav>

          {/* Header Action Button */}
          <div className="hidden sm:flex items-center gap-4">
            <a 
              href="tel:+14075579924" 
              className="text-right hidden md:block"
            >
              <span className="block text-[11px] font-['IBM_Plex_Mono',monospace] uppercase text-[#4C594E] tracking-wider">Direct Dispatch Line</span>
              <span className="block text-base font-bold text-[#16302A] hover:text-[#B3502E] font-['IBM_Plex_Mono',monospace]">(407) 557-9924</span>
            </a>
            <a 
              href="tel:+14075579924" 
              className="bg-[#E8A33D] hover:bg-[#C4831F] text-[#16302A] px-5 py-2.5 rounded-md font-bold text-sm uppercase tracking-wider transition-colors shadow-sm inline-flex items-center gap-2"
            >
              <svg className="w-4 h-4 text-[#16302A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Get Help Now
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button 
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#16302A] hover:text-[#E8A33D] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#EAEBE0] border-b border-[#DBDFD1] px-6 py-5 space-y-4">
            <nav className="flex flex-col space-y-3 font-semibold text-[#16302A]">
              <a href="#services" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#E8A33D] py-1">Services</a>
              <a href="#process" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#E8A33D] py-1">Our Process</a>
              <a href="#insurance-health" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#E8A33D] py-1">Insurance &amp; Health</a>
              <a href="#service-areas" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#E8A33D] py-1">Service Areas</a>
              <a href="#find-us" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#E8A33D] py-1">Find Us</a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#E8A33D] py-1">FAQ</a>
            </nav>
            <div className="pt-3 border-t border-[#DBDFD1] flex flex-col gap-3">
              <a 
                href="tel:+14075579924" 
                className="w-full text-center bg-[#E8A33D] hover:bg-[#C4831F] text-[#16302A] py-3 rounded font-bold uppercase tracking-wider text-sm"
              >
                Call (407) 557-9924 Now
              </a>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* 3. Hero Section */}
        <section className="py-14 sm:py-20 lg:py-24 border-b border-[#DBDFD1]">
          <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Headline + Copy + CTAs */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#16302A] text-[#E8A33D] font-['IBM_Plex_Mono',monospace] text-xs font-semibold uppercase tracking-wider mb-6">
                  <span className="w-2 h-2 rounded-full bg-[#E8A33D]"></span>
                  IICRC Certified Field Protocols
                </div>
                
                <h1 className="font-['Big_Shoulders_Display',sans-serif] text-5xl sm:text-6xl lg:text-7xl font-extrabold uppercase text-[#16302A] leading-[0.95] tracking-tight mb-6">
                  Water Damage in Orlando Escalates Faster Than Almost Any City in America.
                </h1>

                <p className="text-lg sm:text-xl text-[#4C594E] leading-relaxed mb-8 max-w-xl">
                  Central Florida combines sustained 70%+ relative humidity, a shallow groundwater aquifer, and tropical storm cycles. Moisture trapped inside drywall or concrete subfloors begins cultivating toxic mold colonies within 24 to 48 hours.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
                  <a 
                    href="tel:+14075579924"
                    className="bg-[#E8A33D] hover:bg-[#C4831F] text-[#16302A] px-7 py-4 rounded-md font-bold text-base uppercase tracking-wider text-center transition-all shadow hover:shadow-md inline-flex justify-center items-center gap-2"
                  >
                    <svg className="w-5 h-5 text-[#16302A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call (407) 557-9924
                  </a>
                  <a 
                    href="#process"
                    className="border-2 border-[#16302A] text-[#16302A] hover:bg-[#16302A] hover:text-[#F5F6EF] px-7 py-4 rounded-md font-bold text-base uppercase tracking-wider text-center transition-colors"
                  >
                    See Our 5-Step Process
                  </a>
                </div>

                {/* Trust Row */}
                <div className="pt-6 border-t border-[#DBDFD1] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-['IBM_Plex_Mono',monospace] text-[#4C594E]">
                  <div className="flex items-center gap-2">
                    <span className="text-[#B3502E] font-bold">&check;</span>
                    <span>Direct tech dispatch, no middleman call centers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#B3502E] font-bold">&check;</span>
                    <span>$0 on-site moisture assessment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#B3502E] font-bold">&check;</span>
                    <span>Plain-language structural reports</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Mold Risk Clock Stat Card */}
              <div className="lg:col-span-5">
                <div className="bg-[#16302A] text-[#F5F6EF] rounded-xl p-8 border border-[#254E44] shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#E8A33D]/10 rounded-full blur-2xl pointer-events-none"></div>
                  
                  <div className="flex items-center justify-between border-b border-[#254E44] pb-4 mb-6">
                    <span className="font-['IBM_Plex_Mono',monospace] text-xs uppercase tracking-widest text-[#E8A33D] font-bold">
                      Critical Florida Metrics
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#B3502E] text-white font-['IBM_Plex_Mono',monospace] text-[10px] font-semibold uppercase">
                      Live Incident Clock
                    </span>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-[#1D3F37] p-4 rounded-lg border border-[#254E44]">
                      <div className="flex items-baseline justify-between mb-1">
                        <span className="font-['Big_Shoulders_Display',sans-serif] text-4xl font-extrabold text-[#E8A33D]">
                          24–48 HRS
                        </span>
                        <span className="font-['IBM_Plex_Mono',monospace] text-xs text-[#B3502E] font-bold uppercase">
                          Critical Limit
                        </span>
                      </div>
                      <p className="text-xs text-[#F5F6EF]/80 leading-normal">
                        Active microbial growth window in Florida relative humidity before mold germination sets into structural studs.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-[#1D3F37] p-3 rounded-lg border border-[#254E44]">
                        <span className="font-['Big_Shoulders_Display',sans-serif] text-3xl font-extrabold text-[#F5F6EF] block">
                          &lt;60 MIN
                        </span>
                        <span className="font-['IBM_Plex_Mono',monospace] text-[11px] text-[#E8A33D] block uppercase font-semibold">
                          Emergency Arrival
                        </span>
                        <span className="text-[10px] text-[#F5F6EF]/70 block mt-1">
                          Rapid Orange County dispatch
                        </span>
                      </div>

                      <div className="bg-[#1D3F37] p-3 rounded-lg border border-[#254E44]">
                        <span className="font-['Big_Shoulders_Display',sans-serif] text-3xl font-extrabold text-[#F5F6EF] block">
                          3–5 DAYS
                        </span>
                        <span className="font-['IBM_Plex_Mono',monospace] text-[11px] text-[#E8A33D] block uppercase font-semibold">
                          Structural Dry-Out
                        </span>
                        <span className="text-[10px] text-[#F5F6EF]/70 block mt-1">
                          Standard industrial target
                        </span>
                      </div>
                    </div>

                    <div className="bg-[#254E44]/40 p-4 rounded-lg border border-[#254E44] flex items-center justify-between">
                      <div>
                        <span className="font-['Big_Shoulders_Display',sans-serif] text-3xl font-extrabold text-[#E8A33D] block leading-none">
                          $0
                        </span>
                        <span className="font-['IBM_Plex_Mono',monospace] text-xs uppercase text-[#F5F6EF] font-semibold mt-1 block">
                          On-Site Assessment
                        </span>
                      </div>
                      <a 
                        href="tel:+14075579924"
                        className="bg-[#E8A33D] hover:bg-[#C4831F] text-[#16302A] px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-colors font-['IBM_Plex_Mono',monospace]"
                      >
                        Request Tech
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Why Water Damage Escalates Faster in Orlando (6 Cards) */}
        <section className="py-20 lg:py-24 bg-[#EAEBE0] border-b border-[#DBDFD1]">
          <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mb-14">
              <span className="font-['IBM_Plex_Mono',monospace] text-xs font-bold uppercase tracking-widest text-[#B3502E] block mb-2">
                Geological &amp; Climatic Realities
              </span>
              <h2 className="font-['Big_Shoulders_Display',sans-serif] text-4xl sm:text-5xl font-extrabold uppercase text-[#16302A] leading-tight">
                Why Water Damage Escalates Faster in Orlando Than Other Cities
              </h2>
              <p className="text-[#4C594E] text-base sm:text-lg mt-3">
                Building construction in Central Florida contends with hyper-specific environmental strains. When plumbing breaks or storm surges occur, six distinct regional mechanics accelerate building decay.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="bg-[#F5F6EF] p-6 rounded-lg border border-[#DBDFD1] hover:border-[#16302A] transition-all hover:-translate-y-1">
                <div className="w-9 h-9 rounded bg-[#16302A] text-[#E8A33D] font-['IBM_Plex_Mono',monospace] font-bold text-sm flex items-center justify-center mb-4">
                  01
                </div>
                <h3 className="font-['Big_Shoulders_Display',sans-serif] text-2xl font-bold uppercase text-[#16302A] mb-2">
                  Flat Terrain &amp; High Water Table
                </h3>
                <p className="text-sm text-[#4C594E] leading-relaxed">
                  Orange County topography lacks natural elevation drops. Groundwater sits mere feet below concrete slab foundations, eliminating natural gravity drainage and trapping standing water against residential footings.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-[#F5F6EF] p-6 rounded-lg border border-[#DBDFD1] hover:border-[#16302A] transition-all hover:-translate-y-1">
                <div className="w-9 h-9 rounded bg-[#16302A] text-[#E8A33D] font-['IBM_Plex_Mono',monospace] font-bold text-sm flex items-center justify-center mb-4">
                  02
                </div>
                <h3 className="font-['Big_Shoulders_Display',sans-serif] text-2xl font-bold uppercase text-[#16302A] mb-2">
                  Karst Limestone Drainage Mechanics
                </h3>
                <p className="text-sm text-[#4C594E] leading-relaxed">
                  Orlando rests on porous limestone bedrock and shallow Floridan aquifer pockets. Saturated subterranean soil generates upward hydrostatic pressure, forcing groundwater through micro-fissures in foundational concrete.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-[#F5F6EF] p-6 rounded-lg border border-[#DBDFD1] hover:border-[#16302A] transition-all hover:-translate-y-1">
                <div className="w-9 h-9 rounded bg-[#16302A] text-[#E8A33D] font-['IBM_Plex_Mono',monospace] font-bold text-sm flex items-center justify-center mb-4">
                  03
                </div>
                <h3 className="font-['Big_Shoulders_Display',sans-serif] text-2xl font-bold uppercase text-[#16302A] mb-2">
                  Tropical Storm &amp; Hurricane Inundation
                </h3>
                <p className="text-sm text-[#4C594E] leading-relaxed">
                  Named storms dump historic volumes in hours. Hurricane Ian deposited over 14 to 17 inches across Orange County, while Hurricane Milton saturated soils past total absorption capacity, overwhelming building drainage.
                </p>
              </div>

              {/* Card 4 */}
              <div className="bg-[#F5F6EF] p-6 rounded-lg border border-[#DBDFD1] hover:border-[#16302A] transition-all hover:-translate-y-1">
                <div className="w-9 h-9 rounded bg-[#16302A] text-[#E8A33D] font-['IBM_Plex_Mono',monospace] font-bold text-sm flex items-center justify-center mb-4">
                  04
                </div>
                <h3 className="font-['Big_Shoulders_Display',sans-serif] text-2xl font-bold uppercase text-[#16302A] mb-2">
                  Sustained 70%+ Ambient Humidity
                </h3>
                <p className="text-sm text-[#4C594E] leading-relaxed">
                  Evaporation stalls when outdoor air humidity exceeds 70%. Without commercial low-grain refrigerant dehumidifiers, moisture remains trapped inside enclosed drywall cavities indefinitely.
                </p>
              </div>

              {/* Card 5 */}
              <div className="bg-[#F5F6EF] p-6 rounded-lg border border-[#DBDFD1] hover:border-[#16302A] transition-all hover:-translate-y-1">
                <div className="w-9 h-9 rounded bg-[#16302A] text-[#E8A33D] font-['IBM_Plex_Mono',monospace] font-bold text-sm flex items-center justify-center mb-4">
                  05
                </div>
                <h3 className="font-['Big_Shoulders_Display',sans-serif] text-2xl font-bold uppercase text-[#16302A] mb-2">
                  Chain of Lakes &amp; Retention Pond Surges
                </h3>
                <p className="text-sm text-[#4C594E] leading-relaxed">
                  Orlando's hundreds of urban lakes and neighborhood retention basins back up rapidly during prolonged downpours. Surging lake levels reverse storm drains directly into streets and ground-level properties.
                </p>
              </div>

              {/* Card 6 */}
              <div className="bg-[#F5F6EF] p-6 rounded-lg border border-[#DBDFD1] hover:border-[#16302A] transition-all hover:-translate-y-1">
                <div className="w-9 h-9 rounded bg-[#16302A] text-[#E8A33D] font-['IBM_Plex_Mono',monospace] font-bold text-sm flex items-center justify-center mb-4">
                  06
                </div>
                <h3 className="font-['Big_Shoulders_Display',sans-serif] text-2xl font-bold uppercase text-[#16302A] mb-2">
                  Porous Concrete Block Construction
                </h3>
                <p className="text-sm text-[#4C594E] leading-relaxed">
                  Most Florida homes are built with Concrete Masonry Units (CMU). Unsealed block cavities and degrading mortar joints absorb intruding rainwater like sponges, wicking moisture upward into interior furring strips and insulation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. First Standalone Q&A Pair */}
        <section className="py-16 border-b border-[#DBDFD1]">
          <div className="max-w-[1180px] mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#F5F6EF] p-8 rounded-lg border border-[#DBDFD1]">
              <span className="font-['IBM_Plex_Mono',monospace] text-xs uppercase tracking-wider text-[#B3502E] font-bold block mb-2">Direct Answer Q&amp;A</span>
              <h2 className="font-['Big_Shoulders_Display',sans-serif] text-2xl sm:text-3xl font-extrabold uppercase text-[#16302A] mb-3">
                Why does Orlando flood without a hurricane nearby?
              </h2>
              <p className="text-sm sm:text-base text-[#4C594E] leading-relaxed">
                Orlando floods during standard afternoon thunderstorms because the region sits on flat terrain with a high water table and interconnected lake chains. When ground soil saturates from brief 2-inch cloudbursts, municipal storm drains and retention basins back up immediately into roadways and low-lying building slabs.
              </p>
            </div>

            <div className="bg-[#F5F6EF] p-8 rounded-lg border border-[#DBDFD1]">
              <span className="font-['IBM_Plex_Mono',monospace] text-xs uppercase tracking-wider text-[#B3502E] font-bold block mb-2">Direct Answer Q&amp;A</span>
              <h2 className="font-['Big_Shoulders_Display',sans-serif] text-2xl sm:text-3xl font-extrabold uppercase text-[#16302A] mb-3">
                How fast does mold grow after water damage in Florida?
              </h2>
              <p className="text-sm sm:text-base text-[#4C594E] leading-relaxed">
                Mold spores begin colonizing wet drywall, carpet padding, and wood framing within 24 to 48 hours in Florida's warm climate. High ambient indoor humidity accelerates spore germination, making immediate water extraction and structural drying essential before toxic mycotoxins establish inside structural cavities.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Services Grid (8 Cards) */}
        <section id="services" className="py-20 lg:py-24 bg-[#16302A] text-[#F5F6EF] border-b border-[#254E44]">
          <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mb-14">
              <span className="font-['IBM_Plex_Mono',monospace] text-xs font-bold uppercase tracking-widest text-[#E8A33D] block mb-2">
                Certified Response Capabilities
              </span>
              <h2 className="font-['Big_Shoulders_Display',sans-serif] text-4xl sm:text-5xl font-extrabold uppercase text-white leading-tight">
                Emergency Water &amp; Restoration Services in Orlando
              </h2>
              <p className="text-[#F5F6EF]/80 text-base sm:text-lg mt-3">
                From high-volume pump-outs to precision thermal moisture mapping, every restoration deployment adheres strictly to ANSI/IICRC S500 standards for water damage mitigation.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Service 1 */}
              <div className="bg-[#1D3F37] p-6 rounded-lg border border-[#254E44] hover:border-[#E8A33D] transition-colors flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded bg-[#254E44] flex items-center justify-center text-[#E8A33D] mb-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                  </div>
                  <h3 className="font-['Big_Shoulders_Display',sans-serif] text-2xl font-bold uppercase text-white mb-2">
                    Emergency Water Extraction
                  </h3>
                  <p className="text-xs text-[#F5F6EF]/75 leading-relaxed mb-4">
                    Truck-mounted extraction pumps and weighted subfloor extractors pull hundreds of gallons per minute from tile, wood, and concrete.
                  </p>
                </div>
                <a href="tel:+14075579924" className="text-xs font-['IBM_Plex_Mono',monospace] font-bold text-[#E8A33D] hover:text-white uppercase flex items-center gap-1">
                  Dispatch Extraction &rarr;
                </a>
              </div>

              {/* Service 2 */}
              <div className="bg-[#1D3F37] p-6 rounded-lg border border-[#254E44] hover:border-[#E8A33D] transition-colors flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded bg-[#254E44] flex items-center justify-center text-[#E8A33D] mb-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" /></svg>
                  </div>
                  <h3 className="font-['Big_Shoulders_Display',sans-serif] text-2xl font-bold uppercase text-white mb-2">
                    Structural Drying &amp; Dehumidification
                  </h3>
                  <p className="text-xs text-[#F5F6EF]/75 leading-relaxed mb-4">
                    Industrial LGR dehumidifiers and high-velocity centrifugal air movers drive moisture grains down across subfloors and wall framing.
                  </p>
                </div>
                <a href="tel:+14075579924" className="text-xs font-['IBM_Plex_Mono',monospace] font-bold text-[#E8A33D] hover:text-white uppercase flex items-center gap-1">
                  Set Up Drying &rarr;
                </a>
              </div>

              {/* Service 3 */}
              <div className="bg-[#1D3F37] p-6 rounded-lg border border-[#254E44] hover:border-[#E8A33D] transition-colors flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded bg-[#254E44] flex items-center justify-center text-[#E8A33D] mb-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  </div>
                  <h3 className="font-['Big_Shoulders_Display',sans-serif] text-2xl font-bold uppercase text-white mb-2">
                    Mold Remediation &amp; Containment
                  </h3>
                  <p className="text-xs text-[#F5F6EF]/75 leading-relaxed mb-4">
                    Negative air pressure chambers, HEPA scrubbing, and EPA-registered antimicrobial applications eradicate active fungal colonies.
                  </p>
                </div>
                <a href="tel:+14075579924" className="text-xs font-['IBM_Plex_Mono',monospace] font-bold text-[#E8A33D] hover:text-white uppercase flex items-center gap-1">
                  Mold Inspection &rarr;
                </a>
              </div>

              {/* Service 4 */}
              <div className="bg-[#1D3F37] p-6 rounded-lg border border-[#254E44] hover:border-[#E8A33D] transition-colors flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded bg-[#254E44] flex items-center justify-center text-[#E8A33D] mb-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <h3 className="font-['Big_Shoulders_Display',sans-serif] text-2xl font-bold uppercase text-white mb-2">
                    Storm &amp; Hurricane Recovery
                  </h3>
                  <p className="text-xs text-[#F5F6EF]/75 leading-relaxed mb-4">
                    Emergency roof tarping, storm surge pumping, structural shoring, and Category 3 flood sanitization following severe named weather.
                  </p>
                </div>
                <a href="tel:+14075579924" className="text-xs font-['IBM_Plex_Mono',monospace] font-bold text-[#E8A33D] hover:text-white uppercase flex items-center gap-1">
                  Storm Response &rarr;
                </a>
              </div>

              {/* Service 5 */}
              <div className="bg-[#1D3F37] p-6 rounded-lg border border-[#254E44] hover:border-[#E8A33D] transition-colors flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded bg-[#254E44] flex items-center justify-center text-[#E8A33D] mb-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  </div>
                  <h3 className="font-['Big_Shoulders_Display',sans-serif] text-2xl font-bold uppercase text-white mb-2">
                    Sewage &amp; Black Water Cleanup
                  </h3>
                  <p className="text-xs text-[#F5F6EF]/75 leading-relaxed mb-4">
                    Full biohazard containment, hazardous waste disposal, hospital-grade sanitization, and deep antimicrobial floor decontamination.
                  </p>
                </div>
                <a href="tel:+14075579924" className="text-xs font-['IBM_Plex_Mono',monospace] font-bold text-[#E8A33D] hover:text-white uppercase flex items-center gap-1">
                  Biohazard Cleanup &rarr;
                </a>
              </div>

              {/* Service 6 */}
              <div className="bg-[#1D3F37] p-6 rounded-lg border border-[#254E44] hover:border-[#E8A33D] transition-colors flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded bg-[#254E44] flex items-center justify-center text-[#E8A33D] mb-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>
                  </div>
                  <h3 className="font-['Big_Shoulders_Display',sans-serif] text-2xl font-bold uppercase text-white mb-2">
                    Drywall &amp; Flooring Repair
                  </h3>
                  <p className="text-xs text-[#F5F6EF]/75 leading-relaxed mb-4">
                    Precision flood cuts, baseboard salvage, subfloor remediation, and turnkey structural repairs once moisture dry-out stabilizes.
                  </p>
                </div>
                <a href="tel:+14075579924" className="text-xs font-['IBM_Plex_Mono',monospace] font-bold text-[#E8A33D] hover:text-white uppercase flex items-center gap-1">
                  Repair Assessment &rarr;
                </a>
              </div>

              {/* Service 7 */}
              <div className="bg-[#1D3F37] p-6 rounded-lg border border-[#254E44] hover:border-[#E8A33D] transition-colors flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded bg-[#254E44] flex items-center justify-center text-[#E8A33D] mb-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                  </div>
                  <h3 className="font-['Big_Shoulders_Display',sans-serif] text-2xl font-bold uppercase text-white mb-2">
                    Contents Cleaning &amp; Pack-Out
                  </h3>
                  <p className="text-xs text-[#F5F6EF]/75 leading-relaxed mb-4">
                    Inventory mapping, ultrasonic cleaning, off-site climate-controlled staging, and document freeze-drying restoration.
                  </p>
                </div>
                <a href="tel:+14075579924" className="text-xs font-['IBM_Plex_Mono',monospace] font-bold text-[#E8A33D] hover:text-white uppercase flex items-center gap-1">
                  Contents Triage &rarr;
                </a>
              </div>

              {/* Service 8 */}
              <div className="bg-[#1D3F37] p-6 rounded-lg border border-[#254E44] hover:border-[#E8A33D] transition-colors flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded bg-[#254E44] flex items-center justify-center text-[#E8A33D] mb-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <h3 className="font-['Big_Shoulders_Display',sans-serif] text-2xl font-bold uppercase text-white mb-2">
                    AC Condensation &amp; Leak Detection
                  </h3>
                  <p className="text-xs text-[#F5F6EF]/75 leading-relaxed mb-4">
                    Clogged air handler condensate drain pan overflow remediation, attic ceiling leak tracing, and concealed pipe acoustic pinpointing.
                  </p>
                </div>
                <a href="tel:+14075579924" className="text-xs font-['IBM_Plex_Mono',monospace] font-bold text-[#E8A33D] hover:text-white uppercase flex items-center gap-1">
                  Trace AC Leak &rarr;
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Our Process (5 Numbered Stages) */}
        <section id="process" className="py-20 lg:py-24 border-b border-[#DBDFD1]">
          <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mb-14">
              <span className="font-['IBM_Plex_Mono',monospace] text-xs font-bold uppercase tracking-widest text-[#B3502E] block mb-2">
                Standard Operating Procedure
              </span>
              <h2 className="font-['Big_Shoulders_Display',sans-serif] text-4xl sm:text-5xl font-extrabold uppercase text-[#16302A] leading-tight">
                Our 5-Stage Scientific Restoration Process
              </h2>
              <p className="text-[#4C594E] text-base sm:text-lg mt-3">
                Water damage mitigation cannot be guessed. We apply strict psychrometric formulas to calculate exact airflow and moisture extraction requirements for every room.
              </p>
            </div>

            <div className="space-y-4">
              {/* Stage 1 */}
              <div className="bg-[#EAEBE0] p-6 sm:p-8 rounded-lg border border-[#DBDFD1] flex flex-col md:flex-row md:items-center gap-6">
                <div className="w-14 h-14 rounded-lg bg-[#16302A] text-[#E8A33D] font-['Big_Shoulders_Display',sans-serif] text-3xl font-extrabold flex items-center justify-center shrink-0">
                  1
                </div>
                <div className="flex-1">
                  <span className="font-['IBM_Plex_Mono',monospace] text-xs font-bold uppercase text-[#B3502E] block">Immediate Intake</span>
                  <h3 className="font-['Big_Shoulders_Display',sans-serif] text-2xl sm:text-3xl font-bold uppercase text-[#16302A] mb-1">
                    Phone Triage &amp; Rapid Field Dispatch
                  </h3>
                  <p className="text-sm text-[#4C594E] leading-relaxed">
                    You speak directly with an on-duty field technician who identifies the water category (Clean, Gray, or Black water), guides immediate main valve shutoffs, and dispatches an emergency crew within 60 minutes.
                  </p>
                </div>
              </div>

              {/* Stage 2 */}
              <div className="bg-[#EAEBE0] p-6 sm:p-8 rounded-lg border border-[#DBDFD1] flex flex-col md:flex-row md:items-center gap-6">
                <div className="w-14 h-14 rounded-lg bg-[#16302A] text-[#E8A33D] font-['Big_Shoulders_Display',sans-serif] text-3xl font-extrabold flex items-center justify-center shrink-0">
                  2
                </div>
                <div className="flex-1">
                  <span className="font-['IBM_Plex_Mono',monospace] text-xs font-bold uppercase text-[#B3502E] block">Diagnostic Mapping</span>
                  <h3 className="font-['Big_Shoulders_Display',sans-serif] text-2xl sm:text-3xl font-bold uppercase text-[#16302A] mb-1">
                    Thermal Imaging &amp; Moisture Penetration Mapping
                  </h3>
                  <p className="text-sm text-[#4C594E] leading-relaxed">
                    FLIR thermal cameras and non-penetrating RF moisture meters track hidden water trails behind baseboards, under tiled slabs, and within ceiling drywall without causing destructive wall damage.
                  </p>
                </div>
              </div>

              {/* Stage 3 */}
              <div className="bg-[#EAEBE0] p-6 sm:p-8 rounded-lg border border-[#DBDFD1] flex flex-col md:flex-row md:items-center gap-6">
                <div className="w-14 h-14 rounded-lg bg-[#16302A] text-[#E8A33D] font-['Big_Shoulders_Display',sans-serif] text-3xl font-extrabold flex items-center justify-center shrink-0">
                  3
                </div>
                <div className="flex-1">
                  <span className="font-['IBM_Plex_Mono',monospace] text-xs font-bold uppercase text-[#B3502E] block">Bulk Removal</span>
                  <h3 className="font-['Big_Shoulders_Display',sans-serif] text-2xl sm:text-3xl font-bold uppercase text-[#16302A] mb-1">
                    Industrial Extraction &amp; Sanitization
                  </h3>
                  <p className="text-sm text-[#4C594E] leading-relaxed">
                    Truck-mounted extractors pull bulk standing water from carpets, hardwood, and concrete. We apply EPA-registered botanical antimicrobials to neutralize bacteria and halt microbial colonization on contact.
                  </p>
                </div>
              </div>

              {/* Stage 4 */}
              <div className="bg-[#EAEBE0] p-6 sm:p-8 rounded-lg border border-[#DBDFD1] flex flex-col md:flex-row md:items-center gap-6">
                <div className="w-14 h-14 rounded-lg bg-[#16302A] text-[#E8A33D] font-['Big_Shoulders_Display',sans-serif] text-3xl font-extrabold flex items-center justify-center shrink-0">
                  4
                </div>
                <div className="flex-1">
                  <span className="font-['IBM_Plex_Mono',monospace] text-xs font-bold uppercase text-[#B3502E] block">Psychrometric Control</span>
                  <h3 className="font-['Big_Shoulders_Display',sans-serif] text-2xl sm:text-3xl font-bold uppercase text-[#16302A] mb-1">
                    Structural Dehumidification &amp; Daily Daily Monitoring
                  </h3>
                  <p className="text-sm text-[#4C594E] leading-relaxed">
                    Commercial low-grain refrigerant (LGR) dehumidifiers and high-velocity air movers run continuously. Field techs return daily to record grain depression (GPP) until moisture levels match baseline dry standards.
                  </p>
                </div>
              </div>

              {/* Stage 5 */}
              <div className="bg-[#EAEBE0] p-6 sm:p-8 rounded-lg border border-[#DBDFD1] flex flex-col md:flex-row md:items-center gap-6">
                <div className="w-14 h-14 rounded-lg bg-[#16302A] text-[#E8A33D] font-['Big_Shoulders_Display',sans-serif] text-3xl font-extrabold flex items-center justify-center shrink-0">
                  5
                </div>
                <div className="flex-1">
                  <span className="font-['IBM_Plex_Mono',monospace] text-xs font-bold uppercase text-[#B3502E] block">Final Closeout</span>
                  <h3 className="font-['Big_Shoulders_Display',sans-serif] text-2xl sm:text-3xl font-bold uppercase text-[#16302A] mb-1">
                    Structural Rebuild &amp; Insurance Documentation
                  </h3>
                  <p className="text-sm text-[#4C594E] leading-relaxed">
                    We supply dry certificates, itemized Xactimate loss logs, and photo documentation to your insurance adjuster, ensuring complete reimbursement clarity while our construction team restores damaged finishes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Second Standalone Q&A Pair */}
        <section className="py-16 bg-[#F5F6EF] border-b border-[#DBDFD1]">
          <div className="max-w-[1180px] mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#EAEBE0] p-8 rounded-lg border border-[#DBDFD1]">
              <span className="font-['IBM_Plex_Mono',monospace] text-xs uppercase tracking-wider text-[#B3502E] font-bold block mb-2">Direct Answer Q&amp;A</span>
              <h2 className="font-['Big_Shoulders_Display',sans-serif] text-2xl sm:text-3xl font-extrabold uppercase text-[#16302A] mb-3">
                How long does water damage restoration take in Florida?
              </h2>
              <p className="text-sm sm:text-base text-[#4C594E] leading-relaxed">
                Standard structural drying requires 3 to 5 days of continuous industrial dehumidification and air movement. Severe Category 3 flood incidents or dense concrete subfloor saturation can extend drying cycles to 7 days before reconstruction and drywall replacement can safely commence.
              </p>
            </div>

            <div className="bg-[#EAEBE0] p-8 rounded-lg border border-[#DBDFD1]">
              <span className="font-['IBM_Plex_Mono',monospace] text-xs uppercase tracking-wider text-[#B3502E] font-bold block mb-2">Direct Answer Q&amp;A</span>
              <h2 className="font-['Big_Shoulders_Display',sans-serif] text-2xl sm:text-3xl font-extrabold uppercase text-[#16302A] mb-3">
                Can water-damaged flooring and drywall be saved?
              </h2>
              <p className="text-sm sm:text-base text-[#4C594E] leading-relaxed">
                Clean supply-line water damage can often be dried in place if extracted within 24 hours. However, submerged laminate, saturated drywall, and flooring contaminated by sewage or ground floodwater must be removed via controlled flood cuts to eliminate toxic bacterial hazards and prevent rot.
              </p>
            </div>
          </div>
        </section>

        {/* 9. Comparison Table */}
        <section className="py-20 lg:py-24 bg-[#EAEBE0] border-b border-[#DBDFD1]">
          <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mb-12">
              <span className="font-['IBM_Plex_Mono',monospace] text-xs font-bold uppercase tracking-widest text-[#B3502E] block mb-2">
                Service Benchmark
              </span>
              <h2 className="font-['Big_Shoulders_Display',sans-serif] text-4xl sm:text-5xl font-extrabold uppercase text-[#16302A] leading-tight">
                How We Compare in Emergency Water Restoration
              </h2>
              <p className="text-[#4C594E] text-base mt-2">
                Response speed, technical equipment, and transparent documentation determine whether your property recovers cleanly or suffers recurring mold.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse bg-[#F5F6EF] rounded-lg overflow-hidden border border-[#DBDFD1] text-sm">
                <thead>
                  <tr className="border-b border-[#DBDFD1] bg-[#16302A] text-white font-['Big_Shoulders_Display',sans-serif] text-xl uppercase tracking-wider">
                    <th className="py-4 px-6">Criteria</th>
                    <th className="py-4 px-6 text-[#E8A33D] bg-[#1D3F37]">Orlando Rapid Restoration</th>
                    <th className="py-4 px-6 text-white/80">Typical National Chain</th>
                    <th className="py-4 px-6 text-white/80">Typical Local Crew</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DBDFD1] text-[#182620]">
                  <tr>
                    <td className="py-4 px-6 font-semibold">After-Hours Response</td>
                    <td className="py-4 px-6 bg-[#EAEBE0] font-bold text-[#16302A]">&lt;60 min direct tech dispatch</td>
                    <td className="py-4 px-6 text-[#4C594E]">Call center queue (2–6 hrs)</td>
                    <td className="py-4 px-6 text-[#4C594E]">Next-day callback or voicemail</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-semibold">Who Shows Up</td>
                    <td className="py-4 px-6 bg-[#EAEBE0] font-bold text-[#16302A]">IICRC-certified senior master techs</td>
                    <td className="py-4 px-6 text-[#4C594E]">Rotating third-party subcontractors</td>
                    <td className="py-4 px-6 text-[#4C594E]">General handy labor without meters</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-semibold">On-Site Assessment Cost</td>
                    <td className="py-4 px-6 bg-[#EAEBE0] font-bold text-[#16302A]">$0 Free On-Site Inspection</td>
                    <td className="py-4 px-6 text-[#4C594E]">$150–$350 mandatory trip fee</td>
                    <td className="py-4 px-6 text-[#4C594E]">Varies / verbal non-metered guess</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-semibold">Insurance Documentation</td>
                    <td className="py-4 px-6 bg-[#EAEBE0] font-bold text-[#16302A]">Daily psychrometric logs &amp; Xactimate</td>
                    <td className="py-4 px-6 text-[#4C594E]">Standard billing package</td>
                    <td className="py-4 px-6 text-[#4C594E]">Handwritten or generic invoices</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-semibold">Plain-Language Explanation</td>
                    <td className="py-4 px-6 bg-[#EAEBE0] font-bold text-[#16302A]">Clear line-by-line damage breakdown</td>
                    <td className="py-4 px-6 text-[#4C594E]">Dense legalistic service contracts</td>
                    <td className="py-4 px-6 text-[#4C594E]">Limited scope explanations</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <p className="mt-4 text-xs font-['IBM_Plex_Mono',monospace] text-[#4C594E] italic">
              * This comparison reflects general industry observations and standard practices, not claims about any specific company.
            </p>
          </div>
        </section>

        {/* 10. Seasonal Risk Calendar (4 Cards) */}
        <section className="py-20 lg:py-24 border-b border-[#DBDFD1]">
          <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mb-14">
              <span className="font-['IBM_Plex_Mono',monospace] text-xs font-bold uppercase tracking-widest text-[#B3502E] block mb-2">
                Annual Central Florida Timetable
              </span>
              <h2 className="font-['Big_Shoulders_Display',sans-serif] text-4xl sm:text-5xl font-extrabold uppercase text-[#16302A] leading-tight">
                Orange County Seasonal Water Threat Calendar
              </h2>
              <p className="text-[#4C594E] text-base mt-2">
                Water damage patterns shift by quarter in Central Florida. Knowing the seasonal triggers protects homes year-round.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Season 1 */}
              <div className="bg-[#F5F6EF] p-6 rounded-lg border-t-4 border-[#B3502E] border-x border-b border-[#DBDFD1]">
                <span className="font-['IBM_Plex_Mono',monospace] text-xs font-bold uppercase text-[#B3502E] block mb-1">
                  Jun &ndash; Nov
                </span>
                <h3 className="font-['Big_Shoulders_Display',sans-serif] text-2xl font-bold uppercase text-[#16302A] mb-3">
                  Atlantic Hurricane Season
                </h3>
                <p className="text-xs text-[#4C594E] leading-relaxed">
                  Peak tropical depression risks, roof tile blow-offs, catastrophic storm surge flooding, and prolonged power outages shutting down residential AC dehumidification.
                </p>
              </div>

              {/* Season 2 */}
              <div className="bg-[#F5F6EF] p-6 rounded-lg border-t-4 border-[#E8A33D] border-x border-b border-[#DBDFD1]">
                <span className="font-['IBM_Plex_Mono',monospace] text-xs font-bold uppercase text-[#E8A33D] block mb-1">
                  Jun &ndash; Sep
                </span>
                <h3 className="font-['Big_Shoulders_Display',sans-serif] text-2xl font-bold uppercase text-[#16302A] mb-3">
                  Summer Peak Humidity &amp; AC Stress
                </h3>
                <p className="text-xs text-[#4C594E] leading-relaxed">
                  HVAC systems run 24/7. Clogged condensate drain lines and cracked drip pans cause massive ceiling collapses and concealed attic mold growth.
                </p>
              </div>

              {/* Season 3 */}
              <div className="bg-[#F5F6EF] p-6 rounded-lg border-t-4 border-[#16302A] border-x border-b border-[#DBDFD1]">
                <span className="font-['IBM_Plex_Mono',monospace] text-xs font-bold uppercase text-[#16302A] block mb-1">
                  Dec &ndash; Feb
                </span>
                <h3 className="font-['Big_Shoulders_Display',sans-serif] text-2xl font-bold uppercase text-[#16302A] mb-3">
                  Dry-Season Pipe Stress &amp; Freezes
                </h3>
                <p className="text-xs text-[#4C594E] leading-relaxed">
                  Brief Arctic cold snaps stress exposed irrigation valves and uninsulated CPVC plumbing lines in attics, triggering sudden pressurized water breaks.
                </p>
              </div>

              {/* Season 4 */}
              <div className="bg-[#F5F6EF] p-6 rounded-lg border-t-4 border-[#254E44] border-x border-b border-[#DBDFD1]">
                <span className="font-['IBM_Plex_Mono',monospace] text-xs font-bold uppercase text-[#254E44] block mb-1">
                  Mar &ndash; May
                </span>
                <h3 className="font-['Big_Shoulders_Display',sans-serif] text-2xl font-bold uppercase text-[#16302A] mb-3">
                  Spring Storm &amp; Hail Fronts
                </h3>
                <p className="text-xs text-[#4C594E] leading-relaxed">
                  Severe squall lines, microburst wind damage, and high-velocity hail puncture shingle membranes, permitting heavy spring rain to enter attic insulation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 11. Insurance & Health Split Section */}
        <section id="insurance-health" className="py-20 lg:py-24 bg-[#EAEBE0] border-b border-[#DBDFD1]">
          <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mb-14">
              <span className="font-['IBM_Plex_Mono',monospace] text-xs font-bold uppercase tracking-widest text-[#B3502E] block mb-2">
                Vital Policy &amp; Safety Knowledge
              </span>
              <h2 className="font-['Big_Shoulders_Display',sans-serif] text-4xl sm:text-5xl font-extrabold uppercase text-[#16302A] leading-tight">
                Florida Insurance Reality &amp; Indoor Air Health
              </h2>
              <p className="text-[#4C594E] text-base mt-2">
                Understanding your homeowner rights and biological exposure risks ensures quick remediation without insurance claim denials.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Card: Insurance in Plain Terms */}
              <div className="bg-[#F5F6EF] p-8 rounded-lg border border-[#DBDFD1]">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#16302A] text-[#E8A33D] font-['IBM_Plex_Mono',monospace] text-xs uppercase font-semibold mb-4">
                  Insurance Guidance
                </div>
                <h3 className="font-['Big_Shoulders_Display',sans-serif] text-3xl font-extrabold uppercase text-[#16302A] mb-4">
                  Florida Water Damage Insurance in Plain Terms
                </h3>
                
                <div className="space-y-4 text-sm text-[#4C594E] leading-relaxed">
                  <p>
                    <strong className="text-[#16302A]">Sudden vs. Gradual Damage:</strong> Standard Florida homeowner policies generally cover sudden, accidental discharges (such as a burst supply line or failed water heater). However, long-term seepage that occurred over weeks is frequently excluded under maintenance clauses.
                  </p>
                  <p>
                    <strong className="text-[#16302A]">Policy Caps &amp; Endorsements:</strong> Many modern Florida property policies include specific caps on non-weather water damage (often $10,000 limits unless special endorsements exist) and mold sub-limits.
                  </p>
                  <p>
                    <strong className="text-[#16302A]">Filing Windows &amp; Adjuster Deadlines:</strong> Property owners must report losses promptly. Insurers operate under statutory claim communication windows, requiring complete photographic evidence of pre-mitigation conditions.
                  </p>
                  <p className="bg-[#FBEEDD] p-3.5 rounded border border-[#E8CBA0] text-xs font-semibold text-[#182620]">
                    &bull; Note: We provide unbiased moisture logs and Xactimate billing for your adjuster, but we do not take over your insurance claim or act as public adjusters.
                  </p>
                </div>
              </div>

              {/* Right Card: What Water Damage Does to Air */}
              <div className="bg-[#F5F6EF] p-8 rounded-lg border border-[#DBDFD1]">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#B3502E] text-white font-['IBM_Plex_Mono',monospace] text-xs uppercase font-semibold mb-4">
                  Biological Hazard
                </div>
                <h3 className="font-['Big_Shoulders_Display',sans-serif] text-3xl font-extrabold uppercase text-[#16302A] mb-4">
                  What Unmitigated Water Damage Does to Indoor Air
                </h3>
                
                <div className="space-y-4 text-sm text-[#4C594E] leading-relaxed">
                  <p>
                    <strong className="text-[#16302A]">The 24–48 Hour Window:</strong> In Florida's ambient heat, Stachybotrys chartarum (black mold) and Aspergillus spores germinate rapidly in moist organic cellulose substrates like drywall paper and carpet backing.
                  </p>
                  <p>
                    <strong className="text-[#16302A]">Respiratory Symptoms &amp; Allergens:</strong> Airborne fungal fragments trigger coughing, eye irritation, sinus inflammation, and severe asthma attacks, posing heightened risks for children, seniors, and immunocompromised residents.
                  </p>
                  <p>
                    <strong className="text-[#16302A]">Concealed Growth in Wall Cavities:</strong> Over 70% of residential mold colonies grow completely hidden inside wall voids and beneath floorboards, releasing invisible mycotoxins into HVAC air distribution ducts.
                  </p>
                  <p>
                    <strong className="text-[#16302A]">Why Drying Trumps Cleaning:</strong> Spraying disinfectant on wet drywall achieves nothing if deep structural studs remain damp. Industrial structural dehumidification stops fungal biology at the root.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 12. Third Standalone Q&A Pair */}
        <section className="py-16 border-b border-[#DBDFD1]">
          <div className="max-w-[1180px] mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#F5F6EF] p-8 rounded-lg border border-[#DBDFD1]">
              <span className="font-['IBM_Plex_Mono',monospace] text-xs uppercase tracking-wider text-[#B3502E] font-bold block mb-2">Direct Answer Q&amp;A</span>
              <h2 className="font-['Big_Shoulders_Display',sans-serif] text-2xl sm:text-3xl font-extrabold uppercase text-[#16302A] mb-3">
                Does homeowners insurance cover water damage in Florida?
              </h2>
              <p className="text-sm sm:text-base text-[#4C594E] leading-relaxed">
                Most Florida homeowners policies cover sudden and accidental water discharges, such as burst supply lines or failed appliance hoses. However, floodwater rising from external street drainage requires a separate NFIP flood policy, and slow chronic leaks over weeks are typically excluded.
              </p>
            </div>

            <div className="bg-[#F5F6EF] p-8 rounded-lg border border-[#DBDFD1]">
              <span className="font-['IBM_Plex_Mono',monospace] text-xs uppercase tracking-wider text-[#B3502E] font-bold block mb-2">Direct Answer Q&amp;A</span>
              <h2 className="font-['Big_Shoulders_Display',sans-serif] text-2xl sm:text-3xl font-extrabold uppercase text-[#16302A] mb-3">
                What should you do in the first 10 minutes after finding water damage?
              </h2>
              <p className="text-sm sm:text-base text-[#4C594E] leading-relaxed">
                Immediately shut off the main water supply valve to halt incoming flow and turn off electrical breakers to wet rooms if safe. Take clear photos and video of all standing water and affected items, then call a certified water restoration technician before beginning any cleanup.
              </p>
            </div>
          </div>
        </section>

        {/* 13. Pricing Tiers (3 Cards) */}
        <section className="py-20 lg:py-24 bg-[#EAEBE0] border-b border-[#DBDFD1]">
          <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mb-12">
              <span className="font-['IBM_Plex_Mono',monospace] text-xs font-bold uppercase tracking-widest text-[#B3502E] block mb-2">
                Transparent Cost Benchmarks
              </span>
              <h2 className="font-['Big_Shoulders_Display',sans-serif] text-4xl sm:text-5xl font-extrabold uppercase text-[#16302A] leading-tight">
                Water Mitigation &amp; Drying Investment Estimates
              </h2>
              <p className="text-[#4C594E] text-base mt-2">
                Every loss requires customized psychrometric equipment loads based on square footage, water category, and affected structural materials.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Tier 1 */}
              <div className="bg-[#F5F6EF] p-6 rounded-lg border border-[#DBDFD1] flex flex-col justify-between">
                <div>
                  <span className="font-['IBM_Plex_Mono',monospace] text-xs uppercase font-bold text-[#4C594E] block mb-1">Tier 1 &bull; Minor Loss</span>
                  <h3 className="font-['Big_Shoulders_Display',sans-serif] text-2xl font-bold uppercase text-[#16302A] mb-2">Single Wet Room</h3>
                  <div className="font-['IBM_Plex_Mono',monospace] text-2xl font-bold text-[#16302A] mb-4">
                    $1,200 &ndash; $2,500 <span className="text-xs text-[#4C594E] font-normal block font-sans">Estimated placeholder range</span>
                  </div>
                  <ul className="space-y-2 text-xs text-[#4C594E] mb-6">
                    <li className="flex items-center gap-2"><span className="text-[#B3502E] font-bold">&check;</span> Up to 150 sq ft isolated water loss</li>
                    <li className="flex items-center gap-2"><span className="text-[#B3502E] font-bold">&check;</span> Precision water extraction</li>
                    <li className="flex items-center gap-2"><span className="text-[#B3502E] font-bold">&check;</span> 1 LGR dehumidifier + 3 air movers</li>
                    <li className="flex items-center gap-2"><span className="text-[#B3502E] font-bold">&check;</span> Antimicrobial surface spray</li>
                  </ul>
                </div>
                <a href="tel:+14075579924" className="w-full text-center py-2.5 rounded bg-[#16302A] text-white hover:bg-[#1D3F37] font-bold text-xs uppercase tracking-wider transition-colors">
                  Request Free Assessment
                </a>
              </div>

              {/* Tier 2 */}
              <div className="bg-[#F5F6EF] p-6 rounded-lg border-2 border-[#E8A33D] flex flex-col justify-between relative shadow-md">
                <div className="absolute -top-3 right-4 bg-[#E8A33D] text-[#16302A] px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider font-['IBM_Plex_Mono',monospace]">
                  Most Common Loss
                </div>
                <div>
                  <span className="font-['IBM_Plex_Mono',monospace] text-xs uppercase font-bold text-[#E8A33D] block mb-1">Tier 2 &bull; Multi-Room</span>
                  <h3 className="font-['Big_Shoulders_Display',sans-serif] text-2xl font-bold uppercase text-[#16302A] mb-2">Standard Restoration</h3>
                  <div className="font-['IBM_Plex_Mono',monospace] text-2xl font-bold text-[#16302A] mb-4">
                    $2,800 &ndash; $5,500 <span className="text-xs text-[#4C594E] font-normal block font-sans">Estimated placeholder range</span>
                  </div>
                  <ul className="space-y-2 text-xs text-[#4C594E] mb-6">
                    <li className="flex items-center gap-2"><span className="text-[#B3502E] font-bold">&check;</span> 2 to 4 rooms / 300–800 sq ft</li>
                    <li className="flex items-center gap-2"><span className="text-[#B3502E] font-bold">&check;</span> Deep subfloor extraction &amp; flood cuts</li>
                    <li className="flex items-center gap-2"><span className="text-[#B3502E] font-bold">&check;</span> 2–3 LGR dehumidifiers + 8 air movers</li>
                    <li className="flex items-center gap-2"><span className="text-[#B3502E] font-bold">&check;</span> Daily moisture logs for insurance</li>
                  </ul>
                </div>
                <a href="tel:+14075579924" className="w-full text-center py-2.5 rounded bg-[#E8A33D] text-[#16302A] hover:bg-[#C4831F] font-bold text-xs uppercase tracking-wider transition-colors">
                  Request Free Assessment
                </a>
              </div>

              {/* Tier 3 */}
              <div className="bg-[#F5F6EF] p-6 rounded-lg border border-[#DBDFD1] flex flex-col justify-between">
                <div>
                  <span className="font-['IBM_Plex_Mono',monospace] text-xs uppercase font-bold text-[#B3502E] block mb-1">Tier 3 &bull; Major Catastrophe</span>
                  <h3 className="font-['Big_Shoulders_Display',sans-serif] text-2xl font-bold uppercase text-[#16302A] mb-2">Severe Flood / Black Water</h3>
                  <div className="font-['IBM_Plex_Mono',monospace] text-2xl font-bold text-[#16302A] mb-4">
                    $6,000 &ndash; $12,000+ <span className="text-xs text-[#4C594E] font-normal block font-sans">Estimated placeholder range</span>
                  </div>
                  <ul className="space-y-2 text-xs text-[#4C594E] mb-6">
                    <li className="flex items-center gap-2"><span className="text-[#B3502E] font-bold">&check;</span> Whole-home inundation or sewage loss</li>
                    <li className="flex items-center gap-2"><span className="text-[#B3502E] font-bold">&check;</span> Full containment &amp; HEPA air scrubbing</li>
                    <li className="flex items-center gap-2"><span className="text-[#B3502E] font-bold">&check;</span> Desiccant high-volume drying setup</li>
                    <li className="flex items-center gap-2"><span className="text-[#B3502E] font-bold">&check;</span> Turnkey structural reconstruction file</li>
                  </ul>
                </div>
                <a href="tel:+14075579924" className="w-full text-center py-2.5 rounded bg-[#16302A] text-white hover:bg-[#1D3F37] font-bold text-xs uppercase tracking-wider transition-colors">
                  Request Free Assessment
                </a>
              </div>
            </div>

            <p className="mt-6 text-center text-xs font-['IBM_Plex_Mono',monospace] text-[#4C594E]">
              Disclaimer: The pricing figures displayed above are placeholder estimation brackets provided for budget guidance only and will be replaced with verified on-site assessment measurements.
            </p>
          </div>
        </section>

        {/* 14. Case Studies (3 Cards with CLEARLY BRACKETED PLACEHOLDERS) */}
        <section className="py-20 lg:py-24 border-b border-[#DBDFD1]">
          <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mb-14">
              <span className="font-['IBM_Plex_Mono',monospace] text-xs font-bold uppercase tracking-widest text-[#B3502E] block mb-2">
                Field Performance Records
              </span>
              <h2 className="font-['Big_Shoulders_Display',sans-serif] text-4xl sm:text-5xl font-extrabold uppercase text-[#16302A] leading-tight">
                Recent Central Florida Restoration Case Studies
              </h2>
              <p className="text-[#4C594E] text-base mt-2">
                Documented structural drying results across Orange County neighborhoods.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Case 1 */}
              <div className="bg-[#F5F6EF] rounded-lg border border-[#DBDFD1] overflow-hidden flex flex-col justify-between">
                <div className="h-48 bg-[#16302A] flex items-center justify-center p-4 text-center">
                  <span className="font-['IBM_Plex_Mono',monospace] text-xs text-[#E8A33D] font-bold">
                    [Photo: Emergency extraction on hardwood floor in Winter Park residence]
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="font-['IBM_Plex_Mono',monospace] text-xs uppercase font-bold text-[#B3502E] block mb-1">
                      [Neighborhood: Winter Park]
                    </span>
                    <h3 className="font-['Big_Shoulders_Display',sans-serif] text-2xl font-bold uppercase text-[#16302A] mb-2">
                      [Cause: Second-Story Supply Line Burst]
                    </h3>
                    <p className="text-xs text-[#4C594E] leading-relaxed mb-4">
                      [Description: Pressurized supply line failure flooded master bath and dripped into downstairs kitchen ceiling and oak hardwood flooring. Technicians deployed rescue mats to preserve 85% of original timber.]
                    </p>
                  </div>
                  <div className="pt-4 border-t border-[#DBDFD1] grid grid-cols-2 gap-2 text-xs font-['IBM_Plex_Mono',monospace]">
                    <div>
                      <span className="text-[#4C594E] block">Duration:</span>
                      <span className="font-bold text-[#16302A]">[Dry-out: 4 days]</span>
                    </div>
                    <div>
                      <span className="text-[#4C594E] block">Area:</span>
                      <span className="font-bold text-[#16302A]">[Size: 1,450 sq ft]</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Case 2 */}
              <div className="bg-[#F5F6EF] rounded-lg border border-[#DBDFD1] overflow-hidden flex flex-col justify-between">
                <div className="h-48 bg-[#16302A] flex items-center justify-center p-4 text-center">
                  <span className="font-['IBM_Plex_Mono',monospace] text-xs text-[#E8A33D] font-bold">
                    [Photo: Thermal imaging showing AC ceiling leak in College Park bungalow]
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="font-['IBM_Plex_Mono',monospace] text-xs uppercase font-bold text-[#B3502E] block mb-1">
                      [Neighborhood: College Park]
                    </span>
                    <h3 className="font-['Big_Shoulders_Display',sans-serif] text-2xl font-bold uppercase text-[#16302A] mb-2">
                      [Cause: Clogged Attic AC Drain Line]
                    </h3>
                    <p className="text-xs text-[#4C594E] leading-relaxed mb-4">
                      [Description: Air handler condensate overflowed pan during July heatwave, soaking drywall ceiling and living room wall voids. Applied targeted cavity drying injectidry system.]
                    </p>
                  </div>
                  <div className="pt-4 border-t border-[#DBDFD1] grid grid-cols-2 gap-2 text-xs font-['IBM_Plex_Mono',monospace]">
                    <div>
                      <span className="text-[#4C594E] block">Duration:</span>
                      <span className="font-bold text-[#16302A]">[Dry-out: 3 days]</span>
                    </div>
                    <div>
                      <span className="text-[#4C594E] block">Area:</span>
                      <span className="font-bold text-[#16302A]">[Size: 600 sq ft]</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Case 3 */}
              <div className="bg-[#F5F6EF] rounded-lg border border-[#DBDFD1] overflow-hidden flex flex-col justify-between">
                <div className="h-48 bg-[#16302A] flex items-center justify-center p-4 text-center">
                  <span className="font-['IBM_Plex_Mono',monospace] text-xs text-[#E8A33D] font-bold">
                    [Photo: Containment chamber set up for ground flood in Downtown Orlando]
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="font-['IBM_Plex_Mono',monospace] text-xs uppercase font-bold text-[#B3502E] block mb-1">
                      [Neighborhood: Downtown Orlando]
                    </span>
                    <h3 className="font-['Big_Shoulders_Display',sans-serif] text-2xl font-bold uppercase text-[#16302A] mb-2">
                      [Cause: Stormwater Retention Basin Inversion]
                    </h3>
                    <p className="text-xs text-[#4C594E] leading-relaxed mb-4">
                      [Description: Category 3 tropical storm runoff breached ground-floor commercial unit. Crew executed 24-inch flood cuts, microbial wash, and high-temperature desiccant drying.]
                    </p>
                  </div>
                  <div className="pt-4 border-t border-[#DBDFD1] grid grid-cols-2 gap-2 text-xs font-['IBM_Plex_Mono',monospace]">
                    <div>
                      <span className="text-[#4C594E] block">Duration:</span>
                      <span className="font-bold text-[#16302A]">[Dry-out: 5 days]</span>
                    </div>
                    <div>
                      <span className="text-[#4C594E] block">Area:</span>
                      <span className="font-bold text-[#16302A]">[Size: 2,200 sq ft]</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 15. Testimonials (3 Cards with CLEARLY BRACKETED PLACEHOLDERS) */}
        <section className="py-20 lg:py-24 bg-[#EAEBE0] border-b border-[#DBDFD1]">
          <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mb-14">
              <span className="font-['IBM_Plex_Mono',monospace] text-xs font-bold uppercase tracking-widest text-[#B3502E] block mb-2">
                Client Experiences
              </span>
              <h2 className="font-['Big_Shoulders_Display',sans-serif] text-4xl sm:text-5xl font-extrabold uppercase text-[#16302A] leading-tight">
                Verified Local Property Owner Feedback
              </h2>
              <p className="text-[#4C594E] text-base mt-2">
                Direct feedback from Central Florida residents who faced emergency water damage incidents.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Testimonial 1 */}
              <div className="bg-[#F5F6EF] p-6 rounded-lg border border-[#DBDFD1] flex flex-col justify-between">
                <div className="mb-4">
                  <div className="flex text-[#E8A33D] text-lg mb-3">&starf;&starf;&starf;&starf;&starf;</div>
                  <p className="text-sm text-[#182620] italic leading-relaxed">
                    &ldquo;[Quote: The crew arrived in under 45 minutes on a Sunday evening after our water heater split open. Their thermal camera found water that had traveled 20 feet under our hallway tile. Professional, calm, and thorough.]&rdquo;
                  </p>
                </div>
                <div className="pt-4 border-t border-[#DBDFD1]">
                  <span className="font-bold text-[#16302A] block text-sm">[Client: Marcus T.]</span>
                  <span className="font-['IBM_Plex_Mono',monospace] text-xs text-[#4C594E] block">[Neighborhood: Lake Nona]</span>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-[#F5F6EF] p-6 rounded-lg border border-[#DBDFD1] flex flex-col justify-between">
                <div className="mb-4">
                  <div className="flex text-[#E8A33D] text-lg mb-3">&starf;&starf;&starf;&starf;&starf;</div>
                  <p className="text-sm text-[#182620] italic leading-relaxed">
                    &ldquo;[Quote: After Hurricane Milton, our living room took in six inches of street runoff. Orlando Rapid Restoration set up containment, pulled the wet drywall, and had the timber completely dry in four days with zero mold smell.]&rdquo;
                  </p>
                </div>
                <div className="pt-4 border-t border-[#DBDFD1]">
                  <span className="font-bold text-[#16302A] block text-sm">[Client: Elena R.]</span>
                  <span className="font-['IBM_Plex_Mono',monospace] text-xs text-[#4C594E] block">[Neighborhood: Baldwin Park]</span>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-[#F5F6EF] p-6 rounded-lg border border-[#DBDFD1] flex flex-col justify-between">
                <div className="mb-4">
                  <div className="flex text-[#E8A33D] text-lg mb-3">&starf;&starf;&starf;&starf;&starf;</div>
                  <p className="text-sm text-[#182620] italic leading-relaxed">
                    &ldquo;[Quote: They explained every line of their moisture meters and provided daily logs that made our insurance claim straightforward. Excellent communication and respectful of our home.]&rdquo;
                  </p>
                </div>
                <div className="pt-4 border-t border-[#DBDFD1]">
                  <span className="font-bold text-[#16302A] block text-sm">[Client: David &amp; Sarah W.]</span>
                  <span className="font-['IBM_Plex_Mono',monospace] text-xs text-[#4C594E] block">[Neighborhood: Winter Park]</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 16. Service Areas (6 Neighborhood Cards) */}
        <section id="service-areas" className="py-20 lg:py-24 border-b border-[#DBDFD1]">
          <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mb-14">
              <span className="font-['IBM_Plex_Mono',monospace] text-xs font-bold uppercase tracking-widest text-[#B3502E] block mb-2">
                Rapid Orange County Dispatch
              </span>
              <h2 className="font-['Big_Shoulders_Display',sans-serif] text-4xl sm:text-5xl font-extrabold uppercase text-[#16302A] leading-tight">
                Our Primary Orlando Service Areas
              </h2>
              <p className="text-[#4C594E] text-base mt-2">
                Our emergency response vehicles are strategically staged to reach any Orange County location within 60 minutes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Area 1 */}
              <div className="bg-[#F5F6EF] p-6 rounded-lg border border-[#DBDFD1]">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-['Big_Shoulders_Display',sans-serif] text-2xl font-bold uppercase text-[#16302A]">
                    Winter Park
                  </h3>
                  <span className="font-['IBM_Plex_Mono',monospace] text-[10px] uppercase font-bold text-[#E8A33D] bg-[#16302A] px-2 py-0.5 rounded">
                    &lt;45 min dispatch
                  </span>
                </div>
                <p className="text-xs text-[#4C594E] leading-relaxed mb-3">
                  Serving historic and modern estates across <strong>Park Ave</strong>, <strong>Rollins College</strong>, and the <strong>Lake Osceola</strong> shoreline with specialized timber preservation.
                </p>
                <div className="text-[11px] font-['IBM_Plex_Mono',monospace] text-[#16302A] font-semibold">
                  Zip Codes: 32789, 32792
                </div>
              </div>

              {/* Area 2 */}
              <div className="bg-[#F5F6EF] p-6 rounded-lg border border-[#DBDFD1]">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-['Big_Shoulders_Display',sans-serif] text-2xl font-bold uppercase text-[#16302A]">
                    College Park
                  </h3>
                  <span className="font-['IBM_Plex_Mono',monospace] text-[10px] uppercase font-bold text-[#E8A33D] bg-[#16302A] px-2 py-0.5 rounded">
                    &lt;40 min dispatch
                  </span>
                </div>
                <p className="text-xs text-[#4C594E] leading-relaxed mb-3">
                  Restoring mid-century bungalows and pier-and-beam properties along <strong>Edgewater Dr</strong>, <strong>Princeton St</strong>, and around <strong>Lake Ivanhoe</strong>.
                </p>
                <div className="text-[11px] font-['IBM_Plex_Mono',monospace] text-[#16302A] font-semibold">
                  Zip Codes: 32804
                </div>
              </div>

              {/* Area 3 */}
              <div className="bg-[#F5F6EF] p-6 rounded-lg border border-[#DBDFD1]">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-['Big_Shoulders_Display',sans-serif] text-2xl font-bold uppercase text-[#16302A]">
                    Downtown Orlando
                  </h3>
                  <span className="font-['IBM_Plex_Mono',monospace] text-[10px] uppercase font-bold text-[#E8A33D] bg-[#16302A] px-2 py-0.5 rounded">
                    &lt;30 min dispatch
                  </span>
                </div>
                <p className="text-xs text-[#4C594E] leading-relaxed mb-3">
                  Immediate high-rise and commercial response near <strong>Orange Ave</strong>, <strong>Lake Eola Park</strong>, and historic <strong>Thornton Park</strong> residential lofts.
                </p>
                <div className="text-[11px] font-['IBM_Plex_Mono',monospace] text-[#16302A] font-semibold">
                  Zip Codes: 32801, 32803
                </div>
              </div>

              {/* Area 4 */}
              <div className="bg-[#F5F6EF] p-6 rounded-lg border border-[#DBDFD1]">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-['Big_Shoulders_Display',sans-serif] text-2xl font-bold uppercase text-[#16302A]">
                    Lake Nona
                  </h3>
                  <span className="font-['IBM_Plex_Mono',monospace] text-[10px] uppercase font-bold text-[#E8A33D] bg-[#16302A] px-2 py-0.5 rounded">
                    &lt;50 min dispatch
                  </span>
                </div>
                <p className="text-xs text-[#4C594E] leading-relaxed mb-3">
                  Covering modern slab residential subdivisions along <strong>Narcoossee Rd</strong>, <strong>Medical City</strong>, and <strong>Lake Nona Blvd</strong>.
                </p>
                <div className="text-[11px] font-['IBM_Plex_Mono',monospace] text-[#16302A] font-semibold">
                  Zip Codes: 32827, 32832
                </div>
              </div>

              {/* Area 5 */}
              <div className="bg-[#F5F6EF] p-6 rounded-lg border border-[#DBDFD1]">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-['Big_Shoulders_Display',sans-serif] text-2xl font-bold uppercase text-[#16302A]">
                    Baldwin Park
                  </h3>
                  <span className="font-['IBM_Plex_Mono',monospace] text-[10px] uppercase font-bold text-[#E8A33D] bg-[#16302A] px-2 py-0.5 rounded">
                    &lt;40 min dispatch
                  </span>
                </div>
                <p className="text-xs text-[#4C594E] leading-relaxed mb-3">
                  Providing townhome and single-family flood extraction along <strong>New Broad St</strong>, <strong>Lake Baldwin</strong>, and <strong>Bennett Rd</strong>.
                </p>
                <div className="text-[11px] font-['IBM_Plex_Mono',monospace] text-[#16302A] font-semibold">
                  Zip Codes: 32814
                </div>
              </div>

              {/* Area 6 */}
              <div className="bg-[#F5F6EF] p-6 rounded-lg border border-[#DBDFD1]">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-['Big_Shoulders_Display',sans-serif] text-2xl font-bold uppercase text-[#16302A]">
                    Mills 50 District
                  </h3>
                  <span className="font-['IBM_Plex_Mono',monospace] text-[10px] uppercase font-bold text-[#E8A33D] bg-[#16302A] px-2 py-0.5 rounded">
                    &lt;35 min dispatch
                  </span>
                </div>
                <p className="text-xs text-[#4C594E] leading-relaxed mb-3">
                  Fast structural drying for mixed-use storefronts and historic homes along <strong>Mills Ave</strong>, <strong>Colonial Dr</strong>, and <strong>Virginia Dr</strong>.
                </p>
                <div className="text-[11px] font-['IBM_Plex_Mono',monospace] text-[#16302A] font-semibold">
                  Zip Codes: 32803
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 17. Find Us — Google Maps Embed & Dispatch Card */}
        <section id="find-us" className="py-20 lg:py-24 bg-[#EAEBE0] border-b border-[#DBDFD1]">
          <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mb-12">
              <span className="font-['IBM_Plex_Mono',monospace] text-xs font-bold uppercase tracking-widest text-[#B3502E] block mb-2">
                Headquarters &amp; Dispatch Hub
              </span>
              <h2 className="font-['Big_Shoulders_Display',sans-serif] text-4xl sm:text-5xl font-extrabold uppercase text-[#16302A] leading-tight">
                Find Our Orange County Dispatch Office
              </h2>
              <p className="text-[#4C594E] text-base mt-2">
                Centrally located in Downtown Orlando for rapid deployment across all major arterial highways (I-4, SR 408, SR 417, SR 528).
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Google Maps Embed */}
              <div className="lg:col-span-7 rounded-lg overflow-hidden border border-[#DBDFD1] shadow-sm min-h-[380px]">
                <iframe 
                  title="Orlando Rapid Restoration Location Map"
                  src="https://www.google.com/maps?q=100+N+Orange+Ave,+Orlando,+FL+32801&output=embed"
                  className="w-full h-full min-h-[380px] border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              {/* Address / Contact / Dispatch Card */}
              <div className="lg:col-span-5 bg-[#F5F6EF] p-8 rounded-lg border border-[#DBDFD1] flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#16302A] text-[#E8A33D] font-['IBM_Plex_Mono',monospace] text-xs uppercase font-semibold mb-4">
                    Dispatch Operations
                  </div>
                  <h3 className="font-['Big_Shoulders_Display',sans-serif] text-3xl font-bold uppercase text-[#16302A] mb-4">
                    Orlando Rapid Restoration
                  </h3>
                  
                  <div className="space-y-4 text-sm text-[#4C594E]">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-[#B3502E] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <div>
                        <strong className="text-[#16302A] block">Central Dispatch Facility:</strong>
                        <span>100 N Orange Ave, Orlando, FL 32801</span>
                        <span className="block text-xs text-[#4C594E] mt-0.5 font-['IBM_Plex_Mono',monospace]">
                          (Operations dispatch center &bull; Mobile crews in field)
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-[#B3502E] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <div>
                        <strong className="text-[#16302A] block">24/7 Emergency Line:</strong>
                        <a href="tel:+14075579924" className="font-['IBM_Plex_Mono',monospace] font-bold text-[#16302A] hover:text-[#B3502E]">
                          (407) 557-9924
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-[#B3502E] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <strong className="text-[#16302A] block">Operating Hours:</strong>
                        <span>Open 24 Hours / 7 Days a Week / 365 Days a Year</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#DBDFD1] mt-6">
                  <a 
                    href="tel:+14075579924"
                    className="w-full text-center py-3 rounded-md bg-[#E8A33D] hover:bg-[#C4831F] text-[#16302A] font-bold text-sm uppercase tracking-wider block transition-colors shadow-sm"
                  >
                    Call (407) 557-9924 For Emergency Dispatch
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 18. FAQ Accordion (5 Real Questions) */}
        <section id="faq" className="py-20 lg:py-24 border-b border-[#DBDFD1]">
          <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mb-12">
              <span className="font-['IBM_Plex_Mono',monospace] text-xs font-bold uppercase tracking-widest text-[#B3502E] block mb-2">
                Knowledge Base
              </span>
              <h2 className="font-['Big_Shoulders_Display',sans-serif] text-4xl sm:text-5xl font-extrabold uppercase text-[#16302A] leading-tight">
                Frequently Asked Water Damage Questions
              </h2>
              <p className="text-[#4C594E] text-base mt-2">
                Practical answers to the most common restoration, insurance, and moisture management questions.
              </p>
            </div>

            <div className="space-y-4 max-w-4xl">
              {/* FAQ 1 */}
              <div className="bg-[#F5F6EF] rounded-lg border border-[#DBDFD1] overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleFaq(0)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={openFaq === 0}
                >
                  <span className="font-['Big_Shoulders_Display',sans-serif] text-2xl font-bold uppercase text-[#16302A]">
                    What is the difference between water mitigation and water restoration?
                  </span>
                  <span className="text-[#16302A] font-bold text-xl">
                    {openFaq === 0 ? '−' : '+'}
                  </span>
                </button>
                {openFaq === 0 && (
                  <div className="px-6 pb-6 text-sm text-[#4C594E] leading-relaxed border-t border-[#DBDFD1] pt-4">
                    Water mitigation is the immediate emergency phase aimed at stopping active water intrusion, extracting standing liquid, and deploying industrial dehumidifiers to prevent mold growth. Water restoration follows mitigation and involves repairing or rebuilding structural components, installing new drywall, replacing damaged flooring, and returning the property to its pre-loss condition.
                  </div>
                )}
              </div>

              {/* FAQ 2 */}
              <div className="bg-[#F5F6EF] rounded-lg border border-[#DBDFD1] overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleFaq(1)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={openFaq === 1}
                >
                  <span className="font-['Big_Shoulders_Display',sans-serif] text-2xl font-bold uppercase text-[#16302A]">
                    Is there a fee for your on-site moisture inspection and assessment?
                  </span>
                  <span className="text-[#16302A] font-bold text-xl">
                    {openFaq === 1 ? '−' : '+'}
                  </span>
                </button>
                {openFaq === 1 && (
                  <div className="px-6 pb-6 text-sm text-[#4C594E] leading-relaxed border-t border-[#DBDFD1] pt-4">
                    No, we provide a $0 free on-site initial moisture assessment for property owners in Orlando and Orange County. Our certified technicians use thermal imaging and non-invasive moisture meters to determine the exact perimeter of water penetration before presenting a transparent scope of work.
                  </div>
                )}
              </div>

              {/* FAQ 3 */}
              <div className="bg-[#F5F6EF] rounded-lg border border-[#DBDFD1] overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleFaq(2)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={openFaq === 2}
                >
                  <span className="font-['Big_Shoulders_Display',sans-serif] text-2xl font-bold uppercase text-[#16302A]">
                    Can I dry out water damage myself with household fans, or do I need professional equipment?
                  </span>
                  <span className="text-[#16302A] font-bold text-xl">
                    {openFaq === 2 ? '−' : '+'}
                  </span>
                </button>
                {openFaq === 2 && (
                  <div className="px-6 pb-6 text-sm text-[#4C594E] leading-relaxed border-t border-[#DBDFD1] pt-4">
                    Household box fans only circulate humid ambient air across wet surfaces without extracting moisture from the room. In Florida's high humidity, surface-level fan drying leaves moisture trapped inside wall studs and subfloors, causing mold colonies to germinate. Professional low-grain refrigerant dehumidifiers extract dozens of pints of airborne water per day to physically pull moisture out of dense materials.
                  </div>
                )}
              </div>

              {/* FAQ 4 */}
              <div className="bg-[#F5F6EF] rounded-lg border border-[#DBDFD1] overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleFaq(3)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={openFaq === 3}
                >
                  <span className="font-['Big_Shoulders_Display',sans-serif] text-2xl font-bold uppercase text-[#16302A]">
                    Why does mold keep returning after I spray it with bleach or disinfectant?
                  </span>
                  <span className="text-[#16302A] font-bold text-xl">
                    {openFaq === 3 ? '−' : '+'}
                  </span>
                </button>
                {openFaq === 3 && (
                  <div className="px-6 pb-6 text-sm text-[#4C594E] leading-relaxed border-t border-[#DBDFD1] pt-4">
                    Chlorine bleach is 90% water and cannot penetrate porous substrates like drywall or unsealed framing timber. While bleach temporarily bleaches surface pigmentation, the moisture feeds the deep fungal root network (hyphae). Permanent remediation requires removing contaminated porous material and maintaining structural humidity below 50%.
                  </div>
                )}
              </div>

              {/* FAQ 5 */}
              <div className="bg-[#F5F6EF] rounded-lg border border-[#DBDFD1] overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleFaq(4)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={openFaq === 4}
                >
                  <span className="font-['Big_Shoulders_Display',sans-serif] text-2xl font-bold uppercase text-[#16302A]">
                    Do you work directly with my homeowners insurance company?
                  </span>
                  <span className="text-[#16302A] font-bold text-xl">
                    {openFaq === 4 ? '−' : '+'}
                  </span>
                </button>
                {openFaq === 4 && (
                  <div className="px-6 pb-6 text-sm text-[#4C594E] leading-relaxed border-t border-[#DBDFD1] pt-4">
                    Yes, we document all moisture readings, thermal imaging records, and drying logs using Xactimate—the industry-standard software required by insurance adjusters. We provide transparent documentation directly to your insurer to expedite claim settlement, while keeping you fully informed throughout every stage.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 19. Final CTA Banner */}
        <section className="py-20 lg:py-24 bg-[#16302A] text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#E8A33D]/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="max-w-[1180px] mx-auto px-4 sm:px-6 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#B3502E] text-white font-['IBM_Plex_Mono',monospace] text-xs font-bold uppercase tracking-wider mb-6">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              24/7 Immediate Emergency Dispatch
            </div>
            
            <h2 className="font-['Big_Shoulders_Display',sans-serif] text-4xl sm:text-6xl font-extrabold uppercase text-white leading-tight max-w-3xl mx-auto mb-6">
              Don't Let Trapped Moisture Turn Into Costly Structural Mold.
            </h2>

            <p className="text-[#F5F6EF]/80 text-base sm:text-lg max-w-2xl mx-auto mb-8">
              Our IICRC-certified restoration crews are staged across Orange County with industrial truck-mounted extractors and LGR dehumidifiers ready for dispatch.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="tel:+14075579924"
                className="w-full sm:w-auto bg-[#E8A33D] hover:bg-[#C4831F] text-[#16302A] px-8 py-4 rounded-md font-bold text-base uppercase tracking-wider transition-colors shadow-lg inline-flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5 text-[#16302A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call (407) 557-9924 Now
              </a>
              <a 
                href="#services"
                className="w-full sm:w-auto border-2 border-[#E8A33D] text-[#E8A33D] hover:bg-[#E8A33D] hover:text-[#16302A] px-8 py-4 rounded-md font-bold text-base uppercase tracking-wider transition-colors inline-flex items-center justify-center"
              >
                Explore Restoration Services
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* 20. Footer */}
      <footer className="bg-[#16302A] text-[#F5F6EF] border-t border-[#254E44] pt-16 pb-12">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#254E44]">
            {/* Col 1: Business NAP & Summary */}
            <div className="lg:col-span-5 space-y-4">
              <a href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#E8A33D] text-[#16302A] font-['Big_Shoulders_Display',sans-serif] text-2xl font-black flex items-center justify-center">
                  OR
                </div>
                <span className="font-['Big_Shoulders_Display',sans-serif] text-2xl font-extrabold uppercase text-white tracking-tight">
                  Orlando Rapid Restoration
                </span>
              </a>
              <p className="text-xs text-[#F5F6EF]/70 leading-relaxed max-w-sm">
                Dedicated 24/7 emergency water damage restoration, structural drying, and mold remediation serving residential and commercial properties throughout Orlando and Orange County, Florida.
              </p>
              <address className="not-italic text-xs font-['IBM_Plex_Mono',monospace] text-[#F5F6EF]/90 space-y-1.5 pt-2">
                <p><strong className="text-white">Address:</strong> 100 N Orange Ave, Orlando, FL 32801</p>
                <p><strong className="text-white">Emergency Phone:</strong> <a href="tel:+14075579924" className="text-[#E8A33D] hover:underline">(407) 557-9924</a></p>
                <p><strong className="text-white">Operations:</strong> 24/7 Emergency Dispatch Office</p>
              </address>
            </div>

            {/* Col 2: Services List */}
            <div className="lg:col-span-4 space-y-3">
              <span className="font-['Big_Shoulders_Display',sans-serif] text-xl font-bold uppercase text-[#E8A33D] block">
                Restoration Services
              </span>
              <ul className="space-y-2 text-xs text-[#F5F6EF]/80">
                <li><a href="/services/water-damage-restoration" className="hover:text-[#E8A33D] transition-colors">Emergency Water Extraction</a></li>
                <li><a href="/services/structural-drying" className="hover:text-[#E8A33D] transition-colors">Industrial Structural Drying</a></li>
                <li><a href="/services/mold-remediation" className="hover:text-[#E8A33D] transition-colors">Certified Mold Remediation</a></li>
                <li><a href="/services/flood-damage-restoration" className="hover:text-[#E8A33D] transition-colors">Storm &amp; Hurricane Flood Recovery</a></li>
                <li><a href="/services/sewage-cleanup" className="hover:text-[#E8A33D] transition-colors">Category 3 Sewage &amp; Black Water Cleanup</a></li>
                <li><a href="/services/dehumidification-services" className="hover:text-[#E8A33D] transition-colors">Dehumidification &amp; Moisture Control</a></li>
              </ul>
            </div>

            {/* Col 3: Company Links & Legal */}
            <div className="lg:col-span-3 space-y-3">
              <span className="font-['Big_Shoulders_Display',sans-serif] text-xl font-bold uppercase text-[#E8A33D] block">
                Company &amp; Areas
              </span>
              <ul className="space-y-2 text-xs text-[#F5F6EF]/80">
                <li><a href="/about" className="hover:text-[#E8A33D] transition-colors">About Our Team</a></li>
                <li><a href="/locations" className="hover:text-[#E8A33D] transition-colors">Orange County Service Areas</a></li>
                <li><a href="/blog" className="hover:text-[#E8A33D] transition-colors">Restoration Guides &amp; Insights</a></li>
                <li><a href="/contact" className="hover:text-[#E8A33D] transition-colors">Contact &amp; Directions</a></li>
                <li><a href="/privacy-policy" className="hover:text-[#E8A33D] transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-['IBM_Plex_Mono',monospace] text-[#F5F6EF]/60">
            <p>&copy; 2026 Orlando Rapid Restoration. All rights reserved.</p>
            <p>FL Mold Remediation / State Certified Contractor Lic. # [Pending/Placeholder]</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
