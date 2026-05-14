import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

import { projects } from '../../data/projects';
import { FadeUp } from '../animations/FadeUp';
import { SectionLabel } from '../ui/SectionLabel';
import { Badge } from '../ui/Badge';
import { cn } from '../../utils/cn';

/* ──────────────────────────────────────────────────────────────────
   Filter config
   ────────────────────────────────────────────────────────────────── */
const FILTERS = [
  { id: 'ALL',         label: 'All'          },
  { id: 'COMPRESSOR',  label: 'Compressors'  },
  { id: 'GENERATOR',   label: 'Generators'   },
  { id: 'AMC',         label: 'AMC'          },
  { id: 'PARTS',       label: 'Parts'        },
  { id: 'HIRING',      label: 'Hiring'       },
];

/* Map project type → Badge variant + top-accent Tailwind classes (literal) */
const TYPE_STYLES = {
  COMPRESSOR: { variant: 'compressor', accent: 'bg-navy',          dot: 'bg-navy'           },
  GENERATOR:  { variant: 'generator',  accent: 'bg-red',           dot: 'bg-red'            },
  AMC:        { variant: 'amc',        accent: 'bg-purple-600',    dot: 'bg-purple-600'     },
  PARTS:      { variant: 'parts',      accent: 'bg-emerald-600',   dot: 'bg-emerald-600'    },
  HIRING:     { variant: 'hiring',     accent: 'bg-amber-600',     dot: 'bg-amber-600'      },
};

/* ──────────────────────────────────────────────────────────────────
   Filter tab button
   ────────────────────────────────────────────────────────────────── */
function FilterTab({ active, onClick, children, count }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-2 px-5 py-2.5',
        'font-display text-[12px] font-bold uppercase tracking-[0.22em]',
        'border transition-all duration-200 ease-out',
        'rounded-none',
        active
          ? 'border-navy bg-navy text-white shadow-[0_10px_22px_-12px_rgba(11,27,92,0.55)]'
          : 'border-off bg-white text-ink hover:border-navy hover:text-navy'
      )}
    >
      <span>{children}</span>
      {typeof count === 'number' && (
        <span
          className={cn(
            'min-w-[24px] px-1.5 py-0.5 text-center font-display text-[10px] font-bold tracking-wider',
            active ? 'bg-white/15 text-white' : 'bg-off text-muted'
          )}
        >
          {count}
        </span>
      )}
    </button>
  );
}

/* ──────────────────────────────────────────────────────────────────
   Project card
   ────────────────────────────────────────────────────────────────── */
function ProjectCard({ project }) {
  const style = TYPE_STYLES[project.type] ?? TYPE_STYLES.COMPRESSOR;

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col bg-white',
        'border border-off',
        'transition-all duration-300 ease-out',
        'hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-20px_rgba(9,9,15,0.22)]',
        'rounded-none'
      )}
    >
      {/* Top coloured accent */}
      <span
        className={cn('absolute inset-x-0 top-0 h-1', style.accent)}
        aria-hidden="true"
      />

      {/* Header — badges */}
      <div className="flex items-start justify-between gap-3 px-6 pt-7">
        <Badge text={project.type} variant={style.variant} />
        <span className="border border-off bg-off px-2.5 py-1 font-display text-[10px] font-bold uppercase tracking-[0.22em] text-muted">
          {project.year}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col px-6 pb-6 pt-5">
        <span className="font-display text-3xl font-black leading-none text-red">
          {project.number}
          <span className="text-muted"> /</span>
        </span>

        <h3 className="mt-3 font-display text-xl font-black uppercase leading-tight tracking-tight text-navy md:text-2xl">
          {project.title}
        </h3>

        <p className="mt-2 font-display text-[12px] font-bold uppercase tracking-[0.18em] text-red">
          {project.client}
        </p>

        <p className="mt-4 font-body text-[14px] leading-relaxed text-slate">
          {project.description}
        </p>

        <div className="flex-1" />

        <div className="mt-6 flex items-center gap-2 border-t border-off pt-4 font-display text-[11px] font-bold uppercase tracking-[0.22em] text-navy">
          <span>Case Detail</span>
          <ArrowRight
            size={13}
            strokeWidth={2.5}
            className="transition-transform duration-200 group-hover:translate-x-1 group-hover:text-red"
            aria-hidden="true"
          />
        </div>
      </div>
    </article>
  );
}

