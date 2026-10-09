import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';

const source = readFileSync(new URL('../src/lib/reos-playback.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } }).outputText;
const { reosCycleDuration, reosFrameAt } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);
const messages = Object.freeze([Object.freeze({ sender: 'user', text: 'Hi' }), Object.freeze({ sender: 'ai', text: 'Hello' })]);

test('typing, thinking, holds and reset follow exact reference boundaries', () => {
  assert.equal(reosCycleDuration(messages), 6720);
  assert.deepEqual(reosFrameAt(messages, 0), { index: 0, characters: 0, phase: 'typing' });
  assert.deepEqual(reosFrameAt(messages, 35), { index: 0, characters: 1, phase: 'typing' });
  assert.deepEqual(reosFrameAt(messages, 70), { index: 0, characters: 2, phase: 'holding' });
  assert.deepEqual(reosFrameAt(messages, 770), { index: 1, characters: 0, phase: 'thinking' });
  assert.deepEqual(reosFrameAt(messages, 1870), { index: 1, characters: 0, phase: 'typing' });
  assert.deepEqual(reosFrameAt(messages, 1900), { index: 1, characters: 1, phase: 'typing' });
  assert.deepEqual(reosFrameAt(messages, 2020), { index: 1, characters: 5, phase: 'holding' });
  assert.deepEqual(reosFrameAt(messages, 4220), { index: 1, characters: 5, phase: 'reset' });
  assert.deepEqual(reosFrameAt(messages, 6720), reosFrameAt(messages, 0));
});
test('seeking and replay remain deterministic over repeated cycles without mutating inputs', () => {
  for (const elapsed of [0, 34, 35, 69, 70, 769, 770, 1869, 1870, 4220, 6719]) {
    const first = reosFrameAt(messages, elapsed);
    assert.deepEqual(reosFrameAt(messages, elapsed + 6720 * 10), first);
    assert.deepEqual(reosFrameAt(messages, elapsed), first);
    assert.ok(first.characters >= 0 && first.characters <= messages[first.index].text.length);
  }
  assert.deepEqual(reosFrameAt([], 1234), { index: -1, characters: 0, phase: 'reset' });
  assert.equal(messages[0].text, 'Hi');
});
