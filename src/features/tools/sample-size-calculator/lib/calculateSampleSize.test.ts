import { describe, it, expect } from 'vitest';
import { calculateSampleSize } from './calculateSampleSize';

describe('calculateSampleSize()', () => {

  // Test A — canonical benchmark
  it('Test A: canonical benchmark (95% CI, 5% margin, 50% proportion)', () => {
    const result = calculateSampleSize({
      confidence: 95,
      marginOfError: 5,
      proportion: 50
    });
    expect(result.baseSample).toBe(385);
  });

  // Test B — 90% confidence
  it('Test B: 90% confidence, 5% margin, 50% proportion', () => {
    const result = calculateSampleSize({
      confidence: 90,
      marginOfError: 5,
      proportion: 50
    });
    // Z = 1.645
    // n0 = (1.645^2 * 0.5 * 0.5) / 0.05^2 = (2.706025 * 0.25) / 0.0025 = 0.67650625 / 0.0025 = 270.6025
    // ceil(270.6025) = 271
    expect(result.baseSample).toBe(271);
  });

  // Test C — 99% confidence
  it('Test C: 99% confidence, 5% margin, 50% proportion', () => {
    const result = calculateSampleSize({
      confidence: 99,
      marginOfError: 5,
      proportion: 50
    });
    // Z = 2.576
    // n0 = (2.576^2 * 0.5 * 0.5) / 0.05^2 = (6.635776 * 0.25) / 0.0025 = 1.658944 / 0.0025 = 663.5776
    // ceil(663.5776) = 664
    expect(result.baseSample).toBe(664);
  });

  // Test D — different expected proportion
  it('Test D: different expected proportion (95% CI, 5% margin, 20% proportion)', () => {
    const result = calculateSampleSize({
      confidence: 95,
      marginOfError: 5,
      proportion: 20
    });
    // n0 = (1.96^2 * 0.2 * 0.8) / 0.05^2 = (3.8416 * 0.16) / 0.0025 = 0.614656 / 0.0025 = 245.8624
    // ceil = 246
    expect(result.baseSample).toBe(246);
  });

  // Test E — finite population correction
  it('Test E: finite population correction (N=1500)', () => {
    const result = calculateSampleSize({
      confidence: 95,
      marginOfError: 5,
      proportion: 50,
      populationSize: 1500
    });
    // n0 = 384.16
    // n = (384.16 * 1500) / (384.16 + 1500 - 1) = 576240 / 1883.16 = 305.996
    // ceil = 306
    expect(result.baseSample).toBe(306);
  });

  // Test F — non-response
  it('Test F: non-response adjustment (20% loss)', () => {
    const result = calculateSampleSize({
      confidence: 95,
      marginOfError: 5,
      proportion: 50,
      nonResponseRate: 20
    });
    // base = 385
    // adjusted = 385 / (1 - 0.2) = 385 / 0.8 = 481.25
    // ceil = 482
    expect(result.adjustedSample).toBe(482);
  });

  // Test G — combined FPC + non-response
  it('Test G: combined FPC (N=1500) and non-response (20%)', () => {
    const result = calculateSampleSize({
      confidence: 95,
      marginOfError: 5,
      proportion: 50,
      populationSize: 1500,
      nonResponseRate: 20
    });
    // base (FPC applied) = 306
    // adjusted = 306 / 0.8 = 382.5
    // ceil = 383
    expect(result.baseSample).toBe(306);
    expect(result.adjustedSample).toBe(383);
  });

  // Test H — invalid margin
  it('Test H: rejects invalid margin of error', () => {
    expect(() => calculateSampleSize({ confidence: 95, marginOfError: 0, proportion: 50 })).toThrow();
    expect(() => calculateSampleSize({ confidence: 95, marginOfError: -5, proportion: 50 })).toThrow();
    expect(() => calculateSampleSize({ confidence: 95, marginOfError: 100, proportion: 50 })).toThrow();
    expect(() => calculateSampleSize({ confidence: 95, marginOfError: 105, proportion: 50 })).toThrow();
  });

  // Test I — invalid expected proportion
  it('Test I: rejects invalid expected proportion', () => {
    expect(() => calculateSampleSize({ confidence: 95, marginOfError: 5, proportion: 0 })).toThrow();
    expect(() => calculateSampleSize({ confidence: 95, marginOfError: 5, proportion: 100 })).toThrow();
    expect(() => calculateSampleSize({ confidence: 95, marginOfError: 5, proportion: -10 })).toThrow();
    expect(() => calculateSampleSize({ confidence: 95, marginOfError: 5, proportion: 110 })).toThrow();
  });

  // Test J — invalid population
  it('Test J: rejects invalid population', () => {
    expect(() => calculateSampleSize({ confidence: 95, marginOfError: 5, proportion: 50, populationSize: 0 })).toThrow();
    expect(() => calculateSampleSize({ confidence: 95, marginOfError: 5, proportion: 50, populationSize: -500 })).toThrow();
    expect(() => calculateSampleSize({ confidence: 95, marginOfError: 5, proportion: 50, populationSize: 1000.5 })).toThrow();
  });

  // Test K — invalid non-response
  it('Test K: rejects invalid non-response', () => {
    expect(() => calculateSampleSize({ confidence: 95, marginOfError: 5, proportion: 50, nonResponseRate: 100 })).toThrow();
    expect(() => calculateSampleSize({ confidence: 95, marginOfError: 5, proportion: 50, nonResponseRate: 110 })).toThrow();
    expect(() => calculateSampleSize({ confidence: 95, marginOfError: 5, proportion: 50, nonResponseRate: -10 })).toThrow();
  });

  // Test L — unsupported confidence
  it('Test L: rejects unsupported confidence', () => {
    // @ts-ignore - testing runtime validation
    expect(() => calculateSampleSize({ confidence: 92, marginOfError: 5, proportion: 50 })).toThrow();
  });

});
