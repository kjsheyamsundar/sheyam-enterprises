import {
  PageHero,
  ProjectsGrid,
} from '../components/sections';
import SEO from '../components/SEO';
import { buildBreadcrumbSchema } from '../utils/schema';

export default function Projects() {
  const crumbs = [
    { label: 'Home',     to: '/' },
    { label: 'Projects', to: '/projects' },
  ];

  return (
    <>
      <SEO
        title="Projects & Installations | Sheyam Enterprises Vellore"
        description="A snapshot of recent compressor, generator, AMC, parts and hiring engagements across Tamil Nadu. Filter by category to see relevant case studies."
        keywords="compressor installation vellore, generator project case study, amc tamil nadu, industrial equipment installation"
        path="/projects"
        schema={buildBreadcrumbSchema(crumbs)}
      />
      <PageHero
        pageNumber="05"
        label="Projects"
        title="Past Work & Installations."
        crumbs={crumbs}
      />
      <ProjectsGrid />
    </>
  );
}
