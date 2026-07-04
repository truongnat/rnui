import type { Brand } from '@truongdq01/tokens';
import {
  allBrands,
  butterBrand,
  chocolateBrand,
  getBrandById,
  gothicBrand,
  matchaBrand,
  neutralBrand,
  stoneBrand,
  y2kBrand,
} from '../index';

describe('Brands', () => {
  const brands = [
    { name: 'neutral', brand: neutralBrand },
    { name: 'stone', brand: stoneBrand },
    { name: 'butter', brand: butterBrand },
    { name: 'chocolate', brand: chocolateBrand },
    { name: 'matcha', brand: matchaBrand },
    { name: 'gothic', brand: gothicBrand },
    { name: 'y2k', brand: y2kBrand },
  ];

  it.each(brands)('$name should have valid brand structure', ({ brand }) => {
    expect(brand).toBeDefined();
    expect(typeof brand).toBe('object');

    // Check required properties
    expect(brand.id).toBeDefined();
    expect(typeof brand.id).toBe('string');

    expect(brand.name).toBeDefined();
    expect(typeof brand.name).toBe('string');

    expect(brand.light).toBeDefined();
    expect(typeof brand.light).toBe('object');

    expect(brand.dark).toBeDefined();
    expect(typeof brand.dark).toBe('object');
  });

  it('should have valid type exports', () => {
    const brand: Brand = neutralBrand;
    expect(brand).toBeDefined();
  });

  it('all brands should be in allBrands registry', () => {
    expect(allBrands.length).toBe(7);
    expect(allBrands.includes(neutralBrand)).toBe(true);
    expect(allBrands.includes(y2kBrand)).toBe(true);
  });

  it('all brands should have unique ids', () => {
    const ids = brands.map((t) => t.brand.id);
    const uniqueIds = new Set(ids);
    expect(ids.length).toBe(uniqueIds.size);
  });

  it('getBrandById should return correct brand', () => {
    expect(getBrandById('neutral')).toBe(neutralBrand);
    expect(getBrandById('butter')).toBe(butterBrand);
  });

  it('getBrandById should throw for unknown id', () => {
    // Widen the param type to exercise the runtime guard without a type escape.
    const lookup = getBrandById as (id: string) => Brand;
    expect(() => lookup('unknown')).toThrow();
  });
});
