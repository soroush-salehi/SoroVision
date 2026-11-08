# SoroVision

> Image tools that run in your browser.

Load an image and resize it or export it in common browser-supported formats. Processing uses the Canvas API locally; the image is not sent to a server.

## Features

- Local image preview
- Resize with aspect ratio preserved
- Export as PNG or JPEG
- No remote upload

## Tech stack

HTML, CSS, vanilla JavaScript and Canvas API

## Run locally

Open `index.html` and choose an image.

## Scope and limitations

Browser canvas decoding and encoding support varies by format. Animated images are not preserved.

## Project structure

```
SoroVision/
├── index.html   # self-contained interface and application logic
└── README.md    # overview, setup and scope
```

## Development principles

- Keep the interface accessible, responsive and dependency-light.
- Prefer clear, readable code over unnecessary abstractions.
- Never commit credentials, private data or generated user files.
- Document limitations honestly and add tests as the project grows.

## License

No license has been selected yet. Until a license is added, all rights are reserved by the copyright holder.
