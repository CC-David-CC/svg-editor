# Owned original reference tests

These1 original test files belong to svg-editor because their imported source modules match this repository’s exact captured blobs. Current implementation files and assertions are unchanged. Import and proven fixture/resource URL locators are ported to this repository; no cross-repository private source imports or compatibility path shims are added.

Mechanical source-test baseline `ae48a0a46bb6de57d0e4fd943537c97ec17e8be7`; merge `bae031812076b614026a664ba72cabd9c18f0fd2`. Private phase44 preserves earlier paths, explicit copy boundaries and source-to-result commit/ref maps. The locator-normalized complete AST is unchanged, not just selected assertions.

Run `npm run test:reference`. This is Node unit/reference qualification of the retained domain modules, not browser/worker/kernel/renderer/storage/authentication/human-agent acceptance. Current app hosting/build and shared-operation integration gates remain separately open.

Captured baseline and current port: 1 pass, 0 fail, 0 cancelled, 0 skipped across 1 reported Node subtests. Top-level assertion-only files count as one reported Node subtest, not individual assertions.
