# SVG-edit

SVG-edit runs in a separate desktop window. Use the **SVG-Edit** menu to open
from My files, try the example, save, or save as a different path. Use Files to
upload an SVG from a computer. Saves go to My files on the device and then sync
with the account server. Existing files require confirmation, and conflicting
versions are reported rather than silently replaced. If the embedded editor
menu is unavailable, file controls appear above the editor as a fallback.

**Export image or PDF…** saves PNG, JPEG, WebP or PDF to My files. JPEG uses a white
background. Rendering is limited to 16 million pixels, 16,384 pixels per side,
and a 16 MiB source SVG. Embedded images, external fonts and complex SVG effects
may render differently or be unavailable in the browser; inspect the exported
image. PDF export contains a rendered image, so its text and shapes are not
individually selectable or editable.

The app checks XML and the SVG root before opening. Invalid XML leaves the
current drawing intact; if the editor itself rejects a valid-looking SVG, the
app attempts to restore the previous drawing. SVG-edit may not preserve every
feature of every SVG, and valid XML alone does not establish compatibility.
Desktop and emulated-phone tests exercise a rectangle and account recovery;
physical touch, complex artwork and all upstream features remain unverified.

Install the pinned dependencies with `npm ci --ignore-scripts`, then run
`python3 apps/system/svg-editor/prepare.py` before building. Generated assets
and dependencies are not source files.

Saving captures the filename and SVG before storage waits; later edits stay unsaved. A separate notice reports mirror-detected changes, conflicts or unavailable files while leaving the artwork open. Resolve conflicts in Files or save a copy. Local desktop, emulated-phone and 4K and live emulated-phone account tests cover a delayed save, two shapes, conflict and fresh-session opening of the saved SVG in Stitch Converter. This only establishes the tested SVG handoff, not stitch quality or support for all SVG features.

Choose **Try example** to start from an editable vector drawing with a rectangle
and two circles. It is an illustration, not a fabrication-ready part. Loading
it asks before discarding unsaved edits, starts a new unsaved document, and does
not overwrite the previously saved SVG. Local desktop, emulated-phone and 4K
and live emulated-phone account tests cover editing, replacement cancellation,
save, sync and fresh-session reopening. Physical touch remains unverified.
