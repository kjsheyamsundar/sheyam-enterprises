import {
  PageHero,
  ProductsLarge,
} from '../components/sections';
import SEO from '../components/SEO';
import { products } from '../data/products';
import {
  buildBreadcrumbSchema,
  buildProductSchema,
} from '../utils/schema';

export default function Products() {
  const crumbs = [
    { label: 'Home',     to: '/' },
    { label: 'Products', to: '/products' },
  ];

  const schema = [
    buildBreadcrumbSchema(crumbs),
    ...products.map(buildProductSchema),
  ];

  return (
    <>
      <SEO
        title="Screw & Reciprocating Compressors, Diesel Generators Vellore | Sheyam Enterprises"
        description="Industrial screw and reciprocating air compressors, diesel generators (5–2000 kVA) and genuine spare parts. Sourced from ELGi, Atlas Copco, Cummins, CAT and 16+ trusted brands."
        keywords="screw air compressor vellore, reciprocating compressor, diesel generator vellore, spare parts compressor, industrial compressor tamil nadu"
        path="/products"
        schema={schema}
      />
      <PageHero
        pageNumber="08"
        label="Products"
        title="What We Supply."
        crumbs={crumbs}
      />
      <ProductsLarge />
    </>
  );
}
