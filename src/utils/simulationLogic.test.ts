import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getInitialSimulationState,
  generateFictionalPacket,
  computeModeProperties,
} from './simulationLogic.ts';

test('initial state initializes correctly for normal mode', () => {
  const state = getInitialSimulationState('normal');
  assert.equal(state.mode, 'normal');
  assert.equal(state.encryptionActive, false);
  assert.equal(state.packetCount, 0);
  assert.equal(state.tamperDetected, false);
});

test('initial state initializes correctly for protected mode', () => {
  const state = getInitialSimulationState('protected');
  assert.equal(state.mode, 'protected');
  assert.equal(state.encryptionActive, true);
  assert.equal(state.alertLevel, 'safe');
});

test('generateFictionalPacket produces encrypted payload in protected mode', () => {
  const packet = generateFictionalPacket('protected', 1);
  assert.equal(packet.isEncrypted, true);
  assert.equal(packet.protocol, 'HTTPS (TLS 1.3)');
  assert.ok(packet.payload.includes('AEAD_AES_256_GCM'));
});

test('generateFictionalPacket produces plaintext payload in mitm mode', () => {
  const packet = generateFictionalPacket('mitm', 2);
  assert.equal(packet.isEncrypted, false);
  assert.equal(packet.isIntercepted, true);
  assert.equal(packet.protocol, 'HTTP (Plaintext)');
  assert.ok(packet.payload.includes('HTTP/1.1'));
});

test('computeModeProperties returns accurate descriptions for all 3 modes', () => {
  const normalProps = computeModeProperties('normal');
  assert.equal(normalProps.attackerPresent, false);
  assert.equal(normalProps.tlsActive, false);

  const mitmProps = computeModeProperties('mitm');
  assert.equal(mitmProps.attackerPresent, true);
  assert.equal(mitmProps.tlsActive, false);

  const protectedProps = computeModeProperties('protected');
  assert.equal(protectedProps.attackerPresent, true);
  assert.equal(protectedProps.tlsActive, true);
  assert.ok(protectedProps.badge.includes('TLS 1.3'));
});
