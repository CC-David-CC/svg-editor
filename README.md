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

Closing asks for confirmation while an SVG save or image/PDF export is in
progress. A file write already sent to storage may still finish after close.

Choose **Try example** to start from an editable vector drawing with a rectangle
and two circles. It is an illustration, not a fabrication-ready part. Loading
it asks before discarding unsaved edits, starts a new unsaved document, and does
not overwrite the previously saved SVG. Local desktop, emulated-phone and 4K
and live emulated-phone account tests cover editing, replacement cancellation,
save, sync and fresh-session reopening. Physical touch remains unverified.

The editor checks for edits made while an Open or Try example discard
confirmation is showing, and checks again after choosing an SVG. If the drawing
changed, it stays open and the requested replacement is cancelled; try again
after saving. The checks use a revision counter and prevent overlapping file
actions while the confirmation or picker is active.

Static release `8116f42affd3fb89e936830c5c77c0df6a2c76920e303c0f973eb795c8fdb36b` serves the integrated menu and image/PDF exports. Local desktop, emulated-phone and 4K workflows passed, including keyboard and emulated-tap menu activation, conflict checks, PDF Viewer and Stitch Converter integration. A save-safety test initially lacked Stitch Converter in the isolated preview; it passed after the app was included. Public desktop and emulated-phone account tests passed editing, export, sync, fresh-session reopen and fallback. Physical phone touch and complex artwork remain unverified.

The editor routes Ctrl+S (or Command+S) in the focused
editor to My files and Ctrl+Shift+S (or Command+Shift+S) to Save As. It also
prevents overlapping file actions while a Save As or export path prompt is
open. Local desktop, emulated-phone and 4K account tests exercise Ctrl-based
shortcuts and a simulated Meta+S with the editor iframe focused, programmatically triggered competing
actions, SVG save, PNG export, sync, reopen and listener cleanup. A separate
emulated-phone discard-race regression passed. In a negative-control test,
the previous source left the drawing unsaved after Ctrl+S. A physical Mac,
physical touch and all editor shortcuts remain unverified. A public phone-sized
account test also passed.

The local file-identity candidate updates a window's My files reference after
opening or saving another SVG. A desktop account regression verifies that an
original and a saved copy open in separate windows; the phone-sized shortcut
regression also passed. Physical touch remains unverified.
