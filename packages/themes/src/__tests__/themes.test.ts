import { defaultBrand, forestBrand, loveBrand, midnightBrand, oceanBrand, sunsetBrand, telegramBrand, allBrands, getBrandById } from "../index";
import type { Brand } from "@truongdq01/tokens";

describe("Brands", () => {
  const brands = [
    { name: "default", brand: defaultBrand },
    { name: "forest", brand: forestBrand },
    { name: "love", brand: loveBrand },
    { name: "midnight", brand: midnightBrand },
    { name: "ocean", brand: oceanBrand },
    { name: "sunset", brand: sunsetBrand },
    { name: "telegram", brand: telegramBrand },
  ];

  it.each(brands)("$name should have valid brand structure", ({ brand }) => {
    expect(brand).toBeDefined();
    expect(typeof brand).toBe("object");
    
    // Check required properties
    expect(brand.id).toBeDefined();
    expect(typeof brand.id).toBe("string");
    
    expect(brand.name).toBeDefined();
    expect(typeof brand.name).toBe("string");
    
    expect(brand.light).toBeDefined();
    expect(typeof brand.light).toBe("object");
    
    expect(brand.dark).toBeDefined();
    expect(typeof brand.dark).toBe("object");
  });

  it("should have valid type exports", () => {
    const brand: Brand = defaultBrand;
    expect(brand).toBeDefined();
  });

  it("all brands should be in allBrands registry", () => {
    expect(allBrands.length).toBe(7);
    expect(allBrands.includes(defaultBrand)).toBe(true);
    expect(allBrands.includes(loveBrand)).toBe(true);
  });

  it("all brands should have unique ids", () => {
    const ids = brands.map(t => t.brand.id);
    const uniqueIds = new Set(ids);
    expect(ids.length).toBe(uniqueIds.size);
  });

  it("getBrandById should return correct brand", () => {
    expect(getBrandById("default")).toBe(defaultBrand);
    expect(getBrandById("love")).toBe(loveBrand);
    expect(getBrandById("telegram")).toBe(telegramBrand);
  });

  it("getBrandById should throw for unknown id", () => {
    expect(() => getBrandById("unknown" as any)).toThrow();
  });
});
