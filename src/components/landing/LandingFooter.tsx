'use client';

import Link from 'next/link';
import { Map as MapIcon, Mail, Phone, ExternalLink, House } from 'lucide-react';

const FOOTER_LINKS = {
  Discover: [
    { label: 'Explore Properties', href: '/map' },
    { label: 'Agricultural Land', href: '/map?type=land' },
    { label: 'Farms & Orchards', href: '/map?type=farm' },
    { label: 'Houses & Villas', href: '/map?type=house' },
    { label: 'New Listings', href: '/map?filter=new' },
  ],
  Company: [
    { label: 'About TerraLink', href: '#' },
    { label: 'How It Works', href: '#' },
    { label: 'Pricing', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
  ],
  Support: [
    { label: 'Help Center', href: '#' },
    { label: 'Contact Us', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
  ],
};

export function LandingFooter() {
  return (
    <footer className="bg-slate-900 dark:bg-[#080a0e] text-gray-400">
      {/* CTA band */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12">
          <div className="flex flex-col items-center justify-between gap-5 sm:gap-6 text-center sm:flex-row sm:text-left">
            <div>
              <h3 className="font-outfit text-xl sm:text-2xl font-extrabold text-white mb-1">
                Ready to list your property?
              </h3>
              <p className="text-gray-400 text-sm sm:text-[15px]">
                Join thousands of landowners connecting with buyers across Tunisia.
              </p>
            </div>
            <Link
              href="/map?action=list"
              className="flex w-full sm:w-auto items-center justify-center shrink-0 rounded-xl bg-emerald-500 px-6 sm:px-7 py-3 sm:py-3.5 text-[14px] sm:text-[15px] font-bold text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 hover:shadow-emerald-500/50 transition-all active:scale-98"
            >
              Add a Property →
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10">
          {/* Brand column */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <div className="mb-3.5 flex items-center gap-2.5">
              <MapIcon className="h-6 w-6 text-emerald-500 stroke-[2.5px]" />
              <span className="font-outfit text-[20px] font-extrabold text-white">
                Terra<span className="text-emerald-500">Link</span>
              </span>
            </div>
            <p className="mb-5 max-w-sm text-sm leading-relaxed text-gray-400">
              Tunisia's premier platform for discovering and listing agricultural land, farms, and residential properties — with precision parcel maps.
            </p>

            {/* Contact */}
            <div className="mb-5 flex flex-col gap-2">
              <a
                href="mailto:hello@terralink.tn"
                className="flex items-center gap-2 text-xs sm:text-[13px] text-gray-400 hover:text-emerald-400 transition-colors py-0.5"
              >
                <Mail className="h-4 w-4 text-emerald-500" />
                hello@terralink.tn
              </a>
              <a
                href="tel:+21612345678"
                className="flex items-center gap-2 text-xs sm:text-[13px] text-gray-400 hover:text-emerald-400 transition-colors py-0.5"
              >
                <Phone className="h-4 w-4 text-emerald-500" />
                +216 12 345 678
              </a>
            </div>

            {/* Social */}
            <div className="flex gap-2.5">
              {[
                { icon: House, label: 'Twitter', href: '#' },
                { icon: House, label: 'LinkedIn', href: '#' },
                { icon: House, label: 'Instagram', href: '#' },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-gray-400 hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-400 transition-all"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section} className="flex flex-col">
              <h4 className="mb-3 sm:mb-4 text-xs sm:text-[13px] font-bold uppercase tracking-widest text-gray-300">
                {section}
              </h4>
              <ul className="flex flex-col gap-2">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="inline-block py-0.5 text-xs sm:text-[14px] text-gray-400 hover:text-emerald-400 transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8 py-5 sm:py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col items-center justify-between gap-3 text-center text-xs sm:text-[13px] sm:flex-row">
          <span className="text-gray-500">
            © {new Date().getFullYear()} TerraLink. All rights reserved.
          </span>
          <div className="flex gap-4">
            <Link href="#" className="text-gray-500 hover:text-emerald-400 transition-colors">Privacy</Link>
            <Link href="#" className="text-gray-500 hover:text-emerald-400 transition-colors">Terms</Link>
            <Link href="#" className="text-gray-500 hover:text-emerald-400 transition-colors">Cookies</Link>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-gray-500">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