/* ──────────────────────────────────────────────────────────────────
   ProjectsGrid — root export
   ────────────────────────────────────────────────────────────────── */
export default function ProjectsGrid() {
  const [filter, setFilter] = useState('ALL');

  /* Counts per type, for badge numbers on tabs */
  const counts = useMemo(() => {
    const c = { ALL: projects.length };
    FILTERS.forEach((f) => {
      if (f.id === 'ALL') return;
      c[f.id] = projects.filter((p) => p.type === f.id).length;
    });
    return c;
  }, []);

  const filtered = useMemo(
    () => (filter === 'ALL' ? projects : projects.filter((p) => p.type === filter)),
    [filter]
  );

  return (
    <section className="bg-white py-20 md:py-24" aria-label="Projects gallery">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <FadeUp distance={20}>
          <SectionLabel text="Selected Work" />
        </FadeUp>

        <FadeUp delay={0.05} distance={28} className="mt-4">
          <h2 className="font-display font-black uppercase leading-[0.95] tracking-tight">
            <span className="block text-5xl text-navy md:text-6xl lg:text-[72px]">
              Past Work &amp;
            </span>
            <span className="mt-1 block text-5xl text-red md:text-6xl lg:text-[72px]">
              Installations.
            </span>
          </h2>
        </FadeUp>

        <FadeUp delay={0.1} distance={20} className="mt-5">
          <p className="max-w-2xl font-body text-[15px] leading-relaxed text-slate md:text-base">
            A snapshot of recent compressor, generator, AMC, parts and hiring
            engagements across Tamil Nadu — filter by category to drill in.
          </p>
        </FadeUp>

        {/* Filter tabs */}
        <FadeUp delay={0.15} distance={16} className="mt-8">
          <div role="tablist" aria-label="Filter projects" className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <FilterTab
                key={f.id}
                active={filter === f.id}
                onClick={() => setFilter(f.id)}
                count={counts[f.id]}
              >
                {f.label}
              </FilterTab>
            ))}
          </div>
        </FadeUp>

        {/* Grid — keyed on filter so it remounts cleanly when category changes */}
        <motion.div
          key={filter}
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate="visible"
          variants={{
            hidden:  {},
            visible: { transition: { staggerChildren: 0.05 } },
          }}
        >
          {filtered.map((p) => (
            <motion.div
              key={p.id}
              variants={{
                hidden:  { opacity: 0, scale: 0.92, y: 16 },
                visible: { opacity: 1, scale: 1,    y: 0  },
              }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectCard project={p} />
            </motion.div>
          ))}
        </motion.div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="mt-12 border border-off bg-off px-6 py-14 text-center">
            <p className="font-display text-base font-bold uppercase tracking-[0.18em] text-muted">
              No projects under this filter yet.
            </p>
          </div>
        )}

        {/* "More projects coming soon" */}
        <FadeUp delay={0.2} distance={16} className="mt-14">
          <div className="flex flex-col items-center gap-3 border border-dashed border-off bg-off px-8 py-10 text-center">
            <span className="grid h-10 w-10 place-items-center bg-white text-red">
              <Sparkles size={18} strokeWidth={2.25} aria-hidden="true" />
            </span>
            <h3 className="font-display text-xl font-black uppercase tracking-tight text-navy md:text-2xl">
              More Projects Coming Soon
            </h3>
            <p className="max-w-xl font-body text-[13.5px] leading-relaxed text-slate">
              We're adding case studies as projects close — site photos,
              equipment specs, and the outcomes our customers care about.
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
