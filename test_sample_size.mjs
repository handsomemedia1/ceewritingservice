function calculateSampleSize(confidence, marginOfError, proportion, populationSize, nonResponse) {
  const zScores = { 90: 1.645, 95: 1.96, 99: 2.576 };
  const Z = zScores[confidence];
  const E = marginOfError / 100;
  const p = proportion / 100;
  
  let n0 = (Math.pow(Z, 2) * p * (1 - p)) / Math.pow(E, 2);
  let n = n0;
  
  if (populationSize && populationSize > 0) {
    n = (n0 * populationSize) / (n0 + populationSize - 1);
  }
  
  let baseSample = Math.ceil(n);
  
  let adjustedSample = baseSample;
  if (nonResponse && nonResponse > 0 && nonResponse < 100) {
    adjustedSample = Math.ceil(baseSample / (1 - (nonResponse / 100)));
  }
  
  return { n0: Math.ceil(n0), baseSample, adjustedSample };
}

console.log("Running Sample Size Calculator Benchmark Tests...");

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    passed++;
    console.log("PASS: " + message);
  } else {
    failed++;
    console.error("FAIL: " + message);
  }
}

// Test 1: Standard benchmark
let t1 = calculateSampleSize(95, 5, 50, null, 0);
assert(t1.baseSample === 385, "95% confidence, 5% margin, 50% proportion = 385");

// Test 2: Different confidence
let t2 = calculateSampleSize(99, 5, 50, null, 0);
assert(t2.baseSample === 664, "99% confidence, 5% margin, 50% proportion = 664");

// Test 3: Finite Population Correction
let t3 = calculateSampleSize(95, 5, 50, 1000, 0);
assert(t3.baseSample === 278, "FPC with N=1000 yields 278");

// Test 4: Non-response Adjustment
let t4 = calculateSampleSize(95, 5, 50, null, 20);
assert(t4.adjustedSample === 482, "20% Non-response on 385 yields 482"); // 385 / 0.8 = 481.25 -> 482

console.log(`\nResults: ${passed} passed, ${failed} failed.`);
if (failed > 0) process.exit(1);
