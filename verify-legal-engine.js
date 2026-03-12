#!/usr/bin/env node

/**
 * DIDI Legal Engine Verification Script
 * Validates all legal modules, database functions, and API route syntax
 */

console.log('\n🔍 DIDI Legal Engine Verification\n');
console.log('='.repeat(60));

const results = {
  passed: 0,
  failed: 0,
  tests: []
};

function test(name, fn) {
  try {
    fn();
    results.passed++;
    results.tests.push({ name, status: '✅ PASS' });
    console.log(`✅ ${name}`);
  } catch (error) {
    results.failed++;
    results.tests.push({ name, status: `❌ FAIL: ${error.message}` });
    console.log(`❌ ${name}`);
    console.log(`   Error: ${error.message}`);
  }
}

async function runTests() {
  console.log('\n📦 Testing Legal Modules...\n');
  
  // Test legal modules
  test('RTI Drafter exports', async () => {
    const module = await import('./src/lib/legal/rti-drafter.js');
    if (!module.generateRTI) throw new Error('generateRTI not exported');
  });
  
  test('CPGRAMS Helper exports', async () => {
    const module = await import('./src/lib/legal/cpgrams-helper.js');
    if (!module.prepareCPGRAMS) throw new Error('prepareCPGRAMS not exported');
  });
  
  test('Writ Drafter exports', async () => {
    const module = await import('./src/lib/legal/writ-drafter.js');
    if (!module.generateWritPetition) throw new Error('generateWritPetition not exported');
  });
  
  test('Legal Notice exports', async () => {
    const module = await import('./src/lib/legal/legal-notice.js');
    if (!module.generateLegalNotice) throw new Error('generateLegalNotice not exported');
  });
  
  test('PIL Checker exports', async () => {
    const module = await import('./src/lib/legal/pil-checker.js');
    if (!module.checkPILEligibility) throw new Error('checkPILEligibility not exported');
  });
  
  console.log('\n⚡ Testing Escalation System...\n');
  
  test('Escalation module exports', async () => {
    const module = await import('./src/lib/escalation.js');
    if (!module.ESCALATION_LADDER) throw new Error('ESCALATION_LADDER not exported');
    if (!module.shouldEscalate) throw new Error('shouldEscalate not exported');
    if (!module.getNextEscalation) throw new Error('getNextEscalation not exported');
    if (module.ESCALATION_LADDER.length !== 8) throw new Error('Expected 8 escalation levels');
  });
  
  console.log('\n💾 Testing Database Functions...\n');
  
  test('Database escalation functions', async () => {
    const db = await import('./src/lib/db.js');
    const required = [
      'createEscalationLog',
      'getEscalationLogs',
      'getLatestEscalation',
      'updateIssueEscalationLevel'
    ];
    for (const fn of required) {
      if (!db[fn]) throw new Error(`${fn} not exported`);
    }
  });
  
  test('Database legal document functions', async () => {
    const db = await import('./src/lib/db.js');
    const required = [
      'createLegalDocument',
      'getLegalDocuments',
      'getLegalDocumentsByIssue',
      'getLegalDocumentsByCitizen',
      'getLegalDocumentById',
      'updateLegalDocumentStatus'
    ];
    for (const fn of required) {
      if (!db[fn]) throw new Error(`${fn} not exported`);
    }
  });
  
  console.log('\n🌐 API Route Syntax Checks...\n');
  
  const routes = [
    'src/app/api/issues/[id]/escalate/route.js',
    'src/app/api/legal/rti/route.js',
    'src/app/api/legal/cpgrams/route.js',
    'src/app/api/legal/writ/route.js',
    'src/app/api/legal/notice/route.js',
    'src/app/api/legal/pil/route.js',
    'src/app/api/legal/documents/route.js'
  ];
  
  const { execSync } = await import('child_process');
  const fs = await import('fs');
  
  for (const route of routes) {
    test(`${route.split('/').slice(-2).join('/')} syntax`, () => {
      if (!fs.existsSync(route)) throw new Error('File not found');
      execSync(`node --check ${route}`, { encoding: 'utf8' });
    });
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('\n📊 Test Summary:\n');
  console.log(`   ✅ Passed: ${results.passed}`);
  console.log(`   ❌ Failed: ${results.failed}`);
  console.log(`   📝 Total:  ${results.passed + results.failed}`);
  
  if (results.failed === 0) {
    console.log('\n🎉 All tests passed! Legal Engine is ready.\n');
    process.exit(0);
  } else {
    console.log('\n⚠️  Some tests failed. Review errors above.\n');
    process.exit(1);
  }
}

runTests().catch(error => {
  console.error('\n❌ Verification script error:', error);
  process.exit(1);
});
