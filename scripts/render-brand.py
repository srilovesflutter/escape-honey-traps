"""Rasterise launcher icons, the Play hi-res icon, and the 1024x500 feature graphic."""

from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"
STORE = ROOT / "store"
ART = Path("/opt/cursor/artifacts")

TEAL_INNER = (36, 110, 104)
TEAL_OUTER = (16, 52, 48)
CREAM = (246, 241, 230, 255)
CREAM_EDGE = (214, 198, 172, 255)
GOLD = (232, 168, 64, 255)
GOLD_CORE = (255, 220, 140, 255)
WHITE = (255, 255, 255, 255)


def radial_background(size: int) -> Image.Image:
    image = Image.new("RGB", (size, size))
    pixels = image.load()
    center = (size - 1) / 2
    max_r = (2**0.5) * center
    for y in range(size):
        for x in range(size):
            t = min(1.0, ((x - center) ** 2 + (y - center) ** 2) ** 0.5 / max_r)
            t = t * t * (3 - 2 * t)
            pixels[x, y] = tuple(int(TEAL_INNER[i] * (1 - t) + TEAL_OUTER[i] * t) for i in range(3))
    return image


def draw_lantern(image: Image.Image, cx: float, cy: float, scale: float, body, edge, flame, core, punch_flame: bool) -> None:
    draw = ImageDraw.Draw(image)
    def xy(x: float, y: float) -> tuple[float, float]:
        return (cx + x * scale, cy + y * scale)

    def box(x0: float, y0: float, x1: float, y1: float) -> list[float]:
        a, b = xy(x0, y0)
        c, d = xy(x1, y1)
        return [a, b, c, d]

    # Finial and lid. The lid is a shallow cap, not a house roof.
    draw.ellipse(box(-10, -168, 10, -148), fill=body)
    draw.polygon([xy(-46, -112), xy(0, -158), xy(46, -112)], fill=body)
    # Brim overlaps the cage so the lid does not leave a gap.
    draw.rounded_rectangle(box(-92, -124, 92, -84), radius=max(2, int(10 * scale)), fill=body)

    # Cage body.
    draw.rounded_rectangle(box(-78, -90, 78, 92), radius=max(4, int(28 * scale)), fill=body)

    window = box(-40, -58, 40, 62)
    radius = max(3, int(16 * scale))
    if punch_flame:
        hole = Image.new("L", image.size, 0)
        ImageDraw.Draw(hole).rounded_rectangle(window, radius=radius, fill=255)
        image.putalpha(ImageChops.subtract(image.getchannel("A"), hole))
        draw = ImageDraw.Draw(image)
    else:
        draw.rounded_rectangle(window, radius=radius, fill=flame)

    # Side bars. The center stays open so the light reads as one flame.
    for bar in (-24, 24):
        draw.rounded_rectangle(box(bar - 4, -70, bar + 4, 74), radius=max(2, int(3 * scale)), fill=body)
    if not punch_flame:
        draw.ellipse(box(-14, -18, 14, 24), fill=core)

    draw.rounded_rectangle(box(-36, 86, 36, 108), radius=max(2, int(8 * scale)), fill=body)
    draw.rounded_rectangle(box(-58, 104, 58, 122), radius=max(2, int(6 * scale)), fill=body)


def render_layer(size: int, body, edge, flame, core, punch_flame: bool, supersample: int = 4) -> Image.Image:
    big = size * supersample
    image = Image.new("RGBA", (big, big), (0, 0, 0, 0))
    # Optical center sits a little below the geometric center.
    draw_lantern(image, big / 2, big * 0.545, big / 520, body, edge, flame, core, punch_flame)
    return image.resize((size, size), Image.Resampling.LANCZOS)


def opaque(image: Image.Image, background: Image.Image) -> Image.Image:
    base = background.convert("RGBA")
    return Image.alpha_composite(base, image).convert("RGBA")


def main() -> None:
    ASSETS.mkdir(exist_ok=True)
    STORE.mkdir(exist_ok=True)
    ART.mkdir(parents=True, exist_ok=True)

    background = radial_background(1024)
    background.save(ASSETS / "android-icon-background.png", "PNG")

    foreground = render_layer(1024, CREAM, CREAM_EDGE, GOLD, GOLD_CORE, punch_flame=False)
    foreground.save(ASSETS / "android-icon-foreground.png", "PNG")

    mono = render_layer(1024, WHITE, WHITE, (0, 0, 0, 0), (0, 0, 0, 0), punch_flame=True)
    mono.save(ASSETS / "android-icon-monochrome.png", "PNG")

    composed = opaque(foreground, background)
    # Legacy launcher and web favicon must be fully opaque.
    composed.convert("RGB").save(ASSETS / "icon.png", "PNG")
    composed.resize((196, 196), Image.Resampling.LANCZOS).convert("RGB").save(ASSETS / "favicon.png", "PNG")

    # Play Console hi-res icon: 512 square, 32-bit, every pixel opaque.
    play = composed.resize((512, 512), Image.Resampling.LANCZOS)
    play_rgba = play.convert("RGBA")
    solid = Image.new("RGBA", play_rgba.size, (0, 0, 0, 255))
    play_rgba = Image.alpha_composite(solid, play_rgba)
    assert play_rgba.getextrema()[3] == (255, 255)
    play_path = ART / "play-icon-512.png"
    play_rgba.save(play_path, "PNG", optimize=True)
    if play_path.stat().st_size >= 1024 * 1024:
        raise SystemExit(f"play icon is too large: {play_path.stat().st_size}")

    splash = render_layer(1024, TEAL_OUTER + (255,), TEAL_INNER + (255,), GOLD, GOLD_CORE, False, supersample=3)
    splash.save(ASSETS / "splash-icon.png", "PNG")
    splash_dark = render_layer(1024, CREAM, CREAM_EDGE, GOLD, GOLD_CORE, False, supersample=3)
    splash_dark.save(ASSETS / "splash-icon-dark.png", "PNG")

    feature = Image.new("RGB", (1024, 500))
    pixels = feature.load()
    for y in range(500):
        for x in range(1024):
            t = min(1.0, ((x - 230) ** 2 + (y - 250) ** 2) ** 0.5 / 980)
            t = t * t * (3 - 2 * t)
            pixels[x, y] = tuple(int(TEAL_INNER[i] * (1 - t) + TEAL_OUTER[i] * t) for i in range(3))
    lantern_only = foreground.resize((340, 340), Image.Resampling.LANCZOS)
    feature_rgba = feature.convert("RGBA")
    feature_rgba.alpha_composite(lantern_only, (48, 80))
    feature = feature_rgba.convert("RGB")

    display = ImageFont.truetype(
        str(ROOT / "node_modules/@expo-google-fonts/fraunces/600SemiBold/Fraunces_600SemiBold.ttf"),
        78,
    )
    body = ImageFont.truetype(
        str(ROOT / "node_modules/@expo-google-fonts/source-sans-3/400Regular/SourceSans3_400Regular.ttf"),
        32,
    )
    draw = ImageDraw.Draw(feature)
    draw.text((430, 150), "Escape", font=display, fill=(246, 241, 230))
    draw.text((430, 236), "Honey Traps", font=display, fill=(246, 241, 230))
    draw.text((434, 348), "See the approach. Leave safely.", font=body, fill=(232, 214, 184))
    feature_path = STORE / "feature-graphic.png"
    feature.save(feature_path, "PNG")
    if feature.size != (1024, 500):
        raise SystemExit(f"feature graphic size {feature.size}")


if __name__ == "__main__":
    main()
