export type ConfidenceLevel = 90 | 95 | 99;

export interface SampleSizeInputs {
  confidence: number;
  marginOfError: number;
  proportion: number;
  populationSize?: number | null;
  nonResponseRate?: number | null;
}

export interface SampleSizeResult {
  n0: number;
  baseSample: number;
  adjustedSample: number;
}

export function calculateSampleSize(inputs: SampleSizeInputs): SampleSizeResult {
  const { confidence, marginOfError, proportion, populationSize, nonResponseRate } = inputs;

  // Validate Confidence
  const zScores: Record<number, number> = { 90: 1.645, 95: 1.96, 99: 2.576 };
  if (!zScores[confidence]) {
    throw new Error(`Unsupported confidence level: ${confidence}. Supported levels are 90, 95, 99.`);
  }

  // Validate Margin of Error
  if (typeof marginOfError !== 'number' || isNaN(marginOfError) || marginOfError <= 0 || marginOfError >= 100) {
    throw new Error("Margin of error must be greater than 0 and less than 100.");
  }

  // Validate Proportion
  if (typeof proportion !== 'number' || isNaN(proportion) || proportion <= 0 || proportion >= 100) {
    throw new Error("Expected proportion must be greater than 0 and less than 100.");
  }

  // Validate Population Size
  if (populationSize !== undefined && populationSize !== null) {
    if (typeof populationSize !== 'number' || isNaN(populationSize) || populationSize <= 0 || !Number.isInteger(populationSize)) {
      throw new Error("Population size must be a positive integer.");
    }
  }

  // Validate Non-Response Rate
  if (nonResponseRate !== undefined && nonResponseRate !== null) {
    if (typeof nonResponseRate !== 'number' || isNaN(nonResponseRate) || nonResponseRate < 0 || nonResponseRate >= 100) {
      throw new Error("Non-response rate must be between 0 (inclusive) and 100 (exclusive).");
    }
  }

  const Z = zScores[confidence];
  const E = marginOfError / 100;
  const p = proportion / 100;
  
  // Calculate uncorrected sample size
  const n0 = (Math.pow(Z, 2) * p * (1 - p)) / Math.pow(E, 2);
  let n = n0;
  
  // Apply finite population correction
  if (populationSize && populationSize > 0) {
    n = (n0 * populationSize) / (n0 + populationSize - 1);
  }
  
  const baseSample = Math.ceil(n);
  
  // Apply non-response adjustment
  let adjustedSample = baseSample;
  if (nonResponseRate && nonResponseRate > 0) {
    adjustedSample = Math.ceil(baseSample / (1 - (nonResponseRate / 100)));
  }
  
  return { 
    n0: Math.ceil(n0), 
    baseSample, 
    adjustedSample 
  };
}
