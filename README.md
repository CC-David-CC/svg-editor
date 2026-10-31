# SVG-edit

SVG-edit runs in a separate desktop window. Open an SVG from My files; use
Files to upload an SVG from a computer. Save writes to My files on the device
and then syncs with the account server. Expand Save location to choose a folder
or filename. Existing files require confirmation, and conflicting versions are
reported rather than silently replaced.

The app checks XML and the SVG root before opening. Invalid XML leaves the
current drawing intact; if the editor itself rejects a valid-looking SVG, the
app attempts to restore the previous drawing. SVG-edit may not preserve every
feature of every SVG, and valid XML alone does not establish compatibility.
Desktop and emulated-phone tests exercise a rectangle and account recovery;
physical touch, complex artwork and all upstream features remain unverified.

Install the pinned dependencies with `npm ci --ignore-scripts`, then run
`python3 apps/system/svg-editor/prepare.py` before building. Generated assets
and dependencies are not source files.
