import { Link } from 'react-router-dom';
import { Briefcase, Wrench, Cog, Truck, ClipboardList } from 'lucide-react';

import { cn } from '../../utils/cn';

// IDs must match the entries in data/services.js so the linked-to anchor
// can be opened in the ServicesList accordion on the /services page.
const STRIP = [
  { id: 'sales',          label: 'Sales',       icon: Briefcase     },
  { id: 'service-repair', label: 'Service',     icon: Wrench        },
  { id: 'spare-parts',    label: 'Spare Parts', icon: Cog           },
  { id: 'hiring',         label: 'Hiring',      icon: Truck         },
  { id: 'amc',            label: 'AMC',         icon: ClipboardList },
];

/**
 * Navy 5-cell service strip.
 * Each cell is a Link to /services#<id>, hovers to full red.
 */
export default function ServicesStrip() {
  return (
    <section
      className="relative bg-navy text-white"
      aria-label="What we do — service strip"
    >
      <ul className="mx-auto grid max-w-7xl grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
        {STRIP.map((item, i) => {
          const Icon = item.icon;
          const isLast = i === STRIP.length - 1;
          return (
            <li
              key={item.id}
              className={cn(
                'border-white/10',
                !isLast && 'lg:border-r',
                i < 3 && 'sm:border-r',
                i % 2 === 0 && 'border-r sm:border-r',
                i < STRIP.length - 2 && 'border-b sm:border-b lg:border-b-0'
              )}
            >
              <Link
                to={`/services#${item.id}`}
                className={cn(
                  'group flex h-full items-center justify-center gap-3 px-6 py-7',
                  'font-display text-[13px] font-bold uppercase tracking-[0.22em]',
                  'transition-colors duration-200 ease-out',
                  'hover:bg-red'
                )}
              >
                <Icon
                  size={18}
                  strokeWidth={2.25}
                  className="text-red transition-colors duration-200 group-hover:text-white"
                  aria-hidden="true"
                />
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
