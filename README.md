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
SVG files containing SMIL animation elements such as `animate`,
`animateTransform`, `animateMotion`, `animateColor` or `set` are refused before
opening because SVG-edit can silently remove them on save. The current drawing
and original file stay unchanged. SVG-edit also strips inline CSS animation in a confirmed case, so files containing inline CSS animation declarations are refused. Stylesheet animation and other CSS features are not comprehensively validated, and this check does not guarantee compatibility with other SVG features. Local desktop and
emulated-phone tests cover computer upload of an animated SVG, each listed
element, preservation of the current drawing and original, server sync and
fresh-session reopening. Physical touch remains unverified.
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

If a restored SVG is missing or invalid, SVG-edit keeps an independent blank
canvas and clears the failed file association. The original file is not
modified. Local desktop and emulated-phone tests cover invalid and missing
files, creating the example, saving it to My files, server sync and refresh.
Physical touch remains unverified.

If an SVG or the example cannot load and the editor also fails to restore the
previous canvas, the app marks the current canvas unsaved and detaches it from
the prior file. It warns that the canvas may be incomplete; save a copy or
reopen the original. Local desktop and emulated-phone tests inject both failures,
check the close guard, preserve the original, and sync a saved copy. These tests
inject failures rather than reproducing a specific upstream crash.

If a saved drawing cannot be read while opening, the editor keeps its reference and offers **Retry opening saved SVG**. The blank scratch canvas cannot overwrite the original by a normal Save; save a separate file to keep scratch work. Retrying asks before discarding scratch edits. Invalid SVG files still open as a new blank drawing; the original is left unchanged.

When `/Untitled.svg` cannot be read at startup, the scratch canvas defaults to
`/Untitled-recovery.svg`, leaving the saved drawing available for Retry. Local
registered-account desktop and emulated-phone tests checked a blank scratch save,
server sync, unchanged original bytes and a later Retry. Physical touch and actual
drawing edits in this special recovery case remain unverified.

The inline CSS animation guard protects a confirmed loss: SVG-edit removed `style="animation: ..."` from a rectangle when loading it. Local desktop and emulated-phone account tests cover rejected inline animations, preserving the original and current drawing, and reopening a separate static SVG; other CSS, actual animation rendering and physical touch remain unverified.

The inline CSS animation guard also detects browser-parsed escaped property names, such as `anim\61tion`; a real editor probe showed that SVG-edit strips that style. Local desktop and emulated-phone account tests reject these inputs before changing the current drawing, while preserving and syncing the original. This is not comprehensive support or detection for every CSS or SVG feature.

SVG-edit rewrites a root `viewBox` into its own canvas dimensions. Opening an
SVG whose viewport scales or offsets the coordinate system can therefore change
its physical size or composition on save. The app refuses such files before
changing the current drawing or the original; use another editor for them.
Identity viewports (zero origin and numeric pixel width/height equal to the
viewBox) remain supported, including the tested Excalidraw SVG export. Local
registered-account desktop and emulated-phone tests checked scaled, offset and
percentage-sized viewports, original/current preservation and identity
open/save/sync/reopen; physical touch and other SVG semantics remain unverified.

SVG-edit was observed stripping the `vector-effect` attribute and inline CSS
`vector-effect` from a transformed rectangle, changing its stroke width. The
app rejects non-default vector-effect attributes and inline vector-effect
declarations before opening, keeping both the original file and current canvas
unchanged. Local registered-account desktop and phone-sized tests cover the
attribute, inline and CSS-escaped property forms, plus a supported `none`
attribute, sync and reopen. A separate test exported a real Excalidraw drawing,
opened it here, added a rectangle and synced the edited SVG on both viewports.
Stylesheet rules, other SVG semantics and physical touch remain unverified.

SVG-edit was observed stripping `paint-order` and inline `mix-blend-mode`,
changing visible pixels in test drawings. The app refuses explicit paint-order
attributes or inline declarations and non-default blending attributes or inline
declarations before replacing the canvas or source file. This includes tested
CSS-escaped property names. An ordinary SVG with a stylesheet remains supported;
stylesheet-defined effects and other SVG features have not been comprehensively
verified. Local registered-account desktop and emulated-phone tests checked
source and current canvas preservation, pixel differences in upstream SVG-edit,
sync, and reopening; physical touch remains unverified.

A diagrams.net SVG with embedded diagram content can be opened as a separate
SVG copy after an explicit warning. SVG-edit does not retain the embedded
editable diagram or its adaptive theme reliably. Save defaults to a new
`-edited.svg` path; the original SVG and `.drawio` project remain available.
Only diagrams.net's exact known SVG 1.1 PUBLIC declaration is removed before
XML parsing, and only when the SVG contains embedded diagram content; custom
entities and other document types remain rejected. Desktop and emulated-phone
account tests cover cancellation, actual export, edit, save/sync/fresh reopen,
source preservation and pixel comparison for a simple light-theme diagram.
More complex drawings, dark-mode fidelity and physical touch remain unverified.

SVG-edit briefly adds a 200 ms opacity animation while a new shape finishes.
Saving during that interval previously wrote the temporary animation and partial
opacity; the app then refused to reopen its own SVG because it does not support
animation. Save, Export, Open, retry and the example now wait for those
in-canvas animations to finish before snapshot or discard decisions, for up to
two seconds. If they do not finish, it leaves work marked
unsaved and asks the user to retry. The editor also marks the window dirty when
the specific temporary shape animation appears, so closing it asks before
discarding the unfinished shape. Local registered-account desktop and emulated-
phone tests hold the editor's actual completion callback to verify no premature
write, timeout, retry, export and discard cancellation, final opacity, sync and
fresh reopen. The previous public
release was also tested with that callback held and did write the incomplete SVG.
Physical touch remains unverified.

Exporting JPEG asks for confirmation that transparency becomes opaque and that
JPEG compression is lossy. Cancel leaves the drawing and destination untouched;
if the drawing changes during confirmation, export asks the user to retry.
PNG preserves transparency. Local registered-account desktop and emulated-phone
checks compared exported pixels, cancellation, server sync, and fresh SVG
reopen. Physical touch and more complex image content remain unverified.
