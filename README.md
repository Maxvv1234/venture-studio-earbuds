# Venture Studio Earbuds

An editable browser 3D studio for the Mission 2 translation earbuds concept. The original concept image is a visual reference; the model is a procedural interpretation with eight real mesh components.

## Use the studio

Open the published studio, choose **Open revised earbuds example**, then select a scene component. Drag to orbit, right-drag to pan and scroll to zoom. Use Move, Rotate and Resize, or enter precise values in the inspector. The revised case is 74 mm wide, with the lid and seam matched to its base. The base has a blue-gray finish.

Save project stores this browser's copy. Download editable project saves a portable JSON backup with embedded assets. Open project or GLB restores a backup or imports a mesh. Imported reference images remain references; apply an image texture to put artwork on a mesh. A flat branding panel works best for a logo.

Templates include earbuds, bottle, box, bag, mascot, mug, room and sculpture. Switching templates asks before replacing the scene. Undo and redo support design exploration.

**Confirm model** independently exports and reparses a binary GLB, renders a preview, and creates a ZIP. Download the ZIP and keep it intact for Mission 3. Confirmation does not modify another website.

The confirmed example is in `public/confirmed/`: model.glb, model-manifest.json, project.json, preview.png, README.txt, and the complete ZIP. The independent viewer at `viewer.html` accepts the GLB for a separate load test.

## Run locally

Use Node 22.12 or newer and pnpm 11.19:

```
pnpm install --frozen-lockfile --ignore-scripts
pnpm dev
pnpm test
pnpm build
```

The GitHub Actions workflow tests, builds and deploys GitHub Pages. Vite uses the repository base path `/venture-studio-earbuds/`.

## Portable handoff contract

The ZIP contains exactly model.glb, model-manifest.json, project.json, preview.png and README.txt. Manifest schema 1.0.0 is defined in handoff-schema.json. It records model identity, confirmation timestamp, approximate dimensions in millimeters, camera and GLB coordinates in meters (Y up), background, lighting, description, relative filenames, mesh count and a SHA-256 checksum of the GLB. Project JSON retains editable component transforms, materials, references and embedded assets. Supported textures are embedded in GLB.

## Validation

Six automated tests cover all eight templates, finite geometry, dimensions, invalid input rejection, history, real binary GLB export/reimport and hidden-component exclusion. Browser checks cover saved-session recovery, part sizing and color, undo/redo, image references and textures, confirmed export and independent viewer loading. A textured test exported nine meshes with one embedded texture. The final clean eight-mesh ZIP was separately checked against the manifest schema and its GLB SHA-256 checksum.

This is approximate concept geometry, not measured CAD, manufacturing data or a working translation-electronics simulation. No paid AI service, Blender installation, API key or runtime CDN is required.
